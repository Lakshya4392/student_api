require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { handleBFHL, handleHealth } = require('../src/controllers/bfhlController');

const app = express();
const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || "lkbassnation@gmail.com";

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.json({ message: "BFHL API is Live", official_email: OFFICIAL_EMAIL }));
app.get('/health', handleHealth);
app.get('/debug', (req, res) => {
    res.json({
        email_set: !!process.env.OFFICIAL_EMAIL,
        ai_key_set: !!process.env.GEMINI_API_KEY,
        node_env: process.env.NODE_ENV
    });
});
app.post('/bfhl', handleBFHL);

// 405/404 handling
app.all('/', (req, res) => res.status(405).json({ is_success: false, official_email: OFFICIAL_EMAIL, error: "Method Not Allowed. Use GET." }));
app.all('/health', (req, res) => res.status(405).json({ is_success: false, official_email: OFFICIAL_EMAIL, error: "Method Not Allowed. Use GET." }));
app.all('/bfhl', (req, res) => res.status(405).json({ is_success: false, official_email: OFFICIAL_EMAIL, error: "Method Not Allowed. Use POST." }));

app.use((req, res) => res.status(404).json({ is_success: false, official_email: OFFICIAL_EMAIL, error: "Route not found." }));

// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ is_success: false, official_email: OFFICIAL_EMAIL, error: "Internal Server Error." });
});

module.exports = app;
