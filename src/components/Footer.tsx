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

interface FooterProps {
  language: Language;
  setActiveTab: (tab: ActiveTab) => void;
}
export default function Footer({ language: n, setActiveTab: e }: FooterProps) {
  const t = (r) => {
    e(r);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer
      className="bg-[#15803D] text-[#F0FDF4] border-t border-emerald-800/50 overflow-hidden"
      id="main-footer-container"
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 font-sans text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 ring-2 ring-white/20 p-0.5">
                <img
                  src={bgLogo}
                  alt="Buusaa Gonofaa Oromiyaa Logo"
                  className="w-full h-full object-contain rounded-full bg-white"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-lg font-black tracking-tight text-white uppercase leading-snug">
                {translations.appName[n]}
              </span>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed font-sans font-semibold">
              {n === "om"
                ? "Nuyi hundaa gargaaruun tokkummaa fi misooma sirna aadaa Gadaatiin fooyya'iinsa fiduuf hojjetna."
                : n === "am"
                  ? "በባህላዊ የገዳ መረዳዳት ህግ መሰረት ለአርሶ አደሩና አቅመ ደካማውን ለማገዝ የሚሰራ ታማኝ ተቋም።"
                  : "Structured offline-first microfinance & agricultural risk adapters delivering stability for East Shewa families."}
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-[#DCFCE7] tracking-widest uppercase">
              {n === "om"
                ? "Kallattii Filannoo"
                : n === "am"
                  ? "አውታረ ድረ ገጾች"
                  : "Quick Navigation"}
            </h4>
            <ul className="space-y-2 text-xs font-extrabold tracking-widest uppercase">
              <li>
                <button
                  onClick={() => t("home")}
                  className="hover:text-white transition-colors text-emerald-100 cursor-pointer text-left"
                >
                  {translations.navHome[n]}
                </button>
              </li>
              <li>
                <button
                  onClick={() => t("services")}
                  className="hover:text-white transition-colors text-emerald-100 cursor-pointer text-left"
                >
                  {translations.navServices[n]}
                </button>
              </li>
              <li>
                <button
                  onClick={() => t("community")}
                  className="hover:text-white transition-colors text-emerald-100 cursor-pointer text-left"
                >
                  {translations.navCommunity[n]}
                </button>
              </li>
              <li>
                <button
                  onClick={() => t("contribution")}
                  className="hover:text-white transition-colors text-emerald-100 cursor-pointer text-left"
                >
                  {translations.navContribution[n]}
                </button>
              </li>
              <li>
                <button
                  onClick={() => t("contact")}
                  className="hover:text-white transition-colors text-emerald-100 cursor-pointer text-left"
                >
                  {translations.navContact[n]}
                </button>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-[#DCFCE7] tracking-widest uppercase">
              {n === "om"
                ? "Tajaajila Keenya"
                : n === "am"
                  ? "አገልግሎቶቻችን"
                  : "Active Safeguards"}
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-emerald-100">
              <li className="flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span>{translations.serviceSavingsTitle[n]}</span>
              </li>
              <li className="flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span>{translations.serviceLoansTitle[n]}</span>
              </li>
              <li className="flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span>{translations.serviceInsuranceTitle[n]}</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-[#DCFCE7] tracking-widest uppercase">
              {n === "om"
                ? "Miidiyaalee Hawaasummaa"
                : n === "am"
                  ? "የማህበራዊ ሚዲያ ገጾች"
                  : "Official Channels"}
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.facebook.com/busagonofaoromia/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-lg bg-emerald-900/25 border border-emerald-700/30 hover:border-[#DCFCE7] hover:bg-emerald-800/30 transition-all text-[#DCFCE7] hover:text-white group cursor-pointer"
                id="footer-facebook-channel-list-item"
              >
                <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center shrink-0 shadow text-white group-hover:scale-105 transition-transform">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] uppercase font-bold text-emerald-300 leading-none">
                    Facebook
                  </span>
                  <span className="text-[11px] font-bold truncate">
                    Buusaa Gonofaa Oromia
                  </span>
                </div>
              </a>
              <a
                href="https://t.me/buusaagonofaa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-lg bg-emerald-900/25 border border-emerald-700/30 hover:border-[#DCFCE7] hover:bg-emerald-800/30 transition-all text-[#DCFCE7] hover:text-white group cursor-pointer"
                id="footer-telegram-channel-list-item"
              >
                <div className="w-7 h-7 rounded bg-sky-500 flex items-center justify-center shrink-0 shadow text-white group-hover:scale-105 transition-transform">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.27-2.03-.49-.82-.27-1.47-.41-1.42-.87.03-.24.36-.49.99-.75 3.89-1.69 6.48-2.8 7.78-3.33 3.69-1.5 4.46-1.76 4.96-1.77.11 0 .36.03.52.16.14.12.18.28.2.45-.02.07-.02.16-.03.22z" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] uppercase font-bold text-emerald-300 leading-none">
                    Telegram
                  </span>
                  <span className="text-[11px] font-bold truncate">
                    @buusaagonofaa
                  </span>
                </div>
              </a>
              <a
                href="https://www.youtube.com/@BuusaaGonofaaOromiyaa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-lg bg-emerald-900/25 border border-emerald-700/30 hover:border-[#DCFCE7] hover:bg-emerald-800/30 transition-all text-[#DCFCE7] hover:text-white group cursor-pointer"
                id="footer-youtube-channel-list-item"
              >
                <div className="w-7 h-7 rounded bg-red-600 flex items-center justify-center shrink-0 shadow text-white group-hover:scale-105 transition-transform">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] uppercase font-bold text-emerald-300 leading-none">
                    YouTube
                  </span>
                  <span className="text-[11px] font-bold truncate">
                    Buusaa Gonofaa
                  </span>
                </div>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-[#DCFCE7] tracking-widest uppercase">
              {n === "om"
                ? "Quunnamtii Deeggarsaa"
                : n === "am"
                  ? "የቅርንጫፉ ዋና መረጃ"
                  : "Adama Headquarters"}
            </h4>
            <div className="space-y-3.5 text-xs text-emerald-100 font-bold font-sans">
              <div className="flex items-start gap-2">
                <Compass className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>{translations.contactOfficeAddress[n]}</span>
              </div>
              <div className="flex items-center gap-2">
                {c.jsx(Phone, {
                  className: "w-4 h-4 text-[#22C55E] shrink-0",
                })}
                <span>+251 22 111 2345 / +251 911 445 667</span>
              </div>
              <div className="flex items-center gap-2">
                {c.jsx(Mail, {
                  className: "w-4 h-4 text-[#22C55E] shrink-0",
                })}
                <span>adama@buusaagonofaa.org</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-emerald-800/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10.5px] font-bold text-emerald-100 uppercase tracking-widest">
          <div className="text-emerald-100/90 text-center sm:text-left">
            © 2026 {translations.appName[n]} - Adama Branch. All Rights
            Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
