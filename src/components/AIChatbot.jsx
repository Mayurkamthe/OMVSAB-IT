import { useState, useRef, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────
// OFFLINE RESPONSE ENGINE — No API key needed
// ─────────────────────────────────────────────
const KB = [
  {
    tags: ["hello", "hi", "hey", "good morning", "good evening", "good afternoon", "namaste", "hii", "helo"],
    reply: () => `Hi there! 👋 I'm OMVA, your OMVSAB IT Solutions assistant.\n\nI can help you with:\n• Our IT services & projects\n• Internship programs\n• Placement records\n• Contact & enrollment info\n\nWhat would you like to know?`,
  },
  {
    tags: ["service", "services", "offer", "what do you do", "provide", "work", "develop", "build"],
    reply: () => `We offer 6 core IT services:\n\n💻 Software Development – Custom enterprise apps\n🌐 Website Development – Fast, SEO-optimized sites\n📱 Mobile App Development – iOS & Android\n🎨 UI/UX Design – Figma, prototyping\n☁️ Cloud Solutions – AWS, Azure, Docker\n🧠 IT Consulting – Digital transformation\n\nWant details on any specific service?`,
  },
  {
    tags: ["internship", "intern", "training", "program", "batch", "enroll", "join", "apply", "course", "learn"],
    reply: () => `Our Internship Program is designed to make you job-ready! 🎓\n\n📌 Training Tracks:\n• Full Stack Web Dev – 3 Months\n• Mobile App Dev – 3 Months\n• Java Backend Dev – 2 Months\n• UI/UX Design – 2 Months\n\n✅ What you get:\n• Live project experience\n• Industry mentor support\n• Internship certificate\n• Placement guidance\n• Modern tech: React, Node.js, Spring Boot, AWS\n\nReady to apply? Contact us at +91 98765 43210 or info@omvsab.com`,
  },
  {
    tags: ["placement", "placed", "job", "mnc", "company", "hired", "package", "salary", "lpa", "recruit", "tcs", "infosys", "wipro", "accenture", "capgemini", "hcl"],
    reply: () => `Our placement record speaks for itself! 🏆\n\n📊 Stats:\n• 1000+ Students Placed\n• 92% Placement Rate\n• Avg Package: ₹4.5 LPA\n• 50+ Partner Companies\n\n🏢 Students work at:\nTCS • Infosys • Wipro • Capgemini • Accenture • HCL • Tech Mahindra • Cognizant\n\nWant to know how to get started?`,
  },
  {
    tags: ["contact", "phone", "email", "address", "location", "reach", "call", "whatsapp", "office", "pune"],
    reply: () => `Here's how to reach us 📞\n\n📱 Phone: +91 98765 43210\n📧 Email: info@omvsab.com\n📍 Location: Pune, Maharashtra, India\n🕘 Hours: Mon–Sat, 9:00 AM – 7:00 PM\n\nYou can also fill the Contact Form on this page. We'll get back within 24 hours!`,
  },
  {
    tags: ["about", "who are you", "omvsab", "company", "founded", "team", "experience", "background"],
    reply: () => `About OMVSAB IT Solutions 🏢\n\nWe are a Pune-based IT company with 5+ years of experience, specializing in:\n• Custom software for businesses\n• Career-focused internship training\n• MNC placement assistance\n\n📈 Our Numbers:\n• 200+ Projects Delivered\n• 50+ Corporate Clients\n• 10+ Live Projects\n• 1000+ Students Trained\n\nOur mission: Bridge the gap between education and the IT industry.`,
  },
  {
    tags: ["project", "projects", "portfolio", "work done", "case study", "live", "delivered"],
    reply: () => `We've delivered 200+ projects across industries! 🚀\n\n🔧 Project Types:\n• Business web apps & portals\n• E-commerce platforms\n• Mobile apps (Android/iOS)\n• ERP & management systems\n• API development & integrations\n• Cloud-deployed SaaS products\n\nWe also have 10+ live projects currently in production.\n\nInterested in a custom project? Contact us at info@omvsab.com`,
  },
  {
    tags: ["price", "pricing", "cost", "fee", "fees", "charge", "how much", "budget", "affordable", "rate"],
    reply: () => `Our programs and services are very affordable! 💰\n\nFor exact pricing:\n📱 Call: +91 98765 43210\n📧 Email: info@omvsab.com\n\nWe customize quotes based on your requirements. No hidden charges — transparent pricing always.`,
  },
  {
    tags: ["certificate", "certification", "certified", "proof", "document"],
    reply: () => `Yes! We provide official Internship Certificates 📜\n\n✅ Recognized by industry partners\n✅ Includes project details & skills\n✅ Helpful for job applications & higher studies\n✅ Digital + physical copy provided\n\nAll students who complete the program receive their certificate upon successful project completion.`,
  },
  {
    tags: ["technology", "tech", "stack", "react", "node", "java", "spring", "mongodb", "aws", "flutter", "tools"],
    reply: () => `We work with modern, industry-demanded technologies! ⚡\n\n🖥️ Frontend: React.js, Next.js, Flutter\n⚙️ Backend: Node.js, Spring Boot, Express\n🗄️ Database: MongoDB, MySQL, PostgreSQL\n☁️ Cloud: AWS, Azure, Docker, Firebase\n📱 Mobile: React Native, Flutter, Android\n🎨 Design: Figma, Adobe XD\n\nAll our internship tracks use real industry tools.`,
  },
  {
    tags: ["duration", "how long", "time", "months", "weeks", "days", "period"],
    reply: () => `Program durations:\n\n⏱️ Internship Tracks:\n• Full Stack Web Dev – 3 Months\n• Mobile App Dev – 3 Months\n• Java Backend Dev – 2 Months\n• UI/UX Design – 2 Months\n\nProject delivery timelines vary based on scope. We'll give you a detailed timeline during consultation.\n\nWant to enroll? Contact: +91 98765 43210`,
  },
  {
    tags: ["fresher", "graduate", "student", "college", "btech", "be", "mca", "bca", "degree", "eligible"],
    reply: () => `Great news — freshers are welcome! 🎓\n\n✅ Eligibility:\n• Any CS/IT/Engineering student\n• BCA, MCA, B.Tech, BE graduates\n• Basic programming knowledge is enough\n• No prior work experience required\n\nWe train you from fundamentals to job-ready level through live projects and mentorship.\n\nApply today: info@omvsab.com`,
  },
  {
    tags: ["thank", "thanks", "great", "awesome", "nice", "helpful", "good", "perfect", "ok", "okay", "alright"],
    reply: () => `You're welcome! 😊\n\nFeel free to ask anything else about OMVSAB. I'm here to help!\n\n📱 +91 98765 43210\n📧 info@omvsab.com`,
  },
  {
    tags: ["bye", "goodbye", "see you", "later", "exit", "close", "quit"],
    reply: () => `Thanks for visiting OMVSAB IT Solutions! 👋\n\nDon't hesitate to reach out anytime:\n📱 +91 98765 43210\n📧 info@omvsab.com\n\nWe Code Your Requirements — see you soon! 🚀`,
  },
];

const FALLBACK_REPLIES = [
  `I'm not sure about that specifically, but I can help with:\n\n• Our IT Services\n• Internship Programs\n• Placement Records\n• Contact Information\n\nOr reach us directly:\n📱 +91 98765 43210\n📧 info@omvsab.com`,
  `Great question! For detailed information, please contact our team:\n📱 +91 98765 43210\n📧 info@omvsab.com\n\nMeanwhile, try asking about our services, internships, or placement record!`,
  `I'd love to help! Could you rephrase that? Or ask about:\n• Services we offer\n• Internship program details\n• Placement statistics\n• How to contact us`,
];

let fallbackIndex = 0;
function getOfflineReply(userText) {
  const lower = userText.toLowerCase();
  for (const item of KB) {
    if (item.tags.some(tag => lower.includes(tag))) {
      return item.reply();
    }
  }
  // Rotate fallback replies
  const reply = FALLBACK_REPLIES[fallbackIndex % FALLBACK_REPLIES.length];
  fallbackIndex++;
  return reply;
}

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm OMVA 👋 your OMVSAB IT Solutions assistant.\n\nI work completely offline — ask me anything about our services, internships, or placements!" },
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

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  useEffect(() => { const t = setTimeout(() => setPulseBtn(false), 5000); return () => clearTimeout(t); }, []);

  // Setup speech recognition
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
    const clean = text.replace(/[•\n]/g, " ").replace(/[*_`#]/g, "");
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = "en-IN"; utter.rate = 1.0; utter.pitch = 1.1;
    const voices = synthRef.current.getVoices();
    const v = voices.find(v => v.lang.startsWith("en") && v.name.toLowerCase().includes("female"))
      || voices.find(v => v.lang.startsWith("en-IN"))
      || voices.find(v => v.lang.startsWith("en"));
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

  const sendMessage = useCallback((text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userText }]);
    setLoading(true);

    // Simulate a small typing delay for natural feel
    setTimeout(() => {
      const reply = getOfflineReply(userText);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      speak(reply);
      setLoading(false);
    }, 600);
  }, [input, loading, speak]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  // Render message with line breaks preserved
  const renderMessage = (content) =>
    content.split("\n").map((line, i) => (
      <span key={i}>{line}{i < content.split("\n").length - 1 && <br />}</span>
    ));

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-all duration-300 ${pulseBtn && !open ? "animate-bounce" : ""}`}
        aria-label="Open AI Chat"
      >
        {open ? <CloseIcon /> : <BotIcon />}
        {!open && pulseBtn && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Chat Panel */}
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
              <div className="text-gray-400 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                Always Online · No API needed
              </div>
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
              <div className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-primary text-white rounded-tr-sm"
                  : "bg-white text-gray-700 border border-gray-100 rounded-tl-sm shadow-sm"
              }`}>
                {renderMessage(m.content)}
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
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
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
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
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
