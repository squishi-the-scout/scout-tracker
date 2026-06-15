import { auth, db } from './firebase-config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { collection, getDocs, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Check if user is logged in and is leader
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.role !== 'leader') {
    window.location.href = 'index.html';
}

// Logout button
document.getElementById('logout-btn').addEventListener('click', async () => {
    await signOut(auth);
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Load all scouts
async function loadScouts() {
    const scoutsList = document.getElementById('scouts-list');
    scoutsList.innerHTML = 'Loading...';

    try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        
        const scouts = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.role === 'scout') {
                scouts.push({ id: doc.id, ...data });
            }
        });

        if (scouts.length === 0) {
            scoutsList.innerHTML = '<p>No scouts yet. Create accounts in Firebase Console.</p>';
            return;
        }

        scoutsList.innerHTML = scouts.map(scout => `
            <div class="scout-card" data-id="${scout.id}">
                <h3>${scout.username}</h3>
                <div id="progress-${scout.id}">
                    Loading progress...
                </div>
                <button class="view-scout-btn button" data-id="${scout.id}">View Full Progress</button>
            </div>
        `).join('');

        // Load progress for each scout
        for (const scout of scouts) {
            await loadScoutProgress(scout.id);
        }

        // Add event listeners to view buttons
        document.querySelectorAll('.view-scout-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const scoutId = btn.getAttribute('data-id');
                window.location.href = `leader-view-scout.html?id=${scoutId}`;
            });
        });

    } catch (error) {
        scoutsList.innerHTML = `<p>Error loading scouts: ${error.message}</p>`;
    }
}

async function loadScoutProgress(scoutId) {
    const progressDiv = document.getElementById(`progress-${scoutId}`);
    try {
        const progressRef = doc(db, 'progress', scoutId);
        const progressDoc = await getDoc(progressRef);
        
        if (progressDoc.exists()) {
            const data = progressDoc.data();
            const completedCount = Object.values(data).filter(v => v === true).length;
            progressDiv.innerHTML = `<p>✅ ${completedCount} requirements completed</p>`;
        } else {
            progressDiv.innerHTML = '<p>No progress yet</p>';
        }
    } catch (error) {
        progressDiv.innerHTML = '<p>Error loading</p>';
    }
}

loadScouts();
