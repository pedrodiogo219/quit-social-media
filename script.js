let destination = "#";
(async () => {
    destination = (await chrome.storage.session.get("destination")).destination;

    let unlockButton = document.getElementById("unlockButton");
    // Disable the button initially
    unlockButton.classList.add('buttonDisabled');
    unlockButton.href = '#';

    let countdown = 2;
    unlockButton.textContent = `Unlock (${countdown}s)`;

    // Update the button text every second
    let intervalCountdown = setInterval(() => {
        countdown--;
        unlockButton.textContent = `Unlock (${countdown}s)`;
    }, 1000);

    // Enable the button after 30 seconds
    setTimeout(() => {
        clearInterval(intervalCountdown);
        unlockButton.classList.remove('buttonDisabled');
        unlockButton.textContent = 'Unlock';
        unlockButton.onclick = buttonAction;
    }, countdown*1000);
})()

function buttonAction(){
    // send a message to background.js to allow the user to navigate to the destination
    chrome.runtime.sendMessage({message: "unlock", destination});
}

function buttonDisabled(){
    // do nothing
}
