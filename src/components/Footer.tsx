import { Compass, Mail, Phone, Heart, Sprout } from 'lucide-react';
import { Language, ActiveTab } from '../types';
import { translations } from '../translations';
import bgLogo from '../assets/images/bg_official_logo_v5_1781772416643.jpg';

interface FooterProps {
  language: Language;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Footer({ language, setActiveTab }: FooterProps) {
  
  const handleFootNav = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const localTimeAndDate = "2026"; // Current system year

  return (
    <footer className="bg-[#15803D] text-[#F0FDF4] border-t border-emerald-800/50 overflow-hidden" id="main-footer-container">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-16">
        
        {/* Foot top level divider columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 font-sans text-left">
          
          {/* Col 1 Brand detail */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-white flex items-center justify-center border-2 border-emerald-100 overflow-hidden shrink-0 shadow-md">
                <img 
                  src={bgLogo} 
                  alt="Buusaa Gonofaa Oromiyaa Logo" 
                  className="w-full h-full object-contain p-1"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-lg font-black tracking-tight text-white uppercase leading-snug">
                {translations.appName[language]}
              </span>
            </div>
            
            <p className="text-[11px] font-extrabold text-[#DCFCE7] uppercase tracking-widest leading-none">
              {translations.appSubtitle[language]}
            </p>

            <p className="text-xs text-emerald-100 leading-relaxed font-sans font-semibold">
              {language === 'om' ? 'Nuyi hundaa gargaaruun tokkummaa fi misooma sirna aadaa Gadaatiin fooyya\'iinsa fiduuf hojjetna.' :
               language === 'am' ? 'በባህላዊ የገዳ መረዳዳት ህግ መሰረት ለአርሶ አደሩና አቅመ ደካማውን ለማገዝ የሚሰራ ታማኝ ተቋም።' :
               'Structured offline-first microfinance & agricultural risk adapters delivering stability for East Shewa families.'}
            </p>
          </div>

          {/* Col 2 Quick links navigator */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-[#DCFCE7] tracking-widest uppercase">
              {language === 'om' ? 'Kallattii Filannoo' : language === 'am' ? 'አውታረ ድረ ገጾች' : 'Quick Navigation'}
            </h4>
            
            <ul className="space-y-2 text-xs font-extrabold tracking-widest uppercase">
              <li>
                <button 
                  onClick={() => handleFootNav('home')}
                  className="hover:text-white transition-colors text-emerald-100 cursor-pointer"
                >
                  {translations.navHome[language]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFootNav('services')}
                  className="hover:text-white transition-colors text-emerald-100 cursor-pointer"
                >
                  {translations.navServices[language]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFootNav('community')}
                  className="hover:text-white transition-colors text-emerald-100 cursor-pointer"
                >
                  {translations.navCommunity[language]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFootNav('contribution')}
                  className="hover:text-white transition-colors text-emerald-100 cursor-pointer"
                >
                  {translations.navContribution[language]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFootNav('contact')}
                  className="hover:text-white transition-colors text-emerald-100 cursor-pointer"
                >
                  {translations.navContact[language]}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 Services preview */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-[#DCFCE7] tracking-widest uppercase">
              {language === 'om' ? 'Tajaajila Keenya' : language === 'am' ? 'አገልግሎቶቻችን' : 'Active Safeguards'}
            </h4>

            <ul className="space-y-2.5 text-xs font-semibold text-emerald-100">
              <li className="flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span>{translations.serviceSavingsTitle[language]}</span>
              </li>
              <li className="flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span>{translations.serviceLoansTitle[language]}</span>
              </li>
              <li className="flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span>{translations.serviceInsuranceTitle[language]}</span>
              </li>
            </ul>
          </div>

          {/* Col 4 Emergency contact summary details */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-[#DCFCE7] tracking-widest uppercase">
              {language === 'om' ? 'Quunnamtii Deeggarsaa' : language === 'am' ? 'የቅርንጫፉ ዋና መረጃ' : 'Adama Headquarters'}
            </h4>

            <div className="space-y-3.5 text-xs text-emerald-100 font-bold font-sans">
              <div className="flex items-start gap-2">
                <Compass className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>
                  {translations.contactOfficeAddress[language]}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>+251 22 111 2345 / +251 911 445 667</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>adama@buusaagonofaa.org</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom footer credit panel */}
        <div className="mt-16 pt-8 border-t border-emerald-800/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10.5px] font-bold text-emerald-100 uppercase tracking-widest">
          
          <div className="text-emerald-100/90">
            &copy; {localTimeAndDate} {translations.appName[language]} - Adama Branch. All Rights Reserved.
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1 text-emerald-100/90">
              <span>Made with Cooperativism</span>
              <Heart className="w-3.5 h-3.5 fill-current text-red-400 animate-pulse" />
            </div>
            
            <span className="hidden sm:inline text-emerald-800/40">&bull;</span>
            
            <a 
              href="https://web.facebook.com/busagonofaoromia/photos/?_rdc=1&_rdr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#DCFCE7] hover:text-white hover:underline font-extrabold flex items-center gap-1"
              id="footer-facebook-link-direct"
            >
              <svg className="w-3.5 h-3.5 fill-current text-[#DCFCE7]" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
              <span>Official Facebook</span>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
