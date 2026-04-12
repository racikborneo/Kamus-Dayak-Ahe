/* =========================
   ROOT THEME
========================= */
:root {
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --bg: #f8fafc;
    --card: #ffffff;
    --text-main: #1e293b;
    --text-muted: #64748b;
    --chat-ai: #f1f5f9;
    --chat-user: #6366f1;
    --shadow: 0 4px 12px -2px rgba(0,0,0,0.05);
}

.dark-mode {
    --bg: #0f172a;
    --card: #1e293b;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --chat-ai: #334155;
    --shadow: 0 10px 15px -3px rgba(0,0,0,0.3);
}

/* =========================
   RESET
========================= */
* {
    box-sizing: border-box;
    transition: background 0.3s, color 0.3s;
}

body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background: var(--bg);
    color: var(--text-main);
    height: 100dvh;
    overflow: hidden;
}

/* =========================
   APP LAYOUT
========================= */
.app-shell {
    max-width: 650px;
    width: 100%;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: var(--card);
    box-shadow: var(--shadow);
}

/* =========================
   HEADER
========================= */
.main-header {
    padding: 1rem 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.05);
}

.brand h1 {
    font-size: 1.1rem;
    margin: 0;
    font-weight: 700;
    color: var(--primary);
}

.status {
    font-size: 0.75rem;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 6px;
}

.dot {
    width: 7px;
    height: 7px;
    background: #10b981;
    border-radius: 50%;
}

/* =========================
   CHAT AREA
========================= */
.chat-viewport {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    scroll-behavior: smooth;
}

/* CHAT BUBBLE */
.chat-bubble {
    max-width: 85%;
    padding: 0.75rem 1rem;
    border-radius: 1.2rem;
    font-size: 0.95rem;
    line-height: 1.4;
    word-break: break-word;
}

.chat-bubble.ai {
    background: var(--chat-ai);
    align-self: flex-start;
    border-bottom-left-radius: 4px;
}

.chat-bubble.user {
    background: var(--chat-user);
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
}

/* =========================
   INPUT AREA
========================= */
.input-container {
    padding: 0.8rem;
    background: var(--card);
    border-top: 1px solid rgba(0,0,0,0.05);
    position: sticky;
    bottom: 0;
}

.input-wrapper {
    display: flex;
    gap: 0.6rem;
    background: var(--chat-ai);
    padding: 0.4rem;
    border-radius: 999px;
    align-items: center;
}

input {
    flex: 1;
    border: none;
    background: transparent;
    padding: 0.6rem 0.9rem;
    outline: none;
    color: var(--text-main);
    font-size: 1rem;
    min-width: 0;
}

/* SEND BUTTON */
#sendBtn {
    background: var(--primary);
    color: white;
    border: none;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

#sendBtn svg {
    width: 18px;
    height: 18px;
}

/* =========================
   SUGGESTIONS
========================= */
.suggestion-bar {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding: 0.4rem 0 0.6rem;
    scrollbar-width: none;
}

.suggestion-bar::-webkit-scrollbar {
    display: none;
}

.suggestion-bar div {
    background: var(--chat-ai);
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 0.8rem;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0.05);
}

/* =========================
   ICON BUTTON
========================= */
.icon-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
}

.icon-btn svg {
    width: 22px;
    height: 22px;
}

/* =========================
   INSTALL BANNER
========================= */
.install-banner {
    background: var(--primary);
    color: white;
    padding: 0.8rem 1rem;
    display: none;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    gap: 10px;
}

.install-banner button {
    background: white;
    color: var(--primary);
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    font-weight: 600;
    flex-shrink: 0;
}

/* =========================
   SWIFT ALERT
========================= */
.swiftalert-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.swiftalert-box {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    max-width: 320px;
    width: 90%;
    text-align: center;
}

.swiftalert-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.swiftalert-text {
    font-size: 14px;
    margin-bottom: 20px;
    color: #333;
}

.swiftalert-btn {
    background: #2563eb;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 18px;
    cursor: pointer;
}

/* =========================
   RESPONSIVE DESIGN
========================= */

/* 📱 small phones */
@media (max-width: 360px) {
    .chat-bubble {
        font-size: 0.9rem;
        max-width: 90%;
    }

    input {
        font-size: 0.95rem;
    }

    .brand h1 {
        font-size: 1rem;
    }
}

/* 📱 normal phones */
@media (max-width: 480px) {
    .app-shell {
        max-width: 100%;
        box-shadow: none;
    }

    .chat-viewport {
        padding: 0.8rem;
    }
}

/* 📲 tablets */
@media (min-width: 768px) {
    .app-shell {
        max-width: 720px;
    }

    .chat-bubble {
        font-size: 1rem;
    }
}

/* 💻 desktop */
@media (min-width: 1024px) {
    .app-shell {
        max-width: 800px;
    }

    .chat-viewport {
        padding: 1.5rem;
    }
}

/* 🖥 large screen */
@media (min-width: 1440px) {
    .app-shell {
        max-width: 900px;
    }
}
