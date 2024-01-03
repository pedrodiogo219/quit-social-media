const DEFAULT_PAUSE_TIME = 30
const DEFAULT_UNLOCK_TIME = 3*60

chrome.storage.sync.set(
    { pauseTime: DEFAULT_PAUSE_TIME, unlockTime: DEFAULT_UNLOCK_TIME }
)

async function redirectToLockPage(details){
    var url = new URL(details.url);
    if (url.hostname === "www.instagram.com" || url.hostname === "instagram.com") {
        await chrome.storage.session.set({destination: url.href});

        // Redirect to wait page if we're going to instagram
        chrome.tabs.update(details.tabId, {
            url: chrome.runtime.getURL("/blocked-page/blocked-page.html")
        });
    }
}

chrome.webNavigation.onBeforeNavigate.addListener(redirectToLockPage);

// add a listener for messages from script.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "unlock") {
        chrome.storage.session.get("destination", async function(result) {
            // remove the listener to allow navigation to the destination
            chrome.webNavigation.onBeforeNavigate.removeListener(redirectToLockPage);
            // navigate to the destination
            chrome.tabs.update(sender.tab.id, {
                url: request.destination
            });
            
            // add listener again after the unlockTime passes
            let currentUnlockTime = (await chrome.storage.sync.get("unlockTime")).unlockTime
            setTimeout(function() {
                chrome.webNavigation.onBeforeNavigate.addListener(redirectToLockPage);
                
                // get current url from that tab
                chrome.tabs.get(sender.tab.id, function(tab) {
                    // force navigation to that same url to activate the lock again
                    chrome.tabs.update(sender.tab.id, {
                        url: tab.url
                    });
                });   
            }, currentUnlockTime * 1000);
        });
    }
});