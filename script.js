const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const suggestionsBox = document.getElementById('suggestions');
const themeToggle = document.getElementById('themeToggle');
const installBanner = document.getElementById('installBanner');
const installBtn = document.getElementById('installBtn');

let kamus = {
    "id-dayak": {},
    "dayak-id": {}
};

let deferredPrompt;

/* =========================
   INIT APP
========================= */
async function initApp() {
    try {
        const res = await fetch('https://raw.githubusercontent.com/racikborneo/kd/main/data-max.json');

        if (!res.ok) throw new Error(res.status);

        const data = await res.json();

        // support 2 kemungkinan struktur JSON
        kamus = data.kamus || data;

        console.log("Kamus loaded:", kamus);

    } catch (e) {
        console.error("Kamus gagal dimuat:", e);

        // fallback aman
        kamus = {
            "id-dayak": {},
            "dayak-id": {}
        };
    }
}

/* =========================
   CHAT BUBBLE
========================= */
function createBubble(text, sender) {
    const div = document.createElement('div');
    div.className = `chat-bubble ${sender}`;
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTo(0, chatBox.scrollHeight);
    return div;
}

/* =========================
   TRANSLATION ENGINE
========================= */
function processTranslation(query) {
    const input = query.toLowerCase().trim();

    let result =
        kamus["id-dayak"]?.[input] ||
        kamus["dayak-id"]?.[input];

    if (!result) {
        const words = input.split(/\s+/);
        let found = false;

        const translated = words.map(w => {
            const t =
                kamus["id-dayak"]?.[w] ||
                kamus["dayak-id"]?.[w];

            if (t) {
                found = true;
                return Array.isArray(t) ? t[0] : t;
            }
            return w;
        });

        if (found) result = translated.join(' ');
    }

    if (Array.isArray(result)) result = result.join(', ');

    return result || `Maaf 🥹, kata "${query}" belum ditemukan.`;
}

/* =========================
   SEND MESSAGE
========================= */
async function handleSend() {
    const val = userInput.value.trim();
    if (!val) return;

    createBubble(val, 'user');
    userInput.value = '';
    suggestionsBox.style.display = 'none';

    const typing = createBubble('...', 'ai');

    setTimeout(() => {
        typing.remove();
        const response = processTranslation(val);
        createBubble(response, 'ai');
    }, 500);
}

/* =========================
   SUGGESTIONS
========================= */
userInput.addEventListener('input', () => {
    const val = userInput.value.toLowerCase().trim();

    suggestionsBox.innerHTML = '';
    if (val.length < 1) return;

    const keys = [
        ...Object.keys(kamus["id-dayak"] || {}),
        ...Object.keys(kamus["dayak-id"] || {})
    ];

    const matches = [...new Set(keys.filter(k => k.includes(val)))].slice(0, 6);

    matches.forEach(m => {
        const item = document.createElement('div');
        item.textContent = m;
        item.onclick = () => {
            userInput.value = m;
            handleSend();
        };
        suggestionsBox.appendChild(item);
    });

    suggestionsBox.style.display = matches.length ? 'flex' : 'none';
});

/* =========================
   UI EVENTS
========================= */
themeToggle.onclick = () =>
    document.body.classList.toggle('dark-mode');

sendBtn.onclick = handleSend;

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});

/* =========================
   PWA INSTALL
========================= */
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

/* =========================
   INIT
========================= */
initApp();

/* =========================
   ALERT
========================= */
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
