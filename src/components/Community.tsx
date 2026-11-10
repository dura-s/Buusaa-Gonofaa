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

interface CommunityProps {
  language: Language;
}
export default function Community({ language: n }: CommunityProps) {
  const [e, t] = useState(null);
  const s = [
    {
      id: "g_youtube",
      title: {
        om: "Vidiyoo Gabaasa Hojii Buusaa Gonofaa Magaalaa Adaamaa",
        am: "የአዳማ ከተማ ቡሳ ጎኖፋ ቪዲዮ መግለጫ",
        en: "Official Adama City Buusaa Gonofaa Video Documentary",
      },
      src: "https://img.youtube.com/vi/HwJf1wdU4lk/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=HwJf1wdU4lk",
    },
    {
      id: "g_yt_screenshot1",
      title: {
        om: "Abbootii Gadaa fi Hoggansa Yaa'ii irratti (Viidiyoo irraa)",
        am: "አባገዳዎችና አመራሮች በስብሰባው ላይ (ከቪዲዮው የተወሰደ)",
        en: "Council Elders & Branch Leaders at Assembly (Captured from Video)",
      },
      src: "https://img.youtube.com/vi/HwJf1wdU4lk/hq1.jpg",
      link: "https://www.youtube.com/watch?v=HwJf1wdU4lk",
    },
    {
      id: "g_yt_screenshot2",
      title: {
        om: "Marii Fi Hirmaannaa Hawaasa Adaamaa (Viidiyoo irraa)",
        am: "የአዳማ ከተማ ማህበረሰብ ውይይትና ተさとፎ (ከቪዲዮው)",
        en: "Adama Community Group Discussion & Mutual Support (From Video)",
      },
      src: "https://img.youtube.com/vi/HwJf1wdU4lk/hq2.jpg",
      link: "https://www.youtube.com/watch?v=HwJf1wdU4lk",
    },
    {
      id: "g_yt_screenshot3",
      title: {
        om: "Hark-qalleeyyoota Deeggarsa Fudhatan (Viidiyoo irraa)",
        am: "የእህል እርዳታና ሰብአዊ ድጋፍ ስርጭት (ከቪዲዮው)",
        en: "Distribution of Local Safety Net Resources (From Video)",
      },
      src: "https://img.youtube.com/vi/HwJf1wdU4lk/hq3.jpg",
      link: "https://www.youtube.com/watch?v=HwJf1wdU4lk",
    },
    {
      id: "g_fb_assembly",
      title: {
        om: "Yaa'ii Buusaa Gonofaa Damee Magaalaa Adaamaa (Suuraalee)",
        am: "የአዳማ ከተማ የቡሳ ጎኖፋ ጠቅላላ ጉባኤ በምስል",
        en: "Adama City Branch General Assembly (Photo Stream)",
      },
      src: img_22_1,
      link: "https://www.facebook.com/biru61d/posts/yaaii-buusaa-gonofaa-damee-magaalaa-adaamaa-suuraan/1300527142092755/",
    },
    {
      id: "g_abs_grain",
      title: {
        om: "Deeggarsa Midhaan Nyaataa Harka-qalleeyyoota 50f Kennamedha",
        am: "የእህል ምግቦች ድጋፍ ለ 50 ችግረኛ ነዋሪዎች",
        en: "Adama Grain Support and Food Security Delivery",
      },
      src: img_21,
      link: "https://abs.gov.et/waajjirri-buusaa-gonofaa-damee-adaamaa-harka-qalleeyyoota-50f-deeggarsa-midhaan-nyaataa-taasisee/",
    },
  ];
  return (
    <section
      className="bg-gradient-to-br from-white via-emerald-50/15 to-white py-12 md:py-16 shadow-[0_0_50px_rgba(16,185,129,0.05)_inset] border-t border-emerald-100"
      id="community-section"
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-white border border-emerald-100/100 text-[#054823] text-xs font-bold uppercase tracking-widest">
            {n === "om"
              ? "Aadaan Keenya Hawaasa Keenya"
              : n === "am"
                ? "የገዳ ባህል ዕሴቶች"
                : "Gadaa Mutual Safety"}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#054823] tracking-tight font-sans">
            {translations.communityHeader[n]}
          </h2>
          <p className="text-base text-gray-600 font-medium leading-relaxed">
            {translations.communitySubtitle[n]}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8" id="news-subcontainer">
            <h3 className="text-lg font-extrabold text-[#054823] uppercase tracking-widest flex items-center gap-2 mb-6">
              <span className="w-1.5 h-3.5 rounded-sm bg-emerald-600 block" />
              <span>{translations.newsTitle[n]}</span>
            </h3>
            <div className="space-y-6">
              {mockNews.map((r) => (
                <div
                  className="bg-white rounded-3xl border border-emerald-100 p-6 flex flex-col md:flex-row gap-6 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
                  id={`news-item-card-${r.id}`}
                  key={r.id}
                >
                  <div
                    className="w-full md:w-72 aspect-video rounded-2xl bg-[#1B5E20] overflow-hidden shrink-0 border border-emerald-900/20 shadow-sm relative group cursor-pointer"
                    onClick={() => {
                      if (r.youtubeId && r.externalLink) {
                        window.open(r.externalLink, "_blank");
                      } else {
                        t(r);
                      }
                    }}
                  >
                    <img
                      src={r.imagePlaceholder}
                      alt={r.title[n]}
                      className="w-full h-full object-cover grayscale-0 brightness-100 transform transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {r.youtubeId && (
                      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors flex items-center justify-center">
                        <div className="w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 duration-200">
                          {c.jsx(Play, {
                            className:
                              "w-6 h-6 fill-current translate-x-0.5 text-white",
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-between space-y-4 flex-grow">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                        <span>{r.category}</span>
                        <span className="text-emerald-400/60 font-light">
                          /
                        </span>
                        <span>{r.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#054823] tracking-tight">
                        {r.title[n]}
                      </h4>
                      <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                        {r.summary[n]}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                      <button
                        onClick={() => {
                          if (r.youtubeId && r.externalLink) {
                            window.open(r.externalLink, "_blank");
                          } else {
                            t(r);
                          }
                        }}
                        className="inline-flex items-center gap-2 text-[#054823] hover:text-emerald-900 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        <span>
                          {r.youtubeId
                            ? n === "om"
                              ? "Fiilmii Daawwadhu"
                              : n === "am"
                                ? "ቪዲዮውን ይመልከቱ"
                                : "Watch Video"
                            : translations.readMore[n]}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      {r.externalLink && (
                        <a
                          href={r.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-800 text-xs font-black uppercase tracking-widest transition-colors"
                          onClick={(l) => l.stopPropagation()}
                        >
                          {r.youtubeId ? (
                            <React.Fragment>
                              {c.jsx(Youtube, {
                                className: "w-4 h-4 text-red-600 shrink-0",
                              })}
                              <span>YouTube</span>
                            </React.Fragment>
                          ) : r.externalLink.includes("facebook") ? (
                            <React.Fragment>
                              <span className="text-blue-600 font-black shrink-0">
                                Facebook
                              </span>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                              <span>
                                {n === "om"
                                  ? "ABS Gabaasa"
                                  : n === "am"
                                    ? "ኤቢኤስ ዘገባ"
                                    : "ABS News"}
                              </span>
                            </React.Fragment>
                          )}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 space-y-8" id="events-subcontainer">
            <h3 className="text-lg font-extrabold text-[#054823] uppercase tracking-widest flex items-center gap-2 mb-6">
              <span className="w-1.5 h-3.5 rounded-sm bg-emerald-600 block" />
              <span>{translations.eventsTitle[n]}</span>
            </h3>
            <div className="space-y-6">
              {mockEvents.map((r) => (
                <div
                  className="bg-white rounded-3xl border border-emerald-100 p-6 hover:border-[#054823] hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                  id={`event-item-card-${r.id}`}
                  key={r.id}
                >
                  {r.status === "ongoing" && (
                    <div className="absolute top-0 right-0 bg-[#054823] text-white text-[9px] font-bold tracking-widest uppercase px-3.5 py-1">
                      {n === "om" ? "Amma" : n === "am" ? "በሂደት ላይ" : "Active"}
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-lg text-emerald-800 text-[10px] font-bold uppercase tracking-wide">
                      {c.jsx(Sparkles, {
                        className: "w-3.5 h-3.5 text-emerald-600",
                      })}
                      <span>{r.gadaaTerm[n]}</span>
                    </div>
                    <h4 className="text-sm font-bold text-emerald-950 tracking-tight">
                      {r.title[n]}
                    </h4>
                    <p className="text-xs text-emerald-800/60 font-semibold leading-relaxed">
                      {r.description[n]}
                    </p>
                    <div className="pt-4 border-t border-emerald-50 grid grid-cols-2 gap-2 text-[10.5px] font-semibold text-emerald-900/70 uppercase tracking-wide">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{r.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {c.jsx(MapPin, {
                          className: "w-4 h-4 text-emerald-600 shrink-0",
                        })}
                        <span className="truncate">{r.location[n]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="mt-20 pt-16 border-t border-emerald-50"
          id="gallery-section-wrapper"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <h3 className="text-lg font-bold text-emerald-950 uppercase tracking-widest">
                {translations.galleryTitle[n]}
              </h3>
              <p className="text-xs text-emerald-800/60 font-semibold uppercase mt-1">
                {n === "om"
                  ? "Gochaa fi jireenya qonnaan bultootaa damee keenya biratti"
                  : n === "am"
                    ? "የአዳማ አርሶ አደሮች የዕድገት ገጽታዎች"
                    : "Empowered families & member snapshots from Central Adama District"}
              </p>
            </div>
            <div className="flex gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl">
              {c.jsx(ImageIcon, {
                className: "w-4 h-4 text-emerald-600",
              })}
              <span>
                {n === "om"
                  ? "Kuma 4 Ol Kaafame"
                  : n === "am"
                    ? "ከ4ሽ በላይ ፎቶዎች"
                    : "4,000+ Assets"}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {s.map((r) => {
              const _Component = r.link ? "a" : "div";
              const d = r.link
                ? {
                    href: r.link,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className:
                      "group relative h-64 rounded-2xl bg-emerald-50 overflow-hidden border border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 cursor-pointer block",
                  }
                : {
                    className:
                      "group relative h-64 rounded-2xl bg-emerald-50 overflow-hidden border border-emerald-100 hover:shadow-md transition-all duration-300 block",
                  };
              return (
                <_Component id={`gallery-photo-idx-${r.id}`} {...d} key={r.id}>
                  <img
                    src={r.src}
                    alt={r.title[n]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-emerald-950/90 to-emerald-900/20 p-4 transition-opacity duration-300">
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider line-clamp-2">
                      {r.title[n]}
                    </h5>
                    <span className="text-[10px] font-semibold text-emerald-300 uppercase tracking-widest mt-1 inline-flex items-center gap-1">
                      {r.link ? (
                        <React.Fragment>
                          <span>
                            {r.id === "g_youtube"
                              ? "Watch Documentary"
                              : "Official Page"}
                          </span>
                          <ExternalLink className="w-2.5 h-2.5 inline shrink-0" />
                        </React.Fragment>
                      ) : (
                        "Buusaa Gonofaa Adama"
                      )}
                    </span>
                  </div>
                </_Component>
              );
            })}
          </div>
        </div>
        <AnimatePresence>
          {e && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                className="fixed inset-0 bg-white/70 backdrop-blur-md ring-1 ring-emerald-400/20"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                onClick={() => t(null)}
              />
              <motion.div
                className="relative bg-white w-full max-w-2xl rounded-3xl border border-emerald-100 shadow-2xl overflow-hidden p-8 z-10"
                initial={{
                  scale: 0.95,
                  y: 15,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  scale: 0.95,
                  y: 15,
                  opacity: 0,
                }}
              >
                <button
                  onClick={() => t(null)}
                  className="absolute top-4 right-4 p-2 text-emerald-900/60 hover:text-emerald-900 hover:bg-emerald-50 rounded-full transition-colors"
                >
                  {c.jsx(X, {
                    className: "w-5 h-5",
                  })}
                </button>
                <div className="space-y-6">
                  <div className="aspect-video w-full rounded-2xl bg-black overflow-hidden border border-emerald-900/20 relative">
                    {e.youtubeId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${e.youtubeId}?autoplay=1`}
                        title={e.title[n]}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen={true}
                        className="w-full h-full"
                      />
                    ) : (
                      <img
                        src={e.imagePlaceholder}
                        alt={e.title[n]}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                      <span>{e.category}</span>
                      <span className="text-emerald-400/60 font-light">/</span>
                      <span>{e.date}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-emerald-950 font-sans tracking-tight leading-normal">
                      {e.title[n]}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-900/70 leading-relaxed uppercase bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-100/50">
                      {e.summary[n]}
                    </p>
                    <p className="text-xs text-emerald-800/80 font-medium leading-relaxed font-sans">
                      {e.content[n]}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-emerald-50 flex justify-between items-center">
                    {e.externalLink ? (
                      <a
                        href={e.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-black text-xs px-5 py-2.5 rounded-xl transition-colors"
                      >
                        {e.youtubeId ? (
                          <React.Fragment>
                            {c.jsx(Youtube, {
                              className: "w-4 h-4 text-red-600",
                            })}
                            <span>
                              {n === "om"
                                ? "YouTube irratti Ilaali"
                                : n === "am"
                                  ? "በዩቲዩብ ይመልከቱ"
                                  : "Watch on YouTube"}
                            </span>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <ExternalLink className="w-4 h-4 text-emerald-600" />
                            <span>
                              {n === "om"
                                ? "Madda Guutuu Dubbisi"
                                : n === "am"
                                  ? "ሙሉውን ምንጭ አንብብ"
                                  : "Read Full Original Article"}
                            </span>
                          </React.Fragment>
                        )}
                      </a>
                    ) : (
                      <div />
                    )}
                    <button
                      onClick={() => t(null)}
                      className="bg-[#0B4C28] text-white font-bold text-xs px-6 py-2.5 rounded-xl hover:bg-[#063118] transition"
                    >
                      {n === "om"
                        ? "Cufi"
                        : n === "am"
                          ? "ዝጋ"
                          : "Close Article"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
