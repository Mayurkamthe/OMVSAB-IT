import { useState, useRef, useEffect, useCallback } from "react";

// Compact system prompt to save tokens
const SYSTEM_PROMPT = `You are OMVA, AI assistant for OMVSAB IT Solutions, Pune.
Services: Software/Web/Mobile Dev, UI/UX, Cloud, IT Consulting.
Internship: 3-month tracks (Full Stack, Mobile, Java, UI/UX), live projects, certificates, placement help.
Placement: 1000+ placed, 92% rate, avg ₹4.5 LPA, top companies: TCS, Infosys, Wipro, Accenture, HCL.
Stats: 200+ projects, 50+ clients. Contact: +91 98765 43210 | info@omvsab.com | Pune.
Rules: Be concise and warm. For pricing/dates direct to team. End with a helpful follow-up offer.`;

const MAX_HISTORY = 6; // last 3 pairs only

const MicIcon = ({ active }) => (
  <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);
const SendIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);
const SpeakerIcon = ({ active }) => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {active
      ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
      : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a5 5 0 000 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    }
  </svg>
);
const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const BotIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
  </svg>
);

const QUICK_PROMPTS = [
  "Tell me about internships",
  "What services do you offer?",
  "How is the placement record?",
  "How do I contact OMVSAB?",
];

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm OMVA, your OMVSAB IT Solutions assistant 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [pulseBtn, setPulseBtn] = useState(true);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const inputRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  useEffect(() => { const t = setTimeout(() => setPulseBtn(false), 5000); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.continuous = false; r.interimResults = false; r.lang = "en-IN";
    r.onresult = (e) => { setInput(e.results[0][0].transcript); setListening(false); };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    recognitionRef.current = r;
  }, []);

  const speak = useCallback((text) => {
    if (!voiceEnabled) return;
    synthRef.current.cancel();
    const utter = new SpeechSynthesisUtterance(text.replace(/[*_`#]/g, ""));
    utter.lang = "en-IN"; utter.rate = 1.0; utter.pitch = 1.1;
    const voices = synthRef.current.getVoices();
    const v = voices.find(v => v.lang.startsWith("en") && v.name.toLowerCase().includes("female"))
      || voices.find(v => v.lang.startsWith("en-IN")) || voices.find(v => v.lang.startsWith("en"));
    if (v) utter.voice = v;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    synthRef.current.speak(utter);
  }, [voiceEnabled]);

  const stopSpeaking = () => { synthRef.current.cancel(); setSpeaking(false); };
  const toggleVoice = () => { if (voiceEnabled) stopSpeaking(); setVoiceEnabled(v => !v); };
  const toggleMic = () => {
    if (!recognitionRef.current) return;
    if (listening) { recognitionRef.current.stop(); setListening(false); }
    else { recognitionRef.current.start(); setListening(true); }
  };

  const sendMessage = useCallback(async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput("");
    const userMsg = { role: "user", content: userText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    // Only send last MAX_HISTORY messages to save tokens
    const historyToSend = newMessages.slice(-MAX_HISTORY).map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001", // Haiku: faster + cheaper
          max_tokens: 300,                     // shorter, focused replies
          system: SYSTEM_PROMPT,
          messages: historyToSend,
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't process that. Please try again!";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      speak(reply);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Oops! Something went wrong. Contact us at info@omvsab.com." }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, speak]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-all duration-300 ${pulseBtn && !open ? "animate-bounce" : ""}`}
        aria-label="Open AI Chat"
      >
        {open ? <CloseIcon /> : <BotIcon />}
        {!open && pulseBtn && <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />}
      </button>

      {/* Chat Panel — full-width on mobile, fixed width on desktop */}
      <div
        className={`fixed z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col transition-all duration-300 origin-bottom-right
          bottom-20 right-2 left-2
          sm:bottom-24 sm:right-6 sm:left-auto sm:w-[360px]
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"}`}
        style={{ maxHeight: "calc(100vh - 100px)", height: "520px" }}
      >
        {/* Header */}
        <div className="bg-secondary rounded-t-2xl px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center"><BotIcon /></div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-secondary" />
            </div>
            <div>
              <div className="text-white font-heading font-semibold text-sm">OMVA AI Assistant</div>
              <div className="text-gray-400 text-xs">Powered by Claude AI</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleVoice} title={voiceEnabled ? "Disable voice" : "Enable voice"}
              className={`p-2 rounded-lg transition-colors ${voiceEnabled ? "bg-primary text-white" : "bg-white bg-opacity-10 text-gray-400 hover:text-white"}`}>
              <SpeakerIcon active={speaking} />
            </button>
            <button onClick={() => setOpen(false)} className="p-2 rounded-lg bg-white bg-opacity-10 text-gray-400 hover:text-white transition-colors">
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
              {m.role === "assistant" && (
                <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                  </svg>
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-primary text-white rounded-tr-sm"
                  : "bg-white text-gray-700 border border-gray-100 rounded-tl-sm shadow-sm"
              }`}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start gap-2">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                </svg>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-1.5 items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto shrink-0">
            {QUICK_PROMPTS.map((q) => (
              <button key={q} onClick={() => sendMessage(q)}
                className="whitespace-nowrap text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-primary hover:text-primary transition-colors shrink-0">
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-3 py-3 border-t border-gray-100 bg-white rounded-b-2xl shrink-0">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-primary transition-colors">
            <button onClick={toggleMic} title={listening ? "Stop" : "Speak"}
              className={`p-1.5 rounded-lg transition-colors shrink-0 ${listening ? "bg-red-500 text-white animate-pulse" : "text-gray-400 hover:text-primary"}`}>
              <MicIcon active={listening} />
            </button>
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder={listening ? "Listening..." : "Ask me anything..."}
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none min-w-0" />
            <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
              className="p-1.5 bg-primary text-white rounded-lg hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0">
              <SendIcon />
            </button>
          </div>
          <p className="text-center text-gray-400 text-xs mt-1.5">
            {voiceEnabled ? "🔊 Voice replies on" : "Click 🔊 to enable voice replies"}
          </p>
        </div>
      </div>
    </>
  );
}
