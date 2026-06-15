// Requirements data (from Membership Badge section)
const requirements = [
    {
        id: 1,
        name: "Law and Promise",
        description: "Write clearly with meanings in your Logbook. Know the Scout Law and Promise and their meaning. Talk with your Scout Leader about how you can practice Scout Promise in your daily life."
    },
    {
        id: 2,
        name: "Scout Uniform, Badges and Positions",
        description: "Make appropriate diagrams and notes in your logbook showing the National Membership Badge, World Scout Badge, National Flag, Patrol Badge, Shoulder Patch, Leader Stripes, Unit Badge, Scarves, Woggle, and Temporary Insignia."
    },
    {
        id: 3,
        name: "Knots and Whipping",
        description: "Make diagrams and notes. Demonstrate: Reef Knot, Sheet Bend, Clove Hitch, Bow Line, Round Turn and Two Half Hitches, Sheep Shank. Whip the end of a rope with common whipping."
    },
    {
        id: 4,
        name: "Woodcraft Signs",
        description: "Make diagrams and notes. Know the meaning of woodcraft signs used in Campfire Yarn No. 4 of Scouting for Boys."
    },
    {
        id: 5,
        name: "National Flag, Anthem, Emblem, Tree, Flower",
        description: "Know the composition of the Maldivian National Flag, its meaning, measurements, when to fly, and rules. Sing National Anthem loudly, clearly, correctly. Tell meaning of National Emblem. Know National tree, flower, and why chosen."
    },
    {
        id: 6,
        name: "Scouting History",
        description: "Know world brotherhood — who started it, when, why, growth, milestones. Scouting in Maldives: when started, growth, office bearers, achievements, milestones. Know your Unit's history."
    },
    {
        id: 7,
        name: "Salutes, Signs, Handshake, Scout Staff",
        description: "Know when and how to use: Scout salute, Scout sign, Scout handshake, and the use of the Scout Staff."
    },
    {
        id: 8,
        name: "Dress a Wound",
        description: "Know how to clean a wound and make and apply a clean dressing."
    },
    {
        id: 9,
        name: "Whistle Calls, Silent Signs, Formations",
        description: "Know: Attention, Patrol Leader, Assistant Patrol Leader, The Troop, Dismiss, Distress whistle calls. Silent signs: Forward, Halt, Hurry, Down, Spread out, Assemble, Close up, Turn This Way. Formations: Single rank, Close single rank, U formation, Open column, Close column, Parallel files, Horseshoe, Troop Circle, Dismiss. Flag ceremony, Troop meeting, Group meeting, Patrol meeting, Court of Honour."
    },
    {
        id: 10,
        name: "Re-test Membership",
        description: "The Scouter should make sure the scout is ready for investiture and knows basic knowledge required in the membership badge."
    },
    {
        id: 11,
        name: "Interview by Scouter",
        description: "The Scouter knows the scout's habits, character, capabilities, talks and advises on importance of the Scout Promise."
    },
    {
        id: 12,
        name: "Investiture",
        description: "The most important day. Promise in front of parents, school administration, troop, and well-wishers to keep the Scout Promise."
    }
];

// Load saved progress
function loadProgress() {
    const saved = localStorage.getItem('scoutProgress_Aisha');
    if (saved) {
        return JSON.parse(saved);
    }
    return {};
}

// Save progress
function saveProgress(progress) {
    localStorage.setItem('scoutProgress_Aisha', JSON.stringify(progress));
}

// Render requirements
function renderRequirements() {
    const container = document.getElementById('requirements-list');
    if (!container) return;

    const progress = loadProgress();

    container.innerHTML = requirements.map(req => `
        <div class="requirement-item">
            <div class="requirement-header">
                <input type="checkbox" class="requirement-checkbox" data-id="${req.id}" ${progress[req.id] ? 'checked' : ''}>
                <div class="requirement-title">${req.name}</div>
            </div>
            <div class="requirement-summary">
                ${req.description.substring(0, 150)}${req.description.length > 150 ? '...' : ''}
                <br><br>
                <a href="requirement-detail.html?id=${req.id}" style="color: #d45a7a; text-decoration: none; font-size: 14px;">📖 View full notes →</a>
            </div>
        </div>
    `).join('');

    // Add event listeners to checkboxes
    document.querySelectorAll('.requirement-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const id = parseInt(e.target.dataset.id);
            const newProgress = loadProgress();
            newProgress[id] = e.target.checked;
            saveProgress(newProgress);
        });
    });
}

// Run when page loads
if (document.getElementById('requirements-list')) {
    renderRequirements();
}
