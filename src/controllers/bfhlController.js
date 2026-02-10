const { getFibonacci, filterPrimes, getHCF, getLCM } = require('../utils/mathLogic');
const { getAIResponse } = require('../utils/aiLogic');

const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || "your_email@chitkara.edu.in";

const handleBFHL = async (req, res) => {
    try {
        const body = req.body;
        const keys = Object.keys(body);

        // --- STRICT INPUT VALIDATION ---

        // 1. Exactly 1 Key Rule
        if (keys.length !== 1) {
            return res.status(400).json({
                is_success: false,
                official_email: OFFICIAL_EMAIL,
                error: "Invalid input: Request body must contain exactly one key."
            });
        }

        const key = keys[0];
        let result;

        // 2. Dispatch Logic
        switch (key) {
            case 'fibonacci':
                result = getFibonacci(body[key]);
                break;
            case 'prime':
                result = filterPrimes(body[key]);
                break;
            case 'lcm':
                result = getLCM(body[key]);
                break;
            case 'hcf':
                result = getHCF(body[key]);
                break;
            case 'AI':
                result = await getAIResponse(body[key]);
                break;
            default:
                return res.status(400).json({
                    is_success: false,
                    official_email: OFFICIAL_EMAIL,
                    error: "Invalid key. Allowed keys: fibonacci, prime, lcm, hcf, AI"
                });
        }

        // --- SUCCESS RESPONSE ---
        return res.status(200).json({
            is_success: true,
            official_email: OFFICIAL_EMAIL,
            data: result
        });

    } catch (error) {
        // --- ERROR RESPONSE (Graceful handling of logic errors) ---
        return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: error.message || "An error occurred processing your request."
        });
    }
};

const handleHealth = (req, res) => {
    return res.status(200).json({
        is_success: true,
        official_email: OFFICIAL_EMAIL
    });
};

module.exports = { handleBFHL, handleHealth };
