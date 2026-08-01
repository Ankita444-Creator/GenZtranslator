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

// Dictionary mapping for multi-language scripts to Gen-Z Slang
const slangDatabase = {
    bn: {
        "পড়াশোনা": "Bro is locked in studying fr fr 💀",
        "ঘুমাচ্ছি": "Sleeping like a absolute blud 🛌",
        "খাবার": "Bro is cooking and left no crumbs 🍽️",
        "পাগল": "Absolute brain-rot moment ngl 🤡",
        "খারাপ": "Mid af ngl 📉",
        "চমৎকার": "W rizz absolute sigma 🗿",
        "টাকা": "Securing that bag W hustle 💸",
        "বন্ধু": "My absolute twin / Blud 🫂"
    },
    hi: {
        "पढ़ाई": "Bro is locked in studying fr fr 💀",
        "सो रहा हूँ": "Sleeping like a absolute blud 🛌",
        "खाना": "Bro is cooking and left no crumbs 🍽️",
        "पागल": "Absolute brain-rot moment ngl 🤡",
        "बुरा": "Mid af ngl 📉",
        "शानदार": "W rizz absolute sigma 🗿",
        "पैसा": "Securing that bag W hustle 💸",
        "दोस्त": "My absolute twin / Blud 🫂"
    },
    or: {
        "ପଢ଼ିବା": "Bro is locked in studying fr fr 💀",
        "ଶୋଉଛି": "Sleeping like a absolute blud 🛌",
        "ଖାଦ୍ୟ": "Bro is cooking and left no crumbs 🍽️",
        "ପାଗଳ": "Absolute brain-rot moment ngl 🤡",
        "ଖରାପ": "Mid af ngl 📉",
        "ସୁନ୍ଦର": "W rizz absolute sigma 🗿",
        "ଟଙ୍କା": "Securing that bag W hustle 💸",
        "ସାଙ୍ଗ": "My absolute twin / Blud 🫂"
    }
};

// Reverse lookup mapping (Gen-Z to Native languages script)
const reverseDatabase = {
    "locked in": { bn: "মন দিয়ে পড়াশোনা করছে", hi: "पूरा फोकस कर रहा है", or: "ପୂରା ଫୋକସ୍ କରୁଛି" },
    "cooking": { bn: "দারুণ কিছু বানাচ্ছে বা করছে", hi: "बढ़िया काम कर रहा है", or: "ବଢ଼ିଆ କାମ କରୁଛି" },
    "sigma": { bn: "একদম আলফা চ্যাড বা কুল গাই", hi: "अल्टीमेट कूल बंदा", or: "ଟପ୍ କୁଲ୍ ପୁଅ" },
    "brain-rot": { bn: "মাথা নষ্ট করা বা আজব অবাস্তব জিনিস", hi: "दिमाग खराब करने वाली चीज़", or: "ମସ୍ତିଷ୍କ୍ ନଷ୍ଟ ଜିନିଷ" },
    "mid": { bn: "মোটেই ভালো না, সাধারণ মানের", hi: "बिल्कुल औसत या बेकार", or: "ସାଧାରଣ କିମ୍ବା ଖରାପ" },
    "rizz": { bn: "আকর্ষণ করার ক্ষমতা বা পোটেনশিয়াল", hi: "इम्प्रेस करने की गजब कला", or: "ଇମ୍ପ୍ରେସ୍ କରିବାର କଳା" }
};

modeNormalToGenZBtn.addEventListener('click', () => {
    isNormalToGenZ = true;
    modeNormalToGenZBtn.classList.add('active-mode');
    modeGenZToNormalBtn.classList.remove('active-mode');
    langWrapper.style.display = 'flex';
    inputLabel.textContent = "Enter Normal Text:";
    outputLabel.textContent = "Gen-Z Output:";
    inputText.placeholder = "Type here... e.g., পড়াশোনা";
});

modeGenZToNormalBtn.addEventListener('click', () => {
    isNormalToGenZ = false;
    modeGenZToNormalBtn.classList.add('active-mode');
    modeNormalToGenZBtn.classList.remove('active-mode');
    langWrapper.style.display = 'none';
    inputLabel.textContent = "Enter Gen-Z Slang Text:";
    outputLabel.textContent = "Decoded Normal Output:";
    inputText.placeholder = "Type here... e.g., Bro is locked in";
});

translateBtn.addEventListener('click', () => {
    const text = inputText.value.trim();
    const lang = targetLangSelect.value;

    if (!text) {
        outputText.textContent = "Arey kichu toh lekh bhai! 💀";
        return;
    }

    if (isNormalToGenZ) {
        let translated = text;
        const currentDict = slangDatabase[lang] || slangDatabase['bn'];
        
        let found = false;
        for (let key in currentDict) {
            if (text.includes(key)) {
                translated = currentDict[key];
                found = true;
                break;
            }
        }

        if (!found) {
            translated = `"${text}" — blud really said this fr fr 💀 W mindset though 🗿`;
        }
        outputText.textContent = translated;
    } else {
        let translatedText = "Couldn't decode this brain-rot fully, but it sounds epic fr fr 💀";
        const lowerText = text.toLowerCase();

        for (let key in reverseDatabase) {
            if (lowerText.includes(key)) {
                const meanings = reverseDatabase[key];
                translatedText = `বাংলা: ${meanings.bn} | हिन्दी: ${meanings.hi} | ଓଡ଼ିଆ: ${meanings.or}`;
                break;
            }
        }
        outputText.textContent = translatedText;
    }
});
