chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    var url = new URL(details.url);
    if (url.hostname === "www.instagram.com" || url.hostname === "instagram.com") {
        // Cancel the navigation if the URL is Instagram
        chrome.tabs.update(details.tabId, {
            url: "chrome-extension://"+chrome.runtime.id+"/hello.html"
        });
    }
});
