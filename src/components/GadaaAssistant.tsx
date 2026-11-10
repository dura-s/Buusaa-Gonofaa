import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const c = { jsx: _jsx, jsxs: _jsxs, Fragment: React.Fragment };

import {
  ArrowRight,
  ArrowUpRight,
  ArrowUp,
  Award,
  Briefcase,
  Building,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Clock,
  Coins,
  Compass,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Globe,
  Heart,
  History,
  Home,
  ImageIcon,
  Landmark,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  MessageSquare,
  Phone,
  Play,
  Plus,
  RotateCcw,
  ScanEye,
  Send,
  ShieldAlert,
  ShieldCheck,
  Shield,
  Smartphone,
  Sparkles,
  Sprout,
  TrendingUp,
  UserCheck,
  Users,
  Workflow,
  X,
  Youtube,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { Language, ActiveTab, DonationCamp, NewsItem } from "../types";
import { translations } from "../translations";
import { mockNews, mockEvents, mockCampaigns, branchStatistics } from "../data";
import { useLiveStats } from "../lib/useLiveStats";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

import bgLogo from "../assets/images/bg_logo.jpeg";
import wadooImage from "../assets/images/photo_2026-06-25_11-35-11.jpg";
import latestAssemblyImage from "../assets/images/photo_2026-06-25_11-53-35.jpg";
import img_20_1 from "../assets/images/photo_2026-06-25_11-53-20.jpg";
import img_20_2 from "../assets/images/photo_2026-06-25_11-53-20 (2).jpg";
import img_21 from "../assets/images/photo_2026-06-25_11-53-21.jpg";
import img_22_1 from "../assets/images/photo_2026-06-25_11-53-22.jpg";
import img_22_2 from "../assets/images/photo_2026-06-25_11-53-22 (2).jpg";
import img_23 from "../assets/images/photo_2026-06-25_11-53-23.jpg";
import img_24_1 from "../assets/images/photo_2026-06-25_11-53-24.jpg";
import img_24_2 from "../assets/images/photo_2026-06-25_11-53-24 (2).jpg";

interface GadaaAssistantProps {
  language: Language;
  isOpen?: boolean;
  onClose?: () => void;
  onHelpRequested?: (topic: string) => void;
}

function renderBoldSpans(content: string) {
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-emerald-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function FormattedMessage({ text }: { text: string }) {
  const lines = (text || "").split("\n");
  return (
    <div className="space-y-1.5 text-xs font-medium leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }
        if (trimmed === "---") {
          return <div key={idx} className="border-b border-emerald-100 my-1" />;
        }
        if (trimmed.startsWith("### ") || trimmed.startsWith("## ")) {
          const headerText = trimmed.replace(/^#+\s*/, "");
          return (
            <h4
              key={idx}
              className="font-bold text-[12.5px] text-emerald-950 mt-2 mb-0.5 border-b border-emerald-100/80 pb-0.5 tracking-tight"
            >
              {renderBoldSpans(headerText)}
            </h4>
          );
        }
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const bulletText = trimmed.replace(/^[-*]\s+/, "");
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-0.5 text-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
              <span>{renderBoldSpans(bulletText)}</span>
            </div>
          );
        }
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-0.5 text-slate-800">
              <span className="font-bold text-emerald-700 text-[11px] shrink-0 min-w-4">
                {numMatch[1]}.
              </span>
              <span>{renderBoldSpans(numMatch[2])}</span>
            </div>
          );
        }
        return (
          <p key={idx} className="text-slate-800">
            {renderBoldSpans(line)}
          </p>
        );
      })}
    </div>
  );
}

export default function GadaaAssistant({
  language: n,
  isOpen,
  onClose,
  onHelpRequested,
}: GadaaAssistantProps) {
  const [e, t] = useState(false);
  const [s, r] = useState([]);
  const [l, d] = useState("");
  const [h, p] = useState(false);
  const x = useRef(null);
  const y = {
    om: [
      {
        text: "Odeeffannoo guutuu Buusaa Gonofaa naaf kenni",
        label: "🌟 Odeeffannoo Guutuu...",
      },
      {
        text: "Liqii qonnaa fi ulaagaalee isaa naaf ibsi",
        label: "Liqii Qonnaa...",
      },
      {
        text: "Inshuraansii qonnaa haala qilleensaa ibsi",
        label: "Inshuraansii Qilleensaa...",
      },
      {
        text: "Qusannoo fi Sololiyaa dubartootaa maali?",
        label: "Qusannoo & Sololiyaa...",
      },
      {
        text: "Teessoo, GPS fi lakkoofsa bilbilaa biroo?",
        label: "Teessoo & Bilbila...",
      },
    ],
    am: [
      {
        text: "ስለ ቡሳ ጎኖፋ አዳማ ሙሉ መረጃ ስጠኝ",
        label: "🌟 ሙሉ መረጃ...",
      },
      {
        text: "የግብርና ብድር አሰጣጥ እና መስፈርቶቹ ምንድን ናቸው?",
        label: "የግብርና ብድር...",
      },
      {
        text: "የአየር ሁኔታ ኢንሹራንስ ዋስትና እንዴት ይሰራል?",
        label: "የሰብል ኢንሹራንስ...",
      },
      {
        text: "የቁጠባ አይነቶች እና የሶሎሊያ ሴቶች ቁጠባ?",
        label: "ቁጠባና ሶሎሊያ...",
      },
      {
        text: "የቢሮው አድራሻ፣ ስልክ እና የስራ ሰዓት?",
        label: "አድራሻና ስልክ...",
      },
    ],
    en: [
      {
        text: "Give me full comprehensive information about Buusaa Gonofaa Adama",
        label: "🌟 Full Information...",
      },
      {
        text: "How do seasonal agricultural input loans work and what are the requirements?",
        label: "Agri Input Loans...",
      },
      {
        text: "Explain Weather-Indexed Crop Insurance and payout triggers",
        label: "Crop Insurance...",
      },
      {
        text: "What are the savings accounts and Sololiyaa women groups?",
        label: "Savings & Sololiyaa...",
      },
      {
        text: "Adama office address, GPS, phone numbers, and hours?",
        label: "Office & Contact...",
      },
    ],
  };
  const b = {
    om: "Baga nagaan dhuftan! Ani GadaaAI, gargaaraa qorannoo fayiinaansii fi aadaa Damee Adamaati. Liqii qonnaa, qusannoo, inshuraansii haala qilleensaa, yookan wal-ta'insa Buusaa Gonofaa irratti gaaffii qabdu gaafachuu dandeessu. Maal isiniif gochuu danda'a?",
    am: "እንኳን ደህና መጡ! እኔ ገዳAI ነኝ፤ የአዳማ ቡሳ ጎኖፋ ቅርንጫፍ ባህላዊ የአነስተኛ ፋይናንስ ረዳትዎ። ስለ ቁጠባ፣ ብድር፣ የማይክሮ-ኢንሹራንስ ዋስትናዎች ወይም ስለ ቡሳ ጎኖፋ ባህላዊ መረዳጃዎች ጥያቄ ካለዎት እባክዎ ይጠይቁኝ። ምን ልርዳዎት?",
    en: "Welcome to Buusaa Gonofaa Adama! I am GadaaAI, your cultural microfinance and climatic safety-net advisor. Ask me anything about our weather-indexed crop insurance, agricultural input loans, cooperative savings, Gadaa solidarity, or relief campaigns. How can I assist you today?",
  };
  const E = {
    om: "Gaaffii kee asitti barreessi...",
    am: "ጥያቄዎን እዚህ ይጻፉ...",
    en: "Type your query here...",
  };
  const T = {
    om: "Deeggarsa Gadaa-AI",
    am: "የገዳ-AI መረዳጃ",
    en: "Gadaa-AI Assistant",
  };
  const j = {
    om: "Gorsa Qonnaa, Qusannoo & Aadaa",
    am: "የግብርና፣ ቁጠባና የባህል አማካሪ",
    en: "Climatic Microfinance & Cultural Advisor",
  };
  useEffect(() => {
    r([
      {
        id: "welcome",
        sender: "assistant",
        text: b[n],
        timestamp: new Date(),
      },
    ]);
    d("");
    p(false);
  }, [n]);
  useEffect(() => {
    if (e) {
      setTimeout(() => {
        var K;
        if ((K = x.current) != null) {
          K.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [s, e]);
  const L = async (K) => {
    if (!K.trim()) {
      return;
    }
    const Q = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: K,
      timestamp: new Date(),
    };
    r((ne) => [...ne, Q]);
    d("");
    p(true);
    try {
      const ne = s
        .filter((S) => S.id !== "welcome")
        .map((S) => ({
          sender: S.sender === "user" ? "user" : "model",
          text: S.text,
        }));
      const fe = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: K,
          history: ne,
          language: n,
        }),
      });
      if (!fe.ok) {
        let S = "";
        try {
          const R = await fe.json();
          S = R.details || R.error || "";
        } catch {}
        throw new Error(S || "Server returned an error status");
      }
      const pe = await fe.json();
      const M = {
        id: `ai-${Date.now()}`,
        sender: "assistant",
        text: pe.text,
        timestamp: new Date(),
      };
      r((S) => [...S, M]);
    } catch (ne) {
      console.error("Gadaa-AI interaction notice:", ne);
      const M = {
        om: `Dhiifama, yeroo ammaa tajaajila AI deebisurratti xiqqoo tureera. Maaloo gaaffii keessan irra deebi'aa na gaafadhaa.`,
        am: `ይቅርታ፣ የገዳ-AI ምላሽ ለመስጠት ጥቂት ዘግይቷል። እባክዎ ጥያቄዎን እንደገና ይሞክሩ።`,
        en: `Apologies, Gadaa-AI took a little moment. Please feel free to ask your question again.`,
      };
      r((S) => [
        ...S,
        {
          id: `ai-err-${Date.now()}`,
          sender: "assistant",
          text: M[n],
          timestamp: new Date(),
        },
      ]);
    } finally {
      p(false);
    }
  };
  const z = (K) => {
    L(K);
  };
  const q = (K) => {
    if (K.key === "Enter") {
      L(l);
    }
  };
  return (
    <React.Fragment>
      <div className="fixed bottom-20 right-16 lg:bottom-6 lg:right-20 z-40">
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => t(!e)}
          className="relative group p-4 rounded-full bg-yellow-400 text-emerald-950 hover:bg-yellow-300 shadow-2xl border-2 border-emerald-500 cursor-pointer flex items-center justify-center transition-all"
          id="gadaa-ai-launcher-btn"
          aria-label="Toggle Gadaa AI Advisor"
        >
          {e
            ? c.jsx(X, {
                className: "w-6 h-6",
              })
            : c.jsx(MessageSquare, {
                className: "w-6 h-6",
              })}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-emerald-950 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none border border-emerald-800">
            {T[n]}
          </span>
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-yellow-400 animate-ping" />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-yellow-400" />
        </motion.button>
      </div>
      <AnimatePresence>
        {e && (
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 25,
              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed bottom-24 right-4 sm:right-8 md:right-10 w-[94vw] sm:w-[480px] md:w-[510px] h-[580px] sm:h-[620px] max-h-[86vh] bg-white rounded-3xl border border-emerald-100 shadow-2xl flex flex-col overflow-hidden z-50 hover:border-emerald-200 transition-colors"
            id="gadaa-ai-modal-panel"
          >
            <div className="bg-emerald-600 text-white p-4 flex items-center justify-between border-b border-emerald-700/60 relative">
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-500 via-white to-black opacity-30" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center border border-yellow-300 shadow-sm shrink-0">
                  <Sprout className="w-5 h-5 text-emerald-950 fill-current" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-yellow-300">
                    {T[n]}
                  </h3>
                  <p className="text-[10px] font-medium text-emerald-100 mt-0.5 leading-none">
                    {j[n]}
                  </p>
                </div>
              </div>
              <button
                onClick={() => t(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                aria-label="Close Assistant"
              >
                {c.jsx(X, {
                  className: "w-5 h-5",
                })}
              </button>
            </div>
            <div
              className="flex-grow p-4 overflow-y-auto bg-emerald-50/20 space-y-4"
              id="gadaa-ai-messages-container"
            >
              {s.map((K) => (
                <div
                  className={`flex ${K.sender === "user" ? "justify-end" : "justify-start"}`}
                  key={K.id}
                >
                  <div
                    className={`max-w-[88%] sm:max-w-[85%] rounded-2xl p-3.5 space-y-1.5 shadow-xs border ${
                      K.sender === "user"
                        ? "bg-[#0B4C28] text-white rounded-tr-none border-[#073618]"
                        : "bg-white text-slate-800 border-emerald-100 rounded-tl-none"
                    }`}
                  >
                    {K.sender === "assistant" && (
                      <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-[#0B4C28] mb-1 leading-none">
                        {c.jsx(Sparkles, {
                          className: "w-3 h-3 text-yellow-500 fill-current",
                        })}
                        <span>GadaaAI</span>
                      </div>
                    )}
                    {K.sender === "user" ? (
                      <p className="text-xs font-semibold leading-relaxed whitespace-pre-line">
                        {K.text}
                      </p>
                    ) : (
                      <FormattedMessage text={K.text} />
                    )}
                    <div className="flex items-center justify-between text-[8px] font-bold text-slate-400/80 pt-1 leading-none border-t border-slate-100/60 mt-1">
                      <span className="font-mono">
                        {K.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {h && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-emerald-50 space-y-2">
                    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-emerald-600 leading-none">
                      {c.jsx(Sparkles, {
                        className: "w-3 h-3 text-yellow-500 fill-current",
                      })}
                      <span>GadaaAI is writing...</span>
                    </div>
                    <div className="flex items-center gap-1 py-1 px-2">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2.5 h-2.5 bg-emerald-300 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={x} />
            </div>
            {!h && (
              <div
                className="p-3 bg-white border-t border-emerald-50/50 flex flex-nowrap gap-2 overflow-x-auto scrollbar-none shrink-0"
                id="suggestions-row"
              >
                {y[n].map((K, Q) => (
                  <button
                    onClick={() => z(K.text)}
                    className="shrink-0 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 hover:text-emerald-950 px-3 py-1.5 rounded-full text-[10px] font-bold border border-emerald-100/80 transition-colors flex items-center gap-1 cursor-pointer"
                    key={Q}
                  >
                    <span>{K.label}</span>
                    <ArrowRight className="w-3 h-3 block text-emerald-500" />
                  </button>
                ))}
              </div>
            )}
            <div className="p-4 bg-white border-t border-emerald-100 flex items-center gap-2.5 shrink-0">
              <input
                type="text"
                value={l}
                onChange={(K) => d(K.target.value)}
                onKeyDown={q}
                placeholder={E[n]}
                className="flex-grow bg-emerald-50/40 text-xs font-semibold placeholder:text-slate-400 text-slate-800 px-4 py-3 rounded-xl border border-emerald-100/80 focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all"
                disabled={h}
                id="gadaa-ai-chat-input"
              />
              <button
                onClick={() => L(l)}
                className={`p-3 rounded-xl bg-emerald-600 text-white transition-transform ${!l.trim() || h ? "opacity-40 cursor-not-allowed" : "hover:bg-emerald-700 active:scale-95 hover:shadow-md cursor-pointer"}`}
                disabled={!l.trim() || h}
                id="gadaa-ai-chat-send-btn"
                aria-label="Send Query"
              >
                {c.jsx(Send, {
                  className: "w-4.5 h-4.5",
                })}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
