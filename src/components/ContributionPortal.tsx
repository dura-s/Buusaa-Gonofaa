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

interface ContributionPortalProps {
  language: Language;
  campaigns?: any[];
  onContribute?: (...args: any[]) => void;
  preselectedCampaign?: any;
  onResetPreselectedCampaign?: () => void;
}
export default function ContributionPortal({
  language: n,
  campaigns: e,
  onContribute: t,
}: ContributionPortalProps) {
  var Ge;
  const s = e || mockCampaigns;
  const [r, l] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    amount: "",
    paymentMethod: "cbe",
    isDiaspora: false,
    selectedCampaignId:
      ((Ge = s[0]) == null ? undefined : Ge.id) || mockCampaigns[0].id,
    transactionId: "",
    receiptFile: null,
  });
  const [d, h] = useState("form");
  const [p, x] = useState<Record<string, any>>({});
  const [y, b] = useState(null);
  const [E, T] = useState(false);
  const [j, L] = useState(null);
  const [z, q] = useState(false);
  const K = (U, le) => {
    navigator.clipboard.writeText(U);
    L(le);
    setTimeout(() => L(null), 2000);
  };
  const Q = (U) => {
    const { name: le, value: oe, type: ve } = U.target;
    const ke = ve === "checkbox" ? U.target.checked : false;
    l((B) => ({
      ...B,
      [le]: ve === "checkbox" ? ke : oe,
    }));
    if (p[le]) {
      x((B) => {
        const re = {
          ...B,
        };
        delete re[le];
        return re;
      });
    }
  };
  const ne = (U) => {
    l((le) => ({
      ...le,
      selectedCampaignId: U,
    }));
  };
  const fe = (U) => {
    U.preventDefault();
    const le: Record<string, string> = {};
    if (!r.name.trim()) {
      le.name = translations.valRequired[n];
    }
    if (r.phone.trim()) {
      if (!/^\+?[0-9]{9,15}$/.test(r.phone.replace(/\s/g, ""))) {
        le.phone = translations.valPhone[n];
      }
    } else {
      le.phone = translations.valRequired[n];
    }
    if (r.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email)) {
        le.email = translations.valEmail[n];
      }
    } else {
      le.email = translations.valRequired[n];
    }
    if (!r.reason.trim()) {
      le.reason =
        n === "om"
          ? "Sababa gumaachaa ibsuun dirqama"
          : n === "am"
            ? "እባክዎ መነሻ ምክንያትዎን ይግለጹ"
            : "Please provide a reason or comment for funding";
    }
    if (!r.amount || Number(r.amount) <= 0) {
      le.amount =
        n === "om"
          ? "Hamma gumaachaa galchuun dirqama"
          : n === "am"
            ? "እባክዎ ትክክለኛ የድጋፍ መጠን ያስገቡ"
            : "Please specify a valid contribution amount";
    }
    x(le);
    if (Object.keys(le).length === 0) {
      h("verification");
    }
  };
  const pe = async (U) => {
    U.preventDefault();
    b(null);
    if (!r.transactionId.trim()) {
      x({
        transactionId:
          n === "om"
            ? "Koodii Dabarsaa (Transaction ID) galchuun dirqama"
            : n === "am"
              ? "እባክዎ የማስተላለፊያ መለያ ቁጥር (Transaction ID) ያስገቡ"
              : "Please enter your Transaction Reference ID / Reference Number",
      });
      return;
    }
    x({});
    h("submitting");
    try {
      await addDoc(collection(db, "contributions"), {
        name: r.name,
        email: r.email,
        phone: r.phone,
        reason: r.reason,
        amount: Number(r.amount) || 1000,
        paymentMethod: r.paymentMethod,
        isDiaspora: r.isDiaspora,
        selectedCampaignId: r.selectedCampaignId,
        transactionId: r.transactionId,
        receiptFileName: r.receiptFile ? r.receiptFile.name : null,
        timestamp: serverTimestamp(),
      });
      if (t) {
        const le = Number(r.amount) || 1000;
        const oe =
          n === "om"
            ? "Arjoomaa Dhoksaa"
            : n === "am"
              ? "ሚስጥራዊ ለጋሽ"
              : "Secret Donor";
        t(r.selectedCampaignId, le, oe, r.paymentMethod);
      }
      h("success");
    } catch (le) {
      console.error("Error saving contribution: ", le);
      b(
        n === "om"
          ? "Gumaacha keessan galmeessuun hin danda'amne. Maaloo irra deebi'aa yaalaa."
          : n === "am"
            ? "ያደረጉትን የድጋፍ መረጃ ለመመዝገብ አልተቻለም። እባክዎ እንደገና ይሞክሩ።"
            : "Unable to save contribution record. Please try again later.",
      );
      h("verification");
    }
  };
  const M = (U) => {
    U.preventDefault();
    U.stopPropagation();
    if (U.type === "dragenter" || U.type === "dragover") {
      T(true);
    } else if (U.type === "dragleave") {
      T(false);
    }
  };
  const S = (U) => {
    U.preventDefault();
    U.stopPropagation();
    T(false);
    if (U.dataTransfer.files && U.dataTransfer.files[0]) {
      l((le) => ({
        ...le,
        receiptFile: U.dataTransfer.files[0],
      }));
    }
  };
  const R = (U) => {
    if (U.target.files && U.target.files[0]) {
      l((le) => ({
        ...le,
        receiptFile: U.target.files[0],
      }));
    }
  };
  const k =
    s.find((U) => U.id === r.selectedCampaignId) || s[0] || mockCampaigns[0];
  const O = (U, le) => {
    if (!le || le <= 0 || !U || U <= 0) {
      return 0;
    }
    const oe = (U / le) * 100;
    if (oe < 1) {
      return Number(oe.toFixed(2));
    } else {
      return Math.min(Math.round(oe), 100);
    }
  };
  const V = (U) =>
    new Intl.NumberFormat(n === "en" ? "en-US" : "am-ET", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 0,
    }).format(U);
  const D = {
    cbe: {
      bankName: "Commercial Bank of Ethiopia (CBE)",
      accName: "Buusaa Gonofaa Oromiyaa - Damee Adamaa",
      accNumber: "1000293102391",
    },
    sinqe: {
      bankName: "Siinqee Bank (Baankii Siinqee)",
      accName: "Buusaa Gonofaa Oromiyaa - Damee Adamaa",
      accNumber: "1019283110293",
    },
    cbe_birr: {
      bankName: "CBE Birr Mobile Banking",
      merchantCode: "818290",
      accName: "Buusaa Gonofaa Adama",
    },
    telebirr: {
      bankName: "telebirr Quick Pay",
      merchantId: "BG-992811",
      accName: "Buusaa Gonofaa Oromiyaa",
    },
    paypal: {
      provider: "PayPal Secured Global Gateway",
      account: "donations@buusaagonofaa-oromiyaa.org",
    },
  };
  const Te = {
    om: {
      thankYou: "Gumaachikeessan Milkaayinaan Xumurameera!",
      motivate:
        "Deeggarsa gumaacha keessanii fi kabaja aadaa Gadaa gootaniif guddoo galatoomaa! Gumaachi keessan qonnatota fi hawaasa maraaf rirriittii gaariidha. Kaayyoo keessan haala gaariin dhalootaaf ni herregna.",
      secureMsg:
        "Mirkaneessaan koodii dabarsa keessanii hoggansa CBE / telebirr waliin mirkanaa'eera. Gadaa haa bulu!",
    },
    am: {
      thankYou: "ድጋፍዎ በስኬት ተጠናቅቋል! እናመሰግናለን",
      motivate:
        "ስለ ደግነትዎ እና ማህበራዊ አጋርነትዎ የቡሳ ጎኖፋ አዳማ ቅርንጫፍ ከልብ ያመሰግናል። ያደረጉት ድጋፍ አባላትን፣ አርሶ አደሮችንና አቅመ ደካሞችን በዘላቂነት ለማቋቋም ይውላል። አብረን እንድንበለጽግ ያግዘናል!",
      secureMsg:
        "የማስተላለፊያ መረጃዎ በስኬት ተመዝግቧል። ደህንነቱ የተጠበቀ የባንክ ድልድይ ኤፒአይ (Unified Bank API) ማረጋገጫ ተልኳል።",
    },
    en: {
      thankYou: "Solidarity Contribution Successfully Completed!",
      motivate:
        "We deeply appreciate your generous funding and noble support! Your social solidarity directly strengthens our cooperative network and secures prosperous lives for local farmers and micro-enterprises in the Adama region.",
      secureMsg:
        "Handshake completed securely. Electronic transaction hash authenticated against core commercial banks.",
    },
  };
  return (
    <section
      className="bg-gradient-to-br from-white via-emerald-50/15 to-white py-12 md:py-16 shadow-[0_0_50px_rgba(16,185,129,0.05)_inset] border-t border-emerald-100"
      id="contributions-portal-section"
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-white border border-emerald-100/100 text-[#054823] text-xs font-bold uppercase tracking-widest">
            {n === "om"
              ? "Mootii Gumaachaa"
              : n === "am"
                ? "የዲያስፖራ ፈንድ"
                : "Solidarity Funds"}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#054823] tracking-tight font-sans">
            {translations.contribTitle[n]}
          </h2>
          <p className="text-base text-gray-600 font-medium leading-relaxed">
            {translations.contribSubtitle[n]}
          </p>
        </div>
        <div className="space-y-10">
          <div className="space-y-6" id="campaigns-progress-column">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-100 pb-3">
              <h3 className="text-sm font-extrabold text-emerald-950 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block" />
                <span>
                  {n === "om"
                    ? "Filannoowwan Duulota Gumaachaa"
                    : n === "am"
                      ? "ለመደገፍ የፈለጉትን የዕርዳታ መስክ ይምረጡ"
                      : "Choose Target Funding Priority"}
                </span>
              </h3>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-emerald-105 border-emerald-100 text-[11px] font-bold text-[#054823]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {n === "om"
                    ? "Mirkaneessaa Wabii Adamaa"
                    : n === "am"
                      ? "የቅርንጫፉ ህጋዊ ደህንነት ዋስትና"
                      : "Secured Administrative Routing"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {s.map((U) => {
                const le = r.selectedCampaignId === U.id;
                const oe = O(U.raisedAmount, U.goalAmount);
                return (
                  <div
                    onClick={() => {
                      if (d === "form") {
                        ne(U.id);
                      }
                    }}
                    className={`p-6 rounded-3xl border transition-all duration-300 text-left flex flex-col justify-between ${d !== "form" ? "opacity-60 cursor-not-allowed" : "cursor-pointer"} ${le ? "border-[#054823] bg-white ring-4 ring-[#054823]/5 shadow-md font-bold" : "border-emerald-100 bg-white hover:border-emerald-200"}`}
                    id={`camp-card-${U.id}`}
                    key={U.id}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[10px] font-extrabold text-[#054823] bg-emerald-50 px-2.5 py-1 rounded-md uppercase tracking-wide">
                          {U.badge[n]}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-emerald-950 tracking-tight">
                        {U.title[n]}
                      </h4>
                      <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                        {U.description[n]}
                      </p>
                    </div>
                    <div className="pt-4 mt-3 border-t border-emerald-50 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-extrabold uppercase">
                        <span className="text-gray-500">
                          {n === "om"
                            ? "Baha Gumaachaa"
                            : n === "am"
                              ? "የተሰበሰበ መጠን"
                              : "Progress"}
                        </span>
                        <span className="text-emerald-800 font-mono font-black">
                          {oe}%
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-100">
                        <div
                          className="bg-gradient-to-r from-emerald-600 to-emerald-500 h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${Math.min(Math.max(oe, U.raisedAmount > 0 ? 2 : 0), 100)}%`,
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-gray-600 font-bold pt-0.5">
                        <span className="text-emerald-900 font-black">
                          {V(U.raisedAmount)}
                        </span>
                        <span className="text-gray-400">{V(U.goalAmount)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full" id="form-contribute-column">
            <AnimatePresence mode="wait">
              {d === "form" ? (
                <motion.div
                  className="bg-white rounded-3xl border border-emerald-100 p-8 space-y-6 text-left shadow-xs"
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -15,
                  }}
                  key="sponsor-form"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-[#054823] uppercase tracking-widest">
                      {n === "om"
                        ? "Oduu Deeggarsaa Mirkaneessi"
                        : n === "am"
                          ? "የዕርዳታ ቅጽ ማውጫ"
                          : "Sponsor Information Portal"}
                    </span>
                    <h3 className="text-lg font-bold text-[#054823] font-sans tracking-tight">
                      {n === "om"
                        ? "Gumaacha Garee: "
                        : n === "am"
                          ? "የተመረጠው የድጋፍ መስክ፡ "
                          : "Target Category: "}{" "}
                      {k.title[n]}
                    </h3>
                  </div>
                  <form onSubmit={fe} className="space-y-5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                        {n === "om"
                          ? "Maqaa Gumaachaa"
                          : n === "am"
                            ? "የለጋሽ/ስፖንሰር ሙሉ ስም"
                            : "Sponsor / Contributor Name"}{" "}
                        *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={r.name}
                        onChange={Q}
                        className="w-full text-base sm:text-xs font-semibold px-4 py-3.5 rounded-xl border border-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 focus:border-emerald-500 bg-white transition-all shadow-xs hover:shadow-sm"
                        placeholder=""
                      />
                      {p.name && (
                        <p className="text-[10px] text-red-500 font-bold">
                          {p.name}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                          {translations.contribFormPhone[n]} *
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={r.phone}
                          onChange={Q}
                          className="w-full text-base sm:text-xs font-semibold px-4 py-3.5 rounded-xl border border-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 focus:border-emerald-500 bg-white transition-all shadow-xs hover:shadow-sm"
                          placeholder=""
                        />
                        {p.phone && (
                          <p className="text-[10px] text-red-500 font-bold">
                            {p.phone}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                          {translations.contribFormEmail[n]} *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={r.email}
                          onChange={Q}
                          className="w-full text-base sm:text-xs font-semibold px-4 py-3.5 rounded-xl border border-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 focus:border-emerald-500 bg-white transition-all shadow-xs hover:shadow-sm"
                          placeholder=""
                        />
                        {p.email && (
                          <p className="text-[10px] text-red-500 font-bold">
                            {p.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                          {n === "om"
                            ? "Hamma Gumaachaa"
                            : n === "am"
                              ? "የድጋፍ መጠን"
                              : "Contribution Amount"}{" "}
                          *
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          name="amount"
                          value={r.amount}
                          onChange={Q}
                          min="10"
                          step="50"
                          className="w-full text-sm font-extrabold px-4 py-3.5 pl-10 rounded-xl border border-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 focus:border-emerald-500 bg-white transition-all shadow-xs"
                          placeholder={
                            n === "om"
                              ? "Hamma galchi..."
                              : n === "am"
                                ? "መጠኑን ያስገቡ..."
                                : "Enter amount..."
                          }
                        />
                        {c.jsx(Coins, {
                          className:
                            "w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2",
                        })}
                      </div>
                      {p.amount && (
                        <p className="text-[10px] text-red-500 font-bold">
                          {p.amount}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                        {n === "om"
                          ? "Sababa/Kaayyoo Gumaacha Kee"
                          : n === "am"
                            ? "ድጋፍ የሚያደርጉበት ዓላማ / መነሻ ምክንያት"
                            : "What is your purpose or reason for funding?"}{" "}
                        *
                      </label>
                      <textarea
                        name="reason"
                        rows={3}
                        value={r.reason}
                        onChange={Q}
                        className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 focus:border-emerald-500 bg-white transition-all shadow-xs hover:shadow-sm"
                        placeholder=""
                      />
                      {p.reason && (
                        <p className="text-[10px] text-red-500 font-bold">
                          {p.reason}
                        </p>
                      )}
                    </div>
                    <div className="p-3.5 bg-emerald-50 rounded-xl flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="isDiaspora"
                        id="isDiaspora"
                        checked={r.isDiaspora}
                        onChange={(U) => {
                          l((le) => ({
                            ...le,
                            isDiaspora: U.target.checked,
                            paymentMethod: U.target.checked ? "paypal" : "cbe",
                          }));
                        }}
                        className="w-4 h-4 rounded-xs border-emerald-200 text-[#054823] focus:ring-[#054823]"
                      />
                      <label
                        htmlFor="isDiaspora"
                        className="text-xs font-bold text-emerald-950 cursor-pointer select-none"
                      >
                        {n === "om"
                          ? "Ani Hawaasa Diaspora dha (Biyya alaa jiru)"
                          : n === "am"
                            ? "እኔ የውጭ አካል ነኝ (ዲያስፖራ/Diaspora)"
                            : "Sponsoring from another country (Diaspora)?"}
                      </label>
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                        {n === "om"
                          ? "Karaa Kaffaltii Filadhu"
                          : n === "am"
                            ? "ለመደገፍ የሚጠቀሙበት የባንክ ሥርዓተ ሥልት ይምረጡ"
                            : "Select Funding Account / Payment Gateway Option"}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                        {r.isDiaspora ? null : (
                          <React.Fragment>
                            <button
                              type="button"
                              onClick={() =>
                                l((U) => ({
                                  ...U,
                                  paymentMethod: "cbe",
                                }))
                              }
                              className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${r.paymentMethod === "cbe" ? "border-[#054823] bg-emerald-50/40 text-emerald-950 ring-2 ring-[#054823]/10" : "border-emerald-100 bg-white hover:border-emerald-200"}`}
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-850 px-1.5 py-0.5 rounded text-center shrink-0">
                                CBE
                              </span>
                              <span className="text-[10px] font-extrabold mt-2 text-slate-800 leading-tight">
                                CBE Bank
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                l((U) => ({
                                  ...U,
                                  paymentMethod: "sinqe",
                                }))
                              }
                              className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${r.paymentMethod === "sinqe" ? "border-[#054823] bg-emerald-50/40 text-emerald-950 ring-2 ring-[#054823]/10" : "border-emerald-100 bg-white hover:border-emerald-200"}`}
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded text-center shrink-0">
                                Siinqee
                              </span>
                              <span className="text-[10px] font-extrabold mt-2 text-slate-800 leading-tight">
                                Siinqee Bank
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                l((U) => ({
                                  ...U,
                                  paymentMethod: "cbe_birr",
                                }))
                              }
                              className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${r.paymentMethod === "cbe_birr" ? "border-[#054823] bg-emerald-50/40 text-emerald-950 ring-2 ring-[#054823]/10" : "border-emerald-100 bg-white hover:border-emerald-200"}`}
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded text-center shrink-0">
                                CBE Birr
                              </span>
                              <span className="text-[10px] font-extrabold mt-2 text-slate-800 leading-tight">
                                CBE Birr
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                l((U) => ({
                                  ...U,
                                  paymentMethod: "telebirr",
                                }))
                              }
                              className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${r.paymentMethod === "telebirr" ? "border-[#054823] bg-emerald-50/40 text-emerald-950 ring-2 ring-[#054823]/10" : "border-emerald-100 bg-white hover:border-emerald-200"}`}
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-105 bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-center shrink-0">
                                telebirr
                              </span>
                              <span className="text-[10px] font-extrabold mt-2 text-slate-800 leading-tight">
                                telebirr
                              </span>
                            </button>
                          </React.Fragment>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            l((U) => ({
                              ...U,
                              paymentMethod: "paypal",
                            }))
                          }
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${r.paymentMethod === "paypal" ? "border-[#054823] bg-emerald-50/40 text-emerald-950 ring-2 ring-[#054823]/10" : "border-emerald-100 bg-white hover:border-emerald-200"} ${r.isDiaspora ? "col-span-full" : ""}`}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-900 px-1.5 py-0.5 rounded text-center shrink-0">
                            PayPal
                          </span>
                          <span className="text-[10px] font-extrabold mt-2 text-slate-800 leading-tight">
                            PayPal
                          </span>
                        </button>
                      </div>
                      <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100/100 mt-2 space-y-3">
                        <div className="flex items-center gap-2 border-b border-emerald-100 pb-2">
                          {c.jsx(Landmark, {
                            className: "w-4 h-4 text-[#054823]",
                          })}
                          <span className="text-[10px] font-extrabold text-[#054823] uppercase tracking-wider">
                            {n === "om"
                              ? "Teessoo Mirkaneessa Herrega Saanduuqa"
                              : n === "am"
                                ? "የተመረጠው ኦፊሴላዊ የክፍያ ሂሳብ መረጃ"
                                : "Active Settlement Bank Account Details"}
                          </span>
                        </div>
                        {r.paymentMethod === "cbe" && (
                          <div className="text-[11.5px] space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">
                                Bank Name
                              </span>
                              <span className="font-bold text-emerald-950">
                                {D.cbe.bankName}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">
                                Account Name
                              </span>
                              <span className="font-extrabold text-emerald-950">
                                {D.cbe.accName}
                              </span>
                            </div>
                            <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-emerald-100">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">
                                Account Number
                              </span>
                              <span className="font-mono font-extrabold text-[#054823] text-xs">
                                {D.cbe.accNumber}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => K(D.cbe.accNumber, "cbe_acc")}
                              className="text-[10px] text-[#054823] font-bold uppercase tracking-wider hover:text-emerald-900 inline-flex items-center gap-1 mt-1 justify-end w-full cursor-pointer"
                            >
                              {j === "cbe_acc" ? (
                                <React.Fragment>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />{" "}
                                  <span>Account Copied!</span>
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <Copy className="w-3.5 h-3.5" />{" "}
                                  <span>Click to Copy Account</span>
                                </React.Fragment>
                              )}
                            </button>
                          </div>
                        )}
                        {r.paymentMethod === "sinqe" && (
                          <div className="text-[11.5px] space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">
                                Bank Name
                              </span>
                              <span className="font-bold text-emerald-950">
                                {D.sinqe.bankName}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">
                                Account Name
                              </span>
                              <span className="font-extrabold text-emerald-950">
                                {D.sinqe.accName}
                              </span>
                            </div>
                            <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-emerald-100">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">
                                Account Number
                              </span>
                              <span className="font-mono font-extrabold text-[#054823] text-xs">
                                {D.sinqe.accNumber}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => K(D.sinqe.accNumber, "sinqe_acc")}
                              className="text-[10px] text-[#054823] font-bold uppercase tracking-wider hover:text-emerald-900 inline-flex items-center gap-1 mt-1 justify-end w-full cursor-pointer"
                            >
                              {j === "sinqe_acc" ? (
                                <React.Fragment>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />{" "}
                                  <span>Account Copied!</span>
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <Copy className="w-3.5 h-3.5" />{" "}
                                  <span>Click to Copy Account</span>
                                </React.Fragment>
                              )}
                            </button>
                          </div>
                        )}
                        {r.paymentMethod === "cbe_birr" && (
                          <div className="text-[11.5px] space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">
                                Platform
                              </span>
                              <span className="font-bold text-emerald-950">
                                {D.cbe_birr.bankName}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">
                                Account Name
                              </span>
                              <span className="font-extrabold text-emerald-950">
                                {D.cbe_birr.accName}
                              </span>
                            </div>
                            <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-emerald-100">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">
                                Merchant Code
                              </span>
                              <span className="font-mono font-extrabold text-[#054823] text-xs">
                                {D.cbe_birr.merchantCode}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 justify-end mt-2">
                              <button
                                type="button"
                                onClick={() =>
                                  K(D.cbe_birr.merchantCode, "cb_merch")
                                }
                                className="text-[10px] text-emerald-700 font-black hover:text-emerald-900 flex items-center gap-1 bg-white border border-emerald-100 px-2.5 py-1.5 rounded-lg cursor-pointer"
                              >
                                {j === "cb_merch" ? (
                                  <React.Fragment>
                                    <Check className="w-3 h-3 text-emerald-600" />{" "}
                                    Copied!
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    <Copy className="w-3 h-3" /> Copy Code
                                  </React.Fragment>
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => q(true)}
                                className="text-[10px] text-emerald-700 font-black hover:text-emerald-900 flex items-center gap-1 bg-white border border-emerald-100 px-2.5 py-1.5 rounded-lg cursor-pointer"
                              >
                                <Smartphone className="w-3 h-3 text-emerald-600" />{" "}
                                Dial USSD
                              </button>
                            </div>
                          </div>
                        )}
                        {r.paymentMethod === "telebirr" && (
                          <div className="text-[11.5px] space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">
                                Platform
                              </span>
                              <span className="font-bold text-emerald-950">
                                {D.telebirr.bankName}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">
                                Account Name
                              </span>
                              <span className="font-extrabold text-emerald-950">
                                {D.telebirr.accName}
                              </span>
                            </div>
                            <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-emerald-100">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">
                                Merchant ID
                              </span>
                              <span className="font-mono font-extrabold text-[#054823] text-xs">
                                {D.telebirr.merchantId}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 justify-end mt-2">
                              <button
                                type="button"
                                onClick={() =>
                                  K(D.telebirr.merchantId, "tb_merch")
                                }
                                className="text-[10px] text-emerald-700 font-black hover:text-emerald-900 flex items-center gap-1 bg-white border border-emerald-100 px-2.5 py-1.5 rounded-lg cursor-pointer"
                              >
                                {j === "tb_merch" ? (
                                  <React.Fragment>
                                    <Check className="w-3 h-3 text-emerald-600" />{" "}
                                    Copied!
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    <Copy className="w-3 h-3" /> Copy ID
                                  </React.Fragment>
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => q(true)}
                                className="text-[10px] text-emerald-700 font-black hover:text-emerald-900 flex items-center gap-1 bg-white border border-emerald-100 px-2.5 py-1.5 rounded-lg cursor-pointer"
                              >
                                <Smartphone className="w-3 h-3 text-emerald-600" />{" "}
                                Dial USSD
                              </button>
                            </div>
                          </div>
                        )}
                        {r.paymentMethod === "paypal" && (
                          <div className="text-[11.5px] space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">
                                Clearing Provider
                              </span>
                              <span className="font-bold text-emerald-950">
                                {D.paypal.provider}
                              </span>
                            </div>
                            <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-emerald-100 shrink-0 overflow-hidden">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">
                                PayPal Email
                              </span>
                              <span className="font-mono font-extrabold text-[#054823] text-[10px] truncate max-w-[190px]">
                                {D.paypal.account}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => K(D.paypal.account, "pp_email")}
                              className="text-[10px] text-[#054823] font-bold uppercase tracking-wider hover:text-emerald-900 inline-flex items-center gap-1 mt-1 justify-end w-full cursor-pointer"
                            >
                              {j === "pp_email" ? (
                                <React.Fragment>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />{" "}
                                  <span>Email Copied!</span>
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <Copy className="w-3.5 h-3.5" />{" "}
                                  <span>Click to Copy Email</span>
                                </React.Fragment>
                              )}
                            </button>
                          </div>
                        )}
                        <div className="text-[10px] text-gray-500 font-semibold leading-relaxed">
                          {n === "om"
                            ? "Kaffaltii keessan herrega qophaaye kanirratti erga kaffaltanii booda, koodii mirkaneessa kaffaltii (Transaction ID) asitti galchuun gumaacha xumuraa."
                            : n === "am"
                              ? "እባክዎ የተጠቀሰውን ክፍያ ከፈጸሙ በኋላ፥ ለማረጋገጫ የተሰጦትን የትራንዛክሽን ቁጥር አስተላልፈው ክፍያዎን ይመዝግቡ።"
                              : "Please process the transfer directly to the official account shown above, then upload/submit your transaction details next."}
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#054823] hover:bg-[#022b14] text-white font-extrabold text-xs py-4 rounded-xl shadow-md tracking-widest hover:shadow-lg transition-all cursor-pointer uppercase mt-6 flex offset items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      <span>
                        {n === "om"
                          ? "Gumaachaa fi Gara Mirkaneessaatti Darbi"
                          : n === "am"
                            ? "ሂሳቡን ልኬያለሁ (ወደ ማረጋገጫ ይለፉ)"
                            : "Proceed to Verification ID receipt"}
                      </span>
                    </button>
                  </form>
                </motion.div>
              ) : d === "verification" ? (
                <motion.div
                  className="bg-white rounded-3xl border border-emerald-100 p-8 space-y-6 text-left shadow-xs"
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
                  key="sponsor-verification"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-red-500 uppercase tracking-widest block">
                      {n === "om"
                        ? "TARKANFII 2: MIRKANEESSA DABARSA HERREGA"
                        : n === "am"
                          ? "ደረጃ 2፡ የገንዘብ ማስተላለፊያ ማረጋገጫ ማስገቢያ ቅጽ"
                          : "STEP 2: TRANSACTION VERIFICATION"}
                    </span>
                    <h3 className="text-lg font-bold text-[#054823] font-sans tracking-tight">
                      {n === "om"
                        ? "Mirkaneessa Koodii ykn Kaffaltii Herregaa"
                        : n === "am"
                          ? "የደረሰኝ እና የማስተላለፊያ ሃሽ መረጃ"
                          : "Transfer Reference & Receipt Upload"}
                    </h3>
                  </div>
                  <form onSubmit={pe} className="space-y-5">
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs">
                      <div className="text-left">
                        <span className="text-[9.5px] uppercase font-bold text-gray-500 block">
                          Sponsor Destination Account
                        </span>
                        <span className="font-extrabold text-emerald-950">
                          {r.paymentMethod === "cbe" && D.cbe.bankName}
                          {r.paymentMethod === "sinqe" && D.sinqe.bankName}
                          {r.paymentMethod === "cbe_birr" &&
                            D.cbe_birr.bankName}
                          {r.paymentMethod === "telebirr" &&
                            D.telebirr.bankName}
                          {r.paymentMethod === "paypal" && D.paypal.provider}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-[#054823] text-white px-2 py-0.5 rounded-md uppercase">
                        {r.paymentMethod.replace("_", " ")}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                        {n === "om"
                          ? "Koodii Mirkaneessa Kaffaltii (Transaction / Reference ID)"
                          : n === "am"
                            ? "የማስተላለፊያ መለያ / ማረጋገጫ ቁጥር (Transaction ID)"
                            : "Transaction ID / Reference ID *"}
                      </label>
                      <input
                        type="text"
                        name="transactionId"
                        value={r.transactionId}
                        onChange={Q}
                        className="w-full text-xs font-semibold px-4 py-3.5 rounded-xl border border-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 focus:border-emerald-500 bg-white transition-all shadow-xs hover:shadow-sm"
                        placeholder=""
                      />
                      {p.transactionId && (
                        <p className="text-[10px] text-red-500 font-bold">
                          {p.transactionId}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                        {n === "om"
                          ? "Ragaa Kaffaltii (Receipt Screenshot / Copy) - Yoo jiraate"
                          : n === "am"
                            ? "የክፍያ ደረሰኝ ፎቶ/ኮፒ (ካለ ያስገቡ)"
                            : "Upload Receipt Screenshot (Optional)"}
                      </label>
                      <div
                        onDragEnter={M}
                        onDragOver={M}
                        onDragLeave={M}
                        onDrop={S}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${E ? "border-emerald-600 bg-emerald-50/20" : "border-emerald-250 border-emerald-200 bg-white hover:border-emerald-400"}`}
                      >
                        <input
                          type="file"
                          id="receipt-file-input"
                          className="hidden"
                          accept="image/*,.pdf"
                          onChange={R}
                        />
                        <label
                          htmlFor="receipt-file-input"
                          className="cursor-pointer flex flex-col items-center justify-center gap-2"
                        >
                          <FileText className="w-8 h-8 text-emerald-600 animate-bounce" />
                          <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                            {r.receiptFile
                              ? r.receiptFile.name
                              : n === "om"
                                ? "Fakkii ragaa kaffaltii asitti darbii ykn filadhu"
                                : "Drag & drop transaction screenshot"}
                          </span>
                          <span className="text-[10px] text-gray-400 font-semibold uppercase">
                            Supports JPG, PNG, PDF up to 5MB
                          </span>
                        </label>
                      </div>
                    </div>
                    {y && (
                      <p className="text-xs text-red-600 font-bold bg-red-50 p-3 rounded-xl border border-red-100 uppercase tracking-wide flex items-center justify-center gap-1.5">
                        {c.jsx(AlertCircle, {
                          className: "w-4 h-4 shrink-0 text-red-600",
                        })}
                        <span>{y}</span>
                      </p>
                    )}
                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => h("form")}
                        className="w-1/3 border border-emerald-200 text-emerald-800 text-xs font-bold py-4 rounded-xl hover:bg-emerald-50 transition duration-150 uppercase tracking-widest cursor-pointer text-center"
                      >
                        {n === "om"
                          ? "Deebi'i"
                          : n === "am"
                            ? "ተመለስ"
                            : "Go Back"}
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 bg-[#054823] hover:bg-[#022b14] text-white font-extrabold text-xs py-4 rounded-xl shadow-md tracking-widest hover:shadow-lg transition-all cursor-pointer uppercase flex items-center justify-center gap-2"
                      >
                        {c.jsx(Send, {
                          className: "w-4 h-4 font-bold",
                        })}
                        <span>
                          {n === "om"
                            ? "Mirkaneessi & Gumaachi"
                            : n === "am"
                              ? "ማረጋገጫ ይላኩ"
                              : "Submit for Verification"}
                        </span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : d === "submitting" ? (
                <motion.div
                  className="bg-white rounded-3xl border border-emerald-100 p-12 text-center space-y-8 shadow-xs flex flex-col items-center justify-center min-h-[400px]"
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
                  key="connecting-state"
                >
                  {c.jsx(Loader2, {
                    className: "w-16 h-16 text-[#054823] animate-spin",
                  })}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-emerald-950 font-sans tracking-tight">
                      {n === "om"
                        ? "Ragaa Kaffaltii Mirkaneessa Jira..."
                        : "Verifying Transaction Credentials securely..."}
                    </h3>
                    <p className="text-xs text-gray-500 font-bold max-w-sm mx-auto uppercase tracking-wide">
                      {n === "om"
                        ? "Eeggadhu, daayireektarii odeeffannoo fi gateway CBE/paypal doqqumentii kee galmeessa jira."
                        : n === "am"
                          ? "እባክዎ ይታገሱ፤ የባንክ ደረሰኝ ማረጋገጫና የመግቢያ መረጃ (Transaction Reference Verification Handshake) በመደረግ ላይ ነው"
                          : "Communicating secure transaction credentials & payload routing with telebirr, CBE & international clearing hubs..."}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-800/80 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      256-bit SHA Encrypted Secure Transaction Handshake
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="bg-white rounded-3xl border border-emerald-100 p-10 text-center space-y-8 shadow-xs max-w-xl mx-auto"
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  key="success-receipt"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                    {c.jsx(CheckCircle2, {
                      className: "w-12 h-12 text-emerald-600 animate-pulse",
                    })}
                  </div>
                  <div className="space-y-3">
                    <span className="text-[9.5px] font-extrabold text-[#054823] bg-emerald-100 px-3.5 py-1 rounded-full uppercase tracking-wider">
                      {n === "om"
                        ? "MILKAA'EERA"
                        : n === "am"
                          ? "በስኬት ተጠናቋል"
                          : "SUCCESSFULLY COMPLETED"}
                    </span>
                    <h3 className="text-2xl font-black text-[#054823] font-sans tracking-tight">
                      {Te[n].thankYou}
                    </h3>
                  </div>
                  <div className="bg-emerald-50/50 p-6 rounded-2xl italic text-xs font-semibold text-[#054823] border-l-4 border-[#054823]/100 text-left leading-relaxed">
                    “{Te[n].motivate}”
                  </div>
                  <div className="p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100 text-[10.5px] font-bold text-[#054823] flex items-start gap-2 text-left">
                    <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{Te[n].secureMsg}</span>
                  </div>
                  <div className="pt-4 flex flex-col justify-center gap-3">
                    <button
                      onClick={() => {
                        var U;
                        h("form");
                        l({
                          name: "",
                          email: "",
                          phone: "",
                          reason: "",
                          paymentMethod: "cbe",
                          isDiaspora: false,
                          selectedCampaignId:
                            ((U = s[0]) == null ? undefined : U.id) || "c1",
                          transactionId: "",
                          receiptFile: null,
                        });
                      }}
                      className="w-full bg-[#054823] hover:bg-[#022b14] text-white font-bold text-xs py-4 rounded-xl hover:shadow-md transition uppercase tracking-wider cursor-pointer"
                    >
                      {n === "om"
                        ? "Kaffaltii Gumaachaa Haaraya"
                        : n === "am"
                          ? "አዲስ ድጋፍ ይጀምሩ"
                          : "Initiate Another Contribution"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {z && (
          <motion.div
            className="fixed inset-0 bg-[#06180e]/65 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full border border-emerald-100 shadow-xl relative text-left"
              initial={{
                scale: 0.95,
                y: 15,
              }}
              animate={{
                scale: 1,
                y: 0,
              }}
              exit={{
                scale: 0.95,
                y: 15,
              }}
            >
              <button
                type="button"
                onClick={() => q(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-emerald-950 hover:bg-emerald-50 rounded-full transition cursor-pointer"
              >
                {c.jsx(X, {
                  className: "w-5 h-5",
                })}
              </button>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-[#054823]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-emerald-950 uppercase tracking-wider">
                    {r.paymentMethod === "cbe_birr"
                      ? "CBE Birr Offline USSD Direct Dial"
                      : "telebirr offline shortcode instruction"}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                    Easy Digital Tool for Offline Contributors
                  </p>
                </div>
                <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100 space-y-3">
                  {r.paymentMethod === "cbe_birr" ? (
                    <div className="space-y-2 text-xs text-slate-850 font-semibold">
                      <div className="flex gap-2 items-start">
                        <span className="font-mono bg-emerald-200 text-emerald-900 w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                          1
                        </span>
                        <span>
                          Dial{" "}
                          <strong className="font-mono text-[#054823] bg-emerald-100/60 px-1.5 py-0.5 rounded">
                            *889#
                          </strong>{" "}
                          on your phone
                        </span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="font-mono bg-emerald-200 text-emerald-900 w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                          2
                        </span>
                        <span>
                          Select option{" "}
                          <strong className="text-[#054823]">3</strong> (Pay
                          Merchant)
                        </span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="font-mono bg-emerald-200 text-emerald-900 w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                          3
                        </span>
                        <span>
                          Enter Merchant Code:{" "}
                          <strong className="font-mono text-[#054823] bg-emerald-100/60 px-1.5 py-0.5 rounded">
                            818290
                          </strong>
                        </span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="font-mono bg-emerald-200 text-emerald-900 w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                          4
                        </span>
                        <span>
                          Enter your donation amount, confirm with your mobile
                          banking PIN.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 text-xs text-slate-850 font-semibold">
                      <div className="p-3 bg-white rounded-lg border border-emerald-100/60 space-y-1">
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">
                          Direct Shortcode Dial
                        </span>
                        <p className="font-mono text-emerald-800 leading-relaxed font-extrabold text-[11px] bg-emerald-50/60 p-1.5 rounded-lg border border-dashed border-emerald-200 break-all select-all">
                          *127*1*1*BG-992811*AMOUNT#
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">
                          Step-By-Step Standard
                        </span>
                        <div className="space-y-1.5 text-[11.5px] leading-relaxed text-slate-700 font-semibold">
                          <p className="flex gap-1.5 items-center">
                            <span className="w-4 h-4 bg-emerald-100 text-[#054823] text-[10px] flex items-center justify-center rounded-full">
                              1
                            </span>{" "}
                            Dial *127# on your mobile
                          </p>
                          <p className="flex gap-1.5 items-center">
                            <span className="w-4 h-4 bg-emerald-100 text-[#054823] text-[10px] flex items-center justify-center rounded-full">
                              2
                            </span>{" "}
                            Choose Option 1 (Pay Merchant)
                          </p>
                          <p className="flex gap-1.5 items-center">
                            <span className="w-4 h-4 bg-emerald-100 text-[#054823] text-[10px] flex items-center justify-center rounded-full">
                              3
                            </span>{" "}
                            Enter Merchant ID:{" "}
                            <strong className="font-mono text-[#054823]">
                              BG-992811
                            </strong>
                          </p>
                          <p className="flex gap-1.5 items-center">
                            <span className="w-4 h-4 bg-emerald-100 text-[#054823] text-[10px] flex items-center justify-center rounded-full">
                              4
                            </span>{" "}
                            Type Amount and input telebirr account PIN.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-[10.5px] text-gray-400 font-bold leading-normal">
                  * All offline donations match immediately inside our
                  administrative database after you type the Transaction
                  reference code in Step 2.
                </div>
                <button
                  type="button"
                  onClick={() => q(false)}
                  className="w-full bg-[#054823] text-white font-extrabold text-xs py-3.5 rounded-xl uppercase tracking-widest transition cursor-pointer"
                >
                  {n === "om"
                    ? "Hubadheera"
                    : n === "am"
                      ? "ተረድቻለሁ"
                      : "Acknowledged"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
