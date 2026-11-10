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

interface HomeOverviewProps {
  language: Language;
  setActiveTab: (tab: ActiveTab) => void;
  aboutSubTab?: any;
  setAboutSubTab?: (tab: any) => void;
  campaigns?: any[];
  onContribute?: (...args: any[]) => void;
}
export default function HomeOverview({
  language: n,
  setActiveTab: e,
  aboutSubTab: t,
  setAboutSubTab: s,
  campaigns: r,
  onContribute: l,
}: HomeOverviewProps) {
  const [d, h] = useState("mission");
  const p = t || d;
  const x = s || h;
  const y = r || mockCampaigns;
  const [b, E] = useState(null);
  const [T, j] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    amount: "1000",
    paymentMethod: "cbe",
    isDiaspora: false,
    transactionId: "",
    receiptFile: null,
  });
  const [L, z] = useState("form");
  const [q, K] = useState<Record<string, any>>({});
  const [Q, ne] = useState(null);
  const [fe, pe] = useState(false);
  const [M, S] = useState(null);
  const [R, k] = useState(false);
  const [O, V] = useState(null);
  const D = (ue, Be) => {
    navigator.clipboard.writeText(ue);
    S(Be);
    setTimeout(() => S(null), 2000);
  };
  const Te = (ue) => {
    const { name: Be, value: ya, type: Os } = ue.target;
    const ci = Os === "checkbox" ? ue.target.checked : false;
    j((Gn) => ({
      ...Gn,
      [Be]: Os === "checkbox" ? ci : ya,
    }));
    if (q[Be]) {
      K((Gn) => {
        const ui = {
          ...Gn,
        };
        delete ui[Be];
        return ui;
      });
    }
  };
  const Ge = (ue) => {
    ue.preventDefault();
    const Be: Record<string, string> = {};
    if (!T.name.trim()) {
      Be.name = translations.valRequired[n];
    }
    if (T.phone.trim()) {
      if (!/^\+?[0-9]{9,15}$/.test(T.phone.replace(/\s/g, ""))) {
        Be.phone = translations.valPhone[n];
      }
    } else {
      Be.phone = translations.valRequired[n];
    }
    if (T.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(T.email)) {
        Be.email = translations.valEmail[n];
      }
    } else {
      Be.email = translations.valRequired[n];
    }
    if (!T.reason.trim()) {
      Be.reason =
        n === "om"
          ? "Sababa gumaachaa ibsuun dirqama"
          : n === "am"
            ? "እባክዎ መነሻ ምክንያትዎን ይግለጹ"
            : "Please provide a reason or comment for funding";
    }
    K(Be);
    if (Object.keys(Be).length === 0) {
      z("verification");
    }
  };
  const U = async (ue) => {
    ue.preventDefault();
    ne(null);
    if (!T.transactionId.trim()) {
      K({
        transactionId:
          n === "om"
            ? "Koodii Dabarsaa (Transaction ID) galchuun dirqama"
            : n === "am"
              ? "እባክዎ የማስተላለፊያ መለያ ቁጥር (Transaction ID) ያስገቡ"
              : "Please enter your Transaction Reference ID / Reference Number",
      });
      return;
    }
    if (b) {
      K({});
      z("submitting");
      try {
        const Be = Number(T.amount) || 1000;
        await addDoc(collection(db, "contributions"), {
          name: T.name,
          email: T.email,
          phone: T.phone,
          reason: T.reason,
          amount: Be,
          paymentMethod: T.paymentMethod,
          isDiaspora: T.isDiaspora,
          selectedCampaignId: b.id,
          transactionId: T.transactionId,
          receiptFileName: T.receiptFile ? T.receiptFile.name : null,
          timestamp: serverTimestamp(),
        });
        if (l) {
          l(b.id, Be, T.name, T.paymentMethod);
        }
        V({
          name: T.name,
          amount: Be,
          campTitle: b.title[n],
          transactionId: T.transactionId,
        });
        z("success");
      } catch (Be) {
        console.error("Error saving contribution: ", Be);
        ne(
          n === "om"
            ? "Gumaacha keessan galmeessuun hin danda'amne. Maaloo irra deebi'aa yaalaa."
            : n === "am"
              ? "ያደረጉትን የድጋፍ መረጃ ለመመዝገብ አልተቻለም። እባክዎ እንደገና ይሞክሩ።"
              : "Unable to save contribution record. Please try again later.",
        );
        z("verification");
      }
    }
  };
  const le = (ue) => {
    ue.preventDefault();
    ue.stopPropagation();
    if (ue.type === "dragenter" || ue.type === "dragover") {
      pe(true);
    } else if (ue.type === "dragleave") {
      pe(false);
    }
  };
  const oe = (ue) => {
    ue.preventDefault();
    ue.stopPropagation();
    pe(false);
    if (ue.dataTransfer.files && ue.dataTransfer.files[0]) {
      j((Be) => ({
        ...Be,
        receiptFile: ue.dataTransfer.files[0],
      }));
    }
  };
  const ve = (ue) => {
    if (ue.target.files && ue.target.files[0]) {
      j((Be) => ({
        ...Be,
        receiptFile: ue.target.files[0],
      }));
    }
  };
  const ke = {
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
    },
    telebirr: {
      bankName: "telebirr Quick Pay",
      merchantId: "BG-992811",
    },
    paypal: {
      provider: "PayPal Secured Global Gateway",
      account: "donations@buusaagonofaa-oromiyaa.org",
    },
  };
  const B = (ue) =>
    new Intl.NumberFormat(n === "en" ? "en-US" : "am-ET", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 0,
    }).format(ue);
  const re = (ue, Be) => {
    if (!Be || Be <= 0 || !ue || ue <= 0) {
      return 0;
    }
    const ya = (ue / Be) * 100;
    if (ya < 1) {
      return Number(ya.toFixed(2));
    } else {
      return Math.min(Math.round(ya), 100);
    }
  };
  const be = [
    {
      id: 1,
      title: {
        om: "Hojii Hubannoo Hawaasaa",
        am: "የማህበረሰብ ግንዛቤ ማስጨበጥ ስራዎች",
        en: "Community Awareness and Education Programs",
      },
      desc: {
        om: "Duula hubannoo hawaasaa fi barsiisa sirna qusannaa dhimma buusaa gonofaa babal'isuu.",
        am: "ስለ ቁጠባ ባህልና ስለ ቡሳ ጎኖፋ አጠቃላይ ጠቀሜታ ግንዛቤ ማስጨበጫ ትምህርት መስጠት።",
        en: "Enriching the savings culture and raising awareness of mutual aid systems.",
      },
    },
    {
      id: 2,
      title: {
        om: "Hojii miseensa Buusaa Gonofaa horachuu",
        am: "የቡሳ ጎኖፋ አባላትን የማፍራት ስራዎች",
        en: "Gaining and recruiting Buusaa Gonofaa members",
      },
      desc: {
        om: "Miseensota haaraa galmeessuun humna wal-gargaarsaa fi hirmaannaa hawaasaa gabbisuu.",
        am: "አዳዲስ አባላትን በመመዝገብ የጋራ መረዳጃ አቅምንና የህብረተሰብ ተሳትፎን ማሳደግ።",
        en: "Registering new community members to fortify collective safety nets.",
      },
    },
    {
      id: 3,
      title: {
        om: "Sassabii buusii Buusaa Gonofaa",
        am: "የቡሳ ጎኖፋ መዋጮዎችንና መደበኛ ክፍያዎችን መሰብሰብ",
        en: "Collecting regular Buusaa Gonofaa membership fees",
      },
      desc: {
        om: "Buusiiwwan idilee miseensota irraa murtaa'an haala sirriin walitti qabuu.",
        am: "ከአባላት የሚጠበቁ መደበኛ መዋጮዎችን በወቅቱና በቅንጅት ማሰባሰብ።",
        en: "Systematic coordination and timely collection of statutory membership fees.",
      },
    },
    {
      id: 4,
      title: {
        om: "Sassabii gumata mallaqan",
        am: "የገንዘብ እርዳታና ስጦታዎችን ማሰባሰብ",
        en: "Mobilizing and collecting cash donations",
      },
      desc: {
        om: "Gumaata maallaqaa deggertoota, daldaltoota fi seektaraalee adda addaa irraa sassaabuu.",
        am: "ከደጋፊዎች፣ ከነጋዴዎችና ከተለያዩ ተቋማት የገንዘብ ድጋፎችን ማሰባሰብ።",
        en: "Securing charitable financial grants from commercial and corporate donors.",
      },
    },
    {
      id: 5,
      title: {
        om: "Sassabii gummata miidhamanii",
        am: "ለአደጋ ለተጋለጡና ለተጎዱ ወገኖች ድጋፍ ማሰባሰብ",
        en: "Collecting contributions for the affected & vulnerable",
      },
      desc: {
        om: "Deggersa addaa namoota balaa adda addaan miidhamaniif gumaata sassaabuu.",
        am: "በተለያየ ምክንያት ጉዳት ለደረሰባቸውና ለተቸገሩ ወገኖች ልዩ ድጋፍ ማሰባሰብ።",
        en: "Mobilizing targeted aid packages for communities recovering from shocks.",
      },
    },
    {
      id: 6,
      title: {
        om: "Sassabii nyaata barataa",
        am: "የተማሪዎች ምገባ ምግብ መዋጮ ማሰባሰብ",
        en: "Supporting student feeding and meal programs",
      },
      desc: {
        om: "Barattoota dandeettii xiqqaa qabaniif nyaata dhiyeessuun akka barnoota isaanii hordofan deeggaruu.",
        am: "አቅመ-ደካማ ለሆኑ ተማሪዎች የምግብ አቅርቦት ድጋፍ በማድረግ ትምህርታቸውን እንዲከታተሉ መርዳት።",
        en: "Funding daily school lunches for underprivileged children to prevent dropout.",
      },
    },
    {
      id: 7,
      title: {
        om: "Ijaarsa sheedii madda galii",
        am: "የገቢ ማስገኛ ሼዶችንና መጠለያዎችን መገንባት",
        en: "Constructing income-generating sheds & shelters",
      },
      desc: {
        om: "Sheediiwwan hojii fi iddoowwan gabaa uumanii maddaan galii dhuunfaa akka dabalu gochuu.",
        am: "የስራ እድል ፈጠራን ለማገዝ የገቢ ማስገኛ ሼዶችንና የገበያ ቦታዎችን መገንባት።",
        en: "Building physical kiosks and trading sheds to foster entrepreneurial growth.",
      },
    },
    {
      id: 8,
      title: {
        om: "Hojii deggersa namoomaa",
        am: "የሰብአዊ ድጋፍና እርዳታ ስራዎች",
        en: "Managing humanitarian assistance & emergency relief",
      },
      desc: {
        om: "Yeroo rakkinaa fi balaa uumamaa deggersa dafee qaqqabu dhiyeessuu.",
        am: "በአደጋና በአስቸኳይ ጊዜያት ፈጣን የሰብአዊ ድጋፍ እርዳታዎችን ማድረስ።",
        en: "Providing immediate disaster relief and rapid response kits across East Shewa.",
      },
    },
    {
      id: 9,
      title: {
        om: "Buusii fi gumata 90% gahe naanotiif dabarsuu",
        am: "90% የሚሆነውን መዋጮና ስጦታ ለክልሉ ማስተላለፍ",
        en: "Transferring 90% of collected fees and donations to the region",
      },
      desc: {
        om: "Maallaqa sassaabame keessaa harki 90% gara naannootti dabarsuun hawaasa bal'aa tajaajiluuf dhimma raawwatamu.",
        am: "ከተሰበሰበው መዋጮ 90 በመቶ የሚሆነውን ለክልል ማዕከል በማስተላለፍ ሰፊውን ህዝብ ማገልገል።",
        en: "Remitting 90% of mobilized revenues to the regional pool for scaled redistribution.",
      },
    },
  ];
  const Ee = [
    {
      category: {
        om: "Kan Jiraataa",
        am: "የነዋሪዎች",
        en: "From Residents",
      },
      rate: {
        om: "Bilisa / Daangaa Malee",
        am: "ያልተገደበ / ያሻቸውን ያህል",
        en: "Unlimited / Voluntary",
      },
      desc: {
        om: "Kaffaltii gumaata dhuunfaa haala fedhii fi dandeettii irratti hundaa'ee",
        am: "እንደ መክፈል አቅምዎና ፍላጎትዎ ያሻዎትን ያህል መጠን",
        en: "Flexible amount based on individual willingness",
      },
    },
    {
      category: {
        om: "Kan Daldalaa",
        am: "የነጋዴዎች",
        en: "From Merchants",
      },
      rate: {
        om: "15,000 Birr",
        am: "15,000 ብር",
        en: "15,000 Birr",
      },
      desc: {
        om: "Daldaltoota dhuunfaaf gumaata waggaa idilee",
        am: "ለግል ነጋዴዎች የሚወሰን አመታዊ ድጋፍ",
        en: "Standard annual contribution for private traders",
      },
    },
    {
      category: {
        om: "Kan Daldala Seektaraa",
        am: "የንግድ ዘርፎች",
        en: "Business Sectors",
      },
      rate: {
        om: "7,500 Birr",
        am: "7,500 ብር",
        en: "7,500 Birr",
      },
      desc: {
        om: "Seektaraalee daldala addaa fi waldaaleef",
        am: "ለተለያዩ የንግድ ዘርፍ ማህበራት",
        en: "Registered industry group allocations",
      },
    },
    {
      category: {
        om: "Kan Baajeta Seektaraa",
        am: "የበጀት ተቋማት",
        en: "Budget/Public Sectors",
      },
      rate: {
        om: "2%",
        am: "2%",
        en: "2% of Budget",
      },
      desc: {
        om: "Baajata waggaa seektarichaa irraa kaffalamu",
        am: "ከተቋማዊ አመታዊ በጀት የሚቀነስ",
        en: "Deducted annual public sector allocation",
      },
    },
  ];
  const Ue = [
    {
      category: {
        om: "Barataa",
        am: "ተማሪዎች",
        en: "Students",
      },
      rate: {
        om: "24 Birr",
        am: "24 ብር",
        en: "24 Birr",
      },
      desc: {
        om: "Kaffaltii buusii waggaa barattoota maraaf",
        am: "አመታዊ መደበኛ መዋጮ ለሁሉም ተማሪዎች",
        en: "Annual membership fee for students",
      },
    },
    {
      category: {
        om: "Jiraataa",
        am: "ነዋሪዎች",
        en: "Residents/Citizens",
      },
      rate: {
        om: "220 Birr",
        am: "220 ብር",
        en: "220 Birr",
      },
      desc: {
        om: "Miseensummaa waggaa jiraattotaaf",
        am: "አመታዊ መደበኛ የነዋሪዎች መዋጮ",
        en: "Annual membership fee for adult residents",
      },
    },
    {
      category: {
        om: "Hojjetaa fi Hoggansa",
        am: "ሰራተኞችና አመራር",
        en: "Employees & Leaders",
      },
      rate: {
        om: "1%",
        am: "1%",
        en: "1% of Salary",
      },
      desc: {
        om: "Mindaa ji'aa irraa buusii kaffalamu",
        am: "ከወርሃዊ ደሞዝ የሚቆረጥ መዋጮ",
        en: "Monthly payroll deduction allocation",
      },
    },
    {
      category: {
        om: "Daldalaa Sadarkaa A",
        am: "ደረቅ ‹ሀ› ነጋዴዎች",
        en: "Grade A Businesses",
      },
      rate: {
        om: "2,400 Birr",
        am: "2,400 ብር",
        en: "2,400 Birr",
      },
      desc: {
        om: "Kuusaa waggaa daldala guddaaf",
        am: "ለከፍተኛ ነጋዴዎች አመታዊ መዋጮ",
        en: "Annual rate for large enterprise operations",
      },
    },
    {
      category: {
        om: "Daldalaa Sadarkaa B",
        am: "ደረቅ ‹ለ› ነጋዴዎች",
        en: "Grade B Businesses",
      },
      rate: {
        om: "1,200 Birr",
        am: "1,200 ብር",
        en: "1,200 Birr",
      },
      desc: {
        om: "Kuusaa waggaa daldala giddu-galeessaaf",
        am: "ለመካከለኛ ነጋዴዎች አመታዊ መዋጮ",
        en: "Annual rate for medium enterprise operations",
      },
    },
  ];
  const qe = {
    title: {
      om: "Damee Adamaa: Ergama fi Sgantaa Keenya",
      am: "የአዳማ የግዳጅ ተልዕኮ እና የልማት ውሳኔ",
      en: "Adama Local Mandate & Integration Focus",
    },
    philosophy: {
      om: "Seera fi aadaa bu'uura sirna Gadaatiin, madaallii misooma herreega maayicroofayinaansii Adamaa fiduuf hojjetna. Dameen keenya qonnaan bultoota fi dubartoota liqii bilisaan gargaara.",
      am: "በአዳማ ዙሪያ የሚገኙ ምስራቅ ሸዋ ገበሬዎችን እርስ በርስ ለማስተሳሰር ከዘመናዊ የኢንሹራንስና የማይክሮ ፋይናንስ ዋስትና ጋር አቀናጅተን አባላቶቻችንን እንደግፋለን።",
      en: "Synthesizing democratic Oromo cooperativism with digital risk indexing. Our Adama team manages grassroot safety nets across East Shewa, protecting small enterprise cohorts and micro-farming families against environmental or seasonal anomalies.",
    },
  };
  const Je = {
    title: {
      om: "Seenaa fi Bulchiinsa Buusaa Gonofaa",
      am: "ስለ ተቋሙ ፣ ታሪካዊ ቅርስ እና የአስተዳደር መዋቅር",
      en: "Corporate Legacy, History & Corporate Governance",
    },
    subtitle: {
      om: "Eeyyamama, seenaa hundeeffamaa (1999), caasaa bulchiinsaa fi hoggansa deeggarsa fi tajaajila hawaasaa bal'inaan kora keenya irratti.",
      am: "የተቋቋመበትን ታሪክ (1999)፣ ተልዕኮና ራዕይ፣ የአስተዳደር መዋቅር እና የቡሳ ጎኖፋ ማህበራዊ አገልግሎቶች በዝርዝር እዚህ ያንብቡ።",
      en: "Trace Buusaa Gonofaa's deep historic roots since 1999, our core mission, governance hierarchy, and administrative bodies dedicated to regional financial inclusion.",
    },
  };
  const Pt = [
    {
      id: "mission",
      label: {
        om: "Ergama & Mul'ata",
        am: "ተልዕኮ እና ራዕይ",
        en: "Mission & Vision",
      },
      icon: <Compass className="w-5.5 h-5.5" />,
    },
    {
      id: "history",
      label: {
        om: "Seenaa & Guddina",
        am: "ታሪካዊ ጉዞ",
        en: "History & Timeline",
      },
      icon: c.jsx(History, {
        className: "w-5.5 h-5.5",
      }),
    },
    {
      id: "structure",
      label: {
        om: "Caasaa Bulchiinsaa",
        am: "የመዋቅር ገበታ",
        en: "Corporate Structure",
      },
      icon: c.jsx(Workflow, {
        className: "w-5.5 h-5.5",
      }),
    },
    {
      id: "management",
      label: {
        om: "Qaama Hoggansaa",
        am: "የማኔጅመንት አካል",
        en: "Management & Team",
      },
      icon: <UserCheck className="w-5.5 h-5.5" />,
    },
  ];
  return (
    <div className="space-y-20 py-16" id="home-overview-container">
      <section
        className="w-full px-4 sm:px-8 lg:px-12 xl:px-16"
        id="branch-mission-overview"
      >
        <div className="bg-white rounded-3xl border border-emerald-100 p-8 md:p-12 relative overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-300 active:scale-[0.995] transition-all duration-300 text-left cursor-pointer">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full opacity-60 -translate-y-10 translate-x-10 -z-10" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-[#054823] border border-emerald-100 rounded-full text-xs font-extrabold uppercase tracking-widest">
                <Compass
                  className="w-4 h-4 text-emerald-600 animate-spin"
                  style={{
                    animationDuration: "6s",
                  }}
                />
                <span>
                  {n === "om"
                    ? "Sagantaa Gadaa Adamaa"
                    : n === "am"
                      ? "ባህላዊ የልማት ራዕይ"
                      : "Adama Local Focus"}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-emerald-950 tracking-tight font-sans">
                {qe.title[n]}
              </h3>
              <p className="text-base md:text-lg text-gray-700 font-semibold leading-relaxed">
                {qe.philosophy[n]}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex gap-3 hover:translate-x-1 transition-transform">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Sprout className="w-5 h-5 text-[#054823]" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-950 uppercase tracking-wider">
                      {n === "om"
                        ? "Qonna Bilisaa"
                        : n === "am"
                          ? "ምርጥ የገጠር ግብርና"
                          : "Climate Risk Adaptation"}
                    </h5>
                    <p className="text-xs md:text-sm text-gray-500 font-medium leading-normal mt-0.5">
                      {n === "om"
                        ? "Inshuraansii qilleensa madaquu qonnaan bultootaaf"
                        : "Tailored high-grade micro-indexing"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 hover:translate-x-1 transition-transform">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                    {c.jsx(Users, {
                      className: "w-5 h-5 text-[#054823]",
                    })}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-950 uppercase tracking-wider">
                      {n === "om"
                        ? "Hirmaannaa Dubartootaa"
                        : n === "am"
                          ? "የሴት ሥራ ፈጣሪዎች ፈንድ"
                          : "Affordable Micro-Credit"}
                    </h5>
                    <p className="text-xs md:text-sm text-gray-500 font-medium leading-normal mt-0.5">
                      {n === "om"
                        ? "Wabii hojii xixiqqaa liqii salphaan deeggaru"
                        : "Fast collateral-free group guarantees"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 bg-emerald-950 text-white rounded-2xl p-6 border border-emerald-800 space-y-4 shadow-xl">
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-300">
                {n === "om"
                  ? "Qunnamtii Hawaasaa Gadaa"
                  : n === "am"
                    ? "የአዳማ አባ ገዳዎች ማህበር"
                    : "Buusaa Gonofaa Covenant"}
              </h4>
              <p className="text-[11.5px] text-emerald-100 font-medium leading-relaxed italic">
                {n === "om"
                  ? '"Namni rakkate kophaatti hin dhiisamu; wal-gargaaruun aadaa keenyadha. Buusaa Gonofaan dhiiga keenya."'
                  : n === "am"
                    ? '"ማንኛውም የተቸገረ ወንድማችን በብቸኝነት አይተውም፤ መረዳዳት የገዳ ህጋችን መገለጫ ነው።"'
                    : '"Under the sacred covenant, no community member shall endure hardship alone; dynamic redistribution restores parity."'}
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-emerald-800/60">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 shadow-xs">
                  {c.jsx(Award, {
                    className: "w-5 h-5 text-emerald-300",
                  })}
                </div>
                <div>
                  <span className="block text-xs font-bold text-white uppercase tracking-wide">
                    {n === "om"
                      ? "Jarsoolii Gadaa Adamaa"
                      : n === "am"
                        ? "የአዳማ አባ ገዳዎች ማህበር"
                        : "Adama Gadaa Advisory"}
                  </span>
                  <span className="block text-[9.5px] text-emerald-300 font-bold uppercase tracking-wider">
                    {n === "om" ? "Tikisii Aadaa" : "Cultural Council Verified"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="w-full px-4 sm:px-8 lg:px-12 xl:px-16"
        id="about-section-wrapper"
      >
        <div className="space-y-8">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 inline-block">
              {n === "om"
                ? "Wabii fi Seenaa Keenya"
                : n === "am"
                  ? "ስለ ቅርሳችንና አስተዳደራችን"
                  : "Our Identity & Governance"}
            </span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-emerald-950 uppercase tracking-wider font-sans leading-tight">
              {Je.title[n]}
            </h3>
            <p className="text-base md:text-lg lg:text-xl text-gray-650 font-semibold leading-relaxed">
              {Je.subtitle[n]}
            </p>
          </div>
          <div className="flex flex-nowrap sm:flex-wrap items-center overflow-x-auto no-scrollbar justify-start sm:justify-center gap-2 sm:gap-3 border-b border-emerald-100 pb-3 pt-1 px-1 -mx-2 sm:mx-0">
            {Pt.map((ue) => {
              const Be = p === ue.id;
              return (
                <button
                  onClick={() => x(ue.id)}
                  className={`flex items-center gap-2 sm:gap-3 px-3.5 py-2.5 sm:px-6 sm:py-3.5 rounded-xl text-xs sm:text-base font-black uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95 shrink-0 ${Be ? "bg-emerald-600 text-white shadow-md" : "bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-950 border border-emerald-100"}`}
                  key={ue.id}
                >
                  <span className="shrink-0">{ue.icon}</span>
                  <span className="whitespace-nowrap">{ue.label[n]}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
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
                transition={{
                  duration: 0.25,
                }}
                className="w-full"
                key={p}
              >
                {p === "mission" && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-emerald-50/20 border border-emerald-100 p-8 rounded-2xl space-y-5 flex flex-col justify-between hover:border-emerald-300 hover:shadow-xs transition-all duration-300">
                        <div className="space-y-5">
                          <div className="w-14 h-14 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-md">
                            <Sprout className="w-7 h-7" />
                          </div>
                          <h4 className="text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-wider">
                            {n === "om"
                              ? "Kaayyoo Buusaa Gonofaa Oromiyaa"
                              : n === "am"
                                ? "የቡሳ ጎኖፋ ዓላማ"
                                : "Our Objectives"}
                          </h4>
                          <div className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed space-y-4">
                            {n === "om" ? (
                              <ul className="list-disc pl-5 space-y-3.5">
                                <li>
                                  <strong>Duudhaa Cimsuu:</strong> Aadaa fi
                                  duudhaa walgargaarsa Ummata Oromoo jabeessee
                                  dagaagsuu.
                                </li>
                                <li>
                                  <strong>Dhaloota Of-Eeggannoo:</strong>{" "}
                                  Dhaloota jaalala hojii, aadaa qusannaa qabu fi
                                  quuqama namoomaa qabu uumuu.
                                </li>
                                <li>
                                  <strong>Gargaarsa Yeroo Balaa:</strong>{" "}
                                  Hawaasa balaa uumamaa ykn nam-tolcheen
                                  miidhame gargaaruu, fayyisuu fi
                                  dandamachiisuu.
                                </li>
                              </ul>
                            ) : n === "am" ? (
                              <ul className="list-disc pl-5 space-y-3.5">
                                <li>
                                  <strong>እሴቶችን ማጠናከር፦</strong> የኦሮሞን ሕዝብ
                                  የመረዳዳትና የመደጋገፍ በጎ ታሪካዊ ባህል ይበልጥ ማጠናከርና ማስፋፋት።
                                </li>
                                <li>
                                  <strong>ስራ-ወዳድ ትውልድ፦</strong> ስራን፣ ቁጠባንና ሰብአዊ
                                  ርህራሄን የተላበሰ ንቁ የህብረተሰብ ትውልድ መፍጠር።
                                </li>
                                <li>
                                  <strong>የአደጋ ጊዜ ዕርዳታ፦</strong> በተፈጥሮ ወይም በሰው
                                  ሰራሽ አደጋዎች የተጎዱ ወገኖችን መርዳት፣ ማዳንና መልሶ ማቋቋም።
                                </li>
                              </ul>
                            ) : (
                              <ul className="list-disc pl-5 space-y-3.5">
                                <li>
                                  <strong>Reinforcing Cultural Values:</strong>{" "}
                                  To strengthen and promote the culture and
                                  values of mutual aid among the Oromo people.
                                </li>
                                <li>
                                  <strong>Prudent Generation:</strong> To
                                  cultivate a generation that values labor,
                                  possesses a strong savings culture, and
                                  harbors human empathy.
                                </li>
                                <li>
                                  <strong>Disaster Response:</strong> To assist,
                                  rescue, and rehabilitate communities affected
                                  by natural or man-made disasters.
                                </li>
                              </ul>
                            )}
                          </div>
                        </div>
                        <div className="pt-4 border-t border-emerald-100">
                          <span className="text-sm font-extrabold text-emerald-700 block uppercase tracking-widest">
                            {n === "om"
                              ? "Labsii fi Qajeelfama Gargaarsaa"
                              : "Statutory Assistance Guidelines"}
                          </span>
                        </div>
                      </div>
                      <div className="bg-amber-50/25 border border-amber-200 p-8 rounded-2xl space-y-5 flex flex-col justify-between hover:border-amber-300 hover:shadow-md transition-all duration-300">
                        <div className="space-y-5">
                          <div className="w-14 h-14 bg-amber-600 text-white rounded-xl flex items-center justify-center shadow-md">
                            <Compass className="w-7 h-7" />
                          </div>
                          <h4 className="text-xl md:text-2xl font-black text-amber-950 uppercase tracking-wider">
                            {n === "om"
                              ? "Mul'ata Buusaa Gonofaa Oromiyaa"
                              : n === "am"
                                ? "የቡሳ ጎኖፋ ራዕይ"
                                : "Our Vision"}
                          </h4>
                          <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed">
                            {n === "om"
                              ? "Milkaa'ina sirna liqii fi qusannoo naannoo Oromiyaatti mirkaneessuun, hawaasa hiyyummaarraa walaba ta'e, of-danda'ee fi dinagdeen jabaate uumuu dha."
                              : n === "am"
                                ? "የፋይናንስና የቁጠባ ተደራሽነትን በማረጋገጥ፣ ከድህነት ነጻ የሆነ፣ ራሱን የቻለና በኢኮኖሚ የጎለበተ ማህበረሰብ በኦሮሚያ ክልል መፍጠር ነው።"
                                : "To secure a successful microfinance and saving ecosystem in Oromia, fostering a poverty-free, self-reliant, and economically resilient society."}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-amber-100">
                          <span className="text-sm font-extrabold text-amber-700 block uppercase tracking-widest">
                            {n === "om"
                              ? "Mul'ata Guddina Hawaasaa"
                              : "Social Progress Vision"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {p === "history" && (
                  <div className="space-y-8">
                    <div className="border-b border-emerald-50 pb-4">
                      <h4 className="text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-widest flex items-center gap-2">
                        {c.jsx(History, {
                          className: "w-6 h-6 text-emerald-600",
                        })}
                        <span>
                          {n === "om"
                            ? "Seenaa Buusaa Gonofaa"
                            : n === "am"
                              ? "የቡሳ ጎኖፋ ታሪካዊ አመጣጥ"
                              : "History of Buusaa Gonofaa"}
                        </span>
                      </h4>
                      <p className="text-sm sm:text-base text-gray-500 font-bold uppercase mt-1">
                        {n === "om"
                          ? "Maalummaa duudhaa fi aadaa walgargaarsa Oromoo"
                          : "Indigenous Oromo mutual aid traditions and chronological timeline"}
                      </p>
                    </div>
                    <div className="p-8 bg-emerald-50/20 border border-emerald-100 rounded-2xl">
                      <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed">
                        {n === "om"
                          ? "Buusaa Gonofaan duudhaa aadaa Oromoo kan yeroo rakkinaa (balaawwan uumamaa fi nam-tolchee) waliin gargaaramanii ittiin waliin dhaabbatan yoo ta'u, kaayyoon isaa inni guddaan hawaasa balaaf saaxilame ofirraa qolachuu, dandamachiisuu, deeggaruu fi deebisanii dhaabuudha."
                          : n === "am"
                            ? "ቡሳ ጎኖፋ የኦሮሞ ህዝብ በአስቸጋሪ የአደጋ ጊዜያት (ተፈጥሮአዊና ሰው ሰራሽ አደጋዎች) እርስ በርስ የሚደጋገፍበትና አጋርነቱን የሚያሳይበት ታሪካዊ ባህላዊ እሴት ሲሆን፤ ዋነኛ አላማውም ለአደጋ የተጋለጡ የህብረተሰብ ክፍሎችን መከላከል, መደገፍና መልሶ ማቋቋም ነው።"
                            : "Buusaa Gonofaa is an indigenous Oromo cultural value through which communities cooperate and stand together during times of hardship (natural and man-made disasters). Its primary goal is to protect, rehabilitate, support, and rebuild disaster-exposed communities."}
                      </p>
                    </div>
                    <div className="relative pl-6 border-l-2 border-emerald-100 ml-4 space-y-10 py-2">
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-xs" />
                        <div className="space-y-1.5">
                          <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-widest">
                            {n === "om"
                              ? "Bara 1999 - Hundeeffama"
                              : "1999 - Founded"}
                          </span>
                          <h5 className="text-lg sm:text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-tight">
                            {n === "om"
                              ? "Hundeeffama Jalqabaa HUNDEE NGO dhaan"
                              : "Established by Ethiopian NGO Hundee"}
                          </h5>
                          <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed max-w-4xl">
                            {n === "om"
                              ? "Buusaa Gonofaa NGO biyya keessaa 'Hundee' jedhamuun hundeeffamee tajaajila liqii dhiyeessuu jalqabe. Hundeeffamni isaa aadaa fi wal-gargaarsa miidhamtootaa 'Buusaa Gonofaa' Oromoo irratti hundaa'e."
                              : n === "am"
                                ? "የአትዮጵያ መንግስታዊ ያልሆነ ድርጅት ሁንዴ (Hundee) በኦሮሚያ ክልል የብድር ፕሮግራሞችን ለማስተዳደር በ1999 ዓ.ም የጀመረው ባህላዊ የቡሳ ጎኖፋ ማህበራዊ ጥበቃን መሠረት በማድረግ ነው።"
                                : "Buusaa Gonofaa was established by the Ethiopian NGO Hundee to manage credit programs in the Oromia region, drawing inspiration from the indigenous Buusaa Gonofaa social protection mechanism."}
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-xs" />
                        <div className="space-y-1.5">
                          <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-widest">
                            {n === "om"
                              ? "Babal'ina fi Guddina"
                              : "Early Growth"}
                          </span>
                          <h5 className="text-lg sm:text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-tight">
                            {n === "om"
                              ? "Babal'ina Gara Baadiyyaa fi Magaalaa"
                              : "Reach Expansion & Diverse Products"}
                          </h5>
                          <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed max-w-4xl">
                            {n === "om"
                              ? "Dhaabbatichi dafnaan tajaajila isaa guutuu Oromiyaa keessatti babal'ise; meeshaalee faayinaansii qonnatotaaf, dubartoota gurmaa'aniif, fi maatii galii dadhaboo ta'aniif kan mijeessan kalaqe."
                              : n === "am"
                                ? "ተቋሙ በኦሮሚያ የገጠርና የከተማ አካባቢዎች ተደራሽነቱን በማስፋት ለአነስተኛ አርሶ አደሮች፣ ለሴት ስራ ፈጣሪዎች እና ዝቅተኛ ገቢ ላላቸው አባላት የተበጁ ልዩ ልዩ የፋይናንስ ምርቶችን አስተዋውቋል።"
                                : "The institution expanded its reach across rural and urban areas of Oromia, introducing diverse financial products tailored to the needs of smallholder farmers, women entrepreneurs, and low-income households."}
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-xs" />
                        <div className="space-y-1.5">
                          <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-widest">
                            {n === "om"
                              ? "Bara 2010 - Kalaqa Wabii"
                              : "2010 - Weather Insurance"}
                          </span>
                          <h5 className="text-lg sm:text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-tight">
                            {n === "om"
                              ? "Inshuraansii Roobaa Jalqabsiisuu"
                              : "Rainfall-Based Crop Insurance Pioneered"}
                          </h5>
                          <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed max-w-4xl">
                            {n === "om"
                              ? "Bara 2010 keessa, Buusaa Gonofaa inshuraansii oomisha qonnaa balaa roobaa irratti hundaa'e EFPRI waliin mijeessuun Adamaa, Baako, fi Shashemene keessatti jalqabe."
                              : n === "am"
                                ? "በ2010 ዓ.ም ቡሳ ጎኖፋ በኢትዮጵያ ለመጀመሪያ ጊዜ በዝናብ ጠብታ መለኪያ ላይ የተመሰረተ የሰብል ዋስትና በAdama፣ Bako እና Shashamane ከአለም አቀፍ ድርጅት (EFPRI) ጋር በመተባበር ፈጠራን አስመዝግቧል።"
                                : "In 2010, Buusaa Gonofaa pioneered rainfall-based crop insurance in collaboration with IFPRI/EFPRI, first introducing the product in Adama, Bako, and Shashamane."}
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-xs" />
                        <div className="space-y-1.5">
                          <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-widest">
                            {n === "om"
                              ? "Bara 2020 - Beekamtii"
                              : "2020 - European Award Finalist"}
                          </span>
                          <h5 className="text-lg sm:text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-tight">
                            {n === "om"
                              ? "Leenjii fi Gudiina Dinagdee Addunyaa"
                              : "Finalist: European Microfinance Award 2020"}
                          </h5>
                          <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed max-w-4xl">
                            {n === "om"
                              ? "Dhaabbatichi gumaacha gamtaa qusannoo ijaaruu fi maatiilee dadhaboo tajaajiluuf hojjeteef 'European Microfinance Award 2020' irratti finalist ta'uun addunyaatti adda bahe."
                              : n === "am"
                                ? "ተቋሙ እ.እ.አ. በ2020 የቁጠባ አሰባሰብ እና ተጋላጭ የሆኑ የህብረተሰብ ክፍሎችን በመደገፍ ላሳየው ልዩ ስራ ለታዋቂው የአውሮፓ ማይክሮ ፋይናንስ ሽልማት (European Microfinance Award) የመጨረሻ እጩ ተወዳዳሪ ሆኖ እውቅና አግኝቷል።"
                                : "The institution was recognized as a finalist for the European Microfinance Award 2020 for its exceptional work in mobilizing savings and serving vulnerable populations."}
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-xs" />
                        <div className="space-y-1.5">
                          <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-105 text-[#054823] font-mono text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-widest">
                            {n === "om"
                              ? "Har'a - Guddina Guutuu"
                              : "Today - Robust Standing"}
                          </span>
                          <h5 className="text-lg sm:text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-tight">
                            {n === "om"
                              ? "Miseensota Kuma 110 fi Damee Adamaa"
                              : "110,000+ Active Savers Regionwide"}
                          </h5>
                          <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed max-w-4xl">
                            {n === "om"
                              ? "Miseensota qusattuota kuma dhibba fi kumi kudhan (110,000) fi caasaa damee cimaa to'achuun, Buusaa Gonofaa har'as humneessuu faayinaansii fi wal-gargaarsaa Gadaa naannoo keenyaatti ifa godhaa jira."
                              : n === "am"
                                ? "በአሁኑ ጊዜ በአጠቃላይ ከ110,000 በላይ ንቁ ቆጣቢዎችን በመያዝ እና በመላው ኦሮሚያ ጠንካራ መገኘትን በመፍጠር የፋይናንስ ተደራሽነት እና የማህበረሰብ ማብቂያ ፋና ወጊ ሆኖ ቀጥሏል።"
                                : "With approximately 110,000 active savers and a strong presence across Oromia, Buusaa Gonofaa continues to be a beacon of financial inclusion and community empowerment."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {p === "structure" && (
                  <div className="space-y-8">
                    <div className="border-b border-emerald-50 pb-4">
                      <h4 className="text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-widest flex items-center gap-2">
                        {c.jsx(Workflow, {
                          className: "w-6 h-6 text-emerald-600",
                        })}
                        <span>
                          {n === "om"
                            ? "Caasaa Hojii"
                            : "Organizational Governance Structure"}
                        </span>
                      </h4>
                      <p className="text-sm sm:text-base text-gray-500 font-bold uppercase mt-1">
                        {n === "om"
                          ? "Odeeffannoo hoggansa waajjira damee Adaamaa"
                          : "Accountable chains rendering professional community support"}
                      </p>
                    </div>
                    <div className="p-8 bg-emerald-50/20 border border-emerald-100 rounded-2xl">
                      <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed">
                        {n === "om"
                          ? "Caasaa Hojii Buusaa Gonofaa Oromiyaa caasaa itti gaafatamummaa fi hojii qajeelfamoota, labsiilee fi dambiilee adda addaa (keessattuu Labsii Buusaa Gonofaa fi Dambii Lak. 235/2015) irratti hundaa'uun diriiredha. Manni hojii kun balaawwan uumamaa fi nam-tolchee ittisuu, ittisa deebii hatattamaa kennuu fi kutaalee hawaasaa miidhamoo ta'an gargaaruuf caasame."
                          : n === "am"
                            ? "የኦሮሚያ ቡሳ ጎኖፋ የስራና የአደረጃጀት መዋቅር ተጠያቂነትን፣ መመሪያዎችን፣ አዋጆችንና ደንቦችን (በተለይም የቡሳ ጎኖፋ አዋጅ እና ደንብ ቁጥር 235/2015) መሠረት በማድረግ የተዘረጋ ነው። ይህ መስሪያ ቤት ተፈጥሮአዊና ሰው ሰራሽ አደጋዎችን ለመከላከል፣ የአደጋ ጊዜ ምላሽ ለመስጠትና ተጋላጭ የሆኑ የማህበረሰብ ክፍሎችን ለመደገፍ የተቋቋመ ነው።"
                            : "The organizational structure of Buusaa Gonofaa Oromia is established based on the responsibilities and guidelines of various proclamations and regulations (particularly the Buusaa Gonofaa Proclamation and Regulation No. 235/2015). This institution is structured to mitigate natural and man-made disasters, deploy emergency relief, and support vulnerable community demographics."}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                      <div className="p-8 rounded-2xl bg-emerald-50/30 border border-emerald-100/80 space-y-6">
                        <h5 className="text-base sm:text-lg md:text-xl font-black text-[#054823] uppercase tracking-wider border-b border-emerald-100 pb-3 flex items-center gap-2">
                          <Building className="w-5 h-5" />
                          <span>
                            {n === "om"
                              ? "Caasaa Gurguddoo Gurmaa'insa Keessaa"
                              : n === "am"
                                ? "ዋና የውስጥ መዋቅር"
                                : "Core Internal Structure"}
                          </span>
                        </h5>
                        <ul className="space-y-4 text-sm sm:text-base text-slate-850 font-semibold leading-relaxed text-slate-800">
                          <li>
                            <strong className="text-emerald-950 block font-bold text-xs sm:text-sm uppercase tracking-wide">
                              {n === "om"
                                ? "1. Koreewwan Daayirektarootaa"
                                : "1. Board of Directors / Central Committee"}
                            </strong>
                            {n === "om"
                              ? "Sadarkaa naannoo gubbaatti dhimmoota tarsiimoo fi murteewwan gurguddoo deeggarsaa ni murteessu."
                              : "Provides strategic oversight and critical resource allocation decisions at the highest level."}
                          </li>
                          <li>
                            <strong className="text-emerald-950 block font-bold text-xs sm:text-sm uppercase tracking-wide">
                              {n === "om"
                                ? "2. Hoogganaa Buusaa Gonofaa"
                                : "2. General Leader / Managing Director"}
                            </strong>
                            {n === "om"
                              ? "Karoora hojii, baajata waggaa gopheessuu fi hoggansa olaanaa manneen hojichaa ni hordofa."
                              : "Directs operational targets, formulates annual budgets, and oversees regional progress."}
                          </li>
                          <li>
                            <strong className="text-emerald-950 block font-bold text-xs sm:text-sm uppercase tracking-wide">
                              {n === "om"
                                ? "3. Waajjiraalee Sadarkaan Jiran"
                                : "3. Regional & Zonal Office Networks"}
                            </strong>
                            {n === "om"
                              ? "Caasaan kun irra jireessan sadarkaa Naannoo, Godinaa fi Aanaa (amma tokko tokkos ganda) irratti diriirfamee jira."
                              : "Decentralized layout branching from Regional HQ to Zonal, Woreda, and Kebele support units."}
                          </li>
                          <li>
                            <strong className="text-emerald-950 block font-bold text-xs sm:text-sm uppercase tracking-wide">
                              {n === "om"
                                ? "4. Miseensota fi Gurmaa'insa Hojjettootaa"
                                : "4. Employee & Member Mobilization"}
                            </strong>
                            {n === "om"
                              ? "Hojjettoonni manneen hojii mootummaa naannichaa keessa jiran ijaarama kanaan walitti qabamuun ni hirmaatu."
                              : "Engaging public and community stakeholders to organize active village committees and savings associations."}
                          </li>
                        </ul>
                      </div>
                      <div className="p-8 rounded-2xl bg-emerald-950 text-white space-y-6 shadow-xl">
                        <h5 className="text-base sm:text-lg md:text-xl font-black text-emerald-300 uppercase tracking-wider border-b border-emerald-800 pb-3 flex items-center gap-2">
                          {c.jsx(Shield, {
                            className: "w-5 h-5",
                          })}
                          <span>
                            {n === "om"
                              ? "Xiyyeeffannoo Bulchiinsaa"
                              : n === "am"
                                ? "የበጀትና የድጋፍ ትኩረት"
                                : "Administrative Mandates"}
                          </span>
                        </h5>
                        <ul className="space-y-5 text-sm sm:text-base text-emerald-100 font-semibold leading-relaxed">
                          <li>
                            <strong className="text-white block font-bold text-xs sm:text-sm uppercase tracking-wide">
                              {n === "om"
                                ? "Bulchiinsa Fandii"
                                : "Fund Administration"}
                            </strong>
                            {n === "om"
                              ? "Fandiin sassaabamu akkaataa Qajeelfama Buusaa Gonofaa irratti ibsametti, itti gaafatamaa waajjira maallaqaa fi bulchiinsa Buusaa Gonofaa qofaan socho'a."
                              : "All collected public or institutional funds are administered and disbursed in strict compliance with the statutory Buusaa Gonofaa Guidelines."}
                          </li>
                          <li>
                            <strong className="text-white block font-bold text-xs sm:text-sm uppercase tracking-wide">
                              {n === "om"
                                ? "Gaaddisa Buusaa Gonofaa"
                                : "Gaaddisa Support Shelters"}
                            </strong>
                            {n === "om"
                              ? "Sadarkaa naannootiin dhimma tajaajila bishaanii, midhaan gargaarsaa fi wantoota hatattamaa deeggaruuf dhimma raawwatu dha."
                              : "Handles the emergency dispatch of clean water, relief grains, and relief supplies at the regional scale."}
                          </li>
                        </ul>
                      </div>
                      <div className="p-8 rounded-2xl bg-emerald-50/30 border border-emerald-100/80 space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs">
                          <UserCheck className="w-6 h-6" />
                        </div>
                        <h5 className="text-base sm:text-lg md:text-xl font-black text-emerald-950 uppercase tracking-wider">
                          {n === "om"
                            ? "Hojii Damee Adamaa"
                            : n === "am"
                              ? "የቅርንጫፍ ስራዎች"
                              : "Branch Operations"}
                        </h5>
                        <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">
                          {n === "om"
                            ? "Dameen keenya Adamaa hawaasa naannoo gargaarsa dhuunfaa bilisa ta'ee fi hordoffi faayinaansii gaariin hojjetoota dedicated ta'aniin kenna."
                            : n === "am"
                              ? "የአዳማ ቅርንጫፍ የወሰኑ ሰራተኞችን በመመደብ ግላዊ አገልግሎት እና የፋይናንስ መመሪያዎችን ለአካባቢው ማህበረሰብ ያቀርባል።"
                              : "The Adama branch serves the local community with dedicated staff providing personalized service and financial guidance."}
                        </p>
                      </div>
                      <div className="p-8 rounded-2xl bg-emerald-50/30 border border-emerald-100/80 space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs">
                          {c.jsx(Shield, {
                            className: "w-6 h-6",
                          })}
                        </div>
                        <h5 className="text-base sm:text-lg md:text-xl font-black text-emerald-950 uppercase tracking-wider">
                          {n === "om"
                            ? "Gareewwan Deggartootaa"
                            : n === "am"
                              ? "የድጋፍ ሰጪ ክፍሎች"
                              : "Support Functions"}
                        </h5>
                        <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">
                          {n === "om"
                            ? "Faayinaansii, HR, IT, fi gareewwan compliance gahumsa hojii guddina tarsiimo fi tikisii seeraa dhaabbatichaa hunda eeyyamu."
                            : n === "am"
                              ? "ፋይናንስ፣ የሰው ኃይል፣ የአይቲ እና የህግ ተገዢነት ቡድኖች በተቋሙ ውስጥ የስራ ዝግጅትን እና የህግ ተገዢነትን ያረጋግጣል።"
                              : "Finance, HR, IT, and compliance teams ensure operational excellence and regulatory compliance across the organization."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {p === "management" && (
                  <div className="space-y-8">
                    <div className="border-b border-emerald-50 pb-4">
                      <h4 className="text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-widest flex items-center gap-2">
                        <UserCheck className="w-6 h-6 text-emerald-600" />
                        <span>
                          {n === "om"
                            ? "Qaama Hoggansaa fi Bulchiinsaa"
                            : "Management Bodies & Leadership"}
                        </span>
                      </h4>
                      <p className="text-sm sm:text-base text-gray-500 font-bold uppercase mt-1">
                        {n === "om"
                          ? "Hoggantoota muuxannoo qaban damee qusannootiin"
                          : "Accomplished professionals managing grassroots microfinance channels"}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-6">
                        <div className="p-8 bg-emerald-50/20 border border-emerald-100/50 rounded-2xl space-y-6">
                          <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed">
                            {n === "om"
                              ? "Hoggansi keenya ogeessota dhuunfaa muuxannoo dheeraa maayicroofayinaansii, misooma hawaasummaa, fi tajaajila faayinaansii qaban irraa ijaarame. Yaadi adda addaa fi kutannoon isaanii ergama keenya guddisuuf furtuudha."
                              : n === "am"
                                ? "የአመራር አካላት በደረጃ ማይክሮ ፋይናንስ፣ በማህበረሰብ ልማት እና በፋይናንስ አገልግሎት ጥልቅ እውቀት ያላቸው ልምድ ያላቸው ባለሙያዎችን ያቀፈ ነው። ተልእኮአችንን ለማራመድ የተለያዩ አመለካከቶችን እና ቁርጠኝነትን ያመጣሉ።"
                                : "Our management bodies are composed of experienced professionals with deep expertise in microfinance, community development, and financial services. They bring diverse perspectives and commitment to advancing our mission."}
                          </p>
                          <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed">
                            {n === "om"
                              ? "Dameen Adamaa hoggantoota damee, ofisara liqii fi deggartoota miseensota keenyaa kallattiin gargaaranii fi furmaata mijeessaniin durfama."
                              : n === "am"
                                ? "የአዳማ ቅርንጫፍ የማህበረሰቡን የፋይናንስ ፍላጎት ለመረዳት እና ተስማሚ መፍትሄዎችን ለመስጠት በቀጥታ ከህብረተሰቡ ጋር በሚሰሩ ቅርንጫፍ ስራ አስኪያጆች፣ የብድር መኮንኖች እና የደንበኞች አገልግሎት ተወካዮች ይመራል።"
                                : "The Adama branch is led by a dedicated team of branch managers, loan officers, and customer service representatives who work directly with community members to understand their financial needs and provide tailored solutions."}
                          </p>
                        </div>
                        <div className="p-8 border border-emerald-100/70 bg-emerald-50/10 rounded-2xl">
                          <h5 className="text-base sm:text-lg md:text-xl font-black text-emerald-950 uppercase tracking-wider mb-2">
                            {n === "om"
                              ? "Oddeeffannoo Dabalataa"
                              : n === "am"
                                ? "ቢሮአችንን ያግኙ"
                                : "Administrative Transparency"}
                          </h5>
                          <p className="text-sm sm:text-base text-gray-700 font-semibold leading-relaxed">
                            {n === "om"
                              ? "Waa'ee hoggantoota keenyaa dabalataan argachuuf, desk kora Adamaa keenya kallattiin quunnamuu dandeessu."
                              : n === "am"
                                ? "ስለ ወቅታዊ አመራራችን እና የአስተዳደር መዋቅራችን ዝርዝር መረጃ ለማግኘት እባክዎን የአዳማ ቅርንጫፍን በቀጥታ ያነጋግሩ።"
                                : "For detailed information about our current leadership, curriculum vitae, and management structure, please contact our Adama branch administrative desk directly."}
                          </p>
                        </div>
                      </div>
                      <div className="bg-emerald-950 text-white rounded-2xl p-8 flex flex-col justify-between shadow-xl border border-emerald-900 space-y-6">
                        <div className="space-y-4">
                          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-emerald-300">
                            {c.jsx(Users, {
                              className: "w-6 h-6",
                            })}
                          </div>
                          <h4 className="text-base sm:text-lg md:text-xl font-black uppercase tracking-wider text-emerald-300">
                            {n === "om"
                              ? "Damee Adamaa Quunnamtuu"
                              : "Get in Touch Directly"}
                          </h4>
                          <p className="text-xs sm:text-sm text-emerald-100 font-semibold leading-relaxed">
                            {n === "om"
                              ? "Dameen keenya gargaarsa dhuunfaa akkasumas marii hoggansaa bilisaan mijeessa. Nu quunnamaa."
                              : "Connect directly with our local managers at Adama Central Post Office Area or submit a direct enquiry."}
                          </p>
                          <div className="border-t border-emerald-850 pt-4 mt-3 text-xs sm:text-sm space-y-2.5 text-emerald-200 font-semibold font-sans">
                            <div className="flex items-start gap-2">
                              {c.jsx(MapPin, {
                                className:
                                  "w-4 h-4 text-emerald-400 shrink-0 mt-0.5",
                              })}
                              <span>
                                {n === "om"
                                  ? "Fuuldura Hoteela Postaa, Adamaa"
                                  : n === "am"
                                    ? "ፖስታ ቤት ፊት ለፊት፣ አዳማ"
                                    : "Opposite Central Post Office Area, Adama"}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              {c.jsx(Mail, {
                                className:
                                  "w-4 h-4 text-emerald-400 shrink-0 mt-0.5",
                              })}
                              <span>
                                {n === "om"
                                  ? "Lakk. Postaa (P.O. Box): 20118"
                                  : n === "am"
                                    ? "የፖስታ ሳጥን ቁጥር: 20118"
                                    : "P.O. Box: 20118, Adama (HQ)"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => e("contact")}
                          className="w-full text-center bg-white hover:bg-emerald-50 text-emerald-800 hover:text-emerald-950 font-extrabold text-xs sm:text-sm py-3.5 rounded-xl transition-all uppercase tracking-wider mt-6 inline-flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          <span>
                            {n === "om"
                              ? "Quunnamtii Amma"
                              : "Navigate to Contact"}
                          </span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
      <section
        className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12"
        id="major-operations-guidelines"
      >
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full uppercase tracking-widest inline-block">
            {n === "om"
              ? "Qajeelfama Hojii fi Buusii"
              : n === "am"
                ? "የስራዎችና መዋጮ መመሪያ"
                : "Operations & Fee Structure"}
          </span>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-emerald-950 uppercase tracking-wider font-sans">
            {n === "om"
              ? "Hojiiwan Gurguddoo fi Duudhaalee Gumaachaa"
              : n === "am"
                ? "ዋና ዋና ስራዎች እና የድጋፍ መዋጮ መመሪያዎች"
                : "Key Operations & Official Contribution Guidelines"}
          </h3>
          <p className="text-sm md:text-base text-gray-600 font-semibold leading-relaxed">
            {n === "om"
              ? "Tattaaffii hawaasummaa, gumaataa fi caasaa buusii idilee damee keenyaa guutummaatti asitti dhihaateera."
              : n === "am"
                ? "የአዳማ ቅርንጫፍ የሚያከናውናቸው ዋና ተግባራት እና የነዋሪዎች፣ የነጋዴዎችና የተማሪዎች መዋጮ ዝርዝር መረጃ።"
                : "Detailed breakdown of our core community-facing operations alongside official annual membership fees and donation rates."}
          </p>
        </div>
        <div className="space-y-12">
          <div className="w-full bg-white border border-emerald-100 rounded-3xl p-6 md:p-8 space-y-8 shadow-xs hover:border-emerald-200 transition-all">
            <div className="border-b border-emerald-50 pb-4 text-left">
              <h4 className="text-xl font-black text-emerald-950 uppercase tracking-wider flex items-center gap-2">
                {c.jsx(Award, {
                  className: "w-6 h-6 text-emerald-600",
                })}
                <span>
                  {n === "om"
                    ? "Hojiiwan Gurguddoo 9"
                    : n === "am"
                      ? "9ቱ ዋና ዋና ስራዎች"
                      : "9 Key Operations"}
                </span>
              </h4>
              <p className="text-xs text-gray-500 font-bold uppercase mt-1">
                {n === "om"
                  ? "Sagantaalee fi dirqama gurguddoo raawwataman"
                  : "Primary statutory initiatives and responsibilities"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {be.map((ue) => (
                <div
                  className="p-5 bg-[#F4FBF6] hover:bg-emerald-50/55 border border-emerald-100/50 hover:border-emerald-200 rounded-2xl flex gap-4 transition-all"
                  key={ue.id}
                >
                  <span className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 text-[#054823] text-xs font-black flex items-center justify-center shrink-0">
                    {String(ue.id).padStart(2, "0")}
                  </span>
                  <div className="space-y-1 text-left">
                    <h5 className="text-sm font-black text-[#0B4C28] leading-tight uppercase">
                      {ue.title[n]}
                    </h5>
                    <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                      {ue.desc[n]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-4 flex gap-3 text-left items-start">
              {c.jsx(Megaphone, {
                className: "w-5 h-5 text-amber-600 shrink-0 mt-0.5",
              })}
              <p className="text-[11px] font-bold text-amber-900 leading-relaxed">
                {n === "om"
                  ? "Hubachiisa: Buusii fi gumaata damee keenyatti sassaabamu keessaa dhibbeentaan 90% (90%) sirna hawaasummaa naannoof dabarsuun hawaasa bal'aa gargaaruuf oola."
                  : n === "am"
                    ? "ማሳሰቢያ፦ በአዳማ ቅርንጫፍ ከተሰበሰበው መዋጮ 90% የሚሆነው በቀጥታ ለክልል ማዕከል ተላልፎ ለሰፊው የህብረተሰብ ክፍል ድጋፍ ይውላል።"
                    : "Notice: Exactly 90% of all local revenues mobilized at our branch are remitted directly to the regional fund pool to sponsor scaled humanitarian solutions."}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-emerald-100 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs hover:border-emerald-200 transition-all text-left">
              <div className="border-b border-emerald-50 pb-4">
                <h4 className="text-base font-black text-emerald-950 uppercase tracking-widest flex items-center gap-2">
                  {c.jsx(Coins, {
                    className: "w-5 h-5 text-emerald-600",
                  })}
                  <span>
                    {n === "om"
                      ? "1. Gumaata Mallaqaa"
                      : n === "am"
                        ? "፩. የገንዘብ እጥፍ ድጋፍ (ጉማታ)"
                        : "1. Financial Donations (Gumaata)"}
                  </span>
                </h4>
                <p className="text-xs text-gray-500 font-bold uppercase mt-1">
                  {n === "om"
                    ? "Kaffaltii gumaachaa haala dandeettii daldalaa fi seektaraatiin"
                    : "Voluntary and statutory donation matrices"}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Ee.map((ue, Be) => (
                  <div
                    className="p-4 bg-amber-50/10 border border-amber-200/40 hover:border-amber-200 rounded-2xl space-y-2 transition-all flex flex-col justify-between"
                    key={Be}
                  >
                    <div>
                      <span className="block text-[11px] font-extrabold text-[#1B5E20] uppercase tracking-wider">
                        {ue.category[n]}
                      </span>
                      <span className="block text-lg font-mono font-black text-[#0B4C28] mt-1 tracking-tight">
                        {ue.rate[n]}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-semibold leading-relaxed mt-2 pt-2 border-t border-dashed border-gray-100">
                      {ue.desc[n]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-emerald-100 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs hover:border-emerald-200 transition-all text-left">
              <div className="border-b border-emerald-50 pb-4">
                <h4 className="text-base font-black text-emerald-950 uppercase tracking-widest flex items-center gap-2">
                  {c.jsx(Users, {
                    className: "w-5 h-5 text-emerald-600",
                  })}
                  <span>
                    {n === "om"
                      ? "2. Caasaa Buusii Miseensummaa"
                      : n === "am"
                        ? "፪. የመደበኛ መዋጮ ተመኖች (ቡሲ)"
                        : "2. Statutory Membership Fees (Buusii)"}
                  </span>
                </h4>
                <p className="text-xs text-gray-500 font-bold uppercase mt-1">
                  {n === "om"
                    ? "Miseensota adda addaa irraa kaffaltii waggaa/ji'aa gaafatamu"
                    : "Annual and monthly localized membership contributions"}
                </p>
              </div>
              <div className="space-y-3">
                {Ue.map((ue, Be) => (
                  <div
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-emerald-50/20 hover:bg-emerald-50/45 border border-emerald-100/50 rounded-xl transition-all gap-2"
                    key={Be}
                  >
                    <div className="space-y-0.5 text-left">
                      <span className="text-xs sm:text-sm font-black text-emerald-950 uppercase">
                        {ue.category[n]}
                      </span>
                      <span className="block text-[10px] text-gray-500 font-semibold">
                        {ue.desc[n]}
                      </span>
                    </div>
                    <div className="shrink-0 text-left sm:text-right">
                      <span className="text-xs sm:text-sm font-mono font-black text-emerald-700 bg-white border border-emerald-100 px-3 py-1 rounded-lg shadow-2xs">
                        {ue.rate[n]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => e("contribution")}
                className="w-full text-center bg-[#0B4C28] hover:bg-[#063118] text-white font-black text-xs sm:text-sm py-4 rounded-xl transition-all hover:shadow-md uppercase tracking-wider cursor-pointer"
              >
                {n === "om"
                  ? "Asitti Kaffali / Gumaachi"
                  : n === "am"
                    ? "መዋጮዎን እዚህ ይክፈሉ"
                    : "Process My Contribution Now"}
              </button>
            </div>
          </div>
        </div>
      </section>
      <section
        className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8"
        id="urgent-campaigns-overview"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-[#054823] bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>
                {n === "om"
                  ? "Deeggarsa Ariifachiisaa"
                  : n === "am"
                    ? "አስቸኳይ ጥሪዎች"
                    : "Urgent Support Required"}
              </span>
            </span>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-emerald-950 uppercase tracking-wider font-sans">
              {translations.contribCampaigns[n]}
            </h3>
            <p className="text-sm md:text-base text-gray-600 font-semibold max-w-2xl leading-relaxed">
              {n === "om"
                ? "Duula deeggarsaa maatii dandeettii xiqqaa qabanii fi balaa qonnan bultootaa gargaaruuf qophaa'an dhuunfaan deeggari."
                : n === "am"
                  ? "አስቸጋሪ ሁኔታ ውስጥ ለሚገኙ አርሶ አደሮችና አቅመ-ደካሞች የአደጋ ጊዜ ፈንድ ድጋፍ ያድርጉ።"
                  : "Your direct contributions safeguard collective livelihoods, providing micro-insurance offsets and rehabilitation resources."}
            </p>
          </div>
          <button
            onClick={() => e("contribution")}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-xl transition shadow-md active:scale-95 uppercase tracking-wider cursor-pointer shrink-0"
          >
            <span>
              {n === "om"
                ? "Kallattii Gumaachaa"
                : n === "am"
                  ? "ወደ ልገሳ ማዕከል ለመሄድ"
                  : "View Donation Portal"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {y.map((ue) => {
            const Be = re(ue.raisedAmount, ue.goalAmount);
            return (
              <div
                className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 space-y-6 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                id={`urgent-camp-card-${ue.id}`}
                key={ue.id}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-extrabold text-[#054823] bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full uppercase tracking-widest">
                      {ue.badge[n]}
                    </span>
                  </div>
                  <h4 className="text-xl md:text-2xl font-black text-emerald-950 font-sans tracking-tight leading-snug">
                    {ue.title[n]}
                  </h4>
                  <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
                    {ue.description[n]}
                  </p>
                </div>
                <div className="space-y-5 pt-4 border-t border-emerald-50">
                  <div className="space-y-2 bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100/80">
                    <div className="flex justify-between items-center text-xs sm:text-sm font-extrabold uppercase">
                      <span className="text-emerald-950 flex items-center gap-1.5">
                        {c.jsx(Sparkles, {
                          className: "w-4 h-4 text-emerald-600",
                        })}
                        <span>
                          {n === "om"
                            ? "Baha Gumaachaa (%)"
                            : n === "am"
                              ? "የተሰበሰበ መጠን (%)"
                              : "Progress Raised"}
                        </span>
                      </span>
                      <span className="text-emerald-700 font-mono font-black text-base sm:text-lg bg-emerald-100 px-2.5 py-0.5 rounded-md">
                        {Be}%
                      </span>
                    </div>
                    <div className="w-full h-3.5 bg-gray-200/80 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                      <div
                        className="bg-gradient-to-r from-emerald-600 to-emerald-500 h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.min(Math.max(Be, ue.raisedAmount > 0 ? 2 : 0), 100)}%`,
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-extrabold border-t border-emerald-100/60 mt-2">
                      <div>
                        <span className="block text-[10px] text-gray-400 uppercase tracking-wider">
                          {n === "om"
                            ? "Kan Funaaname (Birr)"
                            : "Raised Amount"}
                        </span>
                        <span className="text-emerald-800 font-mono font-black text-sm sm:text-base">
                          {B(ue.raisedAmount)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] text-gray-400 uppercase tracking-wider">
                          {n === "om" ? "Galma (Birr)" : "Target Goal"}
                        </span>
                        <span className="text-gray-700 font-mono font-bold text-sm sm:text-base">
                          {B(ue.goalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => e("contribution")}
                      className="w-full text-center bg-[#054823] hover:bg-[#022b14] text-white font-black text-xs py-3.5 rounded-xl transition shadow-sm active:scale-95 uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>
                        {n === "om"
                          ? "Gumaata Godhi"
                          : n === "am"
                            ? "አሁን ይለግሱ"
                            : "Contribute Now"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section
        className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8"
        id="latest-news-overview"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block font-sans font-black">
              {n === "om" ? "Haala Yeroo Adamaa" : "Branch Feed"}
            </span>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-emerald-950 uppercase tracking-wider font-sans">
              {translations.newsTitle[n]}
            </h3>
            <p className="text-sm md:text-base text-gray-600 font-semibold max-w-2xl leading-relaxed">
              {n === "om"
                ? "Oduuwwan, gumiilee dhimma mirkaneessitootaa fi sochiiwwan damee keenyaa yeroo ammaa hordofi."
                : n === "am"
                  ? "ወቅታዊ የቅርንጫፉ ዜናዎችን፣ ማስታወቂያዎችንና ታሪኮችን እዚህ ያግኙ።"
                  : "Discover recent localized cooperative integrations, smallholder breakthroughs, and community advisory announcements."}
            </p>
          </div>
          <button
            onClick={() => e("community")}
            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-950 text-sm font-bold uppercase tracking-widest transition-colors cursor-pointer shrink-0 active:translate-x-1"
          >
            <span>
              {n === "om"
                ? "Oduu Hunda Ilaali"
                : n === "am"
                  ? "ሁሉንም ዜናዎች ይመልከቱ"
                  : "Browse All Updates"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockNews.slice(0, 3).map((ue) => (
            <div
              className="bg-white rounded-3xl border border-emerald-100 overflow-hidden hover:shadow-md hover:border-emerald-300 hover:shadow-emerald-500/5 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between cursor-pointer animate-fade-in"
              id={`quick-news-${ue.id}`}
              onClick={() => {
                if (ue.youtubeId && ue.externalLink) {
                  window.open(ue.externalLink, "_blank");
                } else {
                  e("community");
                }
              }}
              key={ue.id}
            >
              <div>
                <div className="aspect-video w-full bg-black border-b border-emerald-900/20 overflow-hidden relative group">
                  <img
                    src={ue.imagePlaceholder}
                    alt={ue.title[n]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {ue.youtubeId && (
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 duration-200">
                        {c.jsx(Play, {
                          className:
                            "w-5 h-5 fill-current translate-x-0.5 text-white",
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                    <span>{ue.category}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{ue.date}</span>
                    </span>
                  </div>
                  <h4 className="text-base md:text-lg font-black text-emerald-950 tracking-tight leading-snug line-clamp-2 uppercase">
                    {ue.title[n]}
                  </h4>
                  <p className="text-sm text-gray-600 font-semibold leading-relaxed line-clamp-3">
                    {ue.summary[n]}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button
                  onClick={(Be) => {
                    Be.stopPropagation();
                    if (ue.youtubeId && ue.externalLink) {
                      window.open(ue.externalLink, "_blank");
                    } else {
                      e("community");
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-[#054823] hover:text-emerald-950 text-xs sm:text-sm font-black uppercase tracking-widest transition-colors cursor-pointer active:translate-x-1"
                >
                  <span>
                    {ue.youtubeId
                      ? n === "om"
                        ? "Fiilmii Daawwadhu"
                        : n === "am"
                          ? "ቪዲዮውን ይመልከቱ"
                          : "Watch Video"
                      : translations.readMore[n]}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
