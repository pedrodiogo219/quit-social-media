(async () => {
    let destination = await chrome.storage.session.get("destination")
    console.log(destination.destination);

    let unlockButton = document.getElementById("unlockButton");
    // Disable the button initially
    unlockButton.classList.add('buttonDisabled');
    unlockButton.href = '#';

    let countdown = 30;
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
        unlockButton.href = destination.destination;
        unlockButton.textContent = 'Unlock';
    }, countdown*1000);
})()
