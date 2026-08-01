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

// এখানে তোর নতুন এপিআই কি টা বসিয়ে দে
const GEMINI_API_KEY = "YOUR_NEW_API_KEY_HERE"; 

modeNormalToGenZBtn.addEventListener('click', () => {
    isNormalToGenZ = true;
    modeNormalToGenZBtn.classList.add('active-mode');
    modeGenZToNormalBtn.classList.remove('active-mode');
    langWrapper.style.display = 'flex';
    inputLabel.textContent = "Enter Normal Text:";
    outputLabel.textContent = "Gen-Z Output:";
    inputText.placeholder = "Type here... e.g., পড়াশোনা, no cap";
});

modeGenZToNormalBtn.addEventListener('click', () => {
    isNormalToGenZ = false;
    modeGenZToNormalBtn.classList.add('active-mode');
    modeNormalToGenZBtn.classList.remove('active-mode');
    langWrapper.style.display = 'none';
    inputLabel.textContent = "Enter Gen-Z Slang Text:";
    outputLabel.textContent = "Decoded Normal Output:";
    inputText.placeholder = "Type here... e.g., No cap, let him cook";
});

translateBtn.addEventListener('click', async () => {
    const text = inputText.value.trim();
    const lang = targetLangSelect.value;

    if (!text) {
        outputText.textContent = "Arey kichu toh lekh bhai! 💀";
        return;
    }

    if (GEMINI_API_KEY === "YOUR_NEW_API_KEY_HERE" || !GEMINI_API_KEY) {
        outputText.textContent = "Error: Please put your valid Gemini API Key! 🛑";
        return;
    }

    outputText.textContent = "Cooking up the vibe... ⚡";

    let systemPrompt = "";
    if (isNormalToGenZ) {
        systemPrompt = `You are an expert Gen-Z slang translator. Translate the given text into pure, authentic Gen-Z slang / brain-rot English. Return only the translated text, nothing else.`;
    } else {
        systemPrompt = `You are an expert translator. Translate the given Gen-Z slang text, phrase, or sentence accurately into simple, normal English only. Explain what it means clearly in normal English. Do not include any other languages like Bengali or Hindi. Return only the clean English explanation.`;
    }

    const fullPrompt = `${systemPrompt}\n\nInput Text: "${text}"`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: fullPrompt }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            let aiOutput = data.candidates[0].content.parts[0].text.trim();
            outputText.textContent = aiOutput;
        } else {
            outputText.textContent = "Couldn't process this vibe right now. Try again! 💀";
        }

    } catch (error) {
        console.error("API Error:", error);
        outputText.textContent = "Network error! Check your internet connection. 🛑";
    }
});
