# DocMind — Smart Document Q&A

ارفعي PDF واسأليه بالعربي أو الإنجليزي، يجاوبك الـ AI من محتواه مباشرة.

---

## 🛠️ تشغيل محلي

### Backend

```bash
cd backend
pip install -r requirements.txt
set ANTHROPIC_API_KEY=your_key_here   # Windows
export ANTHROPIC_API_KEY=your_key_here  # Mac/Linux
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

افتحي المتصفح على: http://localhost:5173

---

## 🚀 Deploy

### Backend → Render
1. ارفعي المشروع على GitHub
2. اذهبي على [render.com](https://render.com)
3. New Web Service → اختاري الـ repo
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. أضيفي Environment Variable: `ANTHROPIC_API_KEY`

### Frontend → Netlify
1. اذهبي على [netlify.com](https://netlify.com)
2. Import from GitHub → اختاري الـ repo
3. Base directory: `frontend`
4. Build command: `npm run build`
5. Publish directory: `frontend/dist`
6. أضيفي Environment Variable: `VITE_API_URL` = رابط الـ Render

---

## 🧰 Tech Stack
- **Frontend**: React + Vite + CSS
- **Backend**: Python + FastAPI
- **AI**: Claude API (Anthropic)
- **PDF**: PyMuPDF

---

Built by Munirah — Portfolio Project 2025
