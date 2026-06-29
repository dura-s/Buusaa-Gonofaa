import { useState } from 'react';
import { Menu, X, Globe, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, ActiveTab } from '../types';
import { translations } from '../translations';
import bgLogo from '../assets/images/photo_2026-06-29_12-12-03.jpg';

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
    <header className="sticky top-0 z-50 w-full bg-[#CBEED4]/95 backdrop-blur-md text-[#063118] border-b border-[#0B4C28]/25 shadow-[0_4px_20px_-3px_rgba(11,76,40,0.1)] transition-all duration-300">
      <div className="w-full px-2 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between py-1.5 sm:py-2 min-h-[4rem] sm:min-h-[4.5rem]">
          
          {/* Logo Brand container */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2.5 cursor-pointer group py-1"
            id="brand-logo-container"
          >
            {/* Official Buusaa Gonofaa Oromiyaa Logo */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-transparent flex items-center justify-center transition-transform duration-300 group-hover:scale-105 overflow-hidden shrink-0">
              <img 
                src={bgLogo} 
                alt="Buusaa Gonofaa Oromiyaa Logo" 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex flex-col text-left select-none">
              <div className="font-display tracking-tighter leading-none flex flex-col sm:flex-row sm:items-baseline gap-x-1.5">
                {language === 'om' ? (
                  <>
                    <span className="text-xl sm:text-2xl md:text-2xl lg:text-3.5xl font-black text-[#C8102E] group-hover:text-[#A50D24] transition-colors duration-300 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                      Buusaa Gonofaa
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-black text-[#0B4C28] group-hover:text-[#063118] transition-colors duration-300">
                      Adamaa
                    </span>
                  </>
                ) : language === 'en' ? (
                  <>
                    <span className="text-xl sm:text-2xl md:text-2xl lg:text-3.5xl font-black text-[#C8102E] group-hover:text-[#A50D24] transition-colors duration-300 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                      Buusaa Gonofaa
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-black text-[#0B4C28] group-hover:text-[#063118] transition-colors duration-300">
                      Adama
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-lg sm:text-xl md:text-xl lg:text-2.5xl font-black text-[#C8102E] group-hover:text-[#A50D24] transition-colors duration-300 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                      ቡሳ ጎኖፋ
                    </span>
                    <span className="text-[10px] sm:text-xs md:text-sm font-black text-[#0B4C28] group-hover:text-[#063118] transition-colors duration-300">
                      አዳማ ቅርንጫፍ
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Navigation Link Menu with Hover Dropdowns */}
          <nav className="hidden lg:flex items-center gap-6 ml-auto mr-8" id="desktop-navigation">
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
                        ? 'bg-gradient-to-r from-[#0B4C28] to-[#1C733C] text-white font-extrabold shadow-sm border border-[#0B4C28]/20' 
                        : 'text-[#063118] font-black hover:text-[#0B4C28] hover:bg-white/60 border border-transparent'
                    }`}
                  >
                    <span>{translations[link.labelKey][language]}</span>
                    {hasSubs && <ChevronDown className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#063118]'}`} />}
                    
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
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#0B4C28]/25 text-[#063118] bg-white/40 hover:bg-white/80 transition-colors text-xs font-black cursor-pointer shadow-xs"
                id="language-switcher-btn"
              >
                <Globe className="w-4 h-4 text-[#063118]" />
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
                      className="absolute right-0 mt-2 w-48 rounded-lg bg-white border border-emerald-200 shadow-xl py-1 z-20"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs font-black hover:bg-emerald-50 hover:text-[#0B4C28] transition-colors flex items-center justify-between ${
                            language === lang.code ? 'text-[#0B4C28] bg-emerald-50/70' : 'text-slate-700'
                          }`}
                        >
                          <span>{lang.label}</span>
                          {language === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>


          </div>

          {/* Mobile hamburger menu / controls */}
          <div className="flex items-center lg:hidden gap-3" id="mobile-utilities">
            {/* Quick Lang Switch */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="p-2 rounded-full text-[#063118] hover:bg-white/60 border border-[#0B4C28]/25 bg-white/40"
                id="mobile-lang-btn"
              >
                <Globe className="w-4.5 h-4.5 text-[#063118]" />
              </button>
              {isLangDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsLangDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-36 rounded-lg bg-white border border-[#0B4C28]/20 shadow-xl py-1 z-20 text-slate-800">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-black ${
                          language === lang.code ? 'text-[#0B4C28] bg-emerald-50/80' : 'text-slate-650 hover:bg-slate-50'
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
              className="p-2 rounded-md text-[#063118] hover:bg-white/60 focus:outline-hidden"
              id="mobile-hamburger-btn"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#063118]" /> : <Menu className="w-6 h-6 text-[#063118]" />}
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
            className="lg:hidden border-t border-[#0B4C28]/25 bg-[#CBEED4]/98 text-[#063118] overflow-hidden" 
            id="mobile-expanded-menu"
          >
            <div className="px-3 pt-3 pb-6 space-y-1 sm:px-4 text-left">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                const hasSubs = submenuMap[link.id]?.length > 0;
                const isExpanded = mobileExpandedTab === link.id;

                return (
                  <div key={link.id} className="space-y-1">
                    <div className="flex items-center justify-between w-full rounded-xl hover:bg-white/40 transition-all">
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
                        className={`flex-grow text-left px-4 py-3.5 text-xs font-black transition-all duration-200 ${
                          isActive ? 'text-[#0B4C28] font-black scale-[1.01] bg-white/50 rounded-xl' : 'text-[#063118] hover:text-black'
                        }`}
                      >
                        {translations[link.labelKey][language]}
                      </button>
                      
                      {hasSubs && (
                        <button
                          onClick={() => setMobileExpandedTab(isExpanded ? null : link.id)}
                          className="px-4 py-3.5 text-slate-800"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-800" /> : <ChevronDown className="w-4 h-4 text-slate-800" />}
                        </button>
                      )}
                    </div>

                    {hasSubs && isExpanded && (
                      <div className="pl-6 space-y-1 border-l border-emerald-300 ml-4 py-1">
                        {submenuMap[link.id].map((sub, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              onNavigateSubItem(link.id, sub.elementId, sub.subTab);
                              setIsMobileMenuOpen(false);
                            }}
                            className="block w-full text-left px-4 py-3 text-[10.5px] uppercase font-bold text-slate-800 hover:text-black hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                          >
                            &bull; {sub.label[language]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
