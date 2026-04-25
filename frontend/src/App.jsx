import { useState, useRef, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const RobotIcon = () => (
  <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="32" fill="url(#robotBg)" opacity="0.15"/>
    <rect x="18" y="22" width="28" height="22" rx="8" fill="url(#robotHead)"/>
    <circle cx="25" cy="31" r="3.5" fill="white" opacity="0.9"/>
    <circle cx="39" cy="31" r="3.5" fill="white" opacity="0.9"/>
    <circle cx="25" cy="31" r="1.5" fill="#8b5cf6"/>
    <circle cx="39" cy="31" r="1.5" fill="#8b5cf6"/>
    <rect x="26" y="37" width="12" height="3" rx="1.5" fill="white" opacity="0.7"/>
    <rect x="30" y="16" width="4" height="6" rx="2" fill="#a78bfa"/>
    <circle cx="32" cy="15" r="2.5" fill="#d946ef"/>
    <rect x="12" y="28" width="5" height="10" rx="2.5" fill="url(#robotArm)"/>
    <rect x="47" y="28" width="5" height="10" rx="2.5" fill="url(#robotArm)"/>
    <defs>
      <linearGradient id="robotBg" x1="0" y1="0" x2="64" y2="64">
        <stop stopColor="#8b5cf6"/><stop offset="1" stopColor="#d946ef"/>
      </linearGradient>
      <linearGradient id="robotHead" x1="18" y1="22" x2="46" y2="44">
        <stop stopColor="#a78bfa"/><stop offset="1" stopColor="#c084fc"/>
      </linearGradient>
      <linearGradient id="robotArm" x1="0" y1="0" x2="0" y2="10">
        <stop stopColor="#a78bfa"/><stop offset="1" stopColor="#c084fc"/>
      </linearGradient>
    </defs>
  </svg>
);

const SUGGESTED = [
  "ما هي النقاط الرئيسية في هذا المستند؟",
  "لخص المستند في نقاط",
  "ما هي التوصيات المذكورة؟",
  "اشرح أهم الأفكار",
];

const getTime = () => new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });

// Markdown renderer بسيط
const renderMarkdown = (text) => {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Headers
    if (line.startsWith("### ")) return <h4 key={i} className="md-h3">{line.slice(4)}</h4>;
    if (line.startsWith("## ")) return <h3 key={i} className="md-h2">{line.slice(3)}</h3>;
    if (line.startsWith("# ")) return <h2 key={i} className="md-h1">{line.slice(2)}</h2>;
    // Bullet points
    if (line.startsWith("- ") || line.startsWith("* ")) {
      return <div key={i} className="md-bullet">
        <span className="md-dot">◆</span>
        <span>{formatInline(line.slice(2))}</span>
      </div>;
    }
    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const num = line.match(/^(\d+)\./)[1];
      return <div key={i} className="md-numbered">
        <span className="md-num">{num}</span>
        <span>{formatInline(line.replace(/^\d+\.\s/, ""))}</span>
      </div>;
    }
    // Empty line
    if (line.trim() === "") return <div key={i} className="md-spacer" />;
    // Normal paragraph
    return <p key={i} className="md-p">{formatInline(line)}</p>;
  });
};

const formatInline = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i} className="md-code">{part.slice(1, -1)}</code>;
    return part;
  });
};

const UploadSpinner = () => (
  <div className="upload-spinner-wrap">
    <div className="upload-spinner">
      <div className="spinner-ring" />
      <div className="spinner-robot">🤖</div>
    </div>
    <p className="spinner-text">جاري قراءة المستند...</p>
    <div className="spinner-dots">
      <span /><span /><span />
    </div>
  </div>
);

export default function App() {
  const [docId, setDocId] = useState(null);
  const [filename, setFilename] = useState("");
  const [pages, setPages] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [copied, setCopied] = useState(null);
  const fileRef = useRef();
  const chatRef = useRef();

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleFile = async (file) => {
    if (!file || !file.name.endsWith(".pdf")) { setError("الملف يجب أن يكون PDF"); return; }
    setError(""); setUploading(true); setMessages([]); setDocId(null);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch(`${API_URL}/upload`, { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "فشل رفع الملف");
      setDocId(data.doc_id); setFilename(data.filename); setPages(data.pages);
      setMessages([{ role: "assistant", text: `تم رفع **${data.filename}** بنجاح (${data.pages} صفحة) ✅\nاسألني أي شيء عن محتواه!`, time: getTime() }]);
    } catch (e) { setError(e.message); } finally { setUploading(false); }
  };

  const handleAsk = async (question) => {
    const q = question || input.trim();
    if (!q || !docId || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: q, time: getTime() }]);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doc_id: docId, question: q }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "حدث خطأ");
      setMessages(prev => [...prev, { role: "assistant", text: data.answer, time: getTime() }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", text: `❌ ${e.message}`, time: getTime() }]);
    } finally { setLoading(false); }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleClear = () => setMessages([{
    role: "assistant",
    text: "تمت مسح المحادثة ✨ اسألني أي شيء عن المستند!",
    time: getTime()
  }]);

  return (
    <div className="app">
      <header className={`header ${docId ? "header-compact" : ""}`}>
        <div className="header-inner">
          <div className="robot-wrap"><RobotIcon /></div>
          <h1 className="logo-text">Baseera</h1>
          <p className="tagline">بصيرة، ترى ما وراء النص</p>
          {!docId && !uploading && (
            <div className="feature-cards">
              <div className="card"><span>📄</span><span>ارفع أي PDF</span></div>
              <div className="card"><span>💬</span><span>اسأل بالعربي أو الإنجليزي</span></div>
              <div className="card"><span>⚡</span><span>إجابات فورية</span></div>
            </div>
          )}
        </div>
      </header>

      <main className="main">
        {uploading ? (
          <div className="upload-zone" style={{cursor:"default"}}>
            <UploadSpinner />
          </div>
        ) : !docId ? (
          <div
            className={`upload-zone ${dragOver ? "drag-over" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
            onClick={() => fileRef.current.click()}
          >
            <input ref={fileRef} type="file" accept=".pdf" hidden onChange={e => handleFile(e.target.files[0])} />
            <div className="upload-icon">☁️</div>
            <p className="upload-title">اسحب ملفك هنا</p>
            <p className="upload-sub">أو اضغط لاختيار ملف PDF</p>
            <div className="upload-btn">اختر ملف</div>
            {error && <p className="upload-error">{error}</p>}
          </div>
        ) : (
          <div className="chat-container">
            <div className="doc-badge">
              <span className="doc-icon-wrap">📄</span>
              <div className="doc-info">
                <strong>{filename}</strong>
                <span>{pages} صفحة • {messages.filter(m => m.role === "user").length} سؤال</span>
              </div>
              <button className="clear-btn" onClick={handleClear} title="مسح المحادثة">🗑</button>
              <button className="change-doc" onClick={() => { setDocId(null); setMessages([]); }}>✕ تغيير</button>
            </div>

            <div className="messages" ref={chatRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.role}`}>
                  {msg.role === "assistant" && <div className="avatar">🤖</div>}
                  <div className="bubble-wrap">
                    <div className="bubble">
                      {msg.role === "assistant"
                        ? renderMarkdown(msg.text)
                        : msg.text
                      }
                    </div>
                    <div className="msg-footer">
                      <span className="msg-time">{msg.time}</span>
                      {msg.role === "assistant" && (
                        <button className="copy-btn" onClick={() => handleCopy(msg.text, i)}>
                          {copied === i ? "✅ تم النسخ" : "📋 نسخ"}
                        </button>
                      )}
                    </div>
                  </div>
                  {msg.role === "user" && <div className="user-avatar">👤</div>}
                </div>
              ))}
              {loading && (
                <div className="message assistant">
                  <div className="avatar">🤖</div>
                  <div className="bubble-wrap">
                    <div className="bubble typing"><span /><span /><span /></div>
                  </div>
                </div>
              )}
            </div>

            {messages.length <= 1 && !loading && (
              <div className="suggested">
                <p className="suggested-label">أسئلة مقترحة</p>
                <div className="suggested-list">
                  {SUGGESTED.map((q, i) => (
                    <button key={i} className="suggested-btn" onClick={() => handleAsk(q)}>{q}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="input-row">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAsk()}
                placeholder="اسأل عن محتوى المستند..."
                disabled={loading}
              />
              <button onClick={() => handleAsk()} disabled={loading || !input.trim()}>➤</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}