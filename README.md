# BFHL Advanced Backend (Node.js + Express)

A robust, high-performance API backend designed with strict compliance rules, featuring complex mathematical logic and real-time AI integration using the **Gemini 2.5 Flash** model.

## 🚀 Key Features

- **Multi-Logic Processing**: Single endpoint handling for Fibonacci, Prime filtering, LCM, and HCF calculations.
- **Dynamic AI Integration**: Real-time natural language processing via Google's Gemini AI.
- **Strict JSON Contract**: Predictable response structure for both success and error states.
- **Fail-Safe Architecture**: Global error handling ensures the server never crashes, even with invalid inputs.
- **Scalable Design**: Built on Express.js with a modular structure for easy maintenance.

---

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **AI Engine**: Google Generative AI (Gemini 2.5 Flash)
- **Environment**: Dotenv for secure configuration
- **Middleware**: CORS enabled for cross-platform integration

---

## 📦 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Configuration
Create a `.env` file in the root directory and add your credentials:
```env
PORT=3000
OFFICIAL_EMAIL=lkbassnation@gmail.com
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run the Server
Launch the application:
```bash
npm start
```
The server will start on `http://localhost:3000`.

---

## 🛤️ API Documentation

### 1. Health Status
**Endpoint**: `GET /health`  
Used to verify the API status and deployment.

**Sample Response**:
```json
{
  "is_success": true,
  "official_email": "lkbassnation@gmail.com"
}
```

### 2. Multi-Logic Utility
**Endpoint**: `POST /bfhl`  
The core utility endpoint. It accepts exactly one key in the request body.

| Key | Description | Input Format |
|---|---|---|
| `fibonacci` | Generates n terms of Fibonacci series | `{"fibonacci": 10}` |
| `prime` | Filters prime numbers from an array | `{"prime": [1, 2, 3, 4, 5]}` |
| `lcm` | Calculates Least Common Multiple | `{"lcm": [12, 18, 24]}` |
| `hcf` | Calculates Highest Common Factor | `{"hcf": [24, 36]}` |
| `AI` | Returns a single-word AI response | `{"AI": "Capital of India?"}` |

**Success Response Format**:
```json
{
  "is_success": true,
  "official_email": "lkbassnation@gmail.com",
  "data": <RESULT_DATA>
}
```

---

## 🧪 Testing

### Automated Test
Run the built-in verification script to check all rules simultaneously:
```bash
node verify_project.js
```

### Manual Test (Postman)
1. Import the `postman_collection.json` provided in the root folder.
2. Select the desired request and click **Send**.

---

## 👤 Author
**Lakshya**  
GitHub: [Lakshya4392](https://github.com/Lakshya4392)  
Email: [lkbassnation@gmail.com](mailto:lkbassnation@gmail.com)

---

## 🌍 Vercel Deployment Guide

### 1. Manual Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Add Environment Variables in Vercel Dashboard:
   - `OFFICIAL_EMAIL`: `lkbassnation@gmail.com`
   - `GEMINI_API_KEY`: `your_key_here`
   - `NODE_ENV`: `production`

### 2. GitHub Deployment (Recommended)
1. Push this code to a **Public GitHub Repo**.
2. Go to [Vercel](https://vercel.com) and click **"New Project"**.
3. Import your repo.
4. Correct the **Environment Variables** in the settings.
5. Click **Deploy**.
