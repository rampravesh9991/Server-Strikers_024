// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdAkntg9QJh_zWWHrh3KBS8lpOFGOHCZ4",
    authDomain: "project-sample-a68a0.firebaseapp.com",
    projectId: "project-sample-a68a0",
    storageBucket: "project-sample-a68a0.appspot.com",
    messagingSenderId: "823766257528",
    appId: "1:823766257528:web:4b942f27fa4ac55552c28d",
    measurementId: "G-GWG3VY5TVY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = firebase.auth();

// Get a Firestore instance
const db = firebase.firestore();

document.getElementById('start-button').addEventListener('click', startFocusSession);
document.getElementById('edit-goal').addEventListener('click', openEditModal);
document.getElementById('save-button').addEventListener('click', saveGoalSettings);
document.getElementById('cancel-button').addEventListener('click', closeEditModal);
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
document.getElementById('sign-in-button').addEventListener('click', signIn);
document.getElementById('sign-out-button').addEventListener('click', signOut);

let countdown;
let streak = 0;
let isLightTheme = false;

// Handle user authentication state
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User is signed in: ", user);
        loadProgress(); // Load user-specific data when user is signed in
    } else {
        console.log("No user is signed in");
        // Optionally, handle UI changes or redirect to sign-in page
    }
});

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
    const user = auth.currentUser;

    if (user) {
        const userId = user.uid;

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

        // Save progress to Firestore
        db.collection("users").doc(userId).set({
            completedMinutes: completedMinutes,
            dailyGoal: dailyGoal,
            streakDays: streak
        })
        .then(() => {
            console.log("Progress successfully saved!");
        })
        .catch((error) => {
            console.error("Error saving progress: ", error);
        });
    } else {
        console.log("No user is signed in. Cannot update progress.");
    }
}

function loadProgress() {
    const user = auth.currentUser;

    if (user) {
        const userId = user.uid;

        db.collection("users").doc(userId).get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                document.getElementById('completed-minutes').textContent = data.completedMinutes || '0';
                document.getElementById('daily-goal').textContent = data.dailyGoal || '60 minutes';
                document.getElementById('streak-days').textContent = data.streakDays || '0 days';
                updateProgress(data.completedMinutes);
            } else {
                console.log("No such document!");
            }
        })
        .catch((error) => {
            console.error("Error getting document: ", error);
        });
    } else {
        console.log("No user is signed in. Cannot load progress.");
    }
}

// Call loadProgress when the page loads
window.onload = loadProgress;

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

// Sign in with email and password
function signIn() {
    const email = document.getElementById('sign-in-email').value;
    const password = document.getElementById('sign-in-password').value;

    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in: ", user);
    })
    .catch((error) => {
        console.error("Error signing in: ", error);
    });
}

// Sign out
function signOut() {
    auth.signOut()
    .then(() => {
        console.log("User signed out");
        // Optionally, clear user data or redirect to sign-in page
    })
    .catch((error) => {
        console.error("Error signing out: ", error);
    });
}
