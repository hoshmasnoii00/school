// ===== TEKNO HOSH UI & AI =====

const API_URL = "https://api.gapgpt.app/v1/chat/completions"; // لینک GapGPT
const MODEL = "gpt-4o"; // مدل GPT-4
let API_KEY = "sk-dYCxLxwxD2rzT9NqR9GSSYCx3fRJdpUNejqKsXKTDFpZg2Xa"; // <-- api

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const spinner = document.getElementById("loadingSpinner");

let messages = [
    {role:"system", content:"تو یک دستیار مفید و دوستانه هستی."}
];

// تغییر زبان
let currentLang = "fa";
const translations = {
    fa: { placeholder:"پیام خود را بنویسید...", send:"ارسال" },
    en: { placeholder:"Type your message...", send:"Send" }
};

function updateLanguage(){
    input.placeholder = translations[currentLang].placeholder;
    sendBtn.textContent = translations[currentLang].send;
    document.getElementById("langToggle").textContent = currentLang==="fa"?"EN":"FA";
}

document.getElementById("langToggle").onclick = ()=>{
    currentLang = currentLang==="fa"?"en":"fa";
    updateLanguage();
};
updateLanguage();

// دارک/لایت
document.getElementById("themeToggle").onclick = ()=>{
    document.body.classList.toggle("techno-light");
    document.body.classList.toggle("techno-dark");
    document.getElementById("themeToggle").textContent =
        document.body.classList.contains("techno-dark")?"🌙":"☀️";
};

// نمایش پیام
function addMessage(text,sender){
    const div = document.createElement("div");
    div.className = "message "+(sender==="user"?"user-message":"ai-message");
    const bubble = document.createElement("div");
    bubble.className="message-content";
    div.appendChild(bubble);
    messagesDiv.appendChild(div);
    typeEffect(bubble,text);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// تایپ شدن تدریجی
function typeEffect(element,text,speed=20){
    element.textContent="";
    let i=0;
    spinner.style.display="block";
    const interval = setInterval(()=>{
        element.textContent+=text[i];
        i++;
        if(i>=text.length){
            clearInterval(interval);
            spinner.style.display="none";
        }
    },speed);
}

// ارسال پیام
async function sendMessage(){
    const message = input.value.trim();
    if(!message) return;
    addMessage(message,"user");
    input.value="";
    messages.push({role:"user", content:message});

    spinner.style.display="block";

    try{
        const res = await fetch(API_URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":Bearer ${API_KEY}
            },
            body:JSON.stringify({
                model:MODEL,
                messages:messages,
                temperature:0.7
            })
        });
        const data = await res.json();
        const aiMsg = data.choices[0].message.content;
        addMessage(aiMsg,"assistant");
        messages.push({role:"assistant", content:aiMsg});
    }catch(err){
        addMessage("❌ خطا: "+err.message,"assistant");
        spinner.style.display="none";
    }
}

// دکمه و اینتر
sendBtn.addEventListener("click",sendMessage);
input.addEventListener("keydown",e=>{
    if(e.key==="Enter" && !e.shiftKey){
        e.preventDefault();
        sendMessage();
    }
});
