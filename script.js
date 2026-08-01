const modeNormalToGenZBtn = document.getElementById('modeNormalToGenZ');
const modeGenZToNormalBtn = document.getElementById('modeGenZToNormal');
const langWrapper = document.getElementById('langWrapper');
const targetLangSelect = document.getElementById('targetLang');
const inputLabel = document.getElementById('inputLabel');
const outputLabel = document.getElementById('outputLabel');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const translateBtn = document.getElementById('translateBtn');

let isNormalToGenZ = true;

// এপিআই বা ক্লায়েন্ট সাইড ফলব্যাক হ্যান্ডলার
async function callAIModel(promptText) {
    try {
        // তোর নিজস্ব ব্যাকএন্ড এপিআই থাকলে এখানে ফেচ করতে পারিস
        return null; 
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}

modeNormalToGenZBtn.addEventListener('click', () => {
    isNormalToGenZ = true;
    modeNormalToGenZBtn.classList.add('active-mode');
    modeGenZToNormalBtn.classList.remove('active-mode');
    langWrapper.style.display = 'flex';
    inputLabel.textContent = "Enter Normal Text:";
    outputLabel.textContent = "Gen-Z Output:";
    inputText.placeholder = "Type here... e.g., পড়াশোনা, no cap, or English text";
});

modeGenZToNormalBtn.addEventListener('click', () => {
    isNormalToGenZ = false;
    modeGenZToNormalBtn.classList.add('active-mode');
    modeNormalToGenZBtn.classList.remove('active-mode');
    langWrapper.style.display = 'none';
    inputLabel.textContent = "Enter Gen-Z Slang Text:";
    outputLabel.textContent = "Decoded Normal Output:";
    inputText.placeholder = "Type here... e.g., Bro is locked in, no cap";
});

translateBtn.addEventListener('click', async () => {
    const text = inputText.value.trim();
    const lang = targetLangSelect.value; // 'English', 'bn', 'hi', বা 'or'

    if (!text) {
        outputText.textContent = "Arey kichu toh lekh bhai! 💀";
        return;
    }

    outputText.textContent = "Cooking up the vibe... ⚡";

    let systemPrompt = "";

    if (isNormalToGenZ) {
        systemPrompt = `You are an expert Gen-Z and Brain-Rot slang translator. 
        The user will provide text in ${lang} (which can be Normal English, Bengali, Hindi, Odia, a short phrase, or slang like 'no cap', 'bet', 'rizz'). 
        Translate or convert it accurately into pure, authentic Gen-Z slang / brain-rot English. 
        Keep it punchy, cool, and modern.`;
    } else {
        systemPrompt = `You are an expert translator. The user will provide Gen-Z slang or brain-rot text (like 'no cap', 'locked in', 'mid', 'rizz'). 
        Translate it back accurately into simple, normal English only. Do not include any other languages like Bengali or Hindi in the output.`;
    }

    const fullPrompt = `${systemPrompt}\n\nInput Text: "${text}"`;

    let aiResponse = await callAIModel(fullPrompt);

    if (!aiResponse) {
        aiResponse = handleSmartFallback(text, lang, isNormalToGenZ);
    }

    outputText.textContent = aiResponse;
});

// স্মার্ট ফলব্যাক ফাংশন (যেখানে Gen-Z ➔ Normal এ শুধুমাত্র ইংরেজি অর্থ রাখা হয়েছে)
function handleSmartFallback(text, lang, isNormalToGenZ) {
    const lowerText = text.toLowerCase();

    if (isNormalToGenZ) {
        if (lowerText.includes("no cap") || lowerText.includes("mithya na")) {
            return "No cap fr fr, straight up fax 🧢";
        }
        if (lowerText.includes("good") || lowerText.includes("valo")) {
            return "Absolute W vibe, cooking hard fr 🐐";
        }
        if (lowerText.includes("bad") || lowerText.includes("kharap")) {
            return "Mid af, major L moment 📉💀";
        }
        if (lang === "English") {
            return `"${text}" — real talk, blud is locked in with that main character energy fr fr 💀✨`;
        }
        return `"${text}" — absolute brain-rot sigma moment ngl 🗿🔥`;
    } else {
        // Gen-Z থেকে Normal ডিকোডিং (সম্পূর্ণ ইংরেজিতে, কোনো বাংলা নেই)
        if (lowerText.includes("no cap")) {
            return "No lie / Telling the truth";
        }
        if (lowerText.includes("locked in")) {
            return "Fully focused and working hard";
        }
        if (lowerText.includes("mid")) {
            return "Average or mediocre, not that good";
        }
        if (lowerText.includes("rizz")) {
            return "Charisma or charm to impress someone";
        }
        if (lowerText.includes("sigma")) {
            return "A cool, independent, and confident person";
        }
        if (lowerText.includes("bet")) {
            return "Agreement or expression of certainty (Sure / Okay)";
        }
        
        return `"${text}" means a modern slang expression or trendy phrase.`;
    }
}
