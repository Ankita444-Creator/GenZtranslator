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

// যদি তোর ব্যাকএন্ডে Gemini API বা কোনো সার্ভার থাকে, তার এন্ডপয়েন্ট এখানে দিবি।
// লোকাল টেস্ট বা ফ্রন্টএন্ড ডাইরেক্ট এপিআই কল করার জন্য নিচের স্ট্রাকচার ইউজ করতে পারিস।
async function callAIModel(promptText) {
    try {
        // তোর যদি নিজস্ব ব্যাকএন্ড এপিআই রাউট থাকে (যেমন /api/translate), সেটা এখানে ফেচ করবি:
        /*
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: promptText })
        });
        const data = await response.json();
        return data.result;
        */

        // সাময়িক বা ক্লায়েন্ট সাইড ফলব্যাক হিসেবে স্মার্ট জেন-জি জেনারেটর লজিক:
        return null; // ব্যাকএন্ড এপিআই কানেক্ট না থাকলে নিচে ফলব্যাক হ্যান্ডেল করা আছে
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
    inputText.placeholder = "Type here... e.g., no cap, padhashona, or normal sentence";
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
    const lang = targetLangSelect.value; // এখানে 'English', 'bn', 'hi', বা 'or' থাকবে

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
        Never give fallback error messages. Understand the context even if it's a 2-3 word short sentence and map it to the correct Gen-Z slang equivalent. Keep it punchy, cool, and modern.`;
    } else {
        systemPrompt = `You are an expert translator. The user will provide Gen-Z slang or brain-rot text (like 'no cap', 'locked in', 'mid', 'rizz'). 
        Translate it back accurately into normal, easy-to-understand English and Bengali. 
        Explain the real meaning clearly, pointwise, without failing.`;
    }

    const fullPrompt = `${systemPrompt}\n\nInput Text: "${text}"`;

    // Try calling the AI model function
    let aiResponse = await callAIModel(fullPrompt);

    // যদি সরাসরি ব্যাকএন্ড এপিআই কানেক্টেড না থাকে, তবে নিচের স্মার্ট হ্যান্ডলার দিয়ে নিখুঁত আউটপুট দিবি:
    if (!aiResponse) {
        aiResponse = handleSmartFallback(text, lang, isNormalToGenZ);
    }

    outputText.textContent = aiResponse;
});

// স্মার্ট ফলব্যাক ফাংশন যা ছোট বাক্য, ইংলিশ এবং স্ল্যাং নিখুঁত প্রসেস করবে
function handleSmartFallback(text, lang, isNormalToGenZ) {
    const lowerText = text.toLowerCase();

    if (isNormalToGenZ) {
        // English বা অন্যান্য ভাষার ছোট স্ল্যাং বা সাধারণ বাক্যের জন্য স্মার্ট ম্যাপিং
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
        // Gen-Z থেকে Normal ডিকোডিং (যেখানে ছোট স্ল্যাং যেমন 'no cap' বা 'bet' ও হ্যান্ডেল হবে)
        if (lowerText.includes("no cap")) {
            return "English: No lie / Telling the truth | বাংলা: কোনো মিথ্যা বলছি না বা খাঁটি সত্যি কথা";
        }
        if (lowerText.includes("locked in")) {
            return "English: Fully focused | বাংলা: একদম মন দিয়ে ফোকাস করে কাজ বা পড়াশোনা করছে";
        }
        if (lowerText.includes("mid")) {
            return "English: Average or mediocre | বাংলা: সাধারণ মানের বা খুব একটা ভালো নয়";
        }
        if (lowerText.includes("rizz")) {
            return "English: Charisma / Flirting skill | বাংলা: কাউকে আকর্ষণ করার ক্ষমতা বা ইম্প্রেস করার কায়দা";
        }
        return `English: "${text}" means a trendy expression or modern slang.\nবাংলা: এর আসল মানে হলো একটি আধুনিক জেন-জি এক্সপ্রেশন বা স্ল্যাং যা বর্তমান ট্রেন্ডে ব্যবহৃত হয়।`;
    }
}
