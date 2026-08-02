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

    // ব্রাউজারে এপিআই কি সেভ আছে কিনা চেক করা, না থাকলে ইউজারের কাছে চাওয়া
    let apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
        apiKey = prompt("Enter your Gemini API Key (It will be saved safely in your browser):");
        if (!apiKey) {
            outputText.textContent = "Error: API Key is required to run AI translation! 🛑";
            return;
        }
        localStorage.setItem('gemini_api_key', apiKey.trim());
    }

    outputText.textContent = "Cooking up the vibe with AI... ⚡";

    let systemPrompt = "";
    if (isNormalToGenZ) {
        systemPrompt = `You are an expert Gen-Z slang translator. Translate the given text into pure, authentic Gen-Z slang / brain-rot English or match the target language style if requested. Return only the translated text, nothing else.`;
    } else {
        systemPrompt = `You are an expert translator. Translate the given Gen-Z slang text, phrase, or long sentence accurately into simple, normal English or clear natural language. Explain what it means clearly. Return only the clean explanation.`;
    }

    const fullPrompt = `${systemPrompt}\n\nTarget Language: ${lang}\nInput Text: "${text}"`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
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
            // যদি কি ভুল হয় বা এক্সপায়ার হয়ে যায়, তখন লোকাল স্টোরেজ ক্লিয়ার করে দেবো
            if(data.error) {
                localStorage.removeItem('gemini_api_key');
                outputText.textContent = "Invalid API Key! Please try translating again to enter a valid key. 🛑";
            } else {
                outputText.textContent = "Couldn't process this vibe right now. Try again! 💀";
            }
        }

    } catch (error) {
        console.error("API Error:", error);
        outputText.textContent = "Network error! Check your internet connection. 🛑";
    }
});
