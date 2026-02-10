const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key_for_no_crash");

/**
 * Queries Gemini AI for the answer.
 * @param {string} prompt 
 * @returns {Promise<string>} - The single word answer or error.
 */
const getAIResponse = async (prompt) => {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("AI Service Unavailable: API Key missing.");
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(`Answer this question in a SINGLE WORD only. No punctuation. Question: ${prompt}`);
        const response = await result.response;
        const text = response.text();
        return text.trim();
    } catch (error) {
        console.error("AI Error:", error);
        const fs = require('fs');
        fs.writeFileSync('ai_error.log', `Error: ${error.message}\nStack: ${error.stack}`);
        throw new Error("AI Service Unavailable.");
    }
};

module.exports = { getAIResponse };
