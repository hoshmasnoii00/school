// ===== TEKNO HOSH ULTRA UI =====

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("techno-dark");

    // ساخت نور دنبال‌کننده موس
    const light = document.createElement("div");
    light.classList.add("light-cursor");
    document.body.appendChild(light);

    document.addEventListener("mousemove", e => {
        light.style.left = e.clientX + "px";
        light.style.top = e.clientY + "px";
    });

    // تغییر هدر
    const header = document.querySelector(".header");
    header.innerHTML = `
        <div class="logo">⚡ tekno <span>hosh</span></div>
        <div class="controls">
            <button id="themeToggle">🌙</button>
            <button id="langToggle">FA</button>
        </div>
    `;

    // ترجمه
    const translations = {
        fa: {
            placeholder: "پیام خود را بنویسید...",
            send: "ارسال"
        },
        en: {
            placeholder: "Type your message...",
            send: "Send"
        }
    };

    let currentLang = "fa";

    const input = document.querySelector("textarea");
    const sendBtn = document.querySelector("button");

    function updateLanguage() {
        input.placeholder = translations[currentLang].placeholder;
        sendBtn.textContent = translations[currentLang].send;
        document.getElementById("langToggle").textContent =
            currentLang === "fa" ? "EN" : "FA";
    }

    document.getElementById("langToggle").onclick = () => {
        currentLang = currentLang === "fa" ? "en" : "fa";
        updateLanguage();
    };

    updateLanguage();

    // دارک / لایت
    document.getElementById("themeToggle").onclick = () => {
        document.body.classList.toggle("techno-light");
        document.body.classList.toggle("techno-dark");
        document.getElementById("themeToggle").textContent =
            document.body.classList.contains("techno-dark") ? "🌙" : "☀️";
    };

});
