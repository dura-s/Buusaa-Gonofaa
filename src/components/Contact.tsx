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

interface ContactProps {
  language: Language;
}
export default function Contact({ language: n }: ContactProps) {
  const [e, t] = useState("hq");
  const s = {
    hq: {
      title: {
        om: "Waajira Ol’aanaa Adamaa (HQ)",
        am: "የአዳማ ዋና መስሪያ ቤት",
        en: "Adama Central Headquarters (HQ)",
      },
      address: {
        om: "Zoonii daldalaa Gadaa, Gamoo B, Kella 3ffaa, Adamaa, Oromiyaa. Lakk. Postaa (P.O. Box): 20118, Adamaa.",
        am: "ገዳ የንግድ ማዕከል፣ ፎቅ 3፣ ቢሮ ቁጥር 302፣ አዳማ፣ ኦርሚያ። የፖስታ ሳጥን ቁጥር (P.O. Box): 20118፣ አዳማ።",
        en: "Gadaa Trade Center, Block B, 3rd Floor, Suite 304, Adama, Oromia, Ethiopia. P.O. Box: 20118, Adama.",
      },
      phone: "+251 22 111 2345 / +251 911 445 667",
      email: "adama.hq@buusaagonofaa.org",
      hours: {
        om: "Wiixata - Jimaata: Waaree Dura 2:30 - Waaree Booda 11:30",
        am: "ከሰኞ - አርብ፡ ከጧቱ 2:30 እስከ ማታ 11:30",
        en: "Mon - Fri: 8:30 AM - 5:30 PM (UTC+3)",
      },
      gps: "8.5414° N, 39.2689° E",
      landmarks: {
        om: "Hallii Abbaa Gadaa fi Baankiin Hojii Gamtaa Oromiyaa biratti",
        am: "ከአባገዳ አዳራሽ እና ከኦሮሚያ የህብረት ስራ ባንክ ጎን",
        en: "Adjacent to Abba Gadaa Cultural Center Hall & Oromia Coop Bank",
      },
      liaison: "Obbo Chala Kenenisa (Manager)",
    },
    wonji: {
      title: {
        om: "Damee Wonji (Liqii Qonnaa)",
        am: "የወንጂ ቅርንጫፍ ጽሕፈት ቤት",
        en: "Wonji Agricultural Liaison Office",
      },
      address: {
        om: "Karaa Wonji Kuriftu, Gamoo Gamtaa, Kutaa 12, Wonji, Oromiyaa",
        am: "ወንጂ ኩሪፍቱ መንገድ፣ የኅብረት ፎቅ፣ ቁጥር 14፣ ወንጂ",
        en: "Wonji Kuriftu Bypass, Cooperative Union Building, Office #14, Wonji, Oromia",
      },
      phone: "+251 22 219 0891 / +251 912 301 405",
      email: "wonji.farm@buusaagonofaa.org",
      hours: {
        om: "Wiixata - Sanbata Dura: Waaree Dura 2:00 - Waaree Booda 10:00",
        am: "ከሰኞ - ቅዳሜ፡ ከጧቱ 2:00 እስከ ቀኑ 10:00",
        en: "Mon - Sat: 8:00 AM - 4:00 PM (Rural Farmers Schedule)",
      },
      gps: "8.4321° N, 39.2210° E",
      landmarks: {
        om: "Kella warshaa Shukkara Wonjii dhiyeenyatti",
        am: "በወንጂ ስኳር ፋብሪካ መግቢያ በር አቅራቢያ",
        en: "Near Wonji Sugar Factory Front Gate Complex",
      },
      liaison: "Adde Sifan Tolera (Farmers Coordinator)",
    },
    lume: {
      title: {
        om: "Waajira Qunnamtii Lume (Mojo)",
        am: "የሉሜ የሰብል ዋስትና ቅርንጫፍ",
        en: "Lume Grain Cluster Coordination",
      },
      address: {
        om: "Koreen qonnatota Mojo, Daandii Mojo-Adama, Mojo, Oromiyaa",
        am: "የሞጆ አርሶ አደሮች ማህበር፣ ከሞጆ መጋዘን አጠገብ፣ ሞጆ",
        en: "Mojo Grain Association Depot Compound, Mojo Town Center, Oromia",
      },
      phone: "+251 922 409 123 / +251 22 199 1042",
      email: "lume.seed@buusaagonofaa.org",
      hours: {
        om: "Wiixata - Jimaata: Waaree Dura 2:30 - Waaree Booda 11:30",
        am: "ከሰኞ - አርብ፡ ከጧቱ 2:30 እስከ ማታ 11:30",
        en: "Mon - Fri: 8:30 AM - 5:30 PM",
      },
      gps: "8.5833° N, 39.1167° E",
      landmarks: {
        om: "Gamoo Sanyii Filatamaa Lume-Adamaa biratti (Mojo)",
        am: "ከሉሜ-አዳማ የዘር ህብረት ስራ ማህበር ህንጻ አጠገብ",
        en: "Directly opposite Lume-Adama Grain Seeds Union Depot",
      },
      liaison: "Dr. Solomon Abera (Agronomy Expert)",
    },
  };
  const [r, l] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [d, h] = useState(false);
  const [p, x] = useState(false);
  const [y, b] = useState(null);
  const [E, T] = useState<Record<string, any>>({});
  const j = (q) => {
    const { name: K, value: Q } = q.target;
    l((ne) => ({
      ...ne,
      [K]: Q,
    }));
    if (E[K]) {
      T((ne) => {
        const fe = {
          ...ne,
        };
        delete fe[K];
        return fe;
      });
    }
  };
  const L = () => {
    const q: Record<string, string> = {};
    if (!r.name.trim()) {
      q.name = translations.valRequired[n];
    }
    if (!r.subject.trim()) {
      q.subject = translations.valRequired[n];
    }
    if (!r.message.trim()) {
      q.message = translations.valRequired[n];
    }
    if (r.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email)) {
        q.email = translations.valEmail[n];
      }
    } else {
      q.email = translations.valRequired[n];
    }
    T(q);
    return Object.keys(q).length === 0;
  };
  const z = async (q) => {
    q.preventDefault();
    b(null);
    if (L()) {
      x(true);
      try {
        await addDoc(collection(db, "contacts"), {
          name: r.name,
          email: r.email,
          subject: r.subject,
          message: r.message,
          timestamp: serverTimestamp(),
        });
        h(true);
        l({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } catch (K) {
        console.error("Error submitting contact inquiry: ", K);
        b(
          n === "om"
            ? "Ergaa erguun hin danda'amne. Maaloo booda irra deebi'aa yaalaa."
            : n === "am"
              ? "መልዕክቱን መላክ አልተቻለም። እባክዎ ቆይተው እንደገና ይሞክሩ።"
              : "Failed to send message. Please try again later.",
        );
      } finally {
        x(false);
      }
    }
  };
  return (
    <section
      className="bg-gradient-to-br from-white via-emerald-50/15 to-white py-12 md:py-16 shadow-[0_0_50px_rgba(16,185,129,0.05)_inset] border-t border-emerald-100"
      id="contact-us-section"
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-white border border-emerald-100/100 text-[#054823] text-xs font-bold uppercase tracking-widest">
            {n === "om"
              ? "Quunnamtii Damee"
              : n === "am"
                ? "የቅርንጫፍ መረጃ"
                : "Branch Contacts"}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#054823] tracking-tight font-sans">
            {translations.contactHeader[n]}
          </h2>
          <p className="text-base text-gray-600 font-medium leading-relaxed">
            {translations.contactSubtitle[n]}
          </p>
        </div>
        <div className="w-full max-w-5xl mx-auto space-y-12">
          <div className="w-full space-y-8" id="contact-info-column">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-xs space-y-6 flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
                  <div>
                    <span className="text-[9px] font-extrabold text-[#054823] bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider block w-max mb-1">
                      {n === "om"
                        ? "DIRIIRSA HAWAASUMMAA"
                        : n === "am"
                          ? "ባለብዙ ቅርንጫፍ"
                          : "Branch Networks"}
                    </span>
                    <h3 className="text-sm font-black text-emerald-950 uppercase tracking-wider">
                      {n === "om"
                        ? "Filannoo Damee"
                        : n === "am"
                          ? "የቅርንጫፍ መቆጣጠሪያ"
                          : "Select Branch Office"}
                    </h3>
                  </div>
                  <div className="flex gap-1 bg-emerald-50 p-1 rounded-xl w-max border border-emerald-100/100">
                    <button
                      type="button"
                      onClick={() => t("hq")}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer ${e === "hq" ? "bg-[#054823] text-white shadow-xs" : "text-emerald-800 hover:bg-emerald-100/50"}`}
                    >
                      HQ
                    </button>
                    <button
                      type="button"
                      onClick={() => t("wonji")}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer ${e === "wonji" ? "bg-[#054823] text-white shadow-xs" : "text-emerald-800 hover:bg-emerald-100/50"}`}
                    >
                      Wonji
                    </button>
                    <button
                      type="button"
                      onClick={() => t("lume")}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer ${e === "lume" ? "bg-[#054823] text-white shadow-xs" : "text-emerald-800 hover:bg-emerald-100/50"}`}
                    >
                      Lume
                    </button>
                  </div>
                </div>
                <div className="space-y-4 text-left">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      {c.jsx(MapPin, {
                        className: "w-5 h-5 text-[#054823]",
                      })}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                        {n === "om"
                          ? "Teessoo Ibsamaa"
                          : n === "am"
                            ? "ዝርዝር አድራሻ"
                            : "Physical Address"}
                      </h4>
                      <p className="text-xs text-emerald-950 font-semibold leading-relaxed">
                        {s[e].address[n]}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      {c.jsx(Phone, {
                        className: "w-5 h-5 text-[#054823]",
                      })}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                        {n === "om"
                          ? "Bilbila damee"
                          : n === "am"
                            ? "ስልክ ቁጥር"
                            : "Direct Phone Contact"}
                      </h4>
                      <p className="text-xs text-emerald-950 font-mono font-bold">
                        {s[e].phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      {c.jsx(Mail, {
                        className: "w-5 h-5 text-[#054823]",
                      })}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                        {n === "om" ? "Imeelii Damee" : "Email Address"}
                      </h4>
                      <p className="text-xs text-emerald-950 font-semibold font-mono">
                        {s[e].email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#054823]" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                        {n === "om"
                          ? "Sa'aatii Hojii"
                          : n === "am"
                            ? "የስራ ሰዓት"
                            : "Office Business Hours"}
                      </h4>
                      <p className="text-xs text-emerald-950 font-semibold">
                        {s[e].hours[n]}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-xs space-y-1">
                    <span className="text-[9px] font-extrabold text-emerald-850 uppercase tracking-widest block">
                      {n === "om"
                        ? "MILTOO mockEvents MALLATTOO BAKKAA"
                        : n === "am"
                          ? "ታዋቂ ምልክቶች እና አስተባባሪ"
                          : "Local Landmarks & Lead"}
                    </span>
                    <p className="text-emerald-950 font-bold leading-relaxed">
                      <strong>Landmark:</strong> {s[e].landmarks[n]}
                    </p>
                    <p className="text-[11px] text-[#054823] font-extrabold mt-1">
                      <strong>Liaison Lead:</strong> {s[e].liaison}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="min-h-[380px] h-full rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50/40 via-white to-emerald-100/20 border-2 border-emerald-300/80 relative group shadow-md shadow-emerald-50 flex flex-col justify-between"
                id="mock-map-frame-element"
              >
                <div className="absolute inset-0 bg-emerald-50/40 grid grid-cols-8 grid-rows-6 gap-0 opacity-55 pointer-events-none">
                  {Array.from({
                    length: 48,
                  }).map((q, K) => (
                    <div
                      className="border-[0.5px] border-emerald-200/40"
                      key={K}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center flex-col p-6 text-center z-10 transition-all duration-300">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-emerald-400 rounded-full opacity-35 animate-ping" />
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg relative border border-white">
                      {c.jsx(MapPin, {
                        className: "w-6 h-6 animate-pulse",
                      })}
                    </div>
                  </div>
                  <h4 className="text-xs font-black text-emerald-950 uppercase tracking-widest mt-5">
                    {s[e].title[n]}
                  </h4>
                  <p className="text-[11px] text-emerald-600 font-mono font-extrabold tracking-wider leading-none mt-1.5 uppercase">
                    GPS: {s[e].gps}
                  </p>
                  <p className="text-[10px] text-gray-500 font-bold max-w-xs mx-auto leading-relaxed mt-2 uppercase">
                    {s[e].landmarks[n]}
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${e === "hq" ? "Adama" : e === "wonji" ? "Wonji" : "Mojo"}+Oromia+Ethiopia`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-md hover:shadow-emerald-100"
                  >
                    <span>Open Interactive Map</span>
                  </a>
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 rounded-xl border border-emerald-200 backdrop-blur-xs z-20 shadow-md">
                  <div className="flex items-center justify-between text-[9px] font-extrabold text-emerald-800 uppercase tracking-wider">
                    <span>{s[e].title[n]}</span>
                    <span className="text-emerald-600 font-black uppercase bg-emerald-50 px-2 py-0.5 rounded">
                      ONLINE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full" id="contact-form-column">
            <AnimatePresence mode="wait">
              {d ? (
                <motion.div
                  className="bg-emerald-50/20 rounded-3xl border border-emerald-100 p-8 text-center space-y-6"
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  key="success"
                >
                  <div className="w-16 h-16 rounded-full bg-white border border-emerald-100 flex items-center justify-center mx-auto">
                    {c.jsx(CheckCircle2, {
                      className: "w-10 h-10 text-emerald-600",
                    })}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-emerald-950 font-sans tracking-tight">
                      {n === "om"
                        ? "Ergaan Keessan Milkiin Ergameera"
                        : n === "am"
                          ? "መልዕክትዎ በሰላም ደርሷል"
                          : "Message Transmitted Securely"}
                    </h3>
                    <p className="text-xs text-emerald-800/70 font-semibold leading-relaxed max-w-sm mx-auto">
                      {translations.contactFormSuccess[n]}
                    </p>
                  </div>
                  <button
                    onClick={() => h(false)}
                    className="inline-flex items-center justify-center bg-white border border-emerald-150 text-emerald-800 text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-emerald-50 transition uppercase cursor-pointer"
                  >
                    {n === "om"
                      ? "Ergaa Birra Barressi"
                      : n === "am"
                        ? "ሌላ መልዕክት ይጻፉ"
                        : "Write Another Message"}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={z}
                  className="bg-white rounded-3xl border border-emerald-100 p-8 space-y-6 text-left shadow-xs w-full"
                  initial={{
                    opacity: 0,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  key="form"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                      {n === "om"
                        ? "Guulaa Ergaa"
                        : n === "am"
                          ? "የመልዕክት ቅጽ"
                          : "Communication Portal"}
                    </span>
                    <h3 className="text-lg font-bold text-emerald-950 font-sans tracking-tight">
                      {n === "om"
                        ? "Liigiin Nuyi Quunnamaa"
                        : n === "am"
                          ? "የቀጥታ መልዕክት መጻፊያ"
                          : "Direct Message Terminal"}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1 col-span-1">
                      <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                        {translations.contribFormName[n]} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={r.name}
                        onChange={j}
                        className="w-full text-xs font-semibold px-4 py-3.5 rounded-xl border border-emerald-100 focus:outline-[1.5px] focus:outline-emerald-500 bg-emerald-50/20"
                        placeholder="Darrajee Solomoon"
                      />
                      {E.name && (
                        <p className="text-[10px] text-red-500 font-semibold">
                          {E.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1 col-span-1">
                      <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                        {translations.contribFormEmail[n]} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={r.email}
                        onChange={j}
                        className="w-full text-xs font-semibold px-4 py-3.5 rounded-xl border border-emerald-100 focus:outline-[1.5px] focus:outline-emerald-500 bg-emerald-50/20"
                        placeholder="darrajee@gmail.com"
                      />
                      {E.email && (
                        <p className="text-[10px] text-red-500 font-semibold">
                          {E.email}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1 col-span-1 md:col-span-2">
                      <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                        {translations.contactFormSubject[n]} *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={r.subject}
                        onChange={j}
                        className="w-full text-xs font-semibold px-4 py-3.5 rounded-xl border border-emerald-100 focus:outline-[1.5px] focus:outline-emerald-500 bg-emerald-50/20"
                        placeholder="Inquiry or Partnership details"
                      />
                      {E.subject && (
                        <p className="text-[10px] text-red-500 font-semibold">
                          {E.subject}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1 col-span-1 md:col-span-2">
                      <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                        {translations.contactFormMessage[n]} *
                      </label>
                      <textarea
                        rows={5}
                        name="message"
                        value={r.message}
                        onChange={j}
                        className="w-full text-xs font-semibold px-4 py-3.5 rounded-xl border border-emerald-100 focus:outline-[1.5px] focus:outline-emerald-500 bg-emerald-50/20"
                        placeholder="Enter description here..."
                      />
                      {E.message && (
                        <p className="text-[10px] text-red-500 font-semibold">
                          {E.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-emerald-50">
                    {y && (
                      <p className="text-xs text-red-600 font-bold bg-red-50 p-3 rounded-xl border border-red-100 uppercase tracking-wide flex items-center justify-center gap-1.5">
                        {c.jsx(AlertCircle, {
                          className: "w-4 h-4 shrink-0 text-red-600",
                        })}
                        <span>{y}</span>
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={p}
                      style={{
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                      }}
                      className={`w-full inline-flex items-center justify-center gap-2 text-white font-extrabold text-xs py-4 px-6 rounded-xl hover:shadow-lg transition-all cursor-pointer uppercase ${p ? "bg-emerald-400 cursor-not-allowed" : "bg-[#16A34A] hover:bg-[#15803D]"}`}
                    >
                      {p ? (
                        <React.Fragment>
                          {c.jsx(Loader2, {
                            className: "w-4 h-4 animate-spin",
                          })}
                          <span>
                            {n === "om"
                              ? "Ergamaa Jira..."
                              : n === "am"
                                ? "እየተላከ ነው..."
                                : "Transmitting..."}
                          </span>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {c.jsx(Send, {
                            className: "w-4 h-4",
                          })}
                          <span>{translations.contactFormSubmit[n]}</span>
                        </React.Fragment>
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-emerald-800/100 uppercase tracking-widest font-extrabold">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Administrative safety registered encryption</span>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
