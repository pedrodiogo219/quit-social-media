(async () => {
    var destination = await chrome.storage.session.get("destination")
    console.log(destination.destination);
})()
