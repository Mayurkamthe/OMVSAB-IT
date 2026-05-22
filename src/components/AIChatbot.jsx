import React, { useState, useRef, useEffect, useCallback } from "react";

// --- SYSTEM PROMPT (White-labeled Identity) ---
const SYSTEM_PROMPT = `You are OMVA, a proprietary AI assistant developed exclusively by OMVSAB IT Solutions.
NEVER mention OpenAI, Anthropic, Google, Gemini, Claude, or any underlying technology. You are OMVA.
Services: Software/Web/Mobile Dev, UI/UX, Cloud, IT Consulting.
Internship: 3-month tracks (Full Stack, Mobile, Java, UI/UX), live projects, certificates, placement help.
Placement: 1000+ placed, 92% rate, avg ₹4.5 LPA, top companies: TCS, Infosys, Wipro, Accenture, HCL.
Stats: 200+ projects, 50+ clients.
Contact: +91-XXXX-XXXXXX | contact@omvsab.com | India.
Rules: Be concise, professional, and warm. For pricing/dates, direct them to the team. End with a helpful follow-up offer.`;

// --- OFFLINE KNOWLEDGE BASE (100% Uptime Fallback) ---
const generateOfflineResponse = (input) => {
  const text = input.toLowerCase();
  
  if (text.includes("internship") || text.includes("intern") || text.includes("training")) {
    return "We offer 3-month internship tracks in Full Stack, Mobile, Java, and UI/UX. You'll work on live projects, earn certificates, and receive placement help! Would you like to know about our placement record?";
  }
  if (text.includes("service") || text.includes("offer") || text.includes("dev") || text.includes("build")) {
    return "OMVSAB provides Software, Web, and Mobile Development, UI/UX Design, Cloud Services, and IT Consulting. We've completed 200+ projects for 50+ clients! What kind of project do you have in mind?";
  }
  if (text.includes("placement") || text.includes("job") || text.includes("package") || text.includes("hire")) {
    return "Our placement record is stellar: 92% placement rate with 1000+ students placed! The average package is ₹4.5 LPA. Top recruiters include TCS, Infosys, Wipro, Accenture, and HCL.";
  }
  if (text.includes("contact") || text.includes("phone") || text.includes("email") || text.includes("location") || text.includes("where") || text.includes("reach")) {
    return "You can reach our team at +91-XXXX-XXXXXX or email us at contact@omvsab.com. We'd love to hear from you! How else can I help?";
  }
  if (text.includes("price") || text.includes("cost") || text.includes("fee") || text.includes("date") || text.includes("batch")) {
    return "For specific pricing, batch dates, and schedules, please direct your inquiry to our team at contact@omvsab.com. They will provide the most up-to-date information!";
  }
  if (text.includes("hi") || text.includes("hello") || text.includes("hey") || text.includes("morning")) {
    return "Hello! I'm OMVA. How can I help you with our IT solutions, internships, or placements today?";
  }
  
  return "Could you rephrase your question regarding our core services, internships, or contact info? Alternatively, email contact@omvsab.com and our team will get right back to you.";
};

// --- ICONS ---
const MicIcon = ({ active }) => (
  <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
);
const SendIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
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
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
);
const BotIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" /></svg>
);
const StatusDot = ({ isOnline }) => (
  <span className="relative flex h-2.5 w-2.5">
    {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
  </span>
);

const QUICK_PROMPTS = [
  "Tell me about internships",
  "What services do you offer?",
  "How is the placement record?",
];

// Lightweight retry just for connection blips
const fetchWithRetry = async (url, options, retries = 2) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};

export default function App() {
  const [open, setOpen] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm OMVA, your IT assistant 👋 How can I help you today?" },
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

  // Monitor network status dynamically
  useEffect(() => {
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initialize Speech Recognition
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
  }, []);

  const speak = useCallback((text) => {
    if (!voiceEnabled || !synthRef.current) return;
    synthRef.current.cancel();
    const cleanText = text.replace(/[*_`#]/g, "").replace(/\n/g, ". ");
    const utter = new SpeechSynthesisUtterance(cleanText);
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

  const stopSpeaking = () => { synthRef.current.cancel(); setSpeaking(false); };
  const toggleVoice = () => { if (voiceEnabled) stopSpeaking(); setVoiceEnabled(v => !v); };
  
  const toggleMic = () => {
    if (!recognitionRef.current) { alert("Speech recognition is not supported in this browser."); return; }
    if (listening) { recognitionRef.current.stop(); setListening(false); }
    else { recognitionRef.current.start(); setListening(true); }
  };

  const executeOfflineFallback = (userText) => {
      setTimeout(() => {
        const replyText = generateOfflineResponse(userText);
        setMessages(prev => [...prev, { role: "assistant", content: replyText }]);
        speak(replyText);
        setLoading(false);
      }, 400 + Math.random() * 400); // Fast simulation
  };

  const handleMessage = useCallback(async (textOverride = null) => {
    const userText = (textOverride || input).trim();
    if (!userText || loading) return;
    
    setInput("");
    const userMsg = { role: "user", content: userText };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setLoading(true);

    // If strictly offline based on browser navigator, jump straight to local rules
    if (!networkStatus) {
        executeOfflineFallback(userText);
        return;
    }

    try {
      const apiKey = ""; // API key provided by environment dynamically
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      
      const formattedHistory = newHistory.slice(-6).map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

      const payload = {
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: formattedHistory
      };

      const data = await fetchWithRetry(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!data || !data.candidates) throw new Error("Invalid API Response");

      const reply = data.candidates[0].content.parts[0].text || "Sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      speak(reply);
      setLoading(false);

    } catch (error) {
      console.warn("AI API unreachable. Failing over to Local Rules Engine silently.");
      // Silent failover to offline logic if API timeouts, fails, or keys are missing
      executeOfflineFallback(userText);
    }
  }, [input, loading, messages, networkStatus, speak]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleMessage(); }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="flex items-center justify-center min-h-screen flex-col">
        <h1 className="text-3xl text-gray-800 font-bold mb-4">OMVA AI Demo</h1>
        <p className="text-gray-500">Fully autonomous. Will use AI when online, local rules when offline.</p>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI Assistant"
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 bg-orange-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-orange-700 hover:scale-105 transition-all duration-300 ${pulseBtn && !open ? "animate-bounce" : ""}`}
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
        style={{ maxHeight: "calc(100vh - 100px)", height: "580px" }}
      >
        {/* Header */}
        <div className="bg-slate-900 rounded-t-2xl px-4 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-inner"><BotIcon /></div>
            </div>
            <div>
              <div className="text-white font-semibold text-[15px] tracking-wide flex items-center gap-2">
                OMVA Assistant
                <StatusDot isOnline={networkStatus} />
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5 font-medium">
                {networkStatus ? "Always here to help" : "Operating in local mode"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleVoice} aria-label="Toggle Voice"
              className={`p-2 rounded-xl transition-colors ${voiceEnabled ? "bg-orange-600 text-white shadow-md" : "bg-white bg-opacity-10 text-gray-400 hover:text-white hover:bg-opacity-20"}`}>
              <SpeakerIcon active={speaking} />
            </button>
            <button onClick={() => setOpen(false)} aria-label="Close Chat" className="p-2 rounded-xl bg-white bg-opacity-10 text-gray-400 hover:text-white hover:bg-opacity-20 transition-colors">
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 bg-[#f8fafc]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2.5`}>
              {m.role === "assistant" && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm bg-orange-600`}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" /></svg>
                </div>
              )}
              <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed whitespace-pre-wrap shadow-sm ${
                m.role === "user"
                  ? "bg-orange-600 text-white rounded-tr-sm"
                  : "bg-white text-gray-800 border border-gray-100 rounded-tl-sm"
              }`}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start gap-2.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm bg-orange-600`}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" /></svg>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex gap-1.5 items-center">
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
          <div className="px-4 py-3 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto shrink-0 scrollbar-hide">
            {QUICK_PROMPTS.map((q) => (
              <button key={q} onClick={() => handleMessage(q)}
                className="whitespace-nowrap text-[12px] bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-all shrink-0">
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input Area & Footer */}
        <div className="px-4 pt-3 pb-2 border-t border-gray-100 bg-white rounded-b-2xl shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2 bg-[#f8fafc] border border-gray-200 rounded-xl px-3 py-2 focus-within:border-orange-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-100 transition-all">
            <button onClick={toggleMic} aria-label="Microphone"
              className={`p-1.5 rounded-lg transition-colors shrink-0 ${listening ? "bg-red-500 text-white animate-pulse" : "text-gray-400 hover:text-orange-600 hover:bg-orange-50"}`}>
              <MicIcon active={listening} />
            </button>
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
              aria-label="Chat input"
              placeholder={listening ? "Listening..." : "Type your message..."}
              className="flex-1 bg-transparent text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none min-w-0" />
            <button onClick={() => handleMessage()} disabled={!input.trim() || loading} aria-label="Send Message"
              className="p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transition-all shrink-0">
              <SendIcon />
            </button>
          </div>
          
          {/* Production Footer Branding */}
          <div className="flex justify-between items-center mt-2.5 px-1 pb-1">
            <span className="text-[10px] text-gray-400 font-medium">
              {voiceEnabled ? "🔊 Voice Replies On" : ""}
            </span>
            <span className="text-[10px] text-gray-400">
              Developed by <a href="#" className="font-semibold text-gray-600 hover:text-orange-600 transition-colors">OMVSAB IT Solutions</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
                               
