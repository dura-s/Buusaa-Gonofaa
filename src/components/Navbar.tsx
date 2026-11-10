import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Language, ActiveTab } from "../types";
import { translations } from "../translations";
import bgLogo from "../assets/images/bg_logo.jpeg";

export interface NavbarProps {
  language?: Language;
  setLanguage?: (lang: Language) => void;
  activeTab?: ActiveTab;
  setActiveTab?: (tab: ActiveTab) => void;
  onNavigateSubItem?: (
    tabId: ActiveTab,
    elementId: string,
    subTab?: string,
  ) => void;
  brandName?: string;
}

interface NavSubItem {
  id: string;
  label: Record<Language, string>;
  description?: Record<Language, string>;
  elementId: string;
  subTab?: string;
}

interface NavLinkConfig {
  id: ActiveTab;
  labelKey: string;
  subItems: NavSubItem[];
}

export default function Navbar({
  language = "om",
  setLanguage,
  activeTab = "home",
  setActiveTab,
  onNavigateSubItem,
  brandName,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [openMenuTab, setOpenMenuTab] = useState<ActiveTab | null>(null);
  const [mobileExpandedTab, setMobileExpandedTab] = useState<ActiveTab | null>(
    null,
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Multilingual sub-items list for each section
  const navLinks: NavLinkConfig[] = [
    {
      id: "home",
      labelKey: "navHome",
      subItems: [
        {
          id: "mission",
          label: {
            om: "Ergama Keenya",
            am: "የቅርንጫፉ ተልዕኮ",
            en: "Branch Mission & Vision",
          },
          description: {
            om: "Aadaa Buusaa Gonofaa fi hawaasa humneessuu",
            am: "ባህላዊ የቡሳ ጎኖፋ እሴት እና ማህበረሰባዊ አቅም",
            en: "Cooperative values and mutual assistance",
          },
          elementId: "branch-mission-overview",
        },
        {
          id: "about",
          label: {
            om: "Seenaa fi Caasaa",
            am: "ስለ እኛ እና መዋቅር",
            en: "About & Organization",
          },
          description: {
            om: "Hundeeffama fi caasaa hooggana damee Adaamaa",
            am: "የአዳማ ቅርንጫፍ አመሰራረት እና የአመራር መዋቅር",
            en: "Branch history, leadership, and operational structure",
          },
          elementId: "about-section-wrapper",
          subTab: "history",
        },
        {
          id: "guidelines",
          label: {
            om: "Qajeelfama Hojii",
            am: "የአሰራር መመሪያዎች",
            en: "Operational Guidelines",
          },
          description: {
            om: "Heeraa fi dambii hojii bu'uuraa",
            am: "መሰረታዊ የስራ አሰራር እና ህግጋት",
            en: "Core member principles and cooperative guidelines",
          },
          elementId: "major-operations-guidelines",
        },
        {
          id: "campaigns",
          label: {
            om: "Sagantaalee Gumaachaa",
            am: "አጣዳፊ የድጋፍ መርሐግብሮች",
            en: "Urgent Campaigns",
          },
          description: {
            om: "Balaawwan tasaa fi deggersa qonnaan bultootaa",
            am: "የአደጋ መከላከል እና አፋጣኝ የእርዳታ ዘመቻዎች",
            en: "Rapid emergency response and agricultural recovery",
          },
          elementId: "urgent-campaigns-overview",
        },
        {
          id: "news",
          label: {
            om: "Oduu fi Gabaasa Haaraa",
            am: "የቅርብ ጊዜ ዜናዎች",
            en: "Latest Branch News",
          },
          description: {
            om: "Marii yaa'ii fi gabaasaalee dhihoo",
            am: "የቅርንጫፉ የቅርብ ጊዜ ሁነቶች እና ስብሰባዎች",
            en: "Recent branch assemblies and community reports",
          },
          elementId: "latest-news-overview",
        },
      ],
    },
    {
      id: "services",
      labelKey: "navServices",
      subItems: [
        {
          id: "savings",
          label: {
            om: "Tajaajila Qusannoo",
            am: "የቁጠባ አገልግሎቶች",
            en: "Savings Accounts",
          },
          description: {
            om: "Qusannoo dirqamaa fi fedhii daldalaaf",
            am: "የግዴታ እና ፍላጎት ላይ የተመሰረተ ቁጠባ",
            en: "Compulsory and voluntary business savings",
          },
          elementId: "product-blueprints-section",
        },
        {
          id: "loans",
          label: {
            om: "Liqii Qonnaa fi Daldalaa",
            am: "የግብርና እና ንግድ ብድር",
            en: "Agri & Micro Loans",
          },
          description: {
            om: "Sanyii, xaa'oo fi hojii daldala xixiqqoof",
            am: "ለግብርና ግብዓቶች እና አነስተኛ ንግድ ማስፋፊያ",
            en: "Accessible credit for farmers and micro-enterprises",
          },
          elementId: "product-blueprints-section",
        },
        {
          id: "insurance",
          label: {
            om: "Tiksii Hawaasummaa (Micro-Insurance)",
            am: "የማህበራዊ ዋስትና ኢንሹራንስ",
            en: "Social Protection & Insurance",
          },
          description: {
            om: "Balaawwan ongeefi fayyaaf eegumsa maallaqaa",
            am: "የድርቅ እና ድንገተኛ አደጋዎች ዋስትና",
            en: "Weather index & health coverage for smallholders",
          },
          elementId: "product-blueprints-section",
        },
        {
          id: "apply",
          label: {
            om: "Iyyata Tajaajilaa Galchi",
            am: "የአገልግሎት ማመልከቻ",
            en: "Service Application Form",
          },
          description: {
            om: "Toora interneetiitiin liqii fi qusannaaf galmaa'aa",
            am: "በመስመር ላይ ለብድር እና ቁጠባ ያመልክቱ",
            en: "Apply directly online for membership and financing",
          },
          elementId: "service-application-form",
        },
      ],
    },
    {
      id: "community",
      labelKey: "navCommunity",
      subItems: [
        {
          id: "news-comm",
          label: {
            om: "Oduu fi Gabaasa Hawaasaa",
            am: "የማህበረሰብ ዜናዎች",
            en: "Community News & Press",
          },
          description: {
            om: "Oduu bu'uuraa fi ibsa damee Adaamaa",
            am: "የአዳማ ቅርንጫፍ ይፋዊ መግለጫዎች እና ዜና",
            en: "Official releases and outreach updates",
          },
          elementId: "news-subcontainer",
        },
        {
          id: "events",
          label: {
            om: "Yaa'ii fi Sagantaalee",
            am: "ጉባኤዎች እና ሁነቶች",
            en: "Assemblies & Gatherings",
          },
          description: {
            om: "Marii waloo fi sagantaalee marii aadaa",
            am: "የባህል እና የህዝብ የምክክር መድረኮች",
            en: "Stakeholder consultative forums and workshops",
          },
          elementId: "events-subcontainer",
        },
        {
          id: "gallery",
          label: {
            om: "Kuusaa Suuraa fi Viidiyoo (Miidiyaa)",
            am: "የፎቶ እና ቪዲዮ ማህደር (ሚዲያ)",
            en: "Media Gallery & Videos",
          },
          description: {
            om: "Suuraalee yaa'ii fi viidiyoowwan hojii",
            am: "የቅርንጫፉ ምስሎች እና የመስክ እንቅስቃሴዎች",
            en: "Documentary photography and field documentation",
          },
          elementId: "gallery-section-wrapper",
        },
      ],
    },
    {
      id: "contribution",
      labelKey: "navContribution",
      subItems: [
        {
          id: "active-camps",
          label: {
            om: "Sagantaalee Gumaachaa",
            am: "የልገሳ ዘመቻዎች",
            en: "Active Support Campaigns",
          },
          description: {
            om: "Deggersa hawaasaa fi balaa ittisuuf",
            am: "የህብረተሰብ ድጋፍ እና አደጋ መከላከል መዋጮ",
            en: "Community relief funds and farmer solidarity",
          },
          elementId: "campaigns-progress-column",
        },
        {
          id: "donation-form",
          label: {
            om: "Foormii Gumaacha Tooraa",
            am: "የመስመር ላይ ልገሳ ፎርም",
            en: "Online Contribution Portal",
          },
          description: {
            om: "Gumaacha keessan kallattiin tooraan ergaa",
            am: "ድጋፍዎን በቀጥታ በድረ-ገጹ በኩል ይላኩ",
            en: "Submit contributions and deposit verification slips",
          },
          elementId: "form-contribute-column",
        },
        {
          id: "bank-accounts",
          label: {
            om: "Herrega Baankii Ofiisaalaa",
            am: "ይፋዊ የባንክ ሂሳቦች",
            en: "Official Bank Accounts",
          },
          description: {
            om: "CBE, Siinqee, fi Awash Baankii",
            am: "የንግድ ባንክ፣ ሲንቄ እና አዋሽ ባንክ ሂሳቦች",
            en: "Direct bank transfer account numbers",
          },
          elementId: "contributions-portal-section",
        },
      ],
    },
    {
      id: "contact",
      labelKey: "navContact",
      subItems: [
        {
          id: "office-address",
          label: {
            om: "Teessoo Waajjira Adaamaa",
            am: "የአዳማ ቢሮ አድራሻ",
            en: "Adama Office Location",
          },
          description: {
            om: "Lakk. bilbilaa, imeelii fi teessoo",
            am: "ስልክ ቁጥር፣ ኢሜይል እና አድራሻ",
            en: "Direct phone, email, and branch building location",
          },
          elementId: "contact-info-column",
        },
        {
          id: "office-map",
          label: {
            om: "Bakka fi Kaartaa Waajjiraa",
            am: "ካርታ እና መገኛ",
            en: "Office Location Map",
          },
          description: {
            om: "Daandii fi bakka qubannaa qabatamaa",
            am: "ትክክለኛውን የቢሮ መገኛ በካርታ ይመልከቱ",
            en: "Visual branch map and directions",
          },
          elementId: "mock-map-frame-element",
        },
        {
          id: "message-form",
          label: {
            om: "Ergaa Nuuf Ergaa",
            am: "መልዕክት ይላኩ",
            en: "Send Inquiry / Message",
          },
          description: {
            om: "Yaadaa fi gaaffii keessan nuun gahaa",
            am: "ጥያቄዎን ወይም አስተያየትዎን ያድርሱን",
            en: "Direct contact inquiry submission form",
          },
          elementId: "contact-form-column",
        },
      ],
    },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: "om", label: "Afaan Oromoo" },
    { code: "am", label: "አማርኛ" },
    { code: "en", label: "English" },
  ];

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest("#corner-to-corner-glass-navbar") &&
        !target.closest("#mobile-glass-dropdown")
      ) {
        setOpenMenuTab(null);
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleMouseEnter = (tabId: ActiveTab) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenMenuTab(tabId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenuTab(null);
    }, 180);
  };

  const handleNavClick = (tabId: ActiveTab) => {
    if (setActiveTab) {
      setActiveTab(tabId);
    }
    setOpenMenuTab(null);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubItemClick = (
    tabId: ActiveTab,
    elementId: string,
    subTab?: string,
  ) => {
    if (onNavigateSubItem) {
      onNavigateSubItem(tabId, elementId, subTab);
    } else if (setActiveTab) {
      setActiveTab(tabId);
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 150);
    }
    setOpenMenuTab(null);
    setIsMobileMenuOpen(false);
  };

  const handleCtaClick = () => {
    if (setActiveTab) {
      setActiveTab("contribution");
    }
    setOpenMenuTab(null);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Resolved brand display in Afaan Oromoo / selected language
  const resolvedBrand =
    brandName ||
    (language === "om"
      ? "Buusaa Gonofaa"
      : language === "am"
        ? "ቡሳ ጎኖፋ"
        : "Buusaa Gonofaa");

  const resolvedBranch =
    language === "om" ? "Adamaa" : language === "am" ? "አዳማ" : "Adama";

  // CTA label: "Contribute" / "Gumaacha"
  const ctaLabel =
    language === "om" ? "Gumaacha" : language === "am" ? "ይደግፉ" : "Contribute";

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* =========================================================================
          MAIN CORNER-TO-CORNER GLASS NAVBAR CONTAINER
          - Spans 100% full width from corner to corner
          - 3-column CSS Grid layout guarantees Zone 2 is in the dead center
          - Hover/touch interactive dropdown menus for Home, Services, Community & Media, Contribution, Contact
          ========================================================================= */}
      <header
        className="relative w-full h-16 sm:h-[68px] px-3 sm:px-6 lg:px-8 backdrop-blur-[14px] grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.06)] bg-white/95"
        style={{
          borderBottom: "1px solid rgba(11, 76, 40, 0.12)",
          color: "var(--nav-text)",
          fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
        }}
        id="corner-to-corner-glass-navbar"
      >
        {/* Faint Dotted Texture Overlay */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(11, 76, 40, 0.08) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
            opacity: 0.5,
          }}
          aria-hidden="true"
        />

        {/* ---------------------------------------------------------------------
            ZONE 1 (LEFT): Logo seal icon + brand name & Adamaa in exact logo purple
            Both have identical font size and color matching the logo
            Placed in Column 1 (justify-self-start)
            --------------------------------------------------------------------- */}
        <div
          onClick={() => handleNavClick("home")}
          className="relative z-10 flex items-center gap-2 sm:gap-3 cursor-pointer select-none group justify-self-start min-w-0 py-1"
          id="nav-zone-left"
        >
          {/* Logo Mark Seal - Prominent and crisp */}
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-emerald-50 border-2 border-emerald-600/30 flex items-center justify-center p-0.5 shadow-xs transition-transform duration-200 group-hover:scale-105 overflow-hidden shrink-0">
            <img
              src={bgLogo}
              alt="Buusaa Gonofaa Logo Seal"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Brand Name + Branch in Logo Purple: more visible on small screens, still bold */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-1.5 font-black text-[12.5px] sm:text-[18px] md:text-[20px] tracking-[-0.05em] leading-[0.95] sm:leading-none whitespace-normal sm:whitespace-nowrap max-w-[52vw] sm:max-w-none"
            style={{ color: "#742C84" }}
          >
            <span>{resolvedBrand}</span>
            <span>{resolvedBranch}</span>
          </div>
        </div>

        {/* ---------------------------------------------------------------------
            ZONE 2 (CENTER): Pill-shaped nav group with translucent background,
            backdrop blur, fully rounded ends.
            Active link has prestigious royal-forest green fill and crisp white text.
            Inactive link has subtle hover highlight.
            --------------------------------------------------------------------- */}
        <div className="relative z-10 justify-self-center flex items-center justify-center">
          {/* Main Navigation Pill for screens >= sm */}
          <nav
            className="hidden sm:flex items-center gap-0.5 md:gap-1 p-1 rounded-full backdrop-blur-[12px] bg-slate-100/80 border border-slate-200/90 shadow-2xs"
            id="nav-zone-center"
          >
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              const isMenuOpen = openMenuTab === link.id;

              return (
                <div
                  key={link.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => {
                      if (openMenuTab === link.id) {
                        handleNavClick(link.id);
                      } else {
                        setOpenMenuTab(link.id);
                        if (setActiveTab) setActiveTab(link.id);
                      }
                    }}
                    className={`px-2.5 md:px-3.5 py-1.5 rounded-full text-[12px] md:text-[13px] font-semibold transition-all duration-200 select-none cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                      isActive
                        ? "bg-[#0B4C28] text-white shadow-xs"
                        : isMenuOpen
                          ? "bg-emerald-100/80 text-[#0B4C28]"
                          : "text-slate-700 hover:text-[#0B4C28] hover:bg-white/90"
                    }`}
                  >
                    <span>{translations[link.labelKey][language]}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isActive
                          ? "text-white/80"
                          : isMenuOpen
                            ? "rotate-180 text-[#0B4C28]"
                            : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu List with White Background & Content Only */}
                  <AnimatePresence>
                    {isMenuOpen && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 pointer-events-auto"
                        onMouseEnter={() => handleMouseEnter(link.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.96 }}
                          transition={{ duration: 0.16, ease: "easeOut" }}
                          className="w-60 sm:w-68 p-1.5 rounded-2xl shadow-[0_18px_45px_rgba(0,0,0,0.14)] bg-white border border-slate-200/90 overflow-hidden"
                        >
                          <div className="space-y-0.5">
                            {link.subItems.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() =>
                                  handleSubItemClick(
                                    link.id,
                                    sub.elementId,
                                    sub.subTab,
                                  )
                                }
                                className="w-full text-left px-3.5 py-2.5 rounded-xl text-[13px] font-semibold text-slate-800 hover:text-[#0B4C28] hover:bg-emerald-50 transition-all duration-150 cursor-pointer flex items-center justify-between group"
                              >
                                <span>{sub.label[language]}</span>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#0B4C28] shrink-0" />
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>

        {/* ---------------------------------------------------------------------
            ZONE 3 (RIGHT): Solid pill button "Contribute" / "Gumaacha"
            Plus Language Switcher.
            Placed in Column 3 (justify-self-end)
            --------------------------------------------------------------------- */}
        <div
          className="relative z-10 flex items-center gap-2 sm:gap-2.5 justify-self-end min-w-0"
          id="nav-zone-right"
        >
          {/* Language Switcher Pill */}
          {setLanguage && (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="px-2.5 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer text-[#0B4C28] bg-slate-100 hover:bg-slate-200/80 border border-slate-200/90"
                id="floating-nav-lang-btn"
              >
                <Globe className="w-3.5 h-3.5 text-[#0B4C28] opacity-80" />
                <span className="uppercase text-[11px] font-bold">
                  {language}
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${isLangDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isLangDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsLangDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-44 rounded-2xl p-1.5 z-40 bg-white border border-slate-200 shadow-xl text-slate-800"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 text-[12px] font-semibold rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                            language === lang.code
                              ? "bg-emerald-50 text-[#0B4C28]"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span>{lang.label}</span>
                          {language === lang.code && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0B4C28]" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Outlined/Solid Pill Button: "Contribute" / "Gumaacha" */}
          <button
            onClick={handleCtaClick}
            className="hidden sm:flex items-center gap-1.5 px-3.5 md:px-4 py-1.5 rounded-full text-[12px] md:text-[13px] font-semibold transition-all duration-200 cursor-pointer select-none bg-[#0B4C28] hover:bg-[#073618] text-white shadow-xs border border-[#0B4C28] shrink-0"
            id="nav-cta-pill-btn"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-90" />
          </button>

          {/* Responsive Mobile Hamburger Icon (Under 640px) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 rounded-full transition-colors cursor-pointer shrink-0 text-[#0B4C28] bg-slate-100 hover:bg-slate-200 border border-slate-200"
            aria-label="Toggle navigation menu"
            id="nav-mobile-hamburger"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* -----------------------------------------------------------------------
          RESPONSIVE MOBILE DROPDOWN PANEL (Under 640px)
          Features accordion list with sub-items for every section!
          ----------------------------------------------------------------------- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="sm:hidden w-full p-4 backdrop-blur-[16px] shadow-xl border-b border-slate-200 bg-white/98 text-slate-800 pointer-events-auto"
            id="mobile-glass-dropdown"
          >
            <div className="flex flex-col space-y-2">
              {setLanguage && (
                <div className="pb-1">
                  <button
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-left text-[12.5px] font-semibold text-[#0B4C28]"
                    aria-label="Toggle language menu"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      {language === "om"
                        ? "Afaan Oromoo"
                        : language === "am"
                          ? "አማርኛ"
                          : "English"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${isLangDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isLangDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="mt-2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-md"
                      >
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code);
                              setIsLangDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-[12.5px] font-semibold transition-colors ${
                              language === lang.code
                                ? "bg-emerald-50 text-[#0B4C28]"
                                : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <span>{lang.label}</span>
                            {language === lang.code && (
                              <span className="h-1.5 w-1.5 rounded-full bg-[#0B4C28]" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                const isExpanded = mobileExpandedTab === link.id;

                return (
                  <div
                    key={link.id}
                    className={`rounded-xl overflow-hidden border ${
                      isActive
                        ? "border-emerald-300 bg-emerald-50/40"
                        : "border-slate-200 bg-slate-50/60"
                    }`}
                  >
                    {/* Main section row */}
                    <div className="w-full px-3.5 py-2.5 flex items-center justify-between transition-all">
                      <button
                        onClick={() => handleNavClick(link.id)}
                        className={`text-[13px] font-semibold text-left flex-grow cursor-pointer ${
                          isActive ? "text-[#0B4C28]" : "text-slate-800"
                        }`}
                      >
                        {translations[link.labelKey][language]}
                      </button>

                      <button
                        onClick={() =>
                          setMobileExpandedTab(isExpanded ? null : link.id)
                        }
                        className="p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer text-slate-500 hover:text-[#0B4C28]"
                        aria-label="Expand sub-items"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180 text-[#0B4C28]" : ""}`}
                        />
                      </button>
                    </div>

                    {/* Expandable sub-items list */}
                    {isExpanded && (
                      <div className="p-1.5 space-y-0.5 bg-white border-t border-slate-200 rounded-b-xl overflow-hidden">
                        {link.subItems.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() =>
                              handleSubItemClick(
                                link.id,
                                sub.elementId,
                                sub.subTab,
                              )
                            }
                            className="w-full text-left px-3 py-2 rounded-lg text-[12.5px] font-semibold text-slate-800 hover:text-[#0B4C28] hover:bg-emerald-50 flex items-center justify-between cursor-pointer transition-colors"
                          >
                            <span>{sub.label[language]}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#0B4C28] opacity-70" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mobile "Contribute" / "Gumaacha" button */}
              <div className="pt-2">
                <button
                  onClick={handleCtaClick}
                  className="w-full py-2.5 px-4 rounded-xl text-[13px] font-semibold text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 bg-[#0B4C28] hover:bg-[#073618] text-white shadow-xs"
                >
                  <span>{ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 opacity-90" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
