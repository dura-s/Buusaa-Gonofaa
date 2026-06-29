import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Calendar, ArrowRight, Sprout, Heart, Users, ShieldAlert, Award, 
  History, Workflow, Building, UserCheck, Shield, HelpCircle, CheckCircle, ArrowUpRight,
  Play, Youtube
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

  // Major Works / Activities (Hojiiwan Gurguddoo)
  const majorWorks = [
    {
      id: 1,
      title: {
        om: "Hojii Hubannoo Hawaasaa",
        am: "የማህበረሰብ ግንዛቤ ማስጨበጥ ስራዎች",
        en: "Community Awareness and Education Programs"
      },
      desc: {
        om: "Duula hubannoo hawaasaa fi barsiisa sirna qusannaa dhimma buusaa gonofaa babal'isuu.",
        am: "ስለ ቁጠባ ባህልና ስለ ቡሳ ጎኖፋ አጠቃላይ ጠቀሜታ ግንዛቤ ማስጨበጫ ትምህርት መስጠት።",
        en: "Enriching the savings culture and raising awareness of mutual aid systems."
      }
    },
    {
      id: 2,
      title: {
        om: "Hojii miseensa Buusaa Gonofaa horachuu",
        am: "የቡሳ ጎኖፋ አባላትን የማፍራት ስራዎች",
        en: "Gaining and recruiting Buusaa Gonofaa members"
      },
      desc: {
        om: "Miseensota haaraa galmeessuun humna wal-gargaarsaa fi hirmaannaa hawaasaa gabbisuu.",
        am: "አዳዲስ አባላትን በመመዝገብ የጋራ መረዳጃ አቅምንና የህብረተሰብ ተሳትፎን ማሳደግ።",
        en: "Registering new community members to fortify collective safety nets."
      }
    },
    {
      id: 3,
      title: {
        om: "Sassabii buusii Buusaa Gonofaa",
        am: "የቡሳ ጎኖፋ መዋጮዎችንና መደበኛ ክፍያዎችን መሰብሰብ",
        en: "Collecting regular Buusaa Gonofaa membership fees"
      },
      desc: {
        om: "Buusiiwwan idilee miseensota irraa murtaa'an haala sirriin walitti qabuu.",
        am: "ከአባላት የሚጠበቁ መደበኛ መዋጮዎችን በወቅቱና በቅንጅት ማሰባሰብ።",
        en: "Systematic coordination and timely collection of statutory membership fees."
      }
    },
    {
      id: 4,
      title: {
        om: "Sassabii gumata mallaqan",
        am: "የገንዘብ እርዳታና ስጦታዎችን ማሰባሰብ",
        en: "Mobilizing and collecting cash donations"
      },
      desc: {
        om: "Gumaata maallaqaa deggertoota, daldaltoota fi seektaraalee adda addaa irraa sassaabuu.",
        am: "ከደጋፊዎች፣ ከነጋዴዎችና ከተለያዩ ተቋማት የገንዘብ ድጋፎችን ማሰባሰብ።",
        en: "Securing charitable financial grants from commercial and corporate donors."
      }
    },
    {
      id: 5,
      title: {
        om: "Sassabii gummata miidhamanii",
        am: "ለአደጋ ለተጋለጡና ለተጎዱ ወገኖች ድጋፍ ማሰባሰብ",
        en: "Collecting contributions for the affected & vulnerable"
      },
      desc: {
        om: "Deggersa addaa namoota balaa adda addaan miidhamaniif gumaata sassaabuu.",
        am: "በተለያየ ምክንያት ጉዳት ለደረሰባቸውና ለተቸገሩ ወገኖች ልዩ ድጋፍ ማሰባሰብ።",
        en: "Mobilizing targeted aid packages for communities recovering from shocks."
      }
    },
    {
      id: 6,
      title: {
        om: "Sassabii nyaata barataa",
        am: "የተማሪዎች ምገባ ምግብ መዋጮ ማሰባሰብ",
        en: "Supporting student feeding and meal programs"
      },
      desc: {
        om: "Barattoota dandeettii xiqqaa qabaniif nyaata dhiyeessuun akka barnoota isaanii hordofan deeggaruu.",
        am: "አቅመ-ደካማ ለሆኑ ተማሪዎች የምግብ አቅርቦት ድጋፍ በማድረግ ትምህርታቸውን እንዲከታተሉ መርዳት።",
        en: "Funding daily school lunches for underprivileged children to prevent dropout."
      }
    },
    {
      id: 7,
      title: {
        om: "Ijaarsa sheedii madda galii",
        am: "የገቢ ማስገኛ ሼዶችንና መጠለያዎችን መገንባት",
        en: "Constructing income-generating sheds & shelters"
      },
      desc: {
        om: "Sheediiwwan hojii fi iddoowwan gabaa uumanii maddaan galii dhuunfaa akka dabalu gochuu.",
        am: "የስራ እድል ፈጠራን ለማገዝ የገቢ ማስገኛ ሼዶችንና የገበያ ቦታዎችን መገንባት።",
        en: "Building physical kiosks and trading sheds to foster entrepreneurial growth."
      }
    },
    {
      id: 8,
      title: {
        om: "Hojii deggersa namoomaa",
        am: "የሰብአዊ ድጋፍና እርዳታ ስራዎች",
        en: "Managing humanitarian assistance & emergency relief"
      },
      desc: {
        om: "Yeroo rakkinaa fi balaa uumamaa deggersa dafee qaqqabu dhiyeessuu.",
        am: "በአደጋና በአስቸኳይ ጊዜያት ፈጣን የሰብአዊ ድጋፍ እርዳታዎችን ማድረስ።",
        en: "Providing immediate disaster relief and rapid response kits across East Shewa."
      }
    },
    {
      id: 9,
      title: {
        om: "Buusii fi gumata 90% gahe naanotiif dabarsuu",
        am: "90% የሚሆነውን መዋጮና ስጦታ ለክልሉ ማስተላለፍ",
        en: "Transferring 90% of collected fees and donations to the region"
      },
      desc: {
        om: "Maallaqa sassaabame keessaa harki 90% gara naannootti dabarsuun hawaasa bal'aa tajaajiluuf dhimma raawwatamu.",
        am: "ከተሰበሰበው መዋጮ 90 በመቶ የሚሆነውን ለክልል ማዕከል በማስተላለፍ ሰፊውን ህዝብ ማገልገል።",
        en: "Remitting 90% of mobilized revenues to the regional pool for scaled redistribution."
      }
    }
  ];

  const gumaataDetails = [
    {
      category: { om: "Kan Jiraataa", am: "የነዋሪዎች", en: "From Residents" },
      rate: { om: "Bilisa / Daangaa Malee", am: "ያልተገደበ / ያሻቸውን ያህል", en: "Unlimited / Voluntary" },
      desc: { om: "Kaffaltii gumaata dhuunfaa haala fedhii fi dandeettii irratti hundaa'ee", am: "እንደ መክፈል አቅምዎና ፍላጎትዎ ያሻዎትን ያህል መጠን", en: "Flexible amount based on individual willingness" }
    },
    {
      category: { om: "Kan Daldalaa", am: "የነጋዴዎች", en: "From Merchants" },
      rate: { om: "15,000 Birr", am: "15,000 ብር", en: "15,000 Birr" },
      desc: { om: "Daldaltoota dhuunfaaf gumaata waggaa idilee", am: "ለግል ነጋዴዎች የሚወሰን አመታዊ ድጋፍ", en: "Standard annual contribution for private traders" }
    },
    {
      category: { om: "Kan Daldala Seektaraa", am: "የንግድ ዘርፎች", en: "Business Sectors" },
      rate: { om: "7,500 Birr", am: "7,500 ብር", en: "7,500 Birr" },
      desc: { om: "Seektaraalee daldala addaa fi waldaaleef", am: "ለተለያዩ የንግድ ዘርፍ ማህበራት", en: "Registered industry group allocations" }
    },
    {
      category: { om: "Kan Baajeta Seektaraa", am: "የበጀት ተቋማት", en: "Budget/Public Sectors" },
      rate: { om: "2%", am: "2%", en: "2% of Budget" },
      desc: { om: "Baajata waggaa seektarichaa irraa kaffalamu", am: "ከተቋማዊ አመታዊ በጀት የሚቀነስ", en: "Deducted annual public sector allocation" }
    }
  ];

  const buusiiDetails = [
    {
      category: { om: "Barataa", am: "ተማሪዎች", en: "Students" },
      rate: { om: "24 Birr", am: "24 ብር", en: "24 Birr" },
      desc: { om: "Kaffaltii buusii waggaa barattoota maraaf", am: "አመታዊ መደበኛ መዋጮ ለሁሉም ተማሪዎች", en: "Annual membership fee for students" }
    },
    {
      category: { om: "Jiraataa", am: "ነዋሪዎች", en: "Residents/Citizens" },
      rate: { om: "220 Birr", am: "220 ብር", en: "220 Birr" },
      desc: { om: "Miseensummaa waggaa jiraattotaaf", am: "አመታዊ መደበኛ የነዋሪዎች መዋጮ", en: "Annual membership fee for adult residents" }
    },
    {
      category: { om: "Hojjetaa fi Hoggansa", am: "ሰራተኞችና አመራር", en: "Employees & Leaders" },
      rate: { om: "1%", am: "1%", en: "1% of Salary" },
      desc: { om: "Mindaa ji'aa irraa buusii kaffalamu", am: "ከወርሃዊ ደሞዝ የሚቆረጥ መዋጮ", en: "Monthly payroll deduction allocation" }
    },
    {
      category: { om: "Daldalaa Sadarkaa A", am: "ደረቅ ‹ሀ› ነጋዴዎች", en: "Grade A Businesses" },
      rate: { om: "2,400 Birr", am: "2,400 ብር", en: "2,400 Birr" },
      desc: { om: "Kuusaa waggaa daldala guddaaf", am: "ለከፍተኛ ነጋዴዎች አመታዊ መዋጮ", en: "Annual rate for large enterprise operations" }
    },
    {
      category: { om: "Daldalaa Sadarkaa B", am: "ደረቅ ‹ለ› ነጋዴዎች", en: "Grade B Businesses" },
      rate: { om: "1,200 Birr", am: "1,200 ብር", en: "1,200 Birr" },
      desc: { om: "Kuusaa waggaa daldala giddu-galeessaaf", am: "ለመካከለኛ ነጋዴዎች አመታዊ መዋጮ", en: "Annual rate for medium enterprise operations" }
    }
  ];

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
        <div className="bg-white rounded-3xl border border-emerald-100 p-8 md:p-12 relative overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-300 active:scale-[0.995] transition-all duration-300 text-left cursor-pointer">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full opacity-60 -translate-y-10 translate-x-10 -z-10" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-[#054823] border border-emerald-100 rounded-full text-xs font-extrabold uppercase tracking-widest">
                <Compass className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
                <span>{language === 'om' ? 'Sagantaa Gadaa Adamaa' : language === 'am' ? 'ባህላዊ የልማት ራዕይ' : 'Adama Local Focus'}</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-extrabold text-emerald-950 tracking-tight font-sans">
                {branchMission.title[language]}
              </h3>
              
              <p className="text-base md:text-lg text-gray-700 font-semibold leading-relaxed">
                {branchMission.philosophy[language]}
              </p>
 
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex gap-3 hover:translate-x-1 transition-transform">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Sprout className="w-5 h-5 text-[#054823]" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-950 uppercase tracking-wider">
                      {language === 'om' ? 'Qonna Bilisaa' : language === 'am' ? 'ምርጥ የገጠር ግብርና' : 'Climate Risk Adaptation'}
                    </h5>
                    <p className="text-xs md:text-sm text-gray-500 font-medium leading-normal mt-0.5">
                      {language === 'om' ? 'Inshuraansii qilleensa madaquu qonnaan bultootaaf' : 'Tailored high-grade micro-indexing'}
                    </p>
                  </div>
                </div>
 
                <div className="flex gap-3 hover:translate-x-1 transition-transform">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Users className="w-5 h-5 text-[#054823]" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-950 uppercase tracking-wider">
                      {language === 'om' ? 'Hirmaannaa Dubartootaa' : language === 'am' ? 'የሴት ሥራ ፈጣሪዎች ፈንድ' : 'Affordable Micro-Credit'}
                    </h5>
                    <p className="text-xs md:text-sm text-gray-500 font-medium leading-normal mt-0.5">
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
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 inline-block">
              {language === 'om' ? 'Wabii fi Seenaa Keenya' : language === 'am' ? 'ስለ ቅርሳችንና አስተዳደራችን' : 'Our Identity & Governance'}
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-emerald-950 uppercase tracking-wider font-sans">
              {aboutHeadings.title[language]}
            </h3>
            <p className="text-sm md:text-base text-gray-600 font-semibold leading-relaxed">
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
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95 ${
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

          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSubTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                {/* 1. MISSION & VISION SUBTAB PANEL */}
                {activeSubTab === 'mission' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Mission Card */}
                      <div className="bg-emerald-50/20 border border-emerald-100 p-8 rounded-2xl space-y-4 flex flex-col justify-between hover:border-emerald-300 hover:shadow-xs transition-all duration-300">
                        <div className="space-y-4">
                          <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-md">
                            <Sprout className="w-6 h-6" />
                          </div>
                          <h4 className="text-lg font-black text-emerald-950 uppercase tracking-wider">
                            {language === 'om' ? 'Kaayyoo Buusaa Gonofaa Oromiyaa' : language === 'am' ? 'የቡሳ ጎኖፋ ዓላማ' : 'Our Objectives'}
                          </h4>
                          <div className="text-sm text-slate-850 font-medium leading-relaxed space-y-3">
                            {language === 'om' ? (
                              <ul className="list-disc pl-4 space-y-2.5 font-semibold">
                                <li><strong>Duudhaa Cimsuu:</strong> Aadaa fi duudhaa walgargaarsa Ummata Oromoo jabeessee dagaagsuu.</li>
                                <li><strong>Dhaloota Of-Eeggannoo:</strong> Dhaloota jaalala hojii, aadaa qusannaa qabu fi quuqama namoomaa qabu uumuu.</li>
                                <li><strong>Gargaarsa Yeroo Balaa:</strong> Hawaasa balaa uumamaa ykn nam-tolcheen miidhame gargaaruu, fayyisuu fi dandamachiisuu.</li>
                              </ul>
                            ) : language === 'am' ? (
                              <ul className="list-disc pl-4 space-y-2.5 font-semibold">
                                <li><strong>እሴቶችን ማጠናከር፦</strong> የኦሮሞን ሕዝብ የመረዳዳትና የመደጋገፍ በጎ ታሪካዊ ባህል ይበልጥ ማጠናከርና ማስፋፋት።</li>
                                <li><strong>ስራ-ወዳድ ትውልድ፦</strong> ስራን፣ ቁጠባንና ሰብአዊ ርህራሄን የተላበሰ ንቁ የህብረተሰብ ትውልድ መፍጠር።</li>
                                <li><strong>የአደጋ ጊዜ ዕርዳታ፦</strong> በተፈጥሮ ወይም በሰው ሰራሽ አደጋዎች የተጎዱ ወገኖችን መርዳት፣ ማዳንና መልሶ ማቋቋም።</li>
                              </ul>
                            ) : (
                              <ul className="list-disc pl-4 space-y-2.5">
                                <li><strong>Reinforcing Cultural Values:</strong> To strengthen and promote the culture and values of mutual aid among the Oromo people.</li>
                                <li><strong>Prudent Generation:</strong> To cultivate a generation that values labor, possesses a strong savings culture, and harbors human empathy.</li>
                                <li><strong>Disaster Response:</strong> To assist, rescue, and rehabilitate communities affected by natural or man-made disasters.</li>
                              </ul>
                            )}
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-emerald-100">
                          <span className="text-xs font-bold text-emerald-600 block uppercase tracking-widest">
                            {language === 'om' ? 'Labsii fi Qajeelfama Gargaarsaa' : 'Statutory Assistance Guidelines'}
                          </span>
                        </div>
                      </div>
 
                      {/* Vision Card */}
                      <div className="bg-amber-50/25 border border-amber-200 p-8 rounded-2xl space-y-4 flex flex-col justify-between hover:border-amber-300 hover:shadow-md transition-all duration-300">
                        <div className="space-y-4">
                          <div className="w-12 h-12 bg-amber-600 text-white rounded-xl flex items-center justify-center shadow-md">
                            <Compass className="w-6 h-6" />
                          </div>
                          <h4 className="text-lg font-black text-amber-950 uppercase tracking-wider">
                            {language === 'om' ? 'Mul’ata Buusaa Gonofaa Oromiyaa' : language === 'am' ? 'የቡሳ ጎኖፋ ራእይ' : 'Our Vision'}
                          </h4>
                          <div className="text-sm text-amber-900/90 font-semibold leading-relaxed space-y-3">
                            {language === 'om' ? (
                              <ul className="list-disc pl-4 space-y-2.5">
                                <li>Hawaasa balaawwan addaddaa ofirraa qolachuufi humna ofiitiin dandamachuu danda'e uumuu.</li>
                                <li>Aadaa walgargaarsaa aadaa godhachuudhaan dhaloota quuqama namoomaa qabu horachuu.</li>
                                <li>Hawaasa misoomaa fi gargaarsa walii galaan tasgabbaa'e ijaaruu.</li>
                              </ul>
                            ) : language === 'am' ? (
                              <ul className="list-disc pl-4 space-y-2.5">
                                <li>ማንኛውንም የተፈጥሮና ሰው ሰራሽ አደጋዎች በራሱ አቅም መቋቋምና መከላከል የሚችል ህብረተሰብ መፍጠር።</li>
                                <li>የመደጋገፍና የመረዳዳት ባህልን የስራ መመሪያ በማድረግ ሰብአዊነት የተሞላበትን ዜጋ ማፍራት።</li>
                                <li>በተቀናጀ ልማትና በጋራ ትብብር የተረጋጋና የበለፀገ ማህበረሰብ መገንባት።</li>
                              </ul>
                            ) : (
                              <ul className="list-disc pl-4 space-y-2.5">
                                <li>To create a community capable of resisting various disasters and adapting through its own resilient capacity.</li>
                                <li>To foster a generation with deep human empathy by institutionalizing mutual assistance as a standard way of life.</li>
                                <li>To build a secure and socio-economically stable society through comprehensive development and collective support.</li>
                              </ul>
                            )}
                          </div>
                        </div>
 
                        <div className="pt-4 border-t border-amber-200">
                          <span className="text-xs font-bold text-amber-800 block uppercase tracking-widest">
                            {language === 'om' ? 'Aadaa fi Walgargaarsa Hawaasummaa' : 'Cooperative Resilience'}
                          </span>
                        </div>
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
                        <span>{language === 'om' ? 'Seenaa Buusaa Gonofaa' : language === 'am' ? 'የቡሳ ጎኖፋ ታሪካዊ አመጣጥ' : 'History of Buusaa Gonofaa'}</span>
                      </h4>
                      <p className="text-xs text-gray-500 font-bold uppercase mt-1">
                        {language === 'om' ? 'Maalummaa duudhaa fi aadaa walgargaarsa Oromoo' : 'Indigenous Oromo mutual aid traditions and chronological timeline'}
                      </p>
                    </div>

                    <div className="p-6 bg-emerald-50/20 border border-emerald-100 rounded-2xl">
                      <p className="text-xs text-slate-800 font-bold leading-relaxed">
                        {language === 'om' ? (
                          "Buusaa Gonofaan duudhaa aadaa Oromoo kan yeroo rakkinaa (balaawwan uumamaa fi nam-tolchee) waliin gargaaramanii ittiin waliin dhaabbatan yoo ta'u, kaayyoon isaa inni guddaan hawaasa balaaf saaxilame ofirraa qolachuu, dandamachiisuu, deeggaruu fi deebisanii dhaabuudha."
                        ) : language === 'am' ? (
                          "ቡሳ ጎኖፋ የኦሮሞ ህዝብ በአስቸጋሪ የአደጋ ጊዜያት (ተፈጥሮአዊና ሰው ሰራሽ አደጋዎች) እርስ በርስ የሚደጋገፍበትና አጋርነቱን የሚያሳይበት ታሪካዊ ባህላዊ እሴት ሲሆን፤ ዋነኛ አላማውም ለአደጋ የተጋለጡ የህብረተሰብ ክፍሎችን መከላከል, መደገፍና መልሶ ማቋቋም ነው።"
                        ) : (
                          "Buusaa Gonofaa is an indigenous Oromo cultural value through which communities cooperate and stand together during times of hardship (natural and man-made disasters). Its primary goal is to protect, rehabilitate, support, and rebuild disaster-exposed communities."
                        )}
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
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-755 font-mono text-[10px] font-extrabold uppercase tracking-widest">
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
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-105 text-[#054823] font-mono text-[10px] font-extrabold uppercase tracking-widest">
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
                        <span>{language === 'om' ? 'Caasaa Hojii' : 'Organizational Governance Structure'}</span>
                      </h4>
                      <p className="text-xs text-gray-500 font-bold uppercase mt-1">
                        {language === 'om' ? 'Odeeffannoo hoggansa waajjira damee Adaamaa' : 'Accountable chains rendering professional community support'}
                      </p>
                    </div>

                    <div className="p-6 bg-emerald-50/20 border border-emerald-100 rounded-2xl">
                      <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                        {language === 'om' ? (
                          "Caasaa Hojii Buusaa Gonofaa Oromiyaa caasaa itti gaafatamummaa fi hojii qajeelfamoota, labsiilee fi dambiilee adda addaa (keessattuu Labsii Buusaa Gonofaa fi Dambii Lak. 235/2015) irratti hundaa'uun diriiredha. Manni hojii kun balaawwan uumamaa fi nam-tolchee ittisuu, ittisa deebii hatattamaa kennuu fi kutaalee hawaasaa miidhamoo ta'an gargaaruuf caasame."
                        ) : language === 'am' ? (
                          "የኦሮሚያ ቡሳ ጎኖፋ የስራና የአደረጃጀት መዋቅር ተጠያቂነትን፣ መመሪያዎችን፣ አዋጆችንና ደንቦችን (በተለይም የቡሳ ጎኖፋ አዋጅ እና ደንብ ቁጥር 235/2015) መሠረት በማድረግ የተዘረጋ ነው። ይህ መስሪያ ቤት ተፈጥሮአዊና ሰው ሰራሽ አደጋዎችን ለመከላከል፣ የአደጋ ጊዜ ምላሽ ለመስጠትና ተጋላጭ የሆኑ የማህበረሰብ ክፍሎችን ለመደገፍ የተቋቋመ ነው።"
                        ) : (
                          "The organizational structure of Buusaa Gonofaa Oromia is established based on the responsibilities and guidelines of various proclamations and regulations (particularly the Buusaa Gonofaa Proclamation and Regulation No. 235/2015). This institution is structured to mitigate natural and man-made disasters, deploy emergency relief, and support vulnerable community demographics."
                        )}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                      {/* Quadrant 1: Caasaa Gurguddoo */}
                      <div className="p-6 rounded-2xl bg-emerald-50/30 border border-emerald-100/80 space-y-4">
                        <h5 className="text-xs font-black text-[#054823] uppercase tracking-wider border-b border-emerald-100 pb-2 flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          <span>{language === 'om' ? "Caasaa Gurguddoo Gurmaa'insa Keessaa" : language === 'am' ? 'ዋና የውስጥ መዋቅር' : 'Core Internal Structure'}</span>
                        </h5>
                        <ul className="space-y-3 text-xs text-slate-700 font-semibold">
                          <li>
                            <strong className="text-emerald-950 block font-bold text-[11px] uppercase tracking-wide">
                              {language === 'om' ? '1. Koreewwan Daayirektarootaa' : '1. Board of Directors / Central Committee'}
                            </strong>
                            {language === 'om' ? 'Sadarkaa naannoo gubbaatti dhimmoota tarsiimoo fi murteewwan gurguddoo deeggarsaa ni murteessu.' : 'Provides strategic oversight and critical resource allocation decisions at the highest level.'}
                          </li>
                          <li>
                            <strong className="text-emerald-950 block font-bold text-[11px] uppercase tracking-wide">
                              {language === 'om' ? '2. Hoogganaa Buusaa Gonofaa' : '2. General Leader / Managing Director'}
                            </strong>
                            {language === 'om' ? 'Karoora hojii, baajata waggaa gopheessuu fi hoggansa olaanaa manneen hojichaa ni hordofa.' : 'Directs operational targets, formulates annual budgets, and oversees regional progress.'}
                          </li>
                          <li>
                            <strong className="text-emerald-950 block font-bold text-[11px] uppercase tracking-wide">
                              {language === 'om' ? '3. Waajjiraalee Sadarkaan Jiran' : '3. Regional & Zonal Office Networks'}
                            </strong>
                            {language === 'om' ? 'Caasaan kun irra jireessan sadarkaa Naannoo, Godinaa fi Aanaa (amma tokko tokkos ganda) irratti diriirfamee jira.' : 'Decentralized layout branching from Regional HQ to Zonal, Woreda, and Kebele support units.'}
                          </li>
                          <li>
                            <strong className="text-emerald-950 block font-bold text-[11px] uppercase tracking-wide">
                              {language === 'om' ? '4. Miseensota fi Gurmaa\'insa Hojjettootaa' : '4. Employee & Member Mobilization'}
                            </strong>
                            {language === 'om' ? 'Hojjettoonni manneen hojii mootummaa naannichaa keessa jiran ijaarama kanaan walitti qabamuun ni hirmaatu.' : 'Engaging public and community stakeholders to organize active village committees and savings associations.'}
                          </li>
                        </ul>
                      </div>

                      {/* Quadrant 2: Bulchiinsa Fandii */}
                      <div className="p-6 rounded-2xl bg-emerald-950 text-white space-y-4 shadow-xl">
                        <h5 className="text-xs font-black text-emerald-300 uppercase tracking-wider border-b border-emerald-800 pb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          <span>{language === 'om' ? 'Xiyyeeffannoo Bulchiinsaa' : language === 'am' ? 'የበጀትና የድጋፍ ትኩረት' : 'Administrative Mandates'}</span>
                        </h5>
                        <ul className="space-y-4 text-xs text-emerald-100 font-semibold">
                          <li>
                            <strong className="text-white block font-bold text-[11px] uppercase tracking-wide">
                              {language === 'om' ? 'Bulchiinsa Fandii' : 'Fund Administration'}
                            </strong>
                            {language === 'om' ? 'Fandiin sassaabamu akkaataa Qajeelfama Buusaa Gonofaa irratti ibsametti, itti gaafatamaa waajjira maallaqaa fi bulchiinsa Buusaa Gonofaa qofaan socho\'a.' : 'All collected public or institutional funds are administered and disbursed in strict compliance with the statutory Buusaa Gonofaa Guidelines.'}
                          </li>
                          <li>
                            <strong className="text-white block font-bold text-[11px] uppercase tracking-wide">
                              {language === 'om' ? 'Gaaddisa Buusaa Gonofaa' : 'Gaaddisa Support Shelters'}
                            </strong>
                            {language === 'om' ? 'Sadarkaa naannootiin dhimma tajaajila bishaanii, midhaan gargaarsaa fi wantoota hatattamaa deeggaruuf dhimma raawwatu dha.' : 'Handles the emergency dispatch of clean water, relief grains, and relief supplies at the regional scale.'}
                          </li>
                        </ul>
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

      {/* NEW: Major Operations & Official Contribution/Membership Guidelines */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12" id="major-operations-guidelines">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full uppercase tracking-widest inline-block">
            {language === 'om' ? 'Qajeelfama Hojii fi Buusii' : language === 'am' ? 'የስራዎችና መዋጮ መመሪያ' : 'Operations & Fee Structure'}
          </span>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-emerald-950 uppercase tracking-wider font-sans">
            {language === 'om' ? 'Hojiiwan Gurguddoo fi Duudhaalee Gumaachaa' : 
             language === 'am' ? 'ዋና ዋና ስራዎች እና የድጋፍ መዋጮ መመሪያዎች' : 
             'Key Operations & Official Contribution Guidelines'}
          </h3>
          <p className="text-sm md:text-base text-gray-600 font-semibold leading-relaxed">
            {language === 'om' ? 'Tattaaffii hawaasummaa, gumaataa fi caasaa buusii idilee damee keenyaa guutummaatti asitti dhihaateera.' :
             language === 'am' ? 'የአዳማ ቅርንጫፍ የሚያከናውናቸው ዋና ተግባራት እና የነዋሪዎች፣ የነጋዴዎችና የተማሪዎች መዋጮ ዝርዝር መረጃ።' :
             'Detailed breakdown of our core community-facing operations alongside official annual membership fees and donation rates.'}
          </p>
        </div>

        {/* Combined Layout Grid */}
        <div className="space-y-12">
          
          {/* Top Panel: Hojiiwan Gurguddoo (Major Works) - 9 items as a full-width bento grid */}
          <div className="w-full bg-white border border-emerald-100 rounded-3xl p-6 md:p-8 space-y-8 shadow-xs hover:border-emerald-200 transition-all">
            <div className="border-b border-emerald-50 pb-4 text-left">
              <h4 className="text-xl font-black text-emerald-950 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-600" />
                <span>{language === 'om' ? 'Hojiiwan Gurguddoo 9' : language === 'am' ? '9ቱ ዋና ዋና ስራዎች' : '9 Key Operations'}</span>
              </h4>
              <p className="text-xs text-gray-500 font-bold uppercase mt-1">
                {language === 'om' ? 'Sagantaalee fi dirqama gurguddoo raawwataman' : 'Primary statutory initiatives and responsibilities'}
              </p>
            </div>

            {/* Grid of 9 operations (full exposure, no scrollbar) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {majorWorks.map((work) => (
                <div 
                  key={work.id}
                  className="p-5 bg-[#F4FBF6] hover:bg-emerald-50/55 border border-emerald-100/50 hover:border-emerald-200 rounded-2xl flex gap-4 transition-all"
                >
                  <span className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 text-[#054823] text-xs font-black flex items-center justify-center shrink-0">
                    {String(work.id).padStart(2, '0')}
                  </span>
                  <div className="space-y-1 text-left">
                    <h5 className="text-sm font-black text-[#0B4C28] leading-tight uppercase">
                      {work.title[language]}
                    </h5>
                    <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                      {work.desc[language]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Informative regional note */}
            <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-4 flex gap-3 text-left">
              <span className="text-amber-600 text-lg">📢</span>
              <p className="text-[11px] font-bold text-amber-900 leading-relaxed">
                {language === 'om' ? 'Hubachiisa: Buusii fi gumaata damee keenyatti sassaabamu keessaa dhibbeentaan 90% (90%) sirna hawaasummaa naannoof dabarsuun hawaasa bal\'aa gargaaruuf oola.' :
                 language === 'am' ? 'ማሳሰቢያ፦ በአዳማ ቅርንጫፍ ከተሰበሰበው መዋጮ 90% የሚሆነው በቀጥታ ለክልል ማዕከል ተላልፎ ለሰፊው የህብረተሰብ ክፍል ድጋፍ ይውላል።' :
                 'Notice: Exactly 90% of all local revenues mobilized at our branch are remitted directly to the regional fund pool to sponsor scaled humanitarian solutions.'}
              </p>
            </div>
          </div>

          {/* Bottom Panel: Official Contribution/Donation Guidelines side-by-side below 9 Key Operations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 1. Gumata Mallaqaa (Grants/Donations Card) */}
            <div className="bg-white border border-emerald-100 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs hover:border-emerald-200 transition-all text-left">
              <div className="border-b border-emerald-50 pb-4">
                <h4 className="text-base font-black text-emerald-950 uppercase tracking-widest flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 fill-current animate-pulse" />
                  <span>{language === 'om' ? '1. Gumaata Mallaqaa' : language === 'am' ? '፩. የገንዘብ እጥፍ ድጋፍ (ጉማታ)' : '1. Financial Donations (Gumaata)'}</span>
                </h4>
                <p className="text-xs text-gray-500 font-bold uppercase mt-1">
                  {language === 'om' ? 'Kaffaltii gumaachaa haala dandeettii daldalaa fi seektaraatiin' : 'Voluntary and statutory donation matrices'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gumaataDetails.map((g, idx) => (
                  <div 
                    key={idx}
                    className="p-4 bg-amber-50/10 border border-amber-200/40 hover:border-amber-200 rounded-2xl space-y-2 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="block text-[11px] font-extrabold text-[#1B5E20] uppercase tracking-wider">
                        {g.category[language]}
                      </span>
                      <span className="block text-lg font-mono font-black text-[#0B4C28] mt-1 tracking-tight">
                        {g.rate[language]}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-semibold leading-relaxed mt-2 pt-2 border-t border-dashed border-gray-100">
                      {g.desc[language]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Buusii (Membership Contributions Card) */}
            <div className="bg-white border border-emerald-100 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs hover:border-emerald-200 transition-all text-left">
              <div className="border-b border-emerald-50 pb-4">
                <h4 className="text-base font-black text-emerald-950 uppercase tracking-widest flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span>{language === 'om' ? '2. Caasaa Buusii Miseensummaa' : language === 'am' ? '፪. የመደበኛ መዋጮ ተመኖች (ቡሲ)' : '2. Statutory Membership Fees (Buusii)'}</span>
                </h4>
                <p className="text-xs text-gray-500 font-bold uppercase mt-1">
                  {language === 'om' ? 'Miseensota adda addaa irraa kaffaltii waggaa/ji\'aa gaafatamu' : 'Annual and monthly localized membership contributions'}
                </p>
              </div>

              {/* Multi-tier table layout */}
              <div className="space-y-3">
                {buusiiDetails.map((b, idx) => (
                  <div 
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-emerald-50/20 hover:bg-emerald-50/45 border border-emerald-100/50 rounded-xl transition-all gap-2"
                  >
                    <div className="space-y-0.5 text-left">
                      <span className="text-xs sm:text-sm font-black text-emerald-950 uppercase">
                        {b.category[language]}
                      </span>
                      <span className="block text-[10px] text-gray-500 font-semibold">
                        {b.desc[language]}
                      </span>
                    </div>
                    
                    <div className="shrink-0 text-left sm:text-right">
                      <span className="text-xs sm:text-sm font-mono font-black text-emerald-700 bg-white border border-emerald-100 px-3 py-1 rounded-lg shadow-2xs">
                        {b.rate[language]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fast payment button action redirect */}
              <button
                onClick={() => setActiveTab('contribution')}
                className="w-full text-center bg-[#0B4C28] hover:bg-[#063118] text-white font-black text-xs sm:text-sm py-4 rounded-xl transition-all hover:shadow-md uppercase tracking-wider cursor-pointer"
              >
                {language === 'om' ? 'Asitti Kaffali / Gumaachi' : language === 'am' ? 'መዋጮዎን እዚህ ይክፈሉ' : 'Process My Contribution Now'}
              </button>
            </div>

          </div>

        </div>

      </section>
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8" id="urgent-campaigns-overview">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-[#054823] bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>{language === 'om' ? 'Deeggarsa Ariifachiisaa' : language === 'am' ? 'አስቸኳይ ጥሪዎች' : 'Urgent Support Required'}</span>
            </span>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-emerald-950 uppercase tracking-wider font-sans">
              {translations.contribCampaigns[language]}
            </h3>
            <p className="text-sm md:text-base text-gray-600 font-semibold max-w-2xl leading-relaxed">
              {language === 'om' ? 'Duula deeggarsaa maatii dandeettii xiqqaa qabanii fi balaa qonnan bultootaa gargaaruuf qophaa\'an dhuunfaan deeggari.' :
               language === 'am' ? 'አስቸጋሪ ሁኔታ ውስጥ ለሚገኙ አርሶ አደሮችና አቅመ-ደካሞች የአደጋ ጊዜ ፈንድ ድጋፍ ያድርጉ።' :
               'Your direct contributions safeguard collective livelihoods, providing micro-insurance offsets and rehabilitation resources.'}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('contribution')}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-xl transition shadow-md active:scale-95 uppercase tracking-wider cursor-pointer shrink-0"
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
                className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 space-y-6 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-500/5 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between cursor-pointer"
                id={`urgent-camp-card-${camp.id}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-extrabold text-[#054823] bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full uppercase tracking-widest">
                      {camp.badge[language]}
                    </span>
                    <span className="text-xs font-bold text-[#054823] uppercase tracking-widest flex items-center gap-1.5">
                      <Heart className="w-4 h-4 fill-current text-red-500" />
                      <span>{camp.contributorsCount} {language === 'om' ? 'Hirmaattota' : 'Givers'}</span>
                    </span>
                  </div>

                  <h4 className="text-xl md:text-2xl font-black text-emerald-950 font-sans tracking-tight leading-snug">
                    {camp.title[language]}
                  </h4>

                  <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
                    {camp.description[language]}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-emerald-50">
                  {/* Progress Bar Container */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs sm:text-sm font-extrabold uppercase">
                      <span className="text-gray-500">{language === 'om' ? 'Deeggarsa Argame' : 'Raised'}</span>
                      <span className="text-emerald-700 font-mono font-black">{progress}%</span>
                    </div>

                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                      <div 
                        className="bg-emerald-600 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm font-extrabold">
                    <div className="space-y-0.5">
                      <span className="block text-xs text-gray-400 uppercase">{language === 'om' ? 'Hamma Waliigalaa' : 'Goal'}</span>
                      <span className="text-gray-800 font-mono font-bold">{formatBirr(camp.goalAmount)}</span>
                    </div>
                    
                    <div className="text-right space-y-0.5">
                      <span className="block text-xs text-gray-400 uppercase">{language === 'om' ? 'Kan Funaaname' : 'Current Raised'}</span>
                      <span className="text-emerald-700 font-mono font-black">{formatBirr(camp.raisedAmount)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('contribution')}
                    className="w-full text-center bg-gray-50 hover:bg-emerald-50 text-[#054823] hover:text-emerald-950 border border-emerald-100 font-black text-xs sm:text-sm py-3.5 rounded-xl transition-all active:scale-95 uppercase tracking-wider cursor-pointer"
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block font-sans font-black">
              {language === 'om' ? 'Haala Yeroo Adamaa' : 'Branch Feed'}
            </span>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-emerald-950 uppercase tracking-wider font-sans">
              {translations.newsTitle[language]}
            </h3>
            <p className="text-sm md:text-base text-gray-600 font-semibold max-w-2xl leading-relaxed">
              {language === 'om' ? 'Oduuwwan, gumiilee dhimma mirkaneessitootaa fi sochiiwwan damee keenyaa yeroo ammaa hordofi.' :
               language === 'am' ? 'ወቅታዊ የቅርንጫፉ ዜናዎችን፣ ማስታወቂያዎችንና ታሪኮችን እዚህ ያግኙ።' :
               'Discover recent localized cooperative integrations, smallholder breakthroughs, and community advisory announcements.'}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('community')}
            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-950 text-sm font-bold uppercase tracking-widest transition-colors cursor-pointer shrink-0 active:translate-x-1"
          >
            <span>{language === 'om' ? 'Oduu Hunda Ilaali' : language === 'am' ? 'ሁሉንም ዜናዎች ይመልከቱ' : 'Browse All Updates'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockNews.slice(0, 3).map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl border border-emerald-100 overflow-hidden hover:shadow-md hover:border-emerald-300 hover:shadow-emerald-500/5 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between cursor-pointer animate-fade-in"
              id={`quick-news-${item.id}`}
              onClick={() => {
                if (item.youtubeId && item.externalLink) {
                  window.open(item.externalLink, '_blank');
                } else {
                  setActiveTab('community');
                }
              }}
            >
              <div>
                <div className="aspect-video w-full bg-black border-b border-emerald-900/20 overflow-hidden relative group">
                  <img 
                    src={item.imagePlaceholder} 
                    alt={item.title[language]} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {item.youtubeId && (
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 duration-200">
                        <Play className="w-5 h-5 fill-current translate-x-0.5 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                    <span>{item.category}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </span>
                  </div>

                  <h4 className="text-base md:text-lg font-black text-emerald-950 tracking-tight leading-snug line-clamp-2 uppercase">
                    {item.title[language]}
                  </h4>

                  <p className="text-sm text-gray-600 font-semibold leading-relaxed line-clamp-3">
                    {item.summary[language]}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.youtubeId && item.externalLink) {
                      window.open(item.externalLink, '_blank');
                    } else {
                      setActiveTab('community');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-[#054823] hover:text-emerald-950 text-xs sm:text-sm font-black uppercase tracking-widest transition-colors cursor-pointer active:translate-x-1"
                >
                  <span>{item.youtubeId ? (language === 'om' ? 'Fiilmii Daawwadhu' : language === 'am' ? 'ቪዲዮውን ይመልከቱ' : 'Watch Video') : translations.readMore[language]}</span>
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
