// ===== TEKNO HOSH UI & AI (FIXED) =====

const API_URL = "https://api.gapgpt.app/v1/chat/completions";
const MODEL = "gpt-4o";
let API_KEY = "sk-dYCxLxwxD2rzT9NqR9GSSYCx3fRJdpUNejqKsXKTDFpZg2Xa"; // ← api
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const spinner = document.getElementById("loadingSpinner");

let messages = [
    {role:"system", content:"تو یک دستیار مفید و دوستانه هستی."}
];

// تابع تایپ شدن تدریجی پیام
function typeEffect(element, text, speed = 20){
    element.textContent = "";
    let i = 0;
    const interval = setInterval(()=>{
        element.textContent += text[i];
        i++;
        if(i >= text.length) clearInterval(interval);
    }, speed);
}

// نمایش پیام
function addMessage(text, sender){
    const div = document.createElement("div");
    div.className = "message "+(sender==="user"?"user-message":"ai-message");
    const bubble = document.createElement("div");
    bubble.className = "message-content";
    div.appendChild(bubble);
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // فقط برای AI تایپ تدریجی
    if(sender==="assistant") typeEffect(bubble, text);
    else bubble.textContent = text;
}

// ارسال پیام
async function sendMessage(){
    const msg = input.value.trim();
    if(!msg) return;
    addMessage(msg, "user");
    input.value="";
    messages.push({role:"user", content:msg});
    spinner.style.display="block";

    try{
        const res = await fetch(API_URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": Bearer ${API_KEY}
            },
            body: JSON.stringify({
                model: MODEL,
                messages: messages,
                temperature: 0.7
            })
        });
        const data = await res.json();
        const aiMsg = data.choices[0].message.content;
        addMessage(aiMsg, "assistant");
        messages.push({role:"assistant", content:aiMsg});
    }catch(err){
        addMessage("❌ خطا: " + err.message, "assistant");
    } finally {
        spinner.style.display="none";
    }
}

// دکمه ارسال
sendBtn.addEventListener("click", sendMessage);

// ارسال با Enter
input.addEventListener("keydown", e => {
    if(e.key==="Enter" && !e.shiftKey){
        e.preventDefault();
        sendMessage();
    }
});
