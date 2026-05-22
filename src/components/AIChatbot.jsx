import React, { useState, useRef, useEffect, useCallback } from "react";
import contact from "../config/contact";

const MAX_HISTORY = 6;

const SYSTEM_PROMPT = `You are OMVA, a proprietary AI assistant developed exclusively by OMVSAB IT Solutions.
NEVER mention OpenAI, Anthropic, Google, Gemini, Claude, or any underlying technology. You are OMVA.
Services: Software/Web/Mobile Dev, UI/UX, Cloud, IT Consulting.
Internship: 3-month tracks (Full Stack, Mobile, Java, UI/UX), live projects, certificates, placement help.
Placement: 1000+ placed, 92% rate, avg ₹4.5 LPA, top companies: TCS, Infosys, Wipro, Accenture, HCL.
Stats: 200+ projects, 50+ clients.
Contact: ${contact.phone} | ${contact.email} | ${contact.location}.
Rules: Be concise, professional, and warm. For pricing/dates, direct them to the team. End with a helpful follow-up offer.`;

const generateOfflineResponse = (input) => {
  const text = input.toLowerCase();
  if (text.includes("internship") || text.includes("intern") || text.includes("training"))
    return `We offer 3-month internship tracks in Full Stack, Mobile, Java, and UI/UX. You'll work on live projects, earn certificates, and receive placement help! Would you like to know about our placement record?`;
  if (text.includes("service") || text.includes("offer") || text.includes("dev") || text.includes("build"))
    return "OMVSAB provides Software, Web, and Mobile Development, UI/UX Design, Cloud Services, and IT Consulting. We've completed 200+ projects for 50+ clients! What kind of project do you have in mind?";
  if (text.includes("placement") || text.includes("job") || text.includes("package") || text.includes("hire"))
    return "Our placement record is stellar: 92% placement rate with 1000+ students placed! Average package is ₹4.5 LPA. Top recruiters include TCS, Infosys, Wipro, Accenture, and HCL.";
  if (text.includes("contact") || text.includes("phone") || text.includes("email") || text.includes("location") || text.includes("where") || text.includes("reach"))
    return `You can reach our team at ${contact.phone} or email us at ${contact.email}. We'd love to hear from you!`;
  if (text.includes("price") || text.includes("cost") || text.includes("fee") || text.includes("date") || text.includes("batch"))
    return `For specific pricing, batch dates, and schedules, please contact our team at ${contact.email}. They will provide the most up-to-date information!`;
  if (text.includes("hi") || text.includes("hello") || text.includes("hey"))
    return "Hello! I'm OMVA. How can I help you with our IT solutions, internships, or placements today?";
  return `Could you rephrase your question? I can help with our services, internships, or contact info. Alternatively, email ${contact.email} and our team will get right back to you.`;
};

// Icons
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
const StatusDot = ({ isOnline }) => (
  <span className="relative flex h-2.5 w-2.5">
    {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />}
    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOnline ? "bg-green-500" : "bg-gray-400"}`} />
  </span>
);

const QUICK_PROMPTS = [
  "Tell me about internships",
  "What services do you offer?",
  "How is the placement record?",
];

const fetchWithRetry = async (url, options, retries = 2) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
};

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm OMVA, your IT assistant. How can I help you today?" },
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
    const up = () => setNetworkStatus(true);
    const down = () => setNetworkStatus(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => { window.removeEventListener("online", up); window.removeEventListener("offline", down); };
  }, []);

  const speak = useCallback((text) => {
    if (!voiceEnabled || !synthRef.current) return;
    synthRef.current.cancel();
    const utter = new SpeechSynthesisUtterance(text.replace(/[*_`#]/g, "").replace(/\n/g, ". "));
    utter.lang = "en-IN"; utter.rate = 1.0; utter.pitch = 1.1;
    const voices = synthRef.current.getVoices();
    const v = voices.find(v => v.lang.startsWith("en") && v.name.toLowerCase().includes("female"))
      || voices.find(v => v.lang.startsWith("en-IN"))
      || voices.find(v => v.lang.startsWith("en"));
    if (v) utter.voice = v;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    synthRef.current.speak(utter);
  }, [voiceEnabled]);

  // Offline fallback — stable, no deps needed
  const executeOfflineFallback = useCallback((userText) => {
    setTimeout(() => {
      const reply = generateOfflineResponse(userText);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      speak(reply);
      setLoading(false);
    }, 400 + Math.random() * 400);
  }, [speak]);

  const handleMessage = useCallback(async (textOverride) => {
    const userText = (textOverride !== undefined ? textOverride : input).trim();
    if (!userText || loading) return;
    setInput("");
    const newHistory = [...messages, { role: "user", content: userText }];
    setMessages(newHistory);
    setLoading(true);

    if (!networkStatus) {
      executeOfflineFallback(userText);
      return;
    }

    try {
      const historyToSend = newHistory.slice(-MAX_HISTORY).map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));
      const data = await fetchWithRetry(
        `https://api.anthropic.com/v1/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 300,
            system: SYSTEM_PROMPT,
            messages: newHistory.slice(-MAX_HISTORY).map(m => ({ role: m.role, content: m.content })),
          }),
        }
      );
      const reply = data.content?.[0]?.text || "Sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      speak(reply);
      setLoading(false);
    } catch {
      executeOfflineFallback(userText);
    }
  }, [input, loading, messages, networkStatus, speak, executeOfflineFallback]);

  // Speech recognition — uses handleMessage, re-init when it changes
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.continuous = false; r.interimResults = false; r.lang = "en-IN";
    r.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
      handleMessage(transcript);
    };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    recognitionRef.current = r;
  }, [handleMessage]);

  const stopSpeaking = () => { synthRef.current.cancel(); setSpeaking(false); };
  const toggleVoice = () => { if (voiceEnabled) stopSpeaking(); setVoiceEnabled(v => !v); };
  const toggleMic = () => {
    if (!recognitionRef.current) return;
    if (listening) { recognitionRef.current.stop(); setListening(false); }
    else { recognitionRef.current.start(); setListening(true); }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleMessage(); }
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI Assistant"
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:bg-orange-600 hover:scale-105 transition-all duration-300 ${pulseBtn && !open ? "animate-bounce" : ""}`}
      >
        {open ? <CloseIcon /> : <BotIcon />}
        {!open && pulseBtn && <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col transition-all duration-300 origin-bottom-right
          bottom-20 right-2 left-2
          sm:bottom-24 sm:right-6 sm:left-auto sm:w-[380px]
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"}`}
        style={{ maxHeight: "calc(100vh - 100px)", height: "560px" }}
      >
        {/* Header */}
        <div className="bg-secondary rounded-t-2xl px-4 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shrink-0">
              <BotIcon />
            </div>
            <div>
              <div className="text-white font-semibold text-sm flex items-center gap-2">
                OMVA Assistant <StatusDot isOnline={networkStatus} />
              </div>
              <div className="text-gray-400 text-xs mt-0.5">
                {networkStatus ? "Always here to help" : "Operating in local mode"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleVoice} aria-label="Toggle Voice"
              className={`p-2 rounded-xl transition-colors ${voiceEnabled ? "bg-primary text-white" : "bg-white bg-opacity-10 text-gray-400 hover:text-white"}`}>
              <SpeakerIcon active={speaking} />
            </button>
            <button onClick={() => setOpen(false)} aria-label="Close" className="p-2 rounded-xl bg-white bg-opacity-10 text-gray-400 hover:text-white transition-colors">
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2.5`}>
              {m.role === "assistant" && (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                  </svg>
                </div>
              )}
              <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-primary text-white rounded-tr-sm"
                  : "bg-white text-gray-800 border border-gray-100 rounded-tl-sm shadow-sm"
              }`}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start gap-2.5">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                </svg>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-5 py-3.5 shadow-sm flex gap-1.5 items-center">
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
          <div className="px-4 py-2.5 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto shrink-0">
            {QUICK_PROMPTS.map((q) => (
              <button key={q} onClick={() => handleMessage(q)}
                className="whitespace-nowrap text-xs bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-primary hover:text-primary transition-colors shrink-0">
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 pt-3 pb-3 border-t border-gray-100 bg-white rounded-b-2xl shrink-0">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-primary focus-within:bg-white transition-all">
            <button onClick={toggleMic} aria-label="Microphone"
              className={`p-1.5 rounded-lg transition-colors shrink-0 ${listening ? "bg-red-500 text-white animate-pulse" : "text-gray-400 hover:text-primary"}`}>
              <MicIcon active={listening} />
            </button>
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
              aria-label="Chat input"
              placeholder={listening ? "Listening..." : "Type your message..."}
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none min-w-0" />
            <button onClick={() => handleMessage()} disabled={!input.trim() || loading} aria-label="Send"
              className="p-2 bg-primary text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0">
              <SendIcon />
            </button>
          </div>
          <div className="flex justify-between items-center mt-2 px-1">
            <span className="text-xs text-gray-400">{voiceEnabled ? "Voice replies on" : ""}</span>
            <span className="text-xs text-gray-400">
              Powered by{" "}
              <button
                type="button"
                onClick={() => window.open("https://omvsab.com", "_blank")}
                className="font-semibold text-gray-600 hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-0"
              >
                OMVSAB IT Solutions
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
