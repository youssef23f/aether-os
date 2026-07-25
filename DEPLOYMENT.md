# ⚙️ DEPLOYMENT.md – Deployment & Setup Guide

## 1. Prerequisites
- Node.js (v18.x or higher)
- Python (v3.10 or higher)
- Vercel CLI (optional for direct deployment)

## 2. Local Environment Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/aether-os.git
   cd aether-os
   ```

2. **Backend Setup (Python Router Engine):**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python main.py
   ```

3. **Frontend Setup (React):**
   ```bash
   cd aether-os
   npm install
   npm run dev
   ```

## 3. Deployment to Vercel

Since the project is structured with serverless routes (`/api`) and static frontend bundles (`/src`), deployment to Vercel is instantaneous via Git Integration:

1. Push your changes to GitHub: `git push origin main`
2. Connect repository to Vercel Dashboard.
3. Add Environment Variables in Vercel project settings:
   - `OPENAI_API_KEY`
   - `LLAMA_API_KEY`
   - `DATABASE_URL`
4. Click **Deploy**.
