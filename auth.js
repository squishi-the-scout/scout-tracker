import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.getElementById('login-btn').addEventListener('click', async () => {
    const role = document.getElementById('role-select').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-message');

    try {
        // For now, use a test account
        // You'll create actual accounts in Firebase Console next
        const email = `${username}@scout.local`;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if user is leader
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();

        if (role === 'leader' && userData?.role !== 'leader') {
            errorDiv.innerText = 'Not authorized as leader';
            return;
        }

        // Store user info
        localStorage.setItem('currentUser', JSON.stringify({
            uid: user.uid,
            username: username,
            role: userData?.role || 'scout'
        }));

        // Redirect to appropriate dashboard
        if (userData?.role === 'leader') {
            window.location.href = 'leader-dashboard.html';
        } else {
            window.location.href = 'scout-dashboard.html';
        }

    } catch (error) {
        errorDiv.innerText = 'Login failed: ' + error.message;
    }
});
