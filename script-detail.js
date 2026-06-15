// Get requirement ID from URL
const urlParams = new URLSearchParams(window.location.search);
const reqId = parseInt(urlParams.get('id'));

// Requirements data (same as in script.js)
const requirements = [
    { id: 1, name: "Law and Promise", description: "Write clearly with meanings in your Logbook. Know the Scout Law and Promise and their meaning. Talk with your Scout Leader about how you can practice Scout Promise in your daily life.\n\n📖 Study points:\n- What does each point of the Scout Law mean to you?\n- Give an example of how you lived the Promise this week.\n- Discuss with your leader what 'Duty to Allah' and 'Duty to Country' mean in daily life." },
    { id: 2, name: "Scout Uniform, Badges and Positions", description: "Make appropriate diagrams and notes in your logbook showing all badges and their positions.\n\n📖 Study points:\n- Draw the National Membership Badge\n- Locate each badge on a uniform diagram\n- Explain what the World Scout Badge represents\n- Know the difference between Unit, National, and Gilwell scarves" },
    { id: 3, name: "Knots and Whipping", description: "Make diagrams and notes. Demonstrate: Reef Knot, Sheet Bend, Clove Hitch, Bow Line, Round Turn and Two Half Hitches, Sheep Shank. Whip the end of a rope with common whipping.\n\n📖 Study points:\n- Practice each knot 5 times\n- Teach a friend one knot\n- Explain when you would use each knot in camping" },
    { id: 4, name: "Woodcraft Signs", description: "Make diagrams and notes. Know the meaning of woodcraft signs used in Campfire Yarn No. 4 of Scouting for Boys.\n\n📖 Study points:\n- Draw 10 woodcraft signs\n- Create a trail using signs for another scout to follow\n- Explain why signs are useful in scouting" },
    { id: 5, name: "National Flag, Anthem, Emblem, Tree, Flower", description: "Know the composition of the Maldivian National Flag, its meaning, measurements, when to fly, and rules. Sing National Anthem loudly, clearly, correctly. Tell meaning of National Emblem. Know National tree, flower, and why chosen.\n\n📖 Study points:\n- Draw and color the Maldivian flag correctly\n- Practice singing the National Anthem\n- Research why the National Tree was chosen" },
    { id: 6, name: "Scouting History", description: "Know world brotherhood — who started it, when, why, growth, milestones. Scouting in Maldives: when started, growth, office bearers, achievements, milestones. Know your Unit's history.\n\n📖 Study points:\n- Learn who Baden-Powell was and why he started Scouting\n- Find out when your unit was founded\n- Interview a senior scout about unit history" },
    { id: 7, name: "Salutes, Signs, Handshake, Scout Staff", description: "Know when and how to use: Scout salute, Scout sign, Scout handshake, and the use of the Scout Staff.\n\n📖 Study points:\n- Practice the Scout salute until natural\n- Demonstrate the left-handed handshake\n- Show 5 uses of the Scout staff" },
    { id: 8, name: "Dress a Wound", description: "Know how to clean a wound and make and apply a clean dressing.\n\n📖 Study points:\n- Practice cleaning a mock wound\n- Demonstrate proper dressing application\n- Explain why cleanliness matters in first aid" },
    { id: 9, name: "Whistle Calls, Silent Signs, Formations", description: "Know whistle calls: Attention, Patrol Leader, Assistant Patrol Leader, The Troop, Dismiss, Distress. Silent signs: Forward, Halt, Hurry, Down, Spread out, Assemble, Close up, Turn This Way. Formations and ceremonies.\n\n📖 Study points:\n- Practice all whistle calls with your patrol\n- Respond correctly to silent signs in a game\n- Participate in a flag ceremony" },
    { id: 10, name: "Re-test Membership", description: "The Scouter should make sure the scout is ready for investiture and knows basic knowledge required in the membership badge.\n\n📖 Study points:\n- Review all membership requirements\n- Ask your leader for a practice interview\n- Be honest about what you need more practice on" },
    { id: 11, name: "Interview by Scouter", description: "The Scouter knows the scout's habits, character, capabilities, talks and advises on importance of the Scout Promise.\n\n📖 Study points:\n- Think about how Scouting has changed you\n- Be ready to share your goals\n- Listen carefully to your leader's advice" },
    { id: 12, name: "Investiture", description: "The most important day. Promise in front of parents, school administration, troop, and well-wishers to keep the Scout Promise.\n\n📖 Study points:\n- Prepare what you will say\n- Invite your family\n- Remember this moment — it's the start of your Scout journey" }
];

const req = requirements.find(r => r.id === reqId);

if (req) {
    document.getElementById('req-title').innerText = req.name;
    document.getElementById('req-content').innerHTML = `<p style="white-space: pre-line;">${req.description}</p>`;
    
    // Load saved notes
    const savedNotes = localStorage.getItem(`notes_Aisha_${reqId}`);
    if (savedNotes) {
        document.getElementById('user-notes').value = savedNotes;
    }
    
    // Save notes
    document.getElementById('save-notes').addEventListener('click', () => {
        const notes = document.getElementById('user-notes').value;
        localStorage.setItem(`notes_Aisha_${reqId}`, notes);
        alert('✓ Notes saved!');
    });
} else {
    document.getElementById('req-title').innerText = 'Requirement not found';
    document.getElementById('req-content').innerHTML = '<p>Sorry, this requirement doesn\'t have notes yet.</p>';
}
