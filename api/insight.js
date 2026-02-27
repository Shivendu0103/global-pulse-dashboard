import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the SDK with the securely stored secret key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { year, co2Value } = req.body;

        if (!year || !co2Value) {
            return res.status(400).json({ error: 'Missing year or co2Value in request body' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are an expert environmental data analyst for the Global Pulse Dashboard. 
Provide a concise, objective, and evidence-based insight (max 40 words) for the global status in the year ${year} when the Atmospheric CO2 was ${co2Value} ppm. 
Focus strictly on the scientific / socio-economic context of the data. Do not use conversational filler, avoid introductory clauses like "In [Year],", and get straight to the fact.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        return res.status(200).json({ insight: responseText.trim() });
    } catch (error) {
        console.error("AI Insight Engine Error:", error);
        return res.status(500).json({ error: 'Failed to generate insight.' });
    }
}
