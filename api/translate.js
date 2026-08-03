export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { text, lang, isNormalToGenZ } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Server API key not configured' });
    }

    let systemPrompt = "";
    if (isNormalToGenZ) {
        systemPrompt = `You are an expert Gen-Z slang translator and brain-rot creator. Translate the given text into pure, authentic, high-energy Gen-Z slang. Make it punchy, use relevant emojis (💀, 😭, 🔥, 🗿), and keep it clean and readable with line breaks if it's long. Return only the translated text, no extra labels.`;
    } else {
        systemPrompt = `You are an expert Gen-Z decoder. Translate the given Gen-Z slang text or word into simple, normal English, but format it cleanly. 
        Structure your response clearly with spacing like this:
        - Meaning: [Clear, punchy explanation]
        - Vibe Check: [A fun 1-line vibe description]
        Do not output a messy single block of text. Use proper line breaks and keep it engaging.`;
    }

    const fullPrompt = `${systemPrompt}\n\nTarget Language: ${lang}\nInput Text: "${text}"`;

    try {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
        
        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: fullPrompt }] }]
            })
        });

        const data = await apiResponse.json();
        
        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
            return res.status(200).json({ result: data.candidates[0].content.parts[0].text.trim() });
        } else {
            console.error("Gemini API Error Response:", JSON.stringify(data));
            return res.status(500).json({ error: data.error?.message || 'AI generation failed' });
        }
    } catch (error) {
        console.error("Fetch Catch Error:", error);
        return res.status(500).json({ error: 'Network error connecting to AI' });
    }
}
