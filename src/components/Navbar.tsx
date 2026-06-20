import { useState } from 'react';
import { Menu, X, Globe, Heart, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, ActiveTab } from '../types';
import { translations } from '../translations';
import bgLogo from '../assets/images/bg_official_logo_v5_1781772416643.jpg';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onNavigateSubItem: (tabId: ActiveTab, elementId: string, subTab?: string) => void;
}

interface SubItem {
  label: { om: string; am: string; en: string };
  elementId: string;
  subTab?: string;
}

export default function Navbar({ language, setLanguage, activeTab, setActiveTab, onNavigateSubItem }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<ActiveTab | null>(null);
  const [mobileExpandedTab, setMobileExpandedTab] = useState<ActiveTab | null>(null);

  const navLinks: { id: ActiveTab; labelKey: string }[] = [
    { id: 'home', labelKey: 'navHome' },
    { id: 'services', labelKey: 'navServices' },
    { id: 'community', labelKey: 'navCommunity' },
    { id: 'contribution', labelKey: 'navContribution' },
    { id: 'contact', labelKey: 'navContact' },
  ];

  const submenuMap: Record<ActiveTab, SubItem[]> = {
    home: [
      { label: { om: "Ergama fi Mul'ata", am: "ተልዕኮ እና ራዕይ", en: "Mission & Vision" }, elementId: "about-section-wrapper", subTab: "mission" },
      { label: { om: "Seenaa fi Guddina", am: "ታሪክ እና እድገት", en: "History & Growth" }, elementId: "about-section-wrapper", subTab: "history" },
      { label: { om: "Diriirsa Caasaa", am: "የድርጅቱ መዋቅር", en: "Organizational Structure" }, elementId: "about-section-wrapper", subTab: "structure" },
      { label: { om: "Qaama Hoggansaa", am: "የስራ አመራር አካላት", en: "Management Bodies" }, elementId: "about-section-wrapper", subTab: "management" }
    ],
    services: [
      { label: { om: "Tajiijila Qusannoo (Savings)", am: "የቁጠባ አገልግሎት", en: "Savings Accounts" }, elementId: "savings" },
      { label: { om: "Liqii Qonnaa & Daldaala", am: "የግብርና እና አነስተኛ ንግድ ብድር", en: "Agricultural & Micro Loans" }, elementId: "agricultural-loans" },
      { label: { om: "Maayicroo-Inshuraansii", am: "የማይክሮ-ኢንሹራንስ ዋስትና", en: "Micro-Insurance" }, elementId: "micro-insurance" },
      { label: { om: "Iyyannoo Tajaajilaa", am: "የአገልግሎት ማመልከቻ", en: "Submit Service Inquiry" }, elementId: "service-application-form" }
    ],
    community: [
      { label: { om: "Announcement fi Oduu", am: "ማስታወቂያዎችና ዜናዎች", en: "Latest Announcements" }, elementId: "news-subcontainer" },
      { label: { om: "Miltoo Sirna Gadaa", am: "የገዳ ማህበራዊ ዝግጅቶች", en: "Gadaa & Support Events" }, elementId: "events-subcontainer" },
      { label: { om: "Kuusaa Fakkii Hawaasaa", am: "የፎቶ ማህደር", en: "Community Photo Gallery" }, elementId: "gallery-section-wrapper" }
    ],
    contribution: [
      { label: { om: "Duula Gumaachaa", am: "የድጋፍ ዘመቻዎች", en: "Active Relief Campaigns" }, elementId: "campaigns-progress-column" },
      { label: { om: "Gumaacha gochuuf", am: "ድጋፍ መመስረቻ", en: "Initiate Secured Contribution" }, elementId: "form-contribute-column" },
      { label: { om: "Sagantaa Diaspora", am: "የዲያስፖራ ማህደር", en: "Diaspora Network Hub" }, elementId: "contributions-portal-section" }
    ],
    contact: []
  };

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    // Smooth scroll to top of that section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'om', label: 'Afaan Oromoo' },
    { code: 'am', label: 'አማርኛ' },
    { code: 'en', label: 'English' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-emerald-600 text-white border-b border-emerald-700/50 shadow-lg transition-all duration-300">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between py-2 sm:py-3 min-h-[5.5rem]">
          
          {/* Logo Brand container */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-4 cursor-pointer group py-1"
            id="brand-logo-container"
          >
            {/* Official Buusaa Gonofaa Oromiyaa Logo */}
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-white border-2 border-emerald-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 overflow-hidden shrink-0 shadow-md">
              <img 
                src={bgLogo} 
                alt="Buusaa Gonofaa Oromiyaa Logo" 
                className="w-full h-full object-contain p-1"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tight leading-tight group-hover:text-emerald-100 transition-colors">
                {translations.appName[language]}
              </span>
              <span className="text-xs font-semibold text-emerald-100/95 tracking-wide mt-1">
                {translations.appSubtitle[language]}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link Menu with Hover Dropdowns */}
          <nav className="hidden lg:flex items-center gap-6" id="desktop-navigation">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              const hasSubs = submenuMap[link.id]?.length > 0;
              return (
                <div
                  key={link.id}
                  className="relative py-4"
                  onMouseEnter={() => hasSubs && setHoveredTab(link.id)}
                  onMouseLeave={() => hasSubs && setHoveredTab(null)}
                >
                  <button
                    id={`nav-link-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    style={{
                      textTransform: 'uppercase',
                      letterSpacing: '1.2px',
                      cursor: 'pointer',
                    }}
                    className={`relative px-4 py-2 text-xs select-none transition-all duration-300 flex items-center gap-1.5 rounded-full ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#a7c957] to-[#cedf9a] text-emerald-950 font-black shadow-md border border-[#cedf9a]/50' 
                        : 'text-emerald-100 font-bold hover:text-white hover:bg-white/10 hover:border-white/15 border border-transparent'
                    }`}
                  >
                    <span>{translations[link.labelKey][language]}</span>
                    {hasSubs && <ChevronDown className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-950' : 'text-emerald-200'}`} />}
                    
                    {/* Sliding active underlines using shared layout transitions */}
                    {isActive && (
                      <span className="sr-only">(active)</span>
                    )}
                  </button>

                  {/* Animated Dropdown Menu Panel list */}
                  <AnimatePresence>
                    {hasSubs && hoveredTab === link.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-64 bg-white/95 backdrop-blur-md rounded-2xl border border-emerald-150 shadow-2xl py-3 z-50 text-left border border-emerald-100"
                      >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-3 h-3 bg-white rotate-45 border-t border-l border-emerald-100" />
                        {submenuMap[link.id].map((sub, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              onNavigateSubItem(link.id, sub.elementId, sub.subTab);
                              setHoveredTab(null);
                            }}
                            className="w-full text-left px-5 py-2.5 hover:bg-emerald-50 text-[10.5px] font-black uppercase tracking-wider text-slate-700 hover:text-emerald-900 transition-all flex items-center justify-between group/sub cursor-pointer"
                          >
                            <span>{sub.label[language]}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-emerald-600 opacity-0 group-hover/sub:opacity-100 transition-all translate-x-[-4px] group-hover/sub:translate-x-0" />
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Utilities: Language Selector & Contribution Quick Action */}
          <div className="hidden lg:flex items-center gap-4" id="desktop-utilities">
            
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/30 text-white hover:bg-white/10 transition-colors text-xs font-semibold cursor-pointer"
                id="language-switcher-btn"
              >
                <Globe className="w-4 h-4 text-emerald-100" />
                <span className="uppercase">{language}</span>
              </button>
              
              <AnimatePresence>
                {isLangDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-15" onClick={() => setIsLangDropdownOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 rounded-lg bg-emerald-600 border border-white/25 shadow-lg py-1 z-20"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-white/10 transition-colors flex items-center justify-between ${
                            language === lang.code ? 'text-white bg-white/20' : 'text-white/80'
                          }`}
                        >
                          <span>{lang.label}</span>
                          {language === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Core Action Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('contribution')}
              className="flex items-center gap-2 bg-white text-emerald-800 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider hover:bg-emerald-50 hover:text-emerald-950 transition-all shadow-md cursor-pointer uppercase"
              id="desktop-contrib-nav-btn"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-red-500" />
              {translations.heroCtaPrimary[language]}
            </motion.button>
          </div>

          {/* Mobile hamburger menu / controls */}
          <div className="flex items-center lg:hidden gap-3" id="mobile-utilities">
            {/* Quick Lang Switch */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="p-2 rounded-full text-white hover:bg-white/10 border border-white/20"
                id="mobile-lang-btn"
              >
                <Globe className="w-4.5 h-4.5 text-emerald-100" />
              </button>
              {isLangDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsLangDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-36 rounded-lg bg-emerald-600 border border-white/25 shadow-lg py-1 z-20 text-white">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold ${
                          language === lang.code ? 'text-white bg-white/20' : 'text-white/80'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-hidden"
              id="mobile-hamburger-btn"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Expanded Mobile Navigation Container */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden border-t border-emerald-700/50 bg-emerald-600 text-white overflow-hidden" 
            id="mobile-expanded-menu"
          >
            <div className="px-3 pt-3 pb-6 space-y-1 sm:px-4">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                const hasSubs = submenuMap[link.id]?.length > 0;
                const isExpanded = mobileExpandedTab === link.id;

                return (
                  <div key={link.id} className="space-y-1">
                    <div className="flex items-center justify-between w-full rounded-xl hover:bg-white/5 transition-all">
                      <button
                        onClick={() => {
                          if (hasSubs) {
                            setMobileExpandedTab(isExpanded ? null : link.id);
                          } else {
                            handleNavClick(link.id);
                          }
                        }}
                        style={{
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                        }}
                        className={`flex-grow text-left px-4 py-3.5 text-xs font-extrabold transition-all duration-200 ${
                          isActive ? 'text-yellow-200 drop-shadow-[0_0_6px_rgba(254,240,138,0.4)] font-black scale-[1.02]' : 'text-emerald-100 hover:text-white'
                        }`}
                      >
                        {translations[link.labelKey][language]}
                      </button>
                      
                      {hasSubs && (
                        <button
                          onClick={() => setMobileExpandedTab(isExpanded ? null : link.id)}
                          className="px-4 py-3.5 text-white/75 hover:text-white"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-emerald-200" /> : <ChevronDown className="w-4 h-4 text-emerald-200" />}
                        </button>
                      )}
                    </div>

                    {hasSubs && isExpanded && (
                      <div className="pl-6 space-y-1 border-l border-emerald-400 ml-4 py-1">
                        {submenuMap[link.id].map((sub, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              onNavigateSubItem(link.id, sub.elementId, sub.subTab);
                              setIsMobileMenuOpen(false);
                            }}
                            className="block w-full text-left px-4 py-3 text-[10.5px] uppercase font-bold text-emerald-100 hover:text-white hover:bg-emerald-700/50 rounded-lg transition-colors cursor-pointer"
                          >
                            &bull; {sub.label[language]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              
              <div className="pt-4 border-t border-emerald-700/30 px-4">
                <button
                  onClick={() => handleNavClick('contribution')}
                  className="w-full flex items-center justify-center gap-2 bg-white text-emerald-800 py-3 rounded-xl text-xs font-bold tracking-wider hover:bg-emerald-50 transition-colors uppercase cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-current text-red-500" />
                  {translations.heroCtaPrimary[language]}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
