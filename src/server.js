require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { handleBFHL, handleHealth } = require('./controllers/bfhlController');

const app = express();
const PORT = process.env.PORT || 3000;
const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || "your_email@chitkara.edu.in";

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', handleHealth);
app.post('/bfhl', handleBFHL);

// 405 Method Not Allowed Handler for defined routes
app.all('/health', (req, res) => {
    res.status(405).json({
        is_success: false,
        official_email: OFFICIAL_EMAIL,
        error: "Method Not Allowed. Use GET."
    });
});

app.all('/bfhl', (req, res) => {
    res.status(405).json({
        is_success: false,
        official_email: OFFICIAL_EMAIL,
        error: "Method Not Allowed. Use POST."
    });
});

// 404 Not Found Handler (Unknown Routes)
app.use((req, res, next) => {
    res.status(404).json({
        is_success: false,
        official_email: OFFICIAL_EMAIL,
        error: "Route not found."
    });
});

// Global Error Handler (CRITICAL: Prevents Crashing)
app.use((err, req, res, next) => {
    console.error("Global Error:", err.stack);

    // Check for JSON parse errors (common in strict validation)
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: "Invalid JSON format."
        });
    }

    res.status(500).json({
        is_success: false,
        official_email: OFFICIAL_EMAIL,
        error: "Internal Server Error. The server handled this gracefully."
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
