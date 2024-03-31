document.getElementById('options-link').addEventListener('click', function(e) {
    e.preventDefault();
    chrome.runtime.sendMessage({message: "openOptions"});
});
