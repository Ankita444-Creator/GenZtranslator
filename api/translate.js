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
        systemPrompt = `You are an expert Gen-Z slang translator. Translate the given text into pure, authentic Gen-Z slang / brain-rot English or match the target language style if requested. Return only the translated text, nothing else.`;
    } else {
        systemPrompt = `You are an expert translator. Translate the given Gen-Z slang text, phrase, or long sentence accurately into simple, normal English or clear natural language. Explain what it means clearly. Return only the clean explanation.`;
    }

    const fullPrompt = `${systemPrompt}\n\nTarget Language: ${lang}\nInput Text: "${text}"`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: fullPrompt }] }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            return res.status(200).json({ result: data.candidates[0].content.parts[0].text.trim() });
        } else {
            return res.status(500).json({ error: 'AI generation failed' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Network error connecting to AI' });
    }
}
