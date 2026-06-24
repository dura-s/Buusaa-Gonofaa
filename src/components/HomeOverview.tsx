import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Calendar, ArrowRight, Sprout, Heart, Users, ShieldAlert, Award, 
  History, Workflow, Building, UserCheck, Shield, HelpCircle, CheckCircle, ArrowUpRight 
} from 'lucide-react';
import { Language, ActiveTab } from '../types';
import { translations } from '../translations';
import { mockNews, mockCampaigns } from '../data';

interface HomeOverviewProps {
  language: Language;
  setActiveTab: (tab: ActiveTab) => void;
  aboutSubTab?: 'mission' | 'history' | 'structure' | 'management';
  setAboutSubTab?: (tab: 'mission' | 'history' | 'structure' | 'management') => void;
}

export default function HomeOverview({ language, setActiveTab, aboutSubTab, setAboutSubTab }: HomeOverviewProps) {
  const [localSubTab, setLocalSubTab] = useState<'mission' | 'history' | 'structure' | 'management'>('mission');
  const activeSubTab = aboutSubTab || localSubTab;
  const setActiveSubTab = setAboutSubTab || setLocalSubTab;

  // Format currency helpers for Ethiopian Birr
  const formatBirr = (amount: number) => {
    return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'am-ET', {
      style: 'currency',
      currency: 'ETB',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getCampaignProgress = (raised: number, goal: number) => {
    return Math.min(Math.round((raised / goal) * 100), 100);
  };

  // Branch Specific local mission statements
  const branchMission = {
    title: {
      om: "Damee Adamaa: Ergama fi Sgantaa Keenya",
      am: "የአዳማ የግዳጅ ተልዕኮ እና የልማት ውሳኔ",
      en: "Adama Local Mandate & Integration Focus"
    },
    philosophy: {
      om: "Seera fi aadaa bu'uura sirna Gadaatiin, madaallii misooma herreega maayicroofayinaansii Adamaa fiduuf hojjetna. Dameen keenya qonnaan bultoota fi dubartoota liqii bilisaan gargaara.",
      am: "በአዳማ ዙሪያ የሚገኙ ምስራቅ ሸዋ ገበሬዎችን እርስ በርስ ለማስተሳሰር ከዘመናዊ የኢንሹራንስና የማይክሮ ፋይናንስ ዋስትና ጋር አቀናጅተን አባላቶቻችንን እንደግፋለን።",
      en: "Synthesizing democratic Oromo cooperativism with digital risk indexing. Our Adama team manages grassroot safety nets across East Shewa, protecting small enterprise cohorts and micro-farming families against environmental or seasonal anomalies."
    }
  };

  const aboutHeadings = {
    title: {
      om: "Seenaa fi Bulchiinsa Buusaa Gonofaa",
      am: "ስለ ተቋሙ ፣ ታሪካዊ ቅርስ እና የአስተዳደር መዋቅር",
      en: "Corporate Legacy, History & Corporate Governance"
    },
    subtitle: {
      om: "Eeyyamama, seenaa hundeeffamaa (1999), caasaa bulchiinsaa fi hoggansa deeggarsa fi tajaajila hawaasaa bal'inaan kora keenya irratti.",
      am: "የተቋቋመበትን ታሪክ (1999)፣ ተልዕኮና ራዕይ፣ የአስተዳደር መዋቅር እና የቡሳ ጎኖፋ ማህበራዊ አገልግሎቶች በዝርዝር እዚህ ያንብቡ።",
      en: "Trace Buusaa Gonofaa's deep historic roots since 1999, our core mission, governance hierarchy, and administrative bodies dedicated to regional financial inclusion."
    }
  };

  const subTabsList = [
    { id: 'mission' as const, label: { om: "Ergama & Mul'ata", am: "ተልዕኮ እና ራዕይ", en: "Mission & Vision" }, icon: <Compass className="w-4 h-4" /> },
    { id: 'history' as const, label: { om: "Seenaa & Guddina", am: "ታሪካዊ ጉዞ", en: "History & Timeline" }, icon: <History className="w-4 h-4" /> },
    { id: 'structure' as const, label: { om: "Caasaa Bulchiinsaa", am: "የመዋቅር ገበታ", en: "Corporate Structure" }, icon: <Workflow className="w-4 h-4" /> },
    { id: 'management' as const, label: { om: "Qaama Hoggansaa", am: "የማኔጅመንት አካል", en: "Management & Team" }, icon: <UserCheck className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-20 py-16" id="home-overview-container">
      
      {/* 1. Branch Mission Overview Segment */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16" id="branch-mission-overview">
        <div className="bg-white rounded-3xl border border-emerald-100 p-8 md:p-12 relative overflow-hidden shadow-xs">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full opacity-60 -translate-y-10 translate-x-10 -z-10" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3  py-1 bg-emerald-50 text-[#0B6B3A] border border-emerald-100 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                <Compass className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                <span>{language === 'om' ? 'Sagantaa Gadaa Adamaa' : language === 'am' ? 'ባህላዊ የልማት ራዕይ' : 'Adama Local Focus'}</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-extrabold text-emerald-950 tracking-tight font-sans">
                {branchMission.title[language]}
              </h3>
              
              <p className="text-sm text-gray-700 font-semibold leading-relaxed">
                {branchMission.philosophy[language]}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Sprout className="w-4 h-4 text-[#0B6B3A]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-950 uppercase tracking-wider">
                      {language === 'om' ? 'Qonna Bilisaa' : language === 'am' ? 'ምርጥ የገጠር ግብርና' : 'Climate Risk Adaptation'}
                    </h5>
                    <p className="text-[11px] text-gray-500 font-medium leading-normal mt-0.5">
                      {language === 'om' ? 'Inshuraansii qilleensa madaquu qonnaan bultootaaf' : 'Tailored high-grade micro-indexing'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Users className="w-4 h-4 text-[#0B6B3A]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-950 uppercase tracking-wider">
                      {language === 'om' ? 'Hirmaannaa Dubartootaa' : language === 'am' ? 'የሴት ሥራ ፈጣሪዎች ፈንድ' : 'Affordable Micro-Credit'}
                    </h5>
                    <p className="text-[11px] text-gray-500 font-medium leading-normal mt-0.5">
                      {language === 'om' ? 'Wabii hojii xixiqqaa liqii salphaan deeggaru' : 'Fast collateral-free group guarantees'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-emerald-950 text-white rounded-2xl p-6 border border-emerald-800 space-y-4 shadow-xl">
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-300">
                {language === 'om' ? 'Qunnamtii Hawaasaa Gadaa' : language === 'am' ? 'የአዳማ አባ ገዳዎች ማህበር' : 'Buusaa Gonofaa Covenant'}
              </h4>
              
              <p className="text-[11.5px] text-emerald-100 font-medium leading-relaxed italic">
                {language === 'om' ? '"Namni rakkate kophaatti hin dhiisamu; wal-gargaaruun aadaa keenyadha. Buusaa Gonofaan dhiiga keenya."' :
                 language === 'am' ? '"ማንኛውም የተቸገረ ወንድማችን በብቸኝነት አይተውም፤ መረዳዳት የገዳ ህጋችን መገለጫ ነው።"' :
                 '"Under the sacred covenant, no community member shall endure hardship alone; dynamic redistribution restores parity."'}
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-emerald-800/60">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 shadow-xs">
                  <Award className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white uppercase tracking-wide">
                    {language === 'om' ? 'Jarsoolii Gadaa Adamaa' : language === 'am' ? 'የአዳማ አባ ገዳዎች ማህበር' : 'Adama Gadaa Advisory'}
                  </span>
                  <span className="block text-[9.5px] text-emerald-300 font-bold uppercase tracking-wider">
                    {language === 'om' ? 'Tikisii Aadaa' : 'Cultural Council Verified'}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* NEW: Cohesive About Legacy, History & Governance Multi-Tab Area */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16" id="about-section-wrapper">
        <div className="space-y-8">
          
          {/* Header titles */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 inline-block">
              {language === 'om' ? 'Wabii fi Seenaa Keenya' : language === 'am' ? 'ስለ ቅርሳችንና አስተዳደራችን' : 'Our Identity & Governance'}
            </span>
            <h3 className="text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-wider font-sans">
              {aboutHeadings.title[language]}
            </h3>
            <p className="text-xs text-gray-500 font-semibold leading-relaxed">
              {aboutHeadings.subtitle[language]}
            </p>
          </div>

          {/* Sub Navigation Selectors */}
          <div className="flex flex-wrap justify-center gap-2 border-b border-emerald-100 pb-2">
            {subTabsList.map((tab) => {
              const isSelected = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'bg-white hover:bg-emerald-50 text-slate-650 hover:text-emerald-950 border border-emerald-100'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label[language]}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Tab Workspace Container */}
          <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-10 shadow-xs min-h-[24rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSubTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                
                {/* 1. MISSION & VISION SUBTAB PANEL */}
                {activeSubTab === 'mission' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Mission Card */}
                    <div className="bg-emerald-50/20 border border-emerald-100 p-8 rounded-2xl space-y-4 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-md">
                          <Sprout className="w-6 h-6" />
                        </div>
                        <h4 className="text-base font-black text-emerald-950 uppercase tracking-wider">
                          {language === 'om' ? 'Ergama Keenya' : language === 'am' ? 'ተልዕኳችን' : 'Our Mission'}
                        </h4>
                        <p className="text-xs text-gray-700 font-bold uppercase tracking-widest text-[#0B6B3A]">
                          {language === 'om' ? 'Nafsa, Qusannoo fi Wabii' : 'Savings, Credit, and Insurance products'}
                        </p>
                        <p className="text-xs text-slate-800 font-medium leading-relaxed">
                          {language === 'om' ? "Ergama Buusaa Gonofaa tajaajila faayinaansii salphaa, argamaa fi danda'amaa ta'e hawaasa galii gadi aanaa qabaniif, keessattuu dubartoota, qonnattoota xixiqqoo fi dargaggoota lafa hin qabne Oromiyaa keessatti dhiyeessudha. Maatiilee fi dhuunfaa cimina dinagdee akka ijaarratan qusannoo, liqii, fi inshuraansiin humneessuuf kutannoofnee jirra.\n\nFinancial inclusion is the foundation for breaking the cycle of poverty and creating opportunities for dignified livelihoods and community development." :
                           language === 'am' ? "የቡሳ ጎኖፋ ተልዕኮ ተደራሽ፣ ተመጣጣኝ እና ዘላቂ የፋይናንስ አገልግሎትን ዝቅተኛ ገቢ ላላቸው ማህበረሰቦች በተለይም በኦሮሚያ ለሚገኙ ሴቶች፣ አነስተኛ አርሶ አደሮች እና መሬት አልባ ወጣቶች ማቅረብ ነው። ግለሰቦች እና ቤተሰቦች በቁጠባ፣ በብድር እና በኢንሹራንስ ምርቶች አማካኝነት ኢኮኖሚያዊ ጥንካሬን እንዲገነቡ ለማብቃት ቆርጠን ተነስተናል። የፋይናንስ ተደራሽነት የድህነትን አዙሪት ለመስበር እና ለአክብሮት ኑሮ እድሎችን ለመፍጠር መሰረት መሆኑን እናምናለን።" :
                           "Buusaa Gonofaa's mission is to provide accessible, affordable, and sustainable financial services to low-income communities, particularly women, smallholder farmers, and landless youth in Oromia. We are committed to empowering individuals and families to build economic resilience through savings, credit, and insurance products. We believe that financial inclusion is the foundation for breaking the cycle of poverty and creating opportunities for dignified livelihoods and community development."}
                        </p>
                      </div>
                      
                      <div className="pt-4 border-t border-emerald-100">
                        <span className="text-[10px] font-bold text-emerald-600 block uppercase tracking-widest">
                          {language === 'om' ? 'Wal-gargaarsa Hawaasummaa' : 'Guaranteed Empowerment'}
                        </span>
                      </div>
                    </div>

                    {/* Vision Card */}
                    <div className="bg-emerald-950 text-white p-8 rounded-2xl space-y-4 flex flex-col justify-between shadow-xl">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-white text-emerald-950 rounded-xl flex items-center justify-center shadow-md">
                          <Compass className="w-6 h-6" />
                        </div>
                        <h4 className="text-base font-black text-emerald-300 uppercase tracking-wider">
                          {language === 'om' ? 'Mul\'ata Keenya' : language === 'am' ? 'ራእያችን' : 'Our Vision'}
                        </h4>
                        <p className="text-xs text-emerald-300/80 font-bold uppercase tracking-widest">
                          {language === 'om' ? 'Guddina Oromiyaa' : 'A thriving, financially inclusive Oromia'}
                        </p>
                        <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                          {language === 'om' ? "Mul'anni keenya Oromiyaa dandeettii faayinaansii guutuu qabdu uumuu yoo ta'u, miseensi hawaasaa hundi tajaajila faayinaansii qulqullina qabu argachuu fi jireenya itti fufiinsa qabu ijaaruu danda'a. We envision an Oromia where the Buusaa Gonofaa mechanism strengthens social cohesion while advancing economic prosperity.\n\nWe aspire to be the most trusted and effective microfinance institution in the region, recognized for our commitment to excellence, innovation, and community-centered values." :
                           language === 'am' ? "ራእያችን እያንዳንዱ የኦሮሚያ ማህበረሰብ ጥራት ያለው የፋይናንስ አገልግሎት የሚያገኝበት እና ዘላቂ ኑሮ የመገንባት ዕድል የሚያገኝበት የበለፀገችና በፋይናንስ ረገድ ሁሉን አቀፍ የሆነች ოሮሚያን መፍጠር ነው። የቡሳ ጎኖፋ አሰራር ማህበራዊ ትስስርን የሚያጠናክርበት እና የኢኮኖሚ ብልጽግናን የሚያራምድበትን እውን እናደርጋለን። በክልሉ በታማኝነት፣ በፈጠራ እና በማህበረሰብ ተኮር እሴቶች የምንታወቅ እጅግ የታመንን እና ውጤታማ የማይክሮ ፋይናንስ ተቋም ለመሆን እንመኛለን።" :
                           "Our vision is to create a thriving, financially inclusive Oromia where every community member has access to quality financial services and the opportunity to build sustainable livelihoods. We envision an Oromia where the Buusaa Gonofaa mechanism strengthens social cohesion while advancing economic prosperity. We aspire to be the most trusted and effective microfinance institution in the region, recognized for our commitment to excellence, innovation, and community-centered values."}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-emerald-800">
                        <span className="text-[10px] font-bold text-emerald-300 block uppercase tracking-widest">
                          {language === 'om' ? 'Kutannoo Hawaasummaa' : 'Excellence & Innovation Since 1999'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. HISTORY & TIMELINE SUBTAB PANEL */}
                {activeSubTab === 'history' && (
                  <div className="space-y-8">
                    <div className="border-b border-emerald-50 pb-4">
                      <h4 className="text-base font-black text-emerald-950 uppercase tracking-widest flex items-center gap-2">
                        <History className="w-5 h-5 text-emerald-600" />
                        <span>{language === 'om' ? 'Seenaa Hundeeffamaa fi Guddina' : 'Chronological Institutional Timeline'}</span>
                      </h4>
                      <p className="text-xs text-gray-500 font-bold uppercase mt-1">
                        {language === 'om' ? 'Qormaata irraa gara tajaajila dhabalataatti' : 'Key historical breakthroughs making us the region\'s beacon'}
                      </p>
                    </div>

                    {/* Timeline Stream */}
                    <div className="relative pl-6 border-l-2 border-emerald-100 ml-4 space-y-10 py-2">
                      
                      {/* milestone 1 */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-xs" />
                        <div className="space-y-1">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono text-[10px] font-extrabold uppercase tracking-widest">
                            {language === 'om' ? 'Bara 1999 - Hundeeffama' : '1999 - Founded'}
                          </span>
                          <h5 className="text-xs font-black text-emerald-950 uppercase tracking-tight">
                            {language === 'om' ? 'Hundeeffama Jalqabaa HUNDEE NGO dhaan' : 'Established by Ethiopian NGO Hundee'}
                          </h5>
                          <p className="text-xs text-slate-700 font-semibold leading-relaxed max-w-3xl">
                            {language === 'om' ? "Buusaa Gonofaa NGO biyya keessaa 'Hundee' jedhamuun hundeeffamee tajaajila liqii dhiyeessuu jalqabe. Hundeeffamni isaa aadaa fi wal-gargaarsa miidhamtootaa 'Buusaa Gonofaa' Oromoo irratti hundaa'e." :
                             language === 'am' ? "የኢትዮጵያ መንግስታዊ ያልሆነ ድርጅት ሁንዴ (Hundee) በኦሮሚያ ክልል የብድር ፕሮግራሞችን ለማስተዳደር በ1999 ዓ.ም የጀመረው ባህላዊ የቡሳ ጎኖፋ ማህበራዊ ጥበቃን መሠረት በማድረግ ነው።" :
                             "Buusaa Gonofaa was established by the Ethiopian NGO Hundee to manage credit programs in the Oromia region, drawing inspiration from the indigenous Buusaa Gonofaa social protection mechanism."}
                          </p>
                        </div>
                      </div>

                      {/* milestone 2 */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-xs" />
                        <div className="space-y-1">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono text-[10px] font-extrabold uppercase tracking-widest">
                            {language === 'om' ? 'Babal\'ina fi Guddina' : 'Early Growth'}
                          </span>
                          <h5 className="text-xs font-black text-emerald-950 uppercase tracking-tight">
                            {language === 'om' ? 'Babal\'ina Gara Baadiyyaa fi Magaalaa' : 'Reach Expansion & Diverse Products'}
                          </h5>
                          <p className="text-xs text-slate-700 font-semibold leading-relaxed max-w-3xl">
                            {language === 'om' ? "Dhaabbatichi dafnaan tajaajila isaa guutuu Oromiyaa keessatti babal'ise; meeshaalee faayinaansii qonnatotaaf, dubartoota gurmaa'aniif, fi maatii galii dadhaboo ta'aniif kan mijeessan kalaqe." :
                             language === 'am' ? "ተቋሙ በኦሮሚያ የገጠርና የከተማ አካባቢዎች ተደራሽነቱን በማስፋት ለአነስተኛ አርሶ አደሮች፣ ለሴት ስራ ፈጣሪዎች እና ዝቅተኛ ገቢ ላላቸው አባላት የተበጁ ልዩ ልዩ የፋይናንስ ምርቶችን አስተዋውቋል።" :
                             "The institution expanded its reach across rural and urban areas of Oromia, introducing diverse financial products tailored to the needs of smallholder farmers, women entrepreneurs, and low-income households."}
                          </p>
                        </div>
                      </div>

                      {/* milestone 3 */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-xs" />
                        <div className="space-y-1">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-750 font-mono text-[10px] font-extrabold uppercase tracking-widest">
                            {language === 'om' ? 'Bara 2010 - Kalaqa Wabii' : '2010 - Weather Insurance'}
                          </span>
                          <h5 className="text-xs font-black text-emerald-950 uppercase tracking-tight">
                            {language === 'om' ? 'Inshuraansii Roobaa Jalqabsiisuu' : 'Rainfall-Based Crop Insurance Pioneered'}
                          </h5>
                          <p className="text-xs text-slate-700 font-semibold leading-relaxed max-w-3xl">
                            {language === 'om' ? "Bara 2010 keessa, Buusaa Gonofaa inshuraansii oomisha qonnaa balaa roobaa irratti hundaa'e EFPRI waliin mijeessuun Adamaa, Baako, fi Shashemene keessatti jalqabe." :
                             language === 'am' ? "በ2010 ዓ.ም ቡሳ ጎኖፋ በኢትዮጵያ ለመጀመሪያ ጊዜ በዝናብ ጠብታ መለኪያ ላይ የተመሰረተ የሰብል ዋስትና በAdama፣ Bako እና Shashamane ከአለም አቀፍ ድርጅት (EFPRI) ጋር በመተባበር ፈጠራን አስመዝግቧል።" :
                             "In 2010, Buusaa Gonofaa pioneered rainfall-based crop insurance in collaboration with IFPRI/EFPRI, first introducing the product in Adama, Bako, and Shashamane."}
                          </p>
                        </div>
                      </div>

                      {/* milestone 4 */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-xs" />
                        <div className="space-y-1">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono text-[10px] font-extrabold uppercase tracking-widest">
                            {language === 'om' ? 'Bara 2020 - Beekamtii' : '2020 - European Award Finalist'}
                          </span>
                          <h5 className="text-xs font-black text-emerald-950 uppercase tracking-tight">
                            {language === 'om' ? 'Leenjii fi Gudiina Dinagdee Addunyaa' : 'Finalist: European Microfinance Award 2020'}
                          </h5>
                          <p className="text-xs text-slate-700 font-semibold leading-relaxed max-w-3xl">
                            {language === 'om' ? "Dhaabbatichi gumaacha gamtaa qusannoo ijaaruu fi maatiilee dadhaboo tajaajiluuf hojjeteef 'European Microfinance Award 2020' irratti finalist ta'uun addunyaatti adda bahe." :
                             language === 'am' ? "ተቋሙ እ.ኤ.አ. በ2020 የቁጠባ አሰባሰብ እና ተጋላጭ የሆኑ የህብረተሰብ ክፍሎችን በመደገፍ ላሳየው ልዩ ስራ ለታዋቂው የአውሮፓ ማይክሮ ፋይናንስ ሽልማት (European Microfinance Award) የመጨረሻ እጩ ተወዳዳሪ ሆኖ እውቅና አግኝቷል።" :
                             "The institution was recognized as a finalist for the European Microfinance Award 2020 for its exceptional work in mobilizing savings and serving vulnerable populations."}
                          </p>
                        </div>
                      </div>

                      {/* milestone 5 */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-xs" />
                        <div className="space-y-1">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-105 text-[#0B6B3A] font-mono text-[10px] font-extrabold uppercase tracking-widest">
                            {language === 'om' ? 'Har\'a - Guddina Guutuu' : 'Today - Robust Standing'}
                          </span>
                          <h5 className="text-xs font-black text-emerald-950 uppercase tracking-tight">
                            {language === 'om' ? 'Miseensota Kuma 110 fi Damee Adamaa' : '110,000+ Active Savers Regionwide'}
                          </h5>
                          <p className="text-xs text-slate-700 font-semibold leading-relaxed max-w-3xl">
                            {language === 'om' ? "Miseensota qusattuota kuma dhibba fi kumi kudhan (110,000) fi caasaa damee cimaa to'achuun, Buusaa Gonofaa har'as humneessuu faayinaansii fi wal-gargaarsaa Gadaa naannoo keenyaatti ifa godhaa jira." :
                             language === 'am' ? "በአሁኑ ጊዜ በአጠቃላይ ከ110,000 በላይ ንቁ ቆጣቢዎችን በመያዝ እና በመላው ኦሮሚያ ጠንካራ መገኘትን በመፍጠር የፋይናንስ ተደራሽነት እና የማህበረሰብ ማብቂያ ፋና ወጊ ሆኖ ቀጥሏል።" :
                             "With approximately 110,000 active savers and a strong presence across Oromia, Buusaa Gonofaa continues to be a beacon of financial inclusion and community empowerment."}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 3. CORPORATE STRUCTURE SUBTAB PANEL */}
                {activeSubTab === 'structure' && (
                  <div className="space-y-8">
                    <div className="border-b border-emerald-50 pb-4">
                      <h4 className="text-base font-black text-emerald-950 uppercase tracking-widest flex items-center gap-2">
                        <Workflow className="w-5 h-5 text-emerald-600" />
                        <span>{language === 'om' ? 'Diriirsa Caasaa fi Hoggansa' : 'Organizational Governance Structure'}</span>
                      </h4>
                      <p className="text-xs text-gray-500 font-bold uppercase mt-1">
                        {language === 'om' ? 'Gareewwan heera fi qulqullinaan hojjetan' : 'Accountable chains rendering professional community support'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                      {/* Quadrant 1 */}
                      <div className="p-6 rounded-2xl bg-emerald-50/30 border border-emerald-100/80 space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs">
                          <Building className="w-5 h-5" />
                        </div>
                        <h5 className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                          {language === 'om' ? 'Booddii Daayirektarootaa' : language === 'am' ? 'የዳይሬክተሮች ቦርድ' : 'Board of Directors'}
                        </h5>
                        <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                          {language === 'om' ? "To'annoo tarsiimo cimaa fi seera gaarii uumuun dhaabbatichi heera qulqulluun akka tajaajilu fi ergama hawaasa humneessuu akka milkeessu mirkaneessu." :
                           language === 'am' ? "ተቋሙ በታማኝነት እንዲሠራ እና የማህበረሰቡን የፋይናንስ አቅም የማሳደግ ተልእኮውን እንዲያሳካ ስትራቴጂያዊ ቁጥጥር እና አስተዳደር ይሰጣል።" :
                           "Provides strategic oversight and governance to ensure the institution operates with integrity and achieves its mission of community financial empowerment."}
                        </p>
                      </div>

                      {/* Quadrant 2 */}
                      <div className="p-6 rounded-2xl bg-emerald-50/30 border border-emerald-100/80 space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs">
                          <Users className="w-5 h-5" />
                        </div>
                        <h5 className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                          {language === 'om' ? 'Hoggansa Raawwachiiftotaa' : language === 'am' ? 'ስራ አስፈፃሚ አመራር' : 'Executive Management'}
                        </h5>
                        <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                          {language === 'om' ? "Hojii guyyaa hunda ni hogganu, dameelee mara wal-tihiinsaan bulchu, fi qulqullina kaffaltii faayinaansii guutuu naannicha keessatti ni mirkaneessu." :
                           language === 'am' ? "አጠቃላይ ዕለታዊ ስራዎችን ይመራል፣ የቅርንጫፍ ኔትወርኮችን ያስተዳድራል፣ በሁሉም ክልሎች የፋይናንስ አገልግሎቶችን ውጤታማ ተደራሽነት ያረጋግጣል።" :
                           "Leads daily operations, manages branch networks, and ensures effective delivery of financial services across all regions."}
                        </p>
                      </div>

                      {/* Quadrant 3 */}
                      <div className="p-6 rounded-2xl bg-emerald-50/30 border border-emerald-100/80 space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs">
                          <UserCheck className="w-5 h-5" />
                        </div>
                        <h5 className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                          {language === 'om' ? 'Hojii Damee Adamaa' : language === 'am' ? 'የቅርንጫፍ ስራዎች' : 'Branch Operations'}
                        </h5>
                        <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                          {language === 'om' ? "Dameen keenya Adamaa hawaasa naannoo gargaarsa dhuunfaa bilisa ta'ee fi hordoffi faayinaansii gaariin hojjetoota dedicated ta'aniin kenna." :
                           language === 'am' ? "የአዳማ ቅርንጫፍ የወሰኑ ሰራተኞችን በመመደብ ግላዊ አገልግሎት እና የፋይናንስ መመሪያዎችን ለአካባቢው ማህበረሰብ ያቀርባል።" :
                           "The Adama branch serves the local community with dedicated staff providing personalized service and financial guidance."}
                        </p>
                      </div>

                      {/* Quadrant 4 */}
                      <div className="p-6 rounded-2xl bg-emerald-50/30 border border-emerald-100/80 space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs">
                          <Shield className="w-5 h-5" />
                        </div>
                        <h5 className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                          {language === 'om' ? 'Gareewwan Deggartootaa' : language === 'am' ? 'የድጋፍ ሰጪ ክፍሎች' : 'Support Functions'}
                        </h5>
                        <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                          {language === 'om' ? "Faayinaansii, HR, IT, fi gareewwan compliance gahumsa hojii guddina tarsiimo fi tikisii seeraa dhaabbatichaa hunda eeyyamu." :
                           language === 'am' ? "ፋይናንስ፣ የሰው ኃይል፣ የአይቲ እና የህግ ተገዢነት ቡድኖች በተቋሙ ውስጥ የስራ ዝግጅትን እና የህግ ተገዢነትን ያረጋግጣል።" :
                           "Finance, HR, IT, and compliance teams ensure operational excellence and regulatory compliance across the organization."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. MANAGEMENT BODIES SUBTAB PANEL */}
                {activeSubTab === 'management' && (
                  <div className="space-y-8">
                    <div className="border-b border-emerald-50 pb-4">
                      <h4 className="text-base font-black text-emerald-950 uppercase tracking-widest flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-emerald-600" />
                        <span>{language === 'om' ? 'Qaama Hoggansaa fi Bulchiinsaa' : 'Management Bodies & Leadership'}</span>
                      </h4>
                      <p className="text-xs text-gray-500 font-bold uppercase mt-1">
                        {language === 'om' ? 'Hoggantoota muuxannoo qaban damee qusannootiin' : 'Accomplished professionals managing grassroots microfinance channels'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left: statements */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="p-6 bg-slate-55 bg-emerald-50/20 border border-emerald-100/50 rounded-2xl space-y-4">
                          <p className="text-xs text-slate-800 font-medium leading-relaxed">
                            {language === 'om' ? "Hoggansi keenya ogeessota dhuunfaa muuxannoo dheeraa maayicroofayinaansii, misooma hawaasummaa, fi tajaajila faayinaansii qaban irraa ijaarame. Yaadi adda addaa fi kutannoon isaanii ergama keenya guddisuuf furtuudha." :
                             language === 'am' ? "የእኛ የአመራር አካላት በማይክሮ ፋይናንስ፣ በማህበረሰብ ልማት እና በፋይናንስ አገልግሎት ጥልቅ እውቀት ያላቸው ልምድ ያላቸው ባለሙያዎችን ያቀፈ ነው። ተልእኮአችንን ለማራመድ የተለያዩ አመለካከቶችን እና ቁርጠኝነትን ያመጣሉ።" :
                             "Our management bodies are composed of experienced professionals with deep expertise in microfinance, community development, and financial services. They bring diverse perspectives and commitment to advancing our mission."}
                          </p>

                          <p className="text-xs text-slate-800 font-medium leading-relaxed">
                            {language === 'om' ? "Dameen Adamaa hoggantoota damee, ofisara liqii fi deggartoota miseensota keenyaa kallattiin gargaaranii fi furmaata mijeessaniin durfama." :
                             language === 'am' ? "የአዳማ ቅርንጫፍ የማህበረሰቡን የፋይናንስ ፍላጎት ለመረዳት እና ተስማሚ መፍትሄዎችን ለመስጠት በቀጥታ ከህብረተሰቡ ጋር በሚሰሩ ቅርንጫፍ ስራ አስኪያጆች፣ የብድር መኮንኖች እና የደንበኞች አገልግሎት ተወካዮች ይመራል።" :
                             "The Adama branch is led by a dedicated team of branch managers, loan officers, and customer service representatives who work directly with community members to understand their financial needs and provide tailored solutions."}
                          </p>
                        </div>

                        <div className="p-6 border border-emerald-100/70 bg-emerald-50/10 rounded-2xl">
                          <h5 className="text-xs font-black text-emerald-950 uppercase tracking-wider mb-2">
                            {language === 'om' ? 'Oddeeffannoo Dabalataa' : language === 'am' ? 'ቢሮአችንን ያግኙ' : 'Administrative Transparency'}
                          </h5>
                          <p className="text-xs text-gray-650 font-semibold leading-relaxed">
                            {language === 'om' ? "Waa'ee hoggantoota keenyaa dabalataan argachuuf, desk kora Adamaa keenya kallattiin quunnamuu dandeessu." :
                             language === 'am' ? "ስለ ወቅታዊ አመራራችን እና የአስተዳደር መዋቅራችን ዝርዝር መረጃ ለማግኘት እባክዎን የአዳማ ቅርንጫፍን በቀጥታ ያነጋግሩ።" :
                             "For detailed information about our current leadership, curriculum vitae, and management structure, please contact our Adama branch administrative desk directly."}
                          </p>
                        </div>
                      </div>

                      {/* Right: Contact Call-Out card */}
                      <div className="bg-emerald-950 text-white rounded-2xl p-6 flex flex-col justify-between shadow-xl border border-emerald-900">
                        <div className="space-y-4">
                          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-emerald-300">
                            <Users className="w-5 h-5" />
                          </div>
                          
                          <h4 className="text-sm font-black uppercase tracking-wider text-emerald-300">
                            {language === 'om' ? 'Damee Adamaa Quunnamtuu' : 'Get in Touch Directly'}
                          </h4>

                          <p className="text-[11px] text-emerald-100 font-medium leading-relaxed">
                            {language === 'om' ? 'Dameen keenya gargaarsa dhuunfaa akkasumas marii hoggansaa bilisaan mijeessa. Nu quunnamaa.' :
                             'Connect directly with our local managers at Adama Central Post Office Area or submit a direct enquiry.'}
                          </p>

                          <div className="border-t border-emerald-850 pt-3 mt-1.5 text-[10.5px] space-y-2 text-emerald-200 font-semibold font-sans">
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-400">📌</span>
                              <span>
                                {language === 'om' ? 'Fuuldura Hoteela Postaa, Adamaa' :
                                 language === 'am' ? 'ፖስታ ቤት ፊት ለፊት፣ አዳማ' :
                                 'Opposite Central Post Office Area, Adama'}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-400">📬</span>
                              <span>
                                {language === 'om' ? 'Lakk. Postaa (P.O. Box): 20118' :
                                 language === 'am' ? 'የፖስታ ሳጥን ቁጥር: 20118' :
                                 'P.O. Box: 20118, Addis Ababa (HQ)'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setActiveTab('contact')}
                          className="w-full text-center bg-white hover:bg-emerald-50 text-emerald-800 hover:text-emerald-950 font-extrabold text-xs py-3 rounded-xl transition-all uppercase tracking-wider mt-6 inline-flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          <span>{language === 'om' ? 'Quunnamtii Amma' : 'Navigate to Contact'}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
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

      {/* 2. Urgent Community Support Campaigns */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8" id="urgent-campaigns-overview">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold text-[#0B6B3A] bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{language === 'om' ? 'Deeggarsa Ariifachiisaa' : language === 'am' ? 'አስቸኳይ ጥሪዎች' : 'Urgent Support Required'}</span>
            </span>
            <h3 className="text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-wider font-sans">
              {translations.contribCampaigns[language]}
            </h3>
            <p className="text-xs text-gray-500 font-semibold max-w-xl">
              {language === 'om' ? 'Duula deeggarsaa maatii dandeettii xiqqaa qabanii fi balaa qonnan bultootaa gargaaruuf qophaa\'an dhuunfaan deeggari.' :
               language === 'am' ? 'አስቸጋሪ ሁኔታ ውስጥ ለሚገኙ አርሶ አደሮችና አቅመ-ደካሞች የአደጋ ጊዜ ፈንድ ድጋፍ ያድርጉ።' :
               'Your direct contributions safeguard collective livelihoods, providing micro-insurance offsets and rehabilitation resources.'}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('contribution')}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-6 py-3 rounded-xl transition shadow-xs uppercase tracking-wider cursor-pointer"
          >
            <span>{language === 'om' ? 'Kallattii Gumaachaa' : language === 'am' ? 'ወደ ልገሳ ማዕከል ለመሄድ' : 'View Donation Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockCampaigns.map((camp) => {
            const progress = getCampaignProgress(camp.raisedAmount, camp.goalAmount);
            return (
              <div 
                key={camp.id}
                className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 space-y-6 hover:border-emerald-200 hover:shadow-xs transition-all flex flex-col justify-between"
                id={`urgent-camp-card-${camp.id}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[9px] font-extrabold text-[#0B6B3A] bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest">
                      {camp.badge[language]}
                    </span>
                    <span className="text-[10px] font-bold text-[#0B6B3A] uppercase tracking-widest flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-current text-red-500" />
                      <span>{camp.contributorsCount} {language === 'om' ? 'Hirmaattota' : 'Givers'}</span>
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-emerald-950 font-sans tracking-tight leading-snug">
                    {camp.title[language]}
                  </h4>

                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {camp.description[language]}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-emerald-50">
                  {/* Progress Bar Container */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10.5px] font-extrabold uppercase">
                      <span className="text-gray-500">{language === 'om' ? 'Deeggarsa Argame' : 'Raised'}</span>
                      <span className="text-emerald-700 font-mono font-black">{progress}%</span>
                    </div>

                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                      <div 
                        className="bg-emerald-600 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs font-extrabold">
                    <div className="space-y-0.5">
                      <span className="block text-[9.5px] text-gray-400 uppercase">{language === 'om' ? 'Hamma Waliigalaa' : 'Goal'}</span>
                      <span className="text-gray-800 font-mono font-bold">{formatBirr(camp.goalAmount)}</span>
                    </div>
                    
                    <div className="text-right space-y-0.5">
                      <span className="block text-[9.5px] text-gray-400 uppercase">{language === 'om' ? 'Kan Funaaname' : 'Current Raised'}</span>
                      <span className="text-emerald-700 font-mono font-black">{formatBirr(camp.raisedAmount)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('contribution')}
                    className="w-full text-center bg-gray-50 hover:bg-emerald-50 text-[#0B6B3A] border border-emerald-100 font-extrabold text-xs py-3 rounded-xl transition uppercase tracking-wider cursor-pointer font-bold"
                  >
                    {language === 'om' ? 'Gumaacha Kee Kenni' : language === 'am' ? 'አሁን ድጋፍ ያድርጉ' : 'Sponsor This Campaign'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Latest Branch News / Announcements */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8" id="latest-news-overview">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block font-sans font-black">
              {language === 'om' ? 'Haala Yeroo Adamaa' : 'Branch Feed'}
            </span>
            <h3 className="text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-wider font-sans">
              {translations.newsTitle[language]}
            </h3>
            <p className="text-xs text-gray-500 font-semibold max-w-xl">
              {language === 'om' ? 'Oduuwwan, gumiilee dhimma mirkaneessitootaa fi sochiiwwan damee keenyaa yeroo ammaa hordofi.' :
               language === 'am' ? 'ወቅታዊ የቅርንጫፉ ዜናዎችን፣ ማስታወቂያዎችንና ታሪኮችን እዚህ ያግኙ።' :
               'Discover recent localized cooperative integrations, smallholder breakthroughs, and community advisory announcements.'}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('community')}
            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
          >
            <span>{language === 'om' ? 'Oduu Hunda Ilaali' : language === 'am' ? 'ሁሉንም ዜናዎች ይመልከቱ' : 'Browse All Updates'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockNews.slice(0, 3).map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl border border-emerald-100 overflow-hidden hover:shadow-xs hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between"
              id={`quick-news-${item.id}`}
            >
              <div>
                <div className="aspect-video w-full bg-emerald-50 border-b border-emerald-55 overflow-hidden">
                  <img 
                    src={item.imagePlaceholder} 
                    alt={item.title[language]} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[9.5px] font-bold text-emerald-705 text-emerald-600 uppercase tracking-wider">
                    <span>{item.category}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-emerald-950 tracking-tight leading-snug line-clamp-2 uppercase">
                    {item.title[language]}
                  </h4>

                  <p className="text-xs text-gray-500 font-semibold leading-relaxed line-clamp-3">
                    {item.summary[language]}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveTab('community')}
                  className="inline-flex items-center gap-1.5 text-[#0B6B3A] hover:text-emerald-900 text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer font-black"
                >
                  <span>{translations.readMore[language]}</span>
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
