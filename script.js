


let progressInterval;

document.addEventListener('DOMContentLoaded', () => {
    resetDailyProgress(); // Run reset check on page load
    updateProgressUI();
    startProgressSimulation(); // Start the simulation
    setInterval(resetDailyProgress, 60000); // Check for reset every minute
});

function startProgressSimulation() {
    // Start simulating progress
    progressInterval = setInterval(() => {
        completedTime += 1;
        localStorage.setItem('completedTime', completedTime);
        updateProgressUI();
    }, 2000);
}

function stopProgressSimulation() {
    // Stop simulating progress
    clearInterval(progressInterval);
}

function simulateProgress() {
    startProgressSimulation(); // Call the function to start the simulation

    // Optionally stop the simulation after some time or condition
    // Example: stop after 5 minutes (300,000 milliseconds)
    setTimeout(() => {
        stopProgressSimulation();
    }, 300000);
}

function resetDailyProgress() {
    const currentTime = new Date().getTime();
    const lastResetTime = localStorage.getItem('lastResetTime') ? parseInt(localStorage.getItem('lastResetTime')) : 0;

    if (currentTime - lastResetTime >= 86400000) { // 24 hours
        localStorage.setItem('lastResetTime', currentTime);

        // Save yesterday's time
        localStorage.setItem('yesterdayTime', completedTime);

        // Reset completed time for the new day
        completedTime = 0;
        localStorage.setItem('completedTime', completedTime);

        updateProgressUI();
        updateYesterdayTimeUI(); // Update yesterday's time in the UI

        // Restart the simulation if needed
        startProgressSimulation();
    }
}

// Get the modal
var modal = document.getElementById("editGoalModal");

// Get the button that opens the modal
var btn = document.getElementById("editGoalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the save and cancel buttons
var saveBtn = document.getElementById("saveBtn");
var cancelBtn = document.getElementById("cancelBtn");

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks the save button, save the changes
saveBtn.onclick = function() {
    // Handle the saving of settings here

    // Close the modal
    modal.style.display = "none";
}

// When the user clicks the cancel button, close the modal without saving
cancelBtn.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
