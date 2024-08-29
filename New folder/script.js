document.getElementById('start-button').addEventListener('click', startFocusSession);
document.getElementById('edit-goal').addEventListener('click', openEditModal);
document.getElementById('save-button').addEventListener('click', saveGoalSettings);
document.getElementById('cancel-button').addEventListener('click', closeEditModal);
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

let countdown;
let streak = 0;
let isLightTheme = false;

function startFocusSession() {
    let time = parseInt(document.getElementById('time-input').value) * 60;
    let skipBreaks = document.getElementById('skip-breaks').checked;
    let breakTime = 5 * 60; // 5 minutes in seconds

    if (time > 25 * 60 && !skipBreaks) {
        time -= breakTime;
        setTimeout(() => alert('Time for a break!'), time * 1000);
    }

    startTimer(time);
}

function startTimer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            updateProgress(seconds / 60);
            document.getElementById('timer-status').textContent = 'Focus session completed!';
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = remainderSeconds.toString().padStart(2, '0');
}

function updateProgress(focusMinutes) {
    let completedMinutes = parseInt(document.getElementById('completed-minutes').textContent);
    completedMinutes += focusMinutes;
    document.getElementById('completed-minutes').textContent = completedMinutes;
    document.getElementById('completed-time').textContent = completedMinutes + ' minutes';

    let dailyGoal = parseInt(document.getElementById('daily-goal').textContent) || 60;
    let progress = (completedMinutes / dailyGoal) * 283;
    document.getElementById('progress-circle').style.strokeDashoffset = 283 - progress;

    if (completedMinutes >= dailyGoal) {
        streak++;
        document.getElementById('streak-days').textContent = streak + ' days';
    }
}

function openEditModal() {
    document.getElementById('edit-modal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function saveGoalSettings() {
    let newGoal = parseInt(document.getElementById('goal-input').value);
    document.getElementById('daily-goal').textContent = newGoal + ' minutes';
    document.getElementById('edit-modal').style.display = 'none';

    if (document.getElementById('clear-progress').checked) {
        document.getElementById('completed-minutes').textContent = '0';
        document.getElementById('completed-time').textContent = '0 minutes';
        document.getElementById('progress-circle').style.strokeDashoffset = 283;
    }

    closeEditModal();
}

function toggleTheme() {
    isLightTheme = !isLightTheme;
    if (isLightTheme) {
        document.body.classList.add('light-theme');
        document.getElementById('theme-toggle').textContent = 'Switch to Dark Theme';
    } else {
        document.body.classList.remove('light-theme');
        document.getElementById('theme-toggle').textContent = 'Switch to Light Theme';
    }
}
