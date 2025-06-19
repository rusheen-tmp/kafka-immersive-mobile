const messagesEl = document.getElementById('messages');
const input      = document.getElementById('userInput');
const keyButton  = document.getElementById('keyButton');
const enterText  = document.getElementById('enterText');

let stage = 0;

/* ---------- Typewriter helpers ---------- */
function typeWriter(text, className = '') {
  return new Promise(resolve => {
    const span = document.createElement('span');
    if (className) span.className = className;
    messagesEl.appendChild(span);

    let i = 0;
    const typeInterval = setInterval(() => {
      span.textContent = text.slice(0, ++i);
      if (i === text.length) {
        clearInterval(typeInterval);
        messagesEl.appendChild(document.createElement('br'));
        messagesEl.scrollTop = messagesEl.scrollHeight;
        resolve();
      }
    }, 35);
  });
}

async function clerkSay(text) {
  await typeWriter('Clerk: ', 'nameClerk');
  await typeWriter(text);
}

async function youSay(text) {
  await typeWriter('You: ', 'nameYou');
  await typeWriter(text);
}

/* ---------- Scripted Conversation ---------- */
const taunts = [
  "Why linger? The door is ajar—step through or step aside.",
  "More words? The castle devours them whole.",
  "Courage fades with every syllable you spill.",
  "Enter, unless your fear prefers these shadows.",
  "Mystery grows impatient. Will you cross the threshold?"
];

async function start() {
  await clerkSay("You've been summoned. Please state your clearance code.");
}
start();

input.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter' && input.value.trim()) {
    const userText = input.value.trim();
    input.value = '';
    await youSay(userText);

    stage++;
    if (stage === 1) {
      await clerkSay("A code? Codes twist inside corridors like smoke. State it again, if you dare.");
    } else if (stage === 2) {
      await clerkSay("Curious… It appears orderly, yet reeks of disorder. One final attempt—prove you belong.");
    } else if (stage === 3) {
      await clerkSay("Very well. Take the key, if your hand won't tremble.");
      activateKey();
    } else {
      // Beyond 3 prompts: taunt with random messages
      const randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
      await clerkSay(randomTaunt);
    }
  }
});

/* ---------- Key Activation ---------- */
function activateKey() {
  keyButton.classList.add('active');
  enterText.classList.add('active');

  keyButton.addEventListener('click', () => {
    // Placeholder navigation – replace with your actual game URL/page.
    alert('Entering the Castle... (replace this with your navigation)');
  });
}
