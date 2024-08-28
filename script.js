let timerInterval;
let isPaused = false;
let remainingTime = 0;
let focusTime = 0; // Total focus time for the session
let breakDuration = 60; // Break duration in seconds (1 minute)
let isRunning = false;
let breaks = 0; // Number of breaks based on focus time
let breakTimes = []; // Times when breaks should occur

const circle = document.querySelector('.progress-ring__circle');
const circleBg = document.querySelector('.progress-ring__circle-bg');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
const display = document.getElementById('time-display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resumeButton = document.getElementById('resume-button');
const backButton = document.getElementById('back-button');
const timerContainer = document.getElementById('timer-container');
const focusTimerElements = document.querySelectorAll('.focus-timer > *:not(#timer-container)');
const focusTimeInput = document.getElementById('focus-time');
const breakInfo = document.getElementById('break-info');

pauseButton.disabled = true;
resumeButton.disabled = true;

circle.style.strokeDasharray = `${circumference}`;
circleBg.style.strokeDasharray = `${circumference}`;

// Event listener for input change in focus time
focusTimeInput.addEventListener('input', calculateBreaks);

// Function to start the focus session
function startFocusSession() {
    focusTime = parseInt(focusTimeInput.value);
    let skipBreaks = document.getElementById('skip-breaks').checked;

    if (isNaN(focusTime) || focusTime <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }

    remainingTime = focusTime * 60; // Convert focus time to seconds
    isRunning = true;
    isPaused = false;
    pauseButton.disabled = false;
    resumeButton.disabled = true;

    circle.style.strokeDashoffset = circumference;
    updateDisplay();
    timerContainer.style.display = 'block';
    focusTimerElements.forEach(el => el.style.display = 'none');

    // Calculate break times based on focus time
    if (!skipBreaks) {
        breakTimes = [];
        for (let i = 1; i <= breaks; i++) {
            breakTimes.push(i * (focusTime * 60 / (breaks + 1))); // Adjust break intervals
        }
    }

    timerInterval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            pauseButton.disabled = true;
            resumeButton.disabled = true;
            circle.style.strokeDashoffset = 0;
            display.textContent = "Focus session ended!";
            if (!skipBreaks) {
                alert("Focus session complete!");
            }
            return;
        }

        if (!isPaused) {
            remainingTime--; // Decrement remaining time

            // Check for 2-minute mark
            if (remainingTime === (focusTime * 60) - 120 && !skipBreaks) {
                clearInterval(timerInterval); // Stop the timer
                alert('Break time! You have 1 minute.');
                setTimeout(() => {
                    alert('Break ended. Resuming focus.');
                    startFocusSession(); // Restart the focus session from where it left off
                }, breakDuration * 1000); // Break duration in milliseconds
                return; // Exit the current interval to stop decrementing during the break
            }

            updateDisplay(); // Update the displayed time
            updateCircle(); // Update the circular progress
        }
    }, 1000);
}

// Function to pause the timer
function pauseTimer() {
    if (!isRunning || isPaused) return;

    isPaused = true; // Set paused state to true
    pauseButton.disabled = true; // Disable pause button
    resumeButton.disabled = false; // Enable resume button
}

// Function to resume the timer
function resumeTimer() {
    if (!isRunning || !isPaused) return;

    isPaused = false; // Set paused state to false
    pauseButton.disabled = false; // Enable pause button
    resumeButton.disabled = true; // Disable resume button
}

// Function to reset the focus session
function resetFocusSession() {
    clearInterval(timerInterval); // Clear the timer interval
    timerContainer.style.display = 'none'; // Hide the timer container
    focusTimerElements.forEach(el => el.style.display = ''); // Show timer settings

    remainingTime = 0; // Reset remaining time
    isRunning = false; // Reset running state
    isPaused = false; // Reset paused state
    display.textContent = "00:00"; // Reset display
    circle.style.strokeDashoffset = circumference; // Reset progress circle
    pauseButton.disabled = true; // Disable pause button
    resumeButton.disabled = true; // Disable resume button
    breakInfo.textContent = "You’ll have no breaks"; // Reset break information
}

// Function to update the displayed time
function updateDisplay() {
    const mins = Math.floor(remainingTime / 60);
    const secs = remainingTime % 60;
    display.textContent = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Function to update the circular progress indicator
function updateCircle() {
    const offset = (remainingTime / (focusTime * 60)) * circumference;
    circle.style.strokeDashoffset = offset;
}

// Function to change the focus time value
function changeValue(delta) {
    let currentValue = parseInt(focusTimeInput.value);

    if (isNaN(currentValue)) {
        currentValue = 10; // Default to 10 minutes if not a number
    }

    let newValue = currentValue + delta;

    if (newValue < 1) {
        newValue = 1; // Ensure minimum value is 1
    }

    focusTimeInput.value = newValue; // Update input value
    calculateBreaks(); // Recalculate breaks
}

// Function to calculate the number of breaks
function calculateBreaks() {
    const focusTime = parseInt(focusTimeInput.value);
    breaks = Math.floor(focusTime / 2); // Number of breaks based on focus time

    const breakInfoText = breaks > 0
        ? `You’ll have ${breaks} break${breaks > 1 ? 's' : ''} of ${breakDuration / 60} min each`
        : "You’ll have no breaks";

    breakInfo.textContent = breakInfoText; // Update break information text
}

// Event listeners for buttons
startButton.addEventListener('click', startFocusSession);
pauseButton.addEventListener('click', pauseTimer);
resumeButton.addEventListener('click', resumeTimer);
backButton.addEventListener('click', resetFocusSession);

// Initial calculation of breaks based on default value
calculateBreaks();
