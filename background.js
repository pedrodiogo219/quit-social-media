chrome.webNavigation.onBeforeNavigate.addListener(async function(details) {
    var url = new URL(details.url);
    if (url.hostname === "www.instagram.com" || url.hostname === "instagram.com") {
        await chrome.storage.session.set({destination: url.href});

        // Redirect to wait page if we're going to instagram
        chrome.tabs.update(details.tabId, {
            url: "chrome-extension://" + chrome.runtime.id + "/hello.html"
        });
    }
});
