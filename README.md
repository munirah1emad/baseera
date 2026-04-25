# 🔮 Baseera — بصيرة، ترى ما وراء النص

<div align="center">

![Python](https://img.shields.io/badge/Python-3.14-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.136-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-LLaMA3-FF6B35?style=for-the-badge)

**مساعد ذكي لتحليل وفهم المستندات — ارفع PDF واسأل بالعربي أو الإنجليزي**

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

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

---

## 📁 هيكل المشروع

```
baseera/
├── backend/
│   ├── main.py              # FastAPI + Groq AI integration
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
└── README.md
```

---

## 👩‍💻 المطورة

**Munirah Emad Altaher**

Computer & Communication Analyst | Data Analyst | AI Enthusiast

[![LinkedIn](https://img.shields.io/badge/LinkedIn-munirahemad-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/munirahemad/)
[![GitHub](https://img.shields.io/badge/GitHub-munirah1emad-181717?style=flat&logo=github)](https://github.com/munirah1emad)

---

<div align="center">
  صُنع بـ 💜 في المملكة العربية السعودية
</div>