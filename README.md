# 🔮 Baseera — بصيرة، ترى ما وراء النص

<div align="center">

![Baseera](https://img.shields.io/badge/Baseera-AI%20Document%20Q%26A-8b5cf6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQTEwIDEwIDAgMCAwIDIgMTJhMTAgMTAgMCAwIDAgMTAgMTAgMTAgMTAgMCAwIDAgMTAtMTBBMTAgMTAgMCAwIDAgMTIgMnoiLz48L3N2Zz4=)
![Python](https://img.shields.io/badge/Python-3.14-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.136-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-LLaMA3-FF6B35?style=for-the-badge)

**مساعد ذكي لتحليل وفهم المستندات — ارفع PDF واسأل بالعربي أو الإنجليزي**

[🚀 جربه الآن](#) • [📖 التوثيق](#installation) • [✨ المميزات](#features)

</div>

---

## ✨ المميزات

- 📄 **رفع PDF** — بالسحب والإفلات أو اختيار الملف
- 🤖 **AI ذكي** — مدعوم بـ LLaMA 3.3 عبر Groq API
- 💬 **ثنائي اللغة** — يجاوب بالعربي أو الإنجليزي حسب سؤالك
- ⚡ **إجابات فورية** — استجابة سريعة جداً
- 📋 **نسخ الإجابات** — بزر واحد
- 🗑️ **مسح المحادثة** — بدون فقدان المستند
- 💡 **أسئلة مقترحة** — تساعدك تبدأ فوراً
- 📱 **متوافق مع جميع الأجهزة** — موبايل وتابلت وكمبيوتر
- 🎨 **تصميم عصري** — gradient بنفسجي أنيق مع Glassmorphism

---

## 🛠️ التقنيات المستخدمة

| الجزء | التقنية |
|---|---|
| **Frontend** | React 18 + Vite |
| **Styling** | CSS3 + Glassmorphism |
| **Backend** | Python + FastAPI |
| **AI Model** | LLaMA 3.3 70B via Groq |
| **PDF Processing** | PyMuPDF |
| **HTTP Client** | HTTPX |
| **Deploy Frontend** | Netlify |
| **Deploy Backend** | Render |

---

## 🚀 تشغيل المشروع محلياً

### المتطلبات
- Python 3.10+
- Node.js 18+
- Groq API Key (مجاني) من [console.groq.com](https://console.groq.com)

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
```

```bash
# Windows
$env:GROQ_API_KEY="your_groq_api_key"

# Mac/Linux
export GROQ_API_KEY="your_groq_api_key"
```

```bash
uvicorn main:app --reload
```

Backend يعمل على: `http://localhost:8000`

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend يعمل على: `http://localhost:5173`

---

## 📁 هيكل المشروع

```
baseera/
├── backend/
│   ├── main.py              # FastAPI app + Groq AI integration
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   └── index.css        # Styling
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🌐 Deploy

### Backend → Render
1. ارفعي المشروع على GitHub
2. اذهبي على [render.com](https://render.com) ← New Web Service
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. أضيفي Environment Variable: `GROQ_API_KEY`

### Frontend → Netlify
1. اذهبي على [netlify.com](https://netlify.com) ← Import from GitHub
2. Base directory: `frontend`
3. Build command: `npm run build`
4. Publish directory: `frontend/dist`
5. أضيفي Environment Variable: `VITE_API_URL` = رابط الـ Render

---

## 👩‍💻 المطورة

**Munirah Emad Altaher**

Computer & Communication Analyst | Data Analyst | AI Enthusiast

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/munirah-emad)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github)](https://github.com/munirah1emad)

---

## 📄 الرخصة

MIT License — استخدم وطور بحرية ✨

---

<div align="center">
  صُنع بـ 💜 في المملكة العربية السعودية
</div>