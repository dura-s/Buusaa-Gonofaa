import { motion } from 'motion/react';
import { Sprout, Users, Award, TrendingUp, ArrowUpRight, Compass } from 'lucide-react';
import { Language, ActiveTab } from '../types';
import { translations } from '../translations';
import { branchStatistics } from '../data';
import bgLogo from '../assets/images/bg_official_logo_v5_1781772416643.jpg';

interface HeroProps {
  language: Language;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Hero({ language, setActiveTab }: HeroProps) {
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80 } }
  };

  const statCardList = [
    {
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      value: branchStatistics.activeMembers,
      label: {
        om: "Mirkaneessitoota Hawaasaa",
        am: "ንቁ የማኅበር አባላት",
        en: "Active Registered Members"
      }
    },
    {
      icon: <Sprout className="w-6 h-6 text-emerald-600" />,
      value: branchStatistics.activeFarmsSponsored,
      label: {
        om: "Qonnaan Bultoota Gargaaraman",
        am: "የተደገፉ አርሶ አደሮች",
        en: "Agricultural Units Subsidized"
      }
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      value: branchStatistics.womenEntrepreneursSupported,
      label: {
        om: "Daldala Dubartootaa",
        am: "የሴት ስራ ፈጣሪዎች ድጋፍ",
        en: "Women-Led Enterprises Supported"
      }
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      value: branchStatistics.emergencyDisbursementsBirr,
      label: {
        om: "Gargaarsa Balaa Raawwatame",
        am: "የአደጋ ጊዜ ፈጣን ድጋፍ",
        en: "Social Protection Paid Out (ETB)"
      }
    }
  ];

  return (
    <section className="relative overflow-hidden bg-emerald-50 py-10 md:py-16" id="home-hero-section">
      
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Main Content Card in Geometric Balance Style */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-emerald-100 shadow-xs relative overflow-hidden">
          {/* Decorative background circles matching theme */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-25 z-0" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-100/30 rounded-full translate-y-1/2 -translate-x-1/2 z-0" />

          {/* Dynamic Hero Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Hero text panel - expanded to span full 12 columns for beautiful wide flow */}
            <motion.div 
              className="lg:col-span-12 space-y-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Oromia branch batch indicator pill and Logo container */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col gap-2"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[#039935] text-xs font-bold uppercase tracking-wider w-fit">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Adama Branch &bull; Damee Adamaa</span>
                </div>
                <span className="text-xs text-gray-500 font-extrabold uppercase tracking-widest leading-relaxed">
                  {language === 'om' ? 'TAJAAJILA MISOOMA HAWAASAA OROMIYAA' : 'Social Protection & Microfinance Hub'}
                </span>
              </motion.div>

              {/* Title display block */}
              <motion.h1 
                variants={itemVariants}
                className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-[#039935] tracking-tight leading-normal font-sans"
              >
                {translations.heroTitle[language]}
              </motion.h1>

              {/* Description Subtitle details */}
              <motion.p 
                variants={itemVariants}
                className="text-base text-gray-600 max-w-4xl font-medium sm:leading-loose leading-relaxed"
              >
                {translations.heroSubtitle[language]}
              </motion.p>

              {/* CTA action buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <button
                  onClick={() => setActiveTab('contribution')}
                  className="group flex items-center gap-2 bg-[#039935] text-white px-7 py-3.5 rounded-xl text-xs font-extrabold tracking-widest hover:bg-[#027a2a] hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer uppercase"
                  id="hero-cta-btn-primary"
                >
                  <span>{translations.heroCtaPrimary[language]}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className="flex items-center gap-2 border-2 border-[#039935] text-[#039935] px-7 py-3.5 rounded-xl text-xs font-extrabold tracking-widest hover:bg-emerald-50 transition-all cursor-pointer uppercase"
                  id="hero-cta-btn-secondary"
                >
                  <span>{translations.heroCtaSecondary[language]}</span>
                </button>
              </motion.div>

              {/* Enlarged President & Event Photos - structured below the main content */}
              <motion.div 
                variants={itemVariants}
                className="pt-10 border-t border-emerald-100 mt-10"
              >
                <div className="space-y-8">
                  {/* Enlarged Coordinator of Mobilization Photo Showcase - Full Width Wide Panel */}
                  <div className="bg-white rounded-3xl border border-emerald-100 p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-center gap-8 hover:border-emerald-200 hover:shadow-md transition-all text-left w-full">
                    <div className="w-full md:w-1/2 h-80 rounded-2xl bg-emerald-50/70 border border-emerald-100/100 flex flex-col items-center justify-center p-6 relative overflow-hidden group shrink-0">
                      <Users className="w-20 h-20 text-emerald-700 opacity-80 group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-x-0 bottom-0 bg-[#039935]/95 text-white py-2 px-3 text-[10px] font-bold uppercase tracking-widest text-center">
                        {language === 'om' ? 'QINDEADHA MISOOMAA FI GARGARSAA' : language === 'am' ? 'የንቅናቄና እርዳታ አስተባባሪ' : 'COORDINATOR OF MOBILIZATION'}
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#039935] text-xs font-bold uppercase tracking-wider">
                        {language === 'om' ? 'Koreen Gargaarsaa Adamaa' : language === 'am' ? 'የቅርንጫፍ አስተባባሪ' : 'Branch Leadership'}
                      </div>
                      <h4 className="text-2xl font-extrabold text-[#039935] leading-tight font-sans">
                        Obbo Daadhii Abarraa
                      </h4>
                      <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                        {language === 'om' ? 'Qindeessaa Qunnamtii & Gargaarsaa Obbo Daadhii Abarraa' : 
                         language === 'am' ? 'የዕርዳታና ንቅናቄ አስተባባሪ' : 
                         'Coordinator of Mobilization & Relief'}
                      </p>
                      <p className="text-sm text-gray-600 font-semibold leading-relaxed">
                        {language === 'om' ? 'Damee Bulchiinsa Magaalaa Adamaa jalatti tajaajila gargaarsaa, wal-gargaarsaa fi sassaaba humna misoomaa olaantummaan qindeessu. Qindeessaan kuni humna hawaasummaa, gargaarsa saffisaa fi birmannaa hawaasaa daddabarsuuf hojjata.' : 
                         language === 'am' ? 'በአዳማ ከተማ አስተዳደር ቅርንጫፍ የሀብት ማሰባሰብ፣ ማህበራዊ ድጋፍ እና የአደጋ መከላከል ሥራዎችን በበላይነት ይመራሉ:: ህጋዊና ባህላዊ አሰራሮችን በማጣመር የቁጠባና ዋስትና አድማስን ያሰፋሉ::' : 
                         'Directs resource mobilization, community relief, economic rehabilitation, and social protection safety net operations for the Adama City Administration Branch. Ensures absolute integrity and cultural grounding across all public funding exercises.'}
                      </p>
                    </div>
                  </div>

                  {/* Enlarged Event Photo Showcase - Positioned gracefully at the bottom */}
                  <div className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-xs flex flex-col items-center text-center hover:border-emerald-200 hover:shadow-md transition-all w-full">
                    <div className="w-full h-64 md:h-80 rounded-2xl bg-emerald-50/70 border border-emerald-100/100 flex flex-col items-center justify-center p-6 relative overflow-hidden group">
                      <Compass className="w-16 h-16 text-emerald-700 opacity-80 group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-x-0 bottom-0 bg-[#039935]/90 text-white py-2 px-3 text-[10px] font-bold uppercase tracking-widest text-center">
                        LATEST COMMUNITY ASSEMBLY EVENT PHOTO
                      </div>
                    </div>
                    <h4 className="text-base font-extrabold text-[#039935] mt-4 leading-tight">
                      {language === 'om' ? 'Marii fi Sagantaa Hawaasaa' : 'Latest Assembly Event'}
                    </h4>
                    <p className="text-xs text-gray-500 font-bold mt-1 uppercase tracking-wider">
                      Adama Branch Outreach & Cooperative Assembly
                    </p>
                  </div>
                </div>

                {/* Integrated Alert Banner spanning full width beneath the photos */}
                <div className="mt-8 bg-emerald-50 rounded-2xl border border-emerald-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-600 animate-ping shrink-0" />
                    <div className="text-left leading-tight">
                      <h5 className="text-xs font-extrabold text-[#039935] uppercase tracking-wider">
                        {language === 'om' ? 'Sagantaa Deeggarsa Gadaa' : 'Gadaa Governance Protocol'}
                      </h5>
                      <p className="text-[11px] text-gray-600 font-semibold mt-0.5">
                        {language === 'om' ? 'Damee Adamaa jalatti tajaajila hawaasummaa bilisaa guutuu' : 'Fully localized microfinance integration services across East Shewa'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Statistical Overview Grid (Desktop-first optimized layout) */}
        <motion.div 
          className="mt-16 pt-12 border-t border-emerald-100"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          id="branch-statistics-strip"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statCardList.map((stat, i) => (
              <div 
                key={i} 
                className="bg-emerald-50/40 rounded-2xl p-6 border border-emerald-50 hover:bg-white hover:border-emerald-100 hover:shadow-xs transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-white border border-emerald-50">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-emerald-950 tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-emerald-800/60 leading-tight uppercase tracking-wide">
                  {stat.label[language]}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Combined Mission & Cultural Values Statement Card (Wider with Embedded Services) */}
        <div className="mt-16 bg-white text-slate-800 border-2 border-slate-100 rounded-3xl p-8 md:p-12 shadow-md relative overflow-hidden" id="mission-statement-card">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full opacity-60 -translate-y-10 translate-x-10 -z-10" />
          
          <div className="w-full space-y-8">
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest bg-slate-100 border border-slate-200 w-fit px-3.5 py-1.5 rounded-full text-slate-700">
                {translations.missionTitle[language]}
              </div>
              <h3 className="text-xl md:text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
                {translations.missionTitle[language]} : {translations.appName[language]}
              </h3>
              <p className="text-base md:text-lg font-medium leading-relaxed text-slate-600">
                {translations.missionText[language]}
              </p>
            </div>

            {/* Core Services dynamic highlight block for Gadaa protection */}
            <div className="pt-8 border-t border-slate-100">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">
                {language === 'om' ? 'Tajaajila Keenya Maayicroofayinaansii' : 'Our Microfinance Services'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Savings Account */}
                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3 hover:bg-slate-100/80 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-slate-200/50 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-slate-700" />
                  </div>
                  <h5 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                    {translations.serviceSavingsTitle[language]}
                  </h5>
                  <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                    {translations.serviceSavingsDesc[language]}
                  </p>
                </div>

                {/* Agricultural & Micro Loans */}
                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3 hover:bg-slate-100/80 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-slate-200/50 flex items-center justify-center">
                    <Sprout className="w-5 h-5 text-slate-700" />
                  </div>
                  <h5 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                    {translations.serviceLoansTitle[language]}
                  </h5>
                  <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                    {translations.serviceLoansDesc[language]}
                  </p>
                </div>

                {/* Micro-Insurance (Welfare) */}
                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3 hover:bg-slate-100/80 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-slate-200/50 flex items-center justify-center">
                    <Award className="w-5 h-5 text-slate-700" />
                  </div>
                  <h5 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                    {translations.serviceInsuranceTitle[language]}
                  </h5>
                  <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                    {translations.serviceInsuranceDesc[language]}
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
