import { useState, useRef, useEffect, useCallback } from "react";

const SYSTEM_PROMPT = `You are OMVA, the friendly AI assistant for OMVSAB IT Solutions. 
You help visitors learn about the company's services, internship programs, and career opportunities.

About OMVSAB IT Solutions:
- A professional IT company based in Pune, Maharashtra, India
- Services: Custom Software Development, Website Development, Mobile App Development, UI/UX Design, Cloud Solutions, IT Consulting
- Internship Program: Live project training, Industry mentorship, Internship certificates, Placement guidance, 3-month tracks in Full Stack, Mobile, Java Backend, UI/UX
- Placement: 1000+ students placed in TCS, Infosys, Wipro, Capgemini, Accenture, HCL, Tech Mahindra, Cognizant
- Stats: 200+ projects delivered, 50+ corporate clients, 10+ live projects, 92% placement rate, avg package ₹4.5 LPA
- Contact: +91 98765 43210 | info@omvsab.com | Pune, Maharashtra

Keep responses concise, warm, and professional. Use simple language. 
If asked about pricing or specific dates, suggest contacting the team directly.
Always end with a helpful follow-up offer.`;

// Mic SVG
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
  "Tell me about internship programs",
  "What services do you offer?",
  "How is the placement record?",
  "How do I contact OMVSAB?",
];

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm OMVA, your OMVSAB IT Solutions assistant 👋 How can I help you today? Ask me about our services, internship programs, or placement opportunities!",
    },
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

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Pulse notification stops after 5s
  useEffect(() => {
    const t = setTimeout(() => setPulseBtn(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // Setup SpeechRecognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.interimResults = false;
    recog.lang = "en-IN";
    recog.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };
    recog.onend = () => setListening(false);
    recog.onerror = () => setListening(false);
    recognitionRef.current = recog;
  }, []);

  const speak = useCallback((text) => {
    if (!voiceEnabled) return;
    synthRef.current.cancel();
    const clean = text.replace(/[*_`#]/g, "");
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = "en-IN";
    utter.rate = 1.0;
    utter.pitch = 1.1;
    const voices = synthRef.current.getVoices();
    const preferred = voices.find(v => v.lang.startsWith("en") && v.name.toLowerCase().includes("female"))
      || voices.find(v => v.lang.startsWith("en-IN"))
      || voices.find(v => v.lang.startsWith("en"));
    if (preferred) utter.voice = preferred;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    synthRef.current.speak(utter);
  }, [voiceEnabled]);

  const stopSpeaking = () => {
    synthRef.current.cancel();
    setSpeaking(false);
  };

  const toggleVoice = () => {
    if (voiceEnabled) stopSpeaking();
    setVoiceEnabled(v => !v);
  };

  const toggleMic = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const sendMessage = useCallback(async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput("");
    const userMsg = { role: "user", content: userText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't process that. Please try again!";
      const assistantMsg = { role: "assistant", content: reply };
      setMessages(prev => [...prev, assistantMsg]);
      speak(reply);
    } catch {
      const errMsg = { role: "assistant", content: "Oops! Something went wrong. Please try again or contact us directly at info@omvsab.com." };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, speak]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-all duration-300 ${pulseBtn && !open ? "animate-bounce" : ""}`}
        aria-label="Open AI Chat"
      >
        {open ? <CloseIcon /> : <BotIcon />}
        {!open && pulseBtn && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col transition-all duration-300 origin-bottom-right ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{ height: "520px" }}
      >
        {/* Header */}
        <div className="bg-secondary rounded-t-2xl px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                <BotIcon />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-secondary" />
            </div>
            <div>
              <div className="text-white font-heading font-semibold text-sm">OMVA AI Assistant</div>
              <div className="text-gray-400 text-xs">Powered by Claude AI</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Voice toggle */}
            <button
              onClick={toggleVoice}
              title={voiceEnabled ? "Disable voice" : "Enable voice"}
              className={`p-2 rounded-lg transition-colors ${voiceEnabled ? "bg-primary text-white" : "bg-white bg-opacity-10 text-gray-400 hover:text-white"}`}
            >
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
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-white rounded-tr-sm"
                    : "bg-white text-gray-700 border border-gray-100 rounded-tl-sm shadow-sm"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
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
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto shrink-0 scrollbar-hide">
            {QUICK_PROMPTS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="whitespace-nowrap text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-primary hover:text-primary transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-3 py-3 border-t border-gray-100 bg-white rounded-b-2xl shrink-0">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-primary transition-colors">
            {/* Mic */}
            <button
              onClick={toggleMic}
              title={listening ? "Stop listening" : "Speak your message"}
              className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                listening ? "bg-red-500 text-white animate-pulse" : "text-gray-400 hover:text-primary"
              }`}
            >
              <MicIcon active={listening} />
            </button>

            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={listening ? "Listening..." : "Ask me anything..."}
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none min-w-0"
            />

            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="p-1.5 bg-primary text-white rounded-lg hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
            >
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
