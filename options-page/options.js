// Saves options to chrome.storage
const saveOptions = () => {
    const pause =  Number(document.getElementById('pause').value);
    const unlock = Number(document.getElementById('unlock').value);

    chrome.storage.sync.set(
        { pauseTime: pause, unlockTime: unlock },
        () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {
            status.textContent = '';
        }, 750);
        }
    );
};
  
// Restores state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(
        (items) => {
            document.getElementById('pause').value = items.pauseTime;
            document.getElementById('unlock').value = items.unlockTime;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);