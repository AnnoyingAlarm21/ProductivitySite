// Initialize Firebase (add your config)
const firebaseConfig = {
    // Your Firebase config here
};

firebase.initializeApp(firebaseConfig);

// Sign in with email/password
function signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            window.location.href = '/dashboard';
        })
        .catch((error) => {
            console.error(error);
            alert(error.message);
        });
}

// Sign in with Google
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            window.location.href = '/dashboard';
        })
        .catch((error) => {
            console.error(error);
        });
} 