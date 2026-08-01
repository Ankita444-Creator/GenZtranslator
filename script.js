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

translateBtn.addEventListener('click', () => {
    const text = inputText.value.trim();
    const lang = targetLangSelect.value;

    if (!text) {
        outputText.textContent = "Arey kichu toh lekh bhai! 💀";
        return;
    }

    outputText.textContent = "Cooking up the vibe... ⚡";

    setTimeout(() => {
        outputText.textContent = handleSmartTranslation(text, lang, isNormalToGenZ);
    }, 300);
});

function handleSmartTranslation(text, lang, isNormalToGenZ) {
    const lowerText = text.toLowerCase();

    if (isNormalToGenZ) {
        // নরমাল থেকে Gen-Z
        if (lowerText.includes("no cap") || lowerText.includes("mithya na") || lowerText.includes("sotti")) {
            return "No cap fr fr, straight up fax 🧢🔥";
        }
        if (lowerText.includes("good") || lowerText.includes("valo") || lowerText.includes("awesome")) {
            return "Absolute W vibe, cooking hard, main character energy 🐐✨";
        }
        if (lowerText.includes("bad") || lowerText.includes("kharap")) {
            return "Mid af, major L moment, total brain-rot 📉💀";
        }
        if (lowerText.includes("study") || lowerText.includes("porashona")) {
            return "Locked in grinding hard for the exam arc fr fr 📚🗿";
        }
        return `"${text}" — real talk, blud is totally locked in with that sigma energy ngl 💀🔥`;
    } else {
        // Gen-Z থেকে Normal (সঠিক ডিকোড করা মানে)
        if (lowerText.includes("no cap")) {
            return "No lie / Telling the absolute truth.";
        }
        if (lowerText.includes("let him cook")) {
            return "Allow him to do his thing or show his skills without interruption because he is doing a great job.";
        }
        if (lowerText.includes("locked in")) {
            return "Fully focused, dedicated, and working hard towards a goal.";
        }
        if (lowerText.includes("mid")) {
            return "Average or mediocre quality, not impressive at all.";
        }
        if (lowerText.includes("rizz")) {
            return "Natural charisma or charm used to impress someone.";
        }
        if (lowerText.includes("sigma")) {
            return "A cool, independent, self-reliant, and confident person.";
        }
        if (lowerText.includes("bet")) {
            return "An expression of agreement, certainty, or confirmation (Sure / Okay / Deal).";
        }
        if (lowerText.includes("gatekeeping")) {
            return "Withholding information, tips, or trends from others to keep it exclusive.";
        }
        if (lowerText.includes("touching grass")) {
            return "Going outside into the real world away from the internet or screens.";
        }
        if (lowerText.includes("npc energy")) {
            return "Acting like a background video game character with no original thoughts or personality.";
        }
        
        return `"${text}" means a modern internet slang expression used to describe a trendy vibe or attitude.`;
    }
}
