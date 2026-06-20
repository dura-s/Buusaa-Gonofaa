import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Sparkles, Sprout, ArrowRight, HelpCircle, RefreshCw } from 'lucide-react';
import { Language } from '../types';

interface GadaaAssistantProps {
  language: Language;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  isConfigError?: boolean;
}

export default function GadaaAssistant({ language }: GadaaAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Starter suggestion buttons depending on active language
  const suggestions: Record<Language, { text: string; label: string }[]> = {
    om: [
      { text: "Buusaa Gonofaa maali?", label: "Buusaa Gonofaa maali?" },
      { text: "Liqii qonnaa akkamiin iyyadha?", label: "Liqii Qonnaa iyyachuuf..." },
      { text: "Inshuraansii qonnaa qabeenya ibsi", label: "Inshuraansii Morkii..." },
      { text: "Teessoo fi GPS biroo keenya?", label: "Teessoo Biroo..." }
    ],
    am: [
      { text: "ቡሳ ጎኖፋ ምንድን ነው?", label: "ቡሳ ጎኖፋ ምንድን ነው?" },
      { text: "የግብርና ብድር እንዴት ነው የሚሰጠው?", label: "የግብርና ብድር አሰጣጥ..." },
      { text: "የሰብል ማይክሮ-ኢንሹራንስ ዋስትና ምንድን ነው?", label: "ማይክሮ-ኢንሹራንስ..." },
      { text: "የቢሮአችሁ አድራሻ ወይንም ጂፒኤስ የት ነው?", label: "የቢሮአችን አድራሻ..." }
    ],
    en: [
      { text: "What is the cooperative meaning of Buusaa Gonofaa?", label: "What is Buusaa Gonofaa?" },
      { text: "How do I qualify for seasonal input loans?", label: "Seasonal Loan Crops..." },
      { text: "Explain Index-Based Crop Insurance benefits", label: "Crop Index Insurance..." },
      { text: "Where is the Adama main office located?", label: "Office Address & Hours..." }
    ]
  };

  const welcomeMessages: Record<Language, string> = {
    om: "Baga nagaan dhuftan! Ani GadaaAI, gargaaraa qorannoo fayiinaansii fi aadaa Damee Adamaati. Liqii qonnaa, qusannoo, inshuraansii haala qilleensaa, yookan wal-ta'insa Buusaa Gonofaa irratti gaaffii qabdu gaafachuu dandeessu. Maal isiniif gochuu danda'a?",
    am: "እንኳን ደህና መጡ! እኔ ገዳAI ነኝ፤ የአዳማ ቡሳ ጎኖፋ ቅርንጫፍ ባህላዊ የአነስተኛ ፋይናንስ ረዳትዎ። ስለ ቁጠባ፣ ብድር፣ የማይክሮ-ኢንሹራንስ ዋስትናዎች ወይም ስለ ቡሳ ጎኖፋ ባህላዊ መረዳጃዎች ጥያቄ ካለዎት እባክዎ ይጠይቁኝ። ምን ልርዳዎት?",
    en: "Welcome to Buusaa Gonofaa Adama! I am GadaaAI, your cultural microfinance and climatic safety-net advisor. Ask me anything about our weather-indexed crop insurance, agricultural input loans, cooperative savings, Gadaa solidarity, or relief campaigns. How can I assist you today?"
  };

  const placeholderText: Record<Language, string> = {
    om: "Gaaffii kee asitti barreessi...",
    am: "ጥያቄዎን እዚህ ይጻፉ...",
    en: "Type your query here..."
  };

  const chatTitle: Record<Language, string> = {
    om: "Deeggarsa Gadaa-AI",
    am: "የገዳ-AI መረዳጃ",
    en: "Gadaa-AI Assistant"
  };

  const chatSubtitle: Record<Language, string> = {
    om: "Gorsa Qonnaa, Qusannoo & Aadaa",
    am: "የግብርና፣ ቁጠባና የባህል አማካሪ",
    en: "Climatic Microfinance & Cultural Advisor"
  };

  // Re-initialize or add welcome message when language changes or on mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'assistant',
          text: welcomeMessages[language],
          timestamp: new Date()
        }
      ]);
    }
  }, [language]);

  // Scroll to bottom helper
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Map existing messages to history parameter format
      const historyContext = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          sender: m.sender === 'user' ? 'user' : 'model',
          text: m.text
        }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: historyContext,
          language: language
        })
      });

      if (!res.ok) {
        let errDetails = '';
        try {
          const errData = await res.json();
          errDetails = errData.details || errData.error || '';
        } catch (_) {}
        throw new Error(errDetails || 'Server returned an error status');
      }

      const data = await res.json();
      
      const assistantMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.text,
        timestamp: new Date(),
        isConfigError: data.isConfigError
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Failed to get companion reply:', err);
      const errMsg = err?.message || '';
      const suffix = errMsg ? `\n(Error: ${errMsg})` : '';
      
      const fallbackMsgs: Record<Language, string> = {
        om: `Dhiifama, tajaajilri bilbilaa fi AI mijeessuun yeroof addaan citeera. Maaloo xiqqoo booda irra deebi'ii yaali.${suffix}`,
        am: `ይቅርታ፣ የገዳ-AI አገልግሎት ለጊዜው አልተሳካም። እባክዎ ጥቂት ቆይተው እንደገና ይሞክሩ።${suffix}`,
        en: `Apologies, the Gadaa-AI is temporarily sleeping. Please try again in a few moments.${suffix}`
      };
      
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'assistant',
          text: fallbackMsgs[language],
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (text: string) => {
    handleSendMessage(text);
  };

  const handlesKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage(input);
    }
  };

  return (
    <>
      {/* Floating Launcher Action circular widget */}
      <div className="fixed bottom-6 right-20 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-yellow-400 text-emerald-950 hover:bg-yellow-300 shadow-2xl border-2 border-emerald-500 cursor-pointer flex items-center justify-center transition-all"
          id="gadaa-ai-launcher-btn"
          aria-label="Toggle Gadaa AI Advisor"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
          
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-emerald-950 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none border border-emerald-800">
            {chatTitle[language]}
          </span>
          
          {/* Subtle glowing beacon */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-yellow-400 animate-ping" />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-yellow-400" />
        </motion.button>
      </div>

      {/* Expanded Interactive Chat Modal side window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 sm:right-10 w-[92vw] sm:w-[420px] h-[550px] bg-white rounded-3xl border border-emerald-100 shadow-2xl flex flex-col overflow-hidden z-50 hover:border-emerald-200 transition-colors"
            id="gadaa-ai-modal-panel"
          >
            {/* Elegant Header with Oromo Traditional Motifs */}
            <div className="bg-emerald-600 text-white p-4 flex items-center justify-between border-b border-emerald-700/60 relative">
              {/* Traditional layout background stripes */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-500 via-white to-black opacity-30" />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center border border-yellow-300 shadow-sm shrink-0">
                  <Sprout className="w-5 h-5 text-emerald-950 fill-current" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-yellow-300">
                    {chatTitle[language]}
                  </h3>
                  <p className="text-[10px] font-medium text-emerald-100 mt-0.5 leading-none">
                    {chatSubtitle[language]}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Feed */}
            <div 
              className="flex-grow p-4 overflow-y-auto bg-emerald-50/20 space-y-4"
              id="gadaa-ai-messages-container"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 space-y-1.5 shadow-xs border ${
                      m.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none border-emerald-700'
                        : m.isConfigError
                        ? 'bg-amber-50 text-amber-900 border-amber-200 rounded-tl-none'
                        : 'bg-white text-slate-800 border-emerald-50 rounded-tl-none'
                    }`}
                  >
                    {m.sender === 'assistant' && (
                      <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-emerald-600 mb-1 leading-none">
                        <Sparkles className="w-3 h-3 text-yellow-500 fill-current" />
                        <span>GadaaAI</span>
                      </div>
                    )}
                    
                    <p className="text-xs font-semibold leading-relaxed whitespace-pre-line">
                      {m.text}
                    </p>

                    <div className="flex items-center justify-between text-[8px] font-bold text-slate-400/80 pt-1 leading-none">
                      <span className="font-mono">
                        {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {/* Secret/Config instructions if Gemini key is missing */}
                    {m.isConfigError && (
                      <div className="mt-3 p-2 bg-amber-100/60 rounded-xl border border-amber-200/50 flex items-start gap-1 text-[10px] text-amber-950 font-bold leading-normal">
                        <HelpCircle className="w-4 h-4 shrink-0 text-amber-800 mt-0.5" />
                        <span>
                          Go to the **Settings** cog in the top-right corner, find **Secrets**, define `GEMINI_API_KEY` with your valid key, and wait for automatic redeployment.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-emerald-50 space-y-2">
                    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-emerald-600 leading-none">
                      <Sparkles className="w-3 h-3 text-yellow-500 fill-current" />
                      <span>GadaaAI is writing...</span>
                    </div>
                    <div className="flex items-center gap-1 py-1 px-2">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2.5 h-2.5 bg-emerald-300 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips (Visible only when feed is empty or user is about to respond) */}
            {!isLoading && (
              <div className="p-3 bg-white border-t border-emerald-50/50 flex flex-nowrap gap-2 overflow-x-auto scrollbar-none shrink-0" id="suggestions-row">
                {suggestions[language].map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(s.text)}
                    className="shrink-0 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 hover:text-emerald-950 px-3 py-1.5 rounded-full text-[10px] font-bold border border-emerald-100/80 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>{s.label}</span>
                    <ArrowRight className="w-3 h-3 block text-emerald-500" />
                  </button>
                ))}
              </div>
            )}

            {/* Input Form container */}
            <div className="p-4 bg-white border-t border-emerald-100 flex items-center gap-2.5 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handlesKeyPress}
                placeholder={placeholderText[language]}
                className="flex-grow bg-emerald-50/40 text-xs font-semibold placeholder:text-slate-400 text-slate-800 px-4 py-3 rounded-xl border border-emerald-100/80 focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all"
                disabled={isLoading}
                id="gadaa-ai-chat-input"
              />
              <button
                onClick={() => handleSendMessage(input)}
                className={`p-3 rounded-xl bg-emerald-600 text-white transition-transform ${
                  !input.trim() || isLoading
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-emerald-700 active:scale-95 hover:shadow-md cursor-pointer'
                }`}
                disabled={!input.trim() || isLoading}
                id="gadaa-ai-chat-send-btn"
                aria-label="Send Query"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
