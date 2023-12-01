(async () => {
    let destination = await chrome.storage.session.get("destination")
    console.log(destination.destination);

    let unlockButton = document.getElementById("unlockButton");
    unlockButton.href = destination.destination; 
})()
