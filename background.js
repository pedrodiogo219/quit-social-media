async function redirectToLockPage(details){
    var url = new URL(details.url);
    if (url.hostname === "www.instagram.com" || url.hostname === "instagram.com") {
        await chrome.storage.session.set({destination: url.href});

        // Redirect to wait page if we're going to instagram
        chrome.tabs.update(details.tabId, {
            url: "chrome-extension://" + chrome.runtime.id + "/hello.html"
        });
    }
}

chrome.webNavigation.onBeforeNavigate.addListener(redirectToLockPage);

// add a listener for messages from script.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "unlock") {
        chrome.storage.session.get("destination", function(result) {
            // remove the listener to allow navigation to the destination
            chrome.webNavigation.onBeforeNavigate.removeListener(redirectToLockPage);
            // navigate to the destination
            chrome.tabs.update(sender.tab.id, {
                url: request.destination
            });

            // add listener again after 3 minutes
            setTimeout(function() {
                chrome.webNavigation.onBeforeNavigate.addListener(redirectToLockPage);
                
                // get current url from that tab
                chrome.tabs.get(sender.tab.id, function(tab) {
                    // force navigation to that same url to activate the lock again
                    chrome.tabs.update(sender.tab.id, {
                        url: tab.url
                    });
                });   
            }, 10*1000);
        });
    }
});
