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

interface HeroProps {
  language: Language;
  setActiveTab: (tab: ActiveTab) => void;
}
export default function Hero({ language: n, setActiveTab: e }: HeroProps) {
  const t = [
    {
      src: latestAssemblyImage,
      title: {
        om: "Marii Waltajjii Yaa'ii Buusaa Gonofaa Damee Adaamaa Marsaa 3ffaa",
        am: "3ኛው ዙር የቡሳ ጎኖፋ የአዳማ ቅርንጫፍ ጉባኤ ውይይት",
        en: "3rd Round Buusaa Gonofaa Adama Branch Assembly Forum",
      },
      subtitle: {
        om: "Adama Branch Outreach & Cooperative Assembly, June 25, 2026",
        am: "አዳማ ቅርንጫፍ ህዝባዊ ስብሰባ - ሰኔ 25, 2026",
        en: "Adama Branch Outreach & Cooperative Assembly, June 25, 2026",
      },
      badge: {
        om: "YAA'II MARSAA 3FFAA DAMEE ADAAMAA",
        am: "3ኛው ዙር የአዳማ ቅርንጫፍ ጉባኤ",
        en: "3RD ROUND ADAMA BRANCH GENERAL ASSEMBLY",
      },
    },
    {
      src: img_20_1,
      title: {
        om: "Marii Koree Gorsituu Damee Adaamaa Marsaa 3ffaa",
        am: "የአዳማ ቅርንጫፍ አማካሪ ኮሚቴ ስብሰባ",
        en: "Adama Branch Advisory Committee Consultative Forum",
      },
      subtitle: {
        om: "Hojjettoota fi koree gorsituu gidduutti marii uumame",
        am: "በአማካሪ ኮሚቴው እና በስራ አስፈፃሚዎች መካከል የተደረገ ውይይት",
        en: "Collaborative consultation between committee members & local staff",
      },
      badge: {
        om: "KOOPII GORSITUU",
        am: "አማካሪ ኮሚቴ",
        en: "ADVISORY COMMITTEE",
      },
    },
    {
      src: img_20_2,
      title: {
        om: "Hirmaattota Walgahii Buusaa Gonofaa Damee Adaamaa",
        am: "የአዳማ ቅርንጫፍ ቡሳ ጎኖፋ ጠቅላላ ጉባኤ ተሳታፊዎች",
        en: "Buusaa Gonofaa Adama Branch General Assembly Attendees",
      },
      subtitle: {
        om: "Marii bal'aa qooda fudhattota waliin taasifame",
        am: "ከባለድርሻ አካላት ጋር የተደረገ የጋራ የልማት ውይይት",
        en: "Participatory development discussions with key community stakeholders",
      },
      badge: {
        om: "HIRMAATTOTA YAA'II",
        am: "የጉባኤው ተሳታፊዎች",
        en: "ASSEMBLY ATTENDEES",
      },
    },
    {
      src: img_21,
      title: {
        om: "Waraqaa Qorannoo fi Gabaasa Hojii Dhiyeessuu",
        am: "የስራ አፈፃፀም ሪፖርት እና የጥናት ጽሑፍ አቀራረብ",
        en: "Presentation of Performance Report & Review Papers",
      },
      subtitle: {
        om: "Gabaasa raawwii hojii fi qorannoo dhiyaate irratti mari'achuu",
        am: "በቀረቡት የስራ አፈፃፀምና የምርምር ጽሁፎች ላይ ውይይት ማድረግ",
        en: "Reviewing accomplishments, statistical milestones & strategic paths",
      },
      badge: {
        om: "GABAASA HOJII",
        am: "የስራ አፈፃፀም ሪፖርት",
        en: "PERFORMANCE REPORT",
      },
    },
    {
      src: img_22_1,
      title: {
        om: "Yaada fi Gaaffii Hirmaattota Yaa'ii",
        am: "ከተሳታፊዎች የተነሱ ጠቃሚ ጥያቄዎችና ሀሳቦች",
        en: "Inquiries & Constructive Feedback from Assembly Participants",
      },
      subtitle: {
        om: "Hirmaattonni yaada fi gaaffii isaanii yoo dhiyeessan",
        am: "ተሳታፊዎች የቅርንጫፉን ስራ የሚያጠናክሩ ጥያቄዎችን ሲያቀርቡ",
        en: "Community partners raising questions to strengthen support systems",
      },
      badge: {
        om: "YAA'II HIRMAATTOTA",
        am: "ውይይትና ተሳትፎ",
        en: "CONSTRUCTIVE FEEDBACK",
      },
    },
    {
      src: img_22_2,
      title: {
        om: "Mariif Deebii fi Ibsa Hoggansa Buusaa Gonofaa",
        am: "በቡሳ ጎኖፋ አመራሮች የተሰጠ ምላሽ እና ሰፊ ማብራሪያ",
        en: "Detailed Responses & Guidance from Buusaa Gonofaa Leadership",
      },
      subtitle: {
        om: "Hoggantoonni gaaffiilee ka'aniif ibsa fi deebii kennan",
        am: "አመራሮቹ ለተነሱት ጥያቄዎች ዝርዝር ማብራሪያዎችን ሲሰጡ",
        en: "Executive directors addressing community issues and laying out strategies",
      },
      badge: {
        om: "DEEBII HOGGANSA",
        am: "የአመራር ምላሽ",
        en: "LEADERSHIP GUIDANCE",
      },
    },
    {
      src: img_23,
      title: {
        om: "Murtii fi Karoora Hojii Gara Fuulduraa",
        am: "የቀጣይ ስራዎች ውሳኔዎችና እቅዶች ማፅደቅ",
        en: "Approval of Resolutions & Action Plans for the Upcoming Year",
      },
      subtitle: {
        om: "Koreen dhimmoota ijoo irratti murtii yoo dabarsan",
        am: "ጉባኤው ለቀጣይ ስራዎች ጠቃሚ የሆኑ ውሳኔዎችን ሲያሳልፍ",
        en: "Establishing solid commitments and approving budget/welfare expansions",
      },
      badge: {
        om: "MURTII YAA'II",
        am: "የቀጣይ እቅዶች",
        en: "APPROVED RESOLUTIONS",
      },
    },
    {
      src: img_24_1,
      title: {
        om: "Kallattii Hojii fi Guduunfaa Yaa'ii Damee Adaamaa",
        am: "የአዳማ ቅርንጫፍ ጉባኤ የስራ አቅጣጫዎች እና ማጠቃለያ",
        en: "Strategic Operational Guidelines & Concluding Remarks",
      },
      subtitle: {
        om: "Guduunfaa yaa'ii irratti kallattii xiyyeeffannoo kaa'uu",
        am: "በጉባኤው ማጠቃለያ ላይ የወደፊት ትኩረት አቅጣጫዎችን ማስቀመጥ",
        en: "Setting targeted benchmarks for localized safety nets and food security",
      },
      badge: {
        om: "GUDUUNFAA YAA'II",
        am: "የጉባኤው ማጠቃለያ",
        en: "CONCLUDING REMARKS",
      },
    },
    {
      src: img_24_2,
      title: {
        om: "Hawaasummaa fi Tokkummaa Hojjettoota Buusaa Gonofaa",
        am: "የቡሳ ጎኖፋ ሰራተኞች የጋራ ህብረት እና ወንድማማችነት",
        en: "Social Cohesion and Team Unity of Buusaa Gonofaa Staff",
      },
      subtitle: {
        om: "Hojjettoonni yaa'ii milkaa'aa booda walitti dhufuun",
        am: "የቅርንጫፉ ሰራተኞች ከጉባኤው መጠናቀቅ በኋላ በደስታ ሲገናኙ",
        en: "Staff members celebrating a highly successful 3rd branch assembly",
      },
      badge: {
        om: "TOKKUMMAA HOJJETTOOTAA",
        am: "የሰራተኞች አንድነት",
        en: "TEAM COHESION",
      },
    },
    {
      src: wadooImage,
      title: {
        om: "Obbo Waadoo Abdulkarim - Hoggonaa Buusaa Gonofaa Damee Adaamaa",
        am: "አቶ ዋዶ አብዱልከሪም - የአዳማ ቅርንጫፍ ቡሳ ጎኖፋ ኃላፊ",
        en: "Obbo Waadoo Abdulkarim - Head of Buusaa Gonofaa Adama Branch",
      },
      subtitle: {
        om: "Hoggansa hojii deeggarsaa fi birmannaa hawaasummaa",
        am: "የማህበራዊ ዋስትና እና ፈጣን ምላሽ አመራር",
        en: "Directing localized social safety-net & microfinance systems",
      },
      badge: {
        om: "HOGGANAA DAMEE ADAAMAA",
        am: "የቅርንጫፍ ኃላፊ",
        en: "ADAMA BRANCH HEAD",
      },
    },
  ];
  const [s, r] = useState(0);
  const [l, d] = useState(false);
  const [h, p] = useState(false);
  const [x, y] = useState(1);
  const [b, E] = useState({
    x: 0,
    y: 0,
  });
  const [T, j] = useState(false);
  const [L, z] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    if (l || h) {
      return;
    }
    const oe = setInterval(() => {
      r((ve) => (ve + 1) % t.length);
    }, 4500);
    return () => clearInterval(oe);
  }, [l, h, t.length]);
  const q = (oe) => {
    if (oe) {
      oe.stopPropagation();
    }
    r((ve) => (ve + 1) % t.length);
  };
  const K = (oe) => {
    if (oe) {
      oe.stopPropagation();
    }
    r((ve) => (ve - 1 + t.length) % t.length);
  };
  const Q = () => {
    r((oe) => (oe + 1) % t.length);
    fe();
  };
  const ne = () => {
    r((oe) => (oe - 1 + t.length) % t.length);
    fe();
  };
  const fe = () => {
    y(1);
    E({
      x: 0,
      y: 0,
    });
  };
  useEffect(() => {
    if (!h) {
      return;
    }
    const oe = (ve) => {
      if (ve.key === "Escape") {
        p(false);
        fe();
      } else if (ve.key === "ArrowRight") {
        Q();
      } else if (ve.key === "ArrowLeft") {
        ne();
      }
    };
    window.addEventListener("keydown", oe);
    return () => window.removeEventListener("keydown", oe);
  }, [h]);
  const pe = () => y((oe) => Math.min(oe + 0.5, 4));
  const M = () => {
    y((oe) => {
      const ve = Math.max(oe - 0.5, 1);
      if (ve === 1) {
        E({
          x: 0,
          y: 0,
        });
      }
      return ve;
    });
  };
  const S = (oe) => {
    if (!(x <= 1)) {
      j(true);
      z({
        x: oe.clientX - b.x,
        y: oe.clientY - b.y,
      });
    }
  };
  const R = (oe) => {
    if (!!T && !(x <= 1)) {
      E({
        x: oe.clientX - L.x,
        y: oe.clientY - L.y,
      });
    }
  };
  const k = () => {
    j(false);
  };
  const O = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };
  const V = {
    hidden: {
      y: 25,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
      },
    },
  };
  const {
    activeMembersFormatted: D,
    activeFarmsFormatted: Te,
    womenEntrepreneursFormatted: Ge,
    emergencyDisbursementsFormatted: U,
  } = useLiveStats();
  const le = [
    {
      icon: c.jsx(Users, {
        className: "w-6 h-6 text-emerald-600",
      }),
      value: D,
      label: {
        om: "Mirkaneessitoota Hawaasaa",
        am: "ንቁ የማኅበር አባላት",
        en: "Active Registered Members",
      },
    },
    {
      icon: <Sprout className="w-6 h-6 text-emerald-600" />,
      value: Te,
      label: {
        om: "Qonnaan Bultoota Gargaaraman",
        am: "የተደገፉ አርሶ አደሮች",
        en: "Agricultural Units Subsidized",
      },
    },
    {
      icon: c.jsx(TrendingUp, {
        className: "w-6 h-6 text-emerald-600",
      }),
      value: Ge,
      label: {
        om: "Daldala Dubartootaa",
        am: "የሴት ስራ ፈጣሪዎች ድጋፍ",
        en: "Women-Led Enterprises Supported",
      },
    },
    {
      icon: c.jsx(Award, {
        className: "w-6 h-6 text-emerald-600",
      }),
      value: U,
      label: {
        om: "Gargaarsa Balaa Raawwatame",
        am: "የአደጋ ጊዜ ፈጣን ድጋፍ (ብር)",
        en: "Social Protection Paid Out (ETB)",
      },
    },
  ];
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#F8FAF8] via-white to-[#F0F4F1] py-12 md:py-20"
      id="home-hero-section"
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
        <div className="bg-white rounded-3xl p-6 md:p-12 border border-emerald-100/80 shadow-[0_15px_40px_-15px_rgba(11,76,40,0.06)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30 z-0 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-50/40 rounded-full translate-y-1/2 -translate-x-1/2 z-0 blur-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <motion.div
              className="lg:col-span-6 space-y-8 text-left"
              initial="hidden"
              animate="visible"
              variants={O}
            >
              <motion.div variants={V} className="flex flex-col gap-2.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EE] border border-emerald-100 text-[#0B4C28] text-xs font-bold uppercase tracking-wider w-fit shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16803E] animate-pulse" />
                  <span>
                    {n === "om"
                      ? "Damee Adaamaa"
                      : n === "am"
                        ? "የአዳማ ቅርንጫፍ"
                        : "Adama Branch"}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-800 font-extrabold uppercase tracking-widest leading-relaxed">
                  {n === "om"
                    ? "TAJAAJILA MISOOMA HAWAASAA OROMIYAA"
                    : "Social Protection & Microfinance Hub"}
                </span>
              </motion.div>
              <motion.h2
                variants={V}
                className="text-xl sm:text-3xl md:text-4xl font-black text-[#16803E] tracking-tight leading-tight font-display"
              >
                {n === "om"
                  ? "Baga Gara Buusaa Gonofaa Damee Adaamaa Nagaan Dhuftan!"
                  : n === "am"
                    ? "ወደ ቡሳ ጎኖፋ የአዳማ ቅርንጫፍ በደህና መጡ!"
                    : "Welcome to Buusaa Gonofaa Adama Branch!"}
              </motion.h2>
              <motion.h1
                variants={V}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B4C28] tracking-tight leading-tight font-display"
              >
                {translations.heroTitle[n]}
              </motion.h1>
              <motion.p
                variants={V}
                className="text-sm sm:text-base md:text-lg text-slate-600 font-medium sm:leading-loose leading-relaxed max-w-2xl"
              >
                {translations.heroSubtitle[n]}
              </motion.p>
              <motion.div
                variants={V}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto"
              >
                <button
                  onClick={() => e("contribution")}
                  className="group flex items-center justify-center gap-2 bg-[#0B4C28] text-white px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-xs font-extrabold tracking-widest hover:bg-[#063118] active:scale-[0.97] hover:shadow-[0_10px_25px_rgba(11,76,40,0.25)] transition-all transform hover:-translate-y-0.5 cursor-pointer uppercase border border-transparent"
                  id="hero-cta-btn-primary"
                >
                  <span>{translations.heroCtaPrimary[n]}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-yellow-400" />
                </button>
                <button
                  onClick={() => e("services")}
                  className="flex items-center justify-center gap-2 border-2 border-[#0B4C28]/80 text-[#0B4C28] bg-transparent px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-xs font-extrabold tracking-widest hover:bg-emerald-50/50 active:scale-[0.97] transition-all cursor-pointer uppercase"
                  id="hero-cta-btn-secondary"
                >
                  <span>{translations.heroCtaSecondary[n]}</span>
                </button>
              </motion.div>
            </motion.div>
            <motion.div
              className="lg:col-span-6"
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
            >
              <div
                className="bg-slate-50/50 rounded-3xl border border-slate-200/60 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col items-center hover:border-emerald-200 hover:shadow-lg active:scale-[0.995] transition-all w-full relative"
                id="interactive-slideshow-container"
              >
                <div className="w-full h-64 sm:h-80 md:h-[380px] lg:h-[450px] rounded-2xl bg-slate-100 flex flex-col items-center justify-center relative overflow-hidden group border border-emerald-100/50">
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-lg opacity-25 scale-110"
                    style={{
                      backgroundImage: `url(${t[s].src})`,
                    }}
                  />
                  <AnimatePresence mode="wait">
                    <motion.img
                      src={t[s].src}
                      alt={t[s].title[n]}
                      initial={{
                        opacity: 0,
                        scale: 1.02,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.98,
                      }}
                      transition={{
                        duration: 0.55,
                      }}
                      className="w-full h-full object-contain cursor-zoom-in rounded-2xl bg-transparent relative z-10"
                      onClick={() => p(true)}
                      referrerPolicy="no-referrer"
                      key={s}
                    />
                  </AnimatePresence>
                  <div className="absolute top-3 left-3 z-20">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-white bg-[#0B4C28]/95 px-3 py-1 rounded-full shadow-sm backdrop-blur-xs border border-white/10">
                      {t[s].badge[n]}
                    </span>
                  </div>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-20">
                    <button
                      onClick={K}
                      className="w-8 h-8 rounded-full bg-black/60 hover:bg-[#0B4C28] active:scale-90 text-white flex items-center justify-center transition-all border border-white/10 shadow-md cursor-pointer"
                    >
                      {c.jsx(ChevronLeft, {
                        className: "w-5 h-5",
                      })}
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-20">
                    <button
                      onClick={q}
                      className="w-8 h-8 rounded-full bg-black/60 hover:bg-[#0B4C28] active:scale-90 text-white flex items-center justify-center transition-all border border-white/10 shadow-md cursor-pointer"
                    >
                      {c.jsx(ChevronRight, {
                        className: "w-5 h-5",
                      })}
                    </button>
                  </div>
                </div>
                <div className="w-full text-center mt-4 space-y-1">
                  <h4 className="text-sm md:text-base font-extrabold text-[#0B4C28] leading-snug font-sans line-clamp-2 min-h-[2.5rem] flex items-center justify-center px-2">
                    {t[s].title[n]}
                  </h4>
                  <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider">
                    {t[s].subtitle[n]}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 mt-3 justify-center">
                  {t.map((oe, ve) => (
                    <button
                      onClick={() => r(ve)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer active:scale-90 ${ve === s ? "bg-[#0B4C28] w-5" : "bg-slate-200 hover:bg-slate-400"}`}
                      title={`Slide ${ve + 1}`}
                      key={ve}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-10 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-2 bg-gradient-to-r from-amber-400 to-[#D4AF37]" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-5 w-full flex flex-col items-center justify-center relative overflow-hidden shrink-0">
              <div className="relative group w-full max-w-sm aspect-[4/5] rounded-2xl bg-[#F3F6F4] border border-slate-200 overflow-hidden shadow-md">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0B4C28]/10 via-transparent to-amber-500/5 opacity-50" />
                <div
                  className="absolute inset-0 bg-cover bg-center blur-lg opacity-25 scale-110"
                  style={{
                    backgroundImage: `url(${wadooImage})`,
                  }}
                />
                <img
                  src={wadooImage}
                  alt="Obbo Waadoo Abdulkarim"
                  className="w-full h-full object-cover relative z-10 group-hover:scale-[1.03] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-900/80 to-transparent text-white pt-10 pb-4 px-4 text-center z-20">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                    {n === "om" ? "Damee Adaamaa" : "Adama Branch"}
                  </div>
                  <div className="text-sm font-extrabold uppercase tracking-wide mt-0.5">
                    {n === "am"
                      ? "አቶ ዋዶ አብዱልከሪም"
                      : n === "om"
                        ? "OBBO WAADOO ABDULKARIM"
                        : "OBBO WAADOO ABDULKARIM"}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-emerald-800 font-bold uppercase tracking-widest border border-emerald-100 bg-[#F4F9F5] px-3 py-1.5 rounded-lg w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>
                    {n === "om"
                      ? "Hogganaa Mirkanaa"
                      : n === "am"
                        ? "ተረጋግጦ የተረጋገጠ አመራር"
                        : "Verified Executive"}
                  </span>
                </div>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B4C28] font-display tracking-tight leading-tight">
                  {n === "am"
                    ? "አቶ ዋዶ አብዱልከሪም"
                    : "Obbo Waadoo Abdulkarim"}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-emerald-800 font-extrabold uppercase tracking-wider">
                  {n === "om"
                    ? "Hoggonaa Buusaa Gonofaa Damee Adaamaa"
                    : n === "am"
                      ? "የአዳማ ቅርንጫፍ ቡሳ ጎኖፋ ኃላፊ"
                      : "Head of Buusaa Gonofaa Adama Branch"}
                </p>
              </div>
              <div className="relative pt-2">
                <span className="absolute -top-7 -left-3 text-8xl text-emerald-100 font-serif select-none -z-10">
                  “
                </span>
                <p className="text-base md:text-lg text-slate-700 font-semibold leading-relaxed relative z-10 italic">
                  {n === "om"
                    ? "Damee Bulchiinsa Magaalaa Adaamaatti Buusaa Gonofaa guutummaatti olaantummaan kan hogganan yoo ta'an, tajaajila gargaarsaa, wal-gargaarsaa fi birmannaa hawaasummaa qindeessuun hawaasa deeggaruuf dhimma raawwatu dha."
                    : n === "am"
                      ? "የአዳማ ከተማ ቅርንጫፍ ቡሳ ጎኖፋ ኃላፊ በመሆን የማህበራዊ ዋስትና፣ የጋራ እርዳታ እና የማህበራዊ ልማት ስራዎችን በአቅም እያመራ ነው።"
                      : "Serving as the head of the Adama City branch, leading social safety-net programs, mutual cooperative welfare and community development activities."}
                </p>
              </div>
            </div>
          </div>
        </div>
        <motion.div
          className="mt-16 pt-10 border-t border-emerald-100"
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}
          id="branch-statistics-strip"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {le.map((oe, ve) => (
              <div
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-emerald-100 hover:border-emerald-300 hover:shadow-md hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between text-left group shadow-xs"
                key={ve}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 sm:mb-4">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-[#054823] group-hover:bg-[#054823] group-hover:text-white transition-colors">
                      {oe.icon}
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-950 tracking-tight mb-1 font-sans">
                    {oe.value}
                  </div>
                  <div className="text-[10px] sm:text-xs font-extrabold text-emerald-900/80 leading-tight uppercase tracking-wider font-sans line-clamp-2">
                    {oe.label[n]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <div
          className="mt-16 bg-[#1B5E20] text-emerald-100 border border-emerald-800/40 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden"
          id="mission-statement-card"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-900/20 rounded-full opacity-60 -translate-y-10 translate-x-10 -z-10" />
          <div className="w-full space-y-8">
            <div className="space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-widest bg-emerald-900 border border-emerald-800/50 w-fit px-3.5 py-1.5 rounded-full text-emerald-300">
                {translations.missionTitle[n]}
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">
                {translations.missionTitle[n]} : {translations.appName[n]}
              </h3>
              <p className="text-sm md:text-base font-medium leading-relaxed text-emerald-100">
                {translations.missionText[n]}
              </p>
            </div>
            <div className="pt-8 border-t border-emerald-800/30">
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-6">
                {n === "om"
                  ? "Tajaajila Keenya Maayicroofayinaansii"
                  : "Our Microfinance Services"}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#114216] border border-emerald-800/30 p-5 rounded-2xl space-y-3 hover:bg-[#16501c] transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-[#0d3411] flex items-center justify-center">
                    {c.jsx(TrendingUp, {
                      className: "w-5 h-5 text-emerald-300",
                    })}
                  </div>
                  <h5 className="text-sm font-extrabold uppercase tracking-wider text-emerald-100">
                    {translations.serviceSavingsTitle[n]}
                  </h5>
                  <p className="text-xs text-emerald-200/90 font-semibold leading-relaxed">
                    {translations.serviceSavingsDesc[n]}
                  </p>
                </div>
                <div className="bg-[#114216] border border-emerald-800/30 p-5 rounded-2xl space-y-3 hover:bg-[#16501c] transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-[#0d3411] flex items-center justify-center">
                    <Sprout className="w-5 h-5 text-emerald-300" />
                  </div>
                  <h5 className="text-sm font-extrabold uppercase tracking-wider text-emerald-100">
                    {translations.serviceLoansTitle[n]}
                  </h5>
                  <p className="text-xs text-emerald-200/90 font-semibold leading-relaxed">
                    {translations.serviceLoansDesc[n]}
                  </p>
                </div>
                <div className="bg-[#114216] border border-emerald-800/30 p-5 rounded-2xl space-y-3 hover:bg-[#16501c] transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-[#0d3411] flex items-center justify-center">
                    {c.jsx(Award, {
                      className: "w-5 h-5 text-emerald-300",
                    })}
                  </div>
                  <h5 className="text-sm font-extrabold uppercase tracking-wider text-emerald-100">
                    {translations.serviceInsuranceTitle[n]}
                  </h5>
                  <p className="text-xs text-emerald-200/90 font-semibold leading-relaxed">
                    {translations.serviceInsuranceDesc[n]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {h && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="fixed inset-0 z-50 bg-[#020d05]/98 backdrop-blur-xl flex flex-col justify-between overflow-hidden"
              onMouseUp={k}
              id="ultra-hd-lightbox-modal"
            >
              <div className="w-full bg-black/40 border-b border-emerald-950/40 p-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 z-10 shrink-0">
                <div className="text-left space-y-1">
                  <span className="text-[9px] font-bold tracking-widest text-[#054823] bg-emerald-950/60 border border-emerald-900/40 px-3 py-1 rounded-full uppercase">
                    {t[s].badge[n]}
                  </span>
                  <h3 className="text-sm md:text-base font-extrabold text-white leading-tight font-sans mt-1">
                    {t[s].title[n]}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <div className="flex items-center bg-emerald-950/50 border border-emerald-900/40 rounded-xl p-1 gap-1">
                    <button
                      onClick={M}
                      disabled={x <= 1}
                      className="p-2 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-900/30 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                      title="Zoom Out"
                    >
                      {c.jsx(ZoomOut, {
                        className: "w-4 h-4",
                      })}
                    </button>
                    <span className="text-[10px] font-mono font-bold text-emerald-300 px-2 min-w-[3rem] text-center">
                      {Math.round(x * 100)}%
                    </span>
                    <button
                      onClick={pe}
                      disabled={x >= 4}
                      className="p-2 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-900/30 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      onClick={fe}
                      disabled={x === 1 && b.x === 0 && b.y === 0}
                      className="p-2 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-900/30 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                      title="Reset Zoom & Pan"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      p(false);
                      fe();
                    }}
                    className="p-2 md:p-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-200 border border-red-900/40 transition-all cursor-pointer shadow-md"
                    title="Close Lightbox (Esc)"
                  >
                    {c.jsx(X, {
                      className: "w-5 h-5",
                    })}
                  </button>
                </div>
              </div>
              <div
                className="flex-1 w-full relative flex items-center justify-center overflow-hidden p-4 select-none cursor-grab active:cursor-grabbing"
                onMouseDown={S}
                onMouseMove={R}
                onMouseUp={k}
                onMouseLeave={k}
              >
                <button
                  onClick={(oe) => {
                    oe.stopPropagation();
                    ne();
                  }}
                  className="absolute left-4 md:left-8 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-emerald-950 text-white flex items-center justify-center transition-all border border-emerald-900/40 shadow-xl cursor-pointer"
                  title="Previous Image (Arrow Left)"
                >
                  {c.jsx(ChevronLeft, {
                    className: "w-6 h-6",
                  })}
                </button>
                <button
                  onClick={(oe) => {
                    oe.stopPropagation();
                    Q();
                  }}
                  className="absolute right-4 md:right-8 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-emerald-950 text-white flex items-center justify-center transition-all border border-emerald-900/40 shadow-xl cursor-pointer"
                  title="Next Image (Arrow Right)"
                >
                  {c.jsx(ChevronRight, {
                    className: "w-6 h-6",
                  })}
                </button>
                <div className="w-full h-full max-w-5xl max-h-[70vh] flex items-center justify-center relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{
                        scale: 0.95,
                        opacity: 0,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      exit={{
                        scale: 0.95,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="w-full h-full flex items-center justify-center"
                      key={s}
                    >
                      <img
                        src={t[s].src}
                        alt={t[s].title[n]}
                        style={{
                          transform: `scale(${x}) translate(${b.x / x}px, ${b.y / x}px)`,
                          transition: T ? "none" : "transform 0.15s ease-out",
                        }}
                        className="max-w-full max-h-full object-contain select-none pointer-events-none rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-900/20 text-xs font-semibold text-emerald-300 tracking-wide shadow-xl flex items-center gap-2">
                  <ScanEye className="w-4 h-4 text-emerald-400" />
                  <span>
                    {x > 1
                      ? n === "om"
                        ? "GUDDISTEE JIRTA: Qabadhu harkisi garasii deebisi"
                        : n === "am"
                          ? "አጎልተውታል: ምስሉን በመያዝ ማንቀሳቀስ ይችላሉ"
                          : "ZOOMED IN: Grab and drag to pan around and inspect faces"
                      : n === "om"
                        ? "Guddisee laaluuf badbii + cuqqisi yookaan harkiisi"
                        : n === "am"
                          ? "ለማጉላት የ+ ምልክቱን ይጫኑ"
                          : "Use zoom controls (+/-) to view details in High-Definition"}
                  </span>
                </div>
              </div>
              <div className="w-full bg-black/50 border-t border-emerald-950/40 p-4 shrink-0 flex flex-col items-center gap-4 z-10">
                <div className="flex items-center gap-3 justify-start md:justify-center overflow-x-auto max-w-full pb-2 px-4 no-scrollbar">
                  {t.map((oe, ve) => (
                    <button
                      onClick={() => {
                        r(ve);
                        fe();
                      }}
                      className={`relative w-20 md:w-28 aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shrink-0 ${ve === s ? "border-[#054823] scale-105 shadow-md shadow-[#054823]/20" : "border-transparent opacity-50 hover:opacity-100 hover:scale-102"}`}
                      key={ve}
                    >
                      <img
                        src={oe.src}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
