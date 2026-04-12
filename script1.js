const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const suggestionsBox = document.getElementById('suggestions');
const themeToggle = document.getElementById('themeToggle');
const installBanner = document.getElementById('installBanner');
const installBtn = document.getElementById('installBtn');

let kamus = { "id-dayak": {}, "dayak-id": {} };
let deferredPrompt;

/* Initialize
async function initApp() {
    try {
        const res = await fetch('kamus_dayak.json');
        const data = await res.json();
        kamus = data.kamus;
    } catch (e) {
        console.error("Kamus gagal dimuat");
    }
}
*/
let kamus = [];

async function initApp() {
    try {
        const res = await fetch('https://raw.githubusercontent.com/racikborneo/kd/main/data-max.json');

        if (!res.ok) {
            throw new Error(`HTTP error! ${res.status}`);
        }

        const data = await res.json();

        console.log(data); // cek struktur dulu

        kamus = data; // atau data.kamus (tergantung isi JSON)

    } catch (e) {
        console.error("Kamus gagal dimuat:", e);
    }
}


function createBubble(text, sender) {
    const div = document.createElement('div');
    div.className = `chat-bubble ${sender}`;
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTo(0, chatBox.scrollHeight);
    return div;
}

function processTranslation(query) {
    const input = query.toLowerCase().trim();
    // Prioritas 1: Full Match
    let result = kamus["id-dayak"][input] || kamus["dayak-id"][input];
    
    if (!result) {
        // Prioritas 2: Per Kata
        const words = input.split(/\s+/);
        let found = false;
        const translated = words.map(w => {
            const t = kamus["id-dayak"][w] || kamus["dayak-id"][w];
            if (t) { found = true; return Array.isArray(t) ? t[0] : t; }
            return w;
        });
        if (found) result = translated.join(' ');
    }

    if (Array.isArray(result)) result = result.join(', ');
    return result || `Maaf 🥹, kata "${query}" belum di mengerti oleh Nelsen, coba kata lainnya.`;
}

async function handleSend() {
    const val = userInput.value.trim();
    if (!val) return;

    createBubble(val, 'user');
    userInput.value = '';
    suggestionsBox.style.display = 'none';

    // Fake Typing Effect
    const typing = createBubble('...', 'ai');
    
    setTimeout(() => {
        typing.remove();
        const response = processTranslation(val);
        createBubble(response, 'ai');
    }, 800);
}

// Suggestions Logic
userInput.addEventListener('input', () => {
    const val = userInput.value.toLowerCase();
    suggestionsBox.innerHTML = '';
    if (val.length < 1) return;

    const keys = [...Object.keys(kamus["id-dayak"]), ...Object.keys(kamus["dayak-id"])];
    const matches = [...new Set(keys.filter(k => k.includes(val)))].slice(0, 6);

    matches.forEach(m => {
        const item = document.createElement('div');
        item.textContent = m;
        item.onclick = () => { userInput.value = m; handleSend(); };
        suggestionsBox.appendChild(item);
    });
    suggestionsBox.style.display = matches.length ? 'flex' : 'none';
});

// Theme & PWA
themeToggle.onclick = () => document.body.classList.toggle('dark-mode');
sendBtn.onclick = handleSend;
userInput.onkeypress = (e) => e.key === 'Enter' && handleSend();

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBanner.style.display = 'flex';
});

installBtn.onclick = () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt = null;
        installBanner.style.display = 'none';
    }
};

initApp();

// SwiftAlert Custom
function swiftAlert(title, text) {
  const overlay = document.createElement("div");
  overlay.className = "swiftalert-overlay";

  overlay.innerHTML = `
    <div class="swiftalert-box">
      <div class="swiftalert-title">${title}</div>
      <div class="swiftalert-text">${text}</div>
      <button class="swiftalert-btn">OK</button>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector(".swiftalert-btn").onclick = () => {
    overlay.remove();
  };
}
