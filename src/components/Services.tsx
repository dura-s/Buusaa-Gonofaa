import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coins, Sprout, ShieldCheck, ArrowRight, CheckCircle2, HelpCircle, BadgePercent, BookOpen, Users, Check, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface ServicesProps {
  language: Language;
  initialInquiryActive?: boolean;
}

export default function Services({ language, initialInquiryActive }: ServicesProps) {
  const [activeModal, setActiveModal] = useState<string | null>(initialInquiryActive ? 'general' : null);
  const [activeSpecTab, setActiveSpecTab] = useState<'savings' | 'loans' | 'insurance'>('savings');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    terms: false,
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const servicesList = [
    {
      id: 'savings',
      icon: <Coins className="w-8 h-8 text-emerald-600" />,
      titleKey: 'serviceSavingsTitle',
      descKey: 'serviceSavingsDesc',
      bgClass: 'bg-emerald-50/35',
      features: {
        om: ["Qusannoo Maatii", "Dhalata Malee", "Saffisa Banuuf"],
        am: ["የግል ቁጠባ", "ያለ ወለድ", "ፈጣን አሠራር"],
        en: ["Family Safe Ledger", "Zero Administrative Fees", "Fast Setup Account"]
      }
    },
    {
      id: 'agricultural-loans',
      icon: <Sprout className="w-8 h-8 text-emerald-600" />,
      titleKey: 'serviceLoansTitle',
      descKey: 'serviceLoansDesc',
      bgClass: 'bg-emerald-50/45',
      features: {
        om: ["Sanyii Misoomaa", "Liqii Yeroo Reebaa", "Wabii Gadaa Hawaasaa"],
        am: ["የምርት ዘር ብድር", "ወቅታዊ ምቹ ብድር", "የኅብረት ዋስትና"],
        en: ["High-Yield Seed Loans", "Special Harvest Flexible Terms", "Collective Guarantees"]
      }
    },
    {
      id: 'micro-insurance',
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      titleKey: 'serviceInsuranceTitle',
      descKey: 'serviceInsuranceDesc',
      bgClass: 'bg-emerald-50/35',
      features: {
        om: ["Inshuraansii Roobaa", "Haguuggii Maallaqaa Fayyaa", "Wabii Waldaale"],
        am: ["የዝናብ እጥረት ሽፋን", "የሕክምና አጋዥ ፈንድ", "የአባላት ጋራ ዋስትና"],
        en: ["Weather Index Coverage", "Emergency Medical Assistance", "Cooperative Safety Buffer"]
      }
    }
  ];

  const handleApplyClick = (serviceId: string) => {
    setActiveModal(serviceId);
    setFormSubmitted(false);
    setFormData({ name: '', email: '', phone: '', terms: false, notes: '' });
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = translations.valRequired[language];
    
    if (!formData.phone.trim()) {
      newErrors.phone = translations.valRequired[language];
    } else if (!/^\+?[0-9]{9,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = translations.valPhone[language];
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = translations.valEmail[language];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
    }
  };

  return (
    <section className="bg-gradient-to-br from-white via-emerald-50/15 to-white py-12 md:py-16 shadow-[0_0_50px_rgba(16,185,129,0.05)_inset] border-t border-emerald-100" id="services-section">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Header Title block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-white border border-emerald-100/100 text-[#0B6B3A] text-xs font-bold uppercase tracking-widest">
            {language === 'om' ? 'Tajaajila Misoomaa' : language === 'am' ? 'ባለሙያ ድጋፎች' : 'Social Microfinance'}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B6B3A] tracking-tight font-sans">
            {translations.servicesTitle[language]}
          </h2>
          <p className="text-base text-gray-600 font-medium leading-relaxed">
            {translations.servicesSubtitle[language]}
          </p>
        </div>

        {/* Component Grid displaying products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => (
            <div 
              key={service.id}
              className="bg-white rounded-3xl border border-emerald-100 p-8 hover:border-emerald-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              id={service.id}
            >
              <div className="space-y-6">
                
                {/* Product Logo Emblem */}
                <div className="w-14 h-14 rounded-2xl bg-white border border-emerald-100 flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
                  {service.icon}
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-bold text-emerald-950 uppercase tracking-widest">
                    {translations[service.titleKey][language]}
                  </h3>
                  <p className="text-xs text-emerald-900/70 font-semibold leading-loose">
                    {translations[service.descKey][language]}
                  </p>
                </div>

                {/* Sub features Bullet Points */}
                <div className="pt-4 border-t border-emerald-100/50 space-y-2.5">
                  {service.features[language].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Inquiry Action triggers applying workflow */}
              <div className="pt-8">
                <button
                  onClick={() => handleApplyClick(service.id)}
                  style={{
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold text-xs py-3.5 px-4 rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer uppercase"
                >
                  <span>{translations.serviceApplyBtn[language]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* 2. Detailed Technical specifications and terms tabs */}
        <div className="mt-20 bg-white rounded-3xl border border-emerald-100 p-8 md:p-10 space-y-8" id="product-blueprints-section">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-emerald-50 pb-6">
            <div className="space-y-1.5 text-left">
              <span className="text-[10px] font-extrabold text-[#0B6B3A] bg-emerald-50 px-3 py-1 rounded-md uppercase tracking-wider inline-block">
                {language === 'om' ? 'Oddeeffannoo Gadi Fageenyaa' : language === 'am' ? 'ዝርዝር መግለጫዎች' : 'Institutional Specifications'}
              </span>
              <h3 className="text-xl font-black text-emerald-950 font-sans uppercase tracking-wide">
                {language === 'om' ? 'Qaada fi Qajeelfama Tajaajila Keenyaa' : language === 'am' ? 'የቁጠባ፣ የብድርና የማይክሮ ኢንሹራንስ ዝርዝር መረጃ' : 'Detailed Product Handbooks & Standards'}
              </h3>
              <p className="text-xs text-gray-500 font-semibold">
                {language === 'om' ? 'Wabii fi seera kaffaltii qoratame, ulaagaalee miseensummaa fi faayidaalee hawaasummaa asitti dubbisaa.' :
                 language === 'am' ? 'ለአባላት የተዘጋጁ ህጎች፣ የብድር መክፈያ ገደቦች እና የአየር ሁኔታ ዋስትና መመሪያዎች።' :
                 'Examine deep product structures, collateral-free credit bounds, and rainfall satellite indices verified for Adama.'}
              </p>
            </div>

            {/* Spec togglers */}
            <div className="flex flex-wrap gap-2 shrink-0">
              <button 
                onClick={() => setActiveSpecTab('savings')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  activeSpecTab === 'savings' 
                    ? 'bg-[#0B6B3A] text-white shadow-xs' 
                    : 'bg-emerald-50 text-[#0B6B3A] hover:bg-emerald-100'
                }`}
              >
                <Coins className="w-4.5 h-4.5" />
                <span>{language === 'om' ? 'Qusannoo Only' : language === 'am' ? 'ቁጠባ' : 'Savings'}</span>
              </button>

              <button 
                onClick={() => setActiveSpecTab('loans')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  activeSpecTab === 'loans' 
                    ? 'bg-[#0B6B3A] text-white shadow-xs' 
                    : 'bg-emerald-50 text-[#0B6B3A] hover:bg-emerald-100'
                }`}
              >
                <Sprout className="w-4.5 h-4.5" />
                <span>{language === 'om' ? 'Liqii Only' : language === 'am' ? 'የግብርና ብድር' : 'Agriculture Loans'}</span>
              </button>

              <button 
                onClick={() => setActiveSpecTab('insurance')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  activeSpecTab === 'insurance' 
                    ? 'bg-[#0B6B3A] text-white shadow-xs' 
                    : 'bg-emerald-50 text-[#0B6B3A] hover:bg-emerald-100'
                }`}
              >
                <ShieldCheck className="w-4.5 h-4.5" />
                <span>{language === 'om' ? 'Wabii Only' : language === 'am' ? 'ኢንሹራንስ' : 'Micro-Insurance'}</span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeSpecTab === 'savings' && (
              <motion.div 
                key="savings-spec"
                className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="md:col-span-4 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-705 text-amber-700">
                    <Coins className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-extrabold text-emerald-950 font-sans tracking-tight uppercase">
                    {language === 'om' ? 'Miseensummaa fi Qusannannoo' : language === 'am' ? 'የግልና የኅብረት ቁጠባዎች' : 'Secure Capital Safeguards'}
                  </h4>
                  <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                    {language === 'om' ? 'Qusannoon bu\'uura dinagdee miseensota keenyati. Karaa herrega dirqamaa fi fedhii daldala keessan guddiftu.' :
                     language === 'am' ? 'ቁጠባ በአባላት መካከል ዋስትናን የመፍጠርና ዝቅተኛ ወለድ ያለው ብድር ለማግኘት ዋነኛው ቅድመ-ሁኔታ ነው።' :
                     'Our savings portfolio blends disciplined community-led compliance with flexible wealth storage buffers.'}
                  </p>
                  
                  <div className="p-4 bg-emerald-55 bg-emerald-50 rounded-2xl border border-emerald-100/100 text-[11px] font-semibold text-emerald-950 leading-relaxed">
                    <strong>{language === 'om' ? 'Wabii Dhalata Malee:' : language === 'am' ? 'ወለድ-አልባ የሸሪዓ አማራጭ፡' : 'Interest-Free Compliance Option:'}</strong><br />
                    {language === 'om' ? 'Kaffaltiileen dhalata malee (Shari\'ah compliance) daldaltoota fi hawaasa Adamaaf ni dhiyaata.' :
                     language === 'am' ? 'ለአዳማና ዙሪያው ሙስሊም ማህበረሰብ የሚሆን የሸሪዓ መመሪያን የተከተሉ ወለድ-አልባ የቁጠባ ዕድሎች በቅርንጫፋችን ይገኛሉ።' :
                     'We operate fully optimized non-interest systems (Murabahah mutual pathways) for Islamic agro-enterprise cohorts in Adama.'}
                  </div>
                </div>

                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 bg-emerald-50/40 rounded-2xl border border-emerald-100 space-y-3">
                    <h5 className="text-xs font-black uppercase tracking-wider text-[#0B6B3A]">
                      {language === 'om' ? '1. Qusannoo Dirqamaa' : language === 'am' ? '፩. የግዴታ ቁጠባ (Compulsory)' : '1. Compulsory Savings Plan'}
                    </h5>
                    <ul className="space-y-2 text-xs text-gray-700 font-semibold">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>{language === 'om' ? 'Kaffaltii Ji\'aa:' : 'Monthly Deposit:'}</strong> 50 ETB {language === 'om' ? 'miseensota dhuunfaan' : '(Local Farmers)'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>{language === 'om' ? 'Mirga Liqii:' : 'Credit Eligibility:'}</strong> {language === 'om' ? 'Ji\'a 3 qusannaa booda deeggarsa liqii kenna' : 'Unlocks loan eligibility after 3 months of consistent cycle.'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>{language === 'om' ? 'Kaffaltii Banuuf:' : 'Account Setup Fees:'}</strong> 0 ETB ({language === 'om' ? 'Bilisa' : 'Free'})</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-emerald-50/40 rounded-2xl border border-emerald-100 space-y-3">
                    <h5 className="text-xs font-black uppercase tracking-wider text-[#0B6B3A]">
                      {language === 'om' ? '2. Qusannoo Fedhii' : language === 'am' ? '፪. የፈቃደኝነት ቁጠባ (Voluntary)' : '2. Voluntary Savings Plan'}
                    </h5>
                    <ul className="space-y-2 text-xs text-gray-700 font-semibold">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>{language === 'om' ? 'Hamma Kaffaltii:' : 'Deposit Minimum:'}</strong> {language === 'om' ? 'Kan miseensaa' : 'No strict limits. Withdraw anytime.'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>{language === 'om' ? 'Bu\'aa qusannaa:' : 'Yield Dividends:'}</strong> {language === 'om' ? 'Gara qusannaa daldalaaf bu\'aa fida' : 'Yields yearly dividends powered by mutual cooperative projects.'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>{language === 'om' ? 'Galmee Deetaa:' : 'Bookkeeping Status:'}</strong> Fully paperless digital SMS ledger logs.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-emerald-50/40 rounded-2xl border border-emerald-100 space-y-3 sm:col-span-2 text-left">
                    <h5 className="text-xs font-black uppercase tracking-wider text-[#0B6B3A] flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{language === 'om' ? '3. Qusannoo Garee (Cooperative Cluster Ledgers)' : language === 'am' ? '፫. የኅብረት ቁጠባ (Cluster Savings)' : '3. Group & Cluster Ledger Solutions'}</span>
                    </h5>
                    <p className="text-xs text-gray-650 text-gray-600 font-semibold leading-relaxed">
                      {language === 'om' ? 'Waldaalee maayicroo fi qonnaan bultoota asitti ijaaraman, herrega tokko banuun qusannoo gamtaa isaanii walitti qabu. Kunis madaallii sanyii dabalataa dhiyeessuu mijeessa.' :
                       language === 'am' ? 'እርስ በርስ የሚተማመኑ ከ 5 እስከ 10 የሚደርሱ አርሶ አደሮች በጥንድ በመደራጀት የጋራ የቁጠባ ሂሳብ በመክፈት ብድር እንዲያገኙ የሚያግዝ ልዩ የኅብረት መዝገብ ስርዓት።' :
                       'Optimized for agricultural self-help clusters (5-10 smallholders). Members pool combined savings, forming the core credit pool reserve of the village, resulting in immediate leverage matching of up to 2:1 by Buusaa Gonofaa.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSpecTab === 'loans' && (
              <motion.div 
                key="loans-spec"
                className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="md:col-span-4 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-extrabold text-emerald-950 font-sans tracking-tight uppercase">
                    {language === 'om' ? 'Misooma fi Liqii Qonnaa' : language === 'am' ? 'የሰብል ማምረቻ እና የዘር ብድር' : 'Agricultural Inputs Credit'}
                  </h4>
                  <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                    {language === 'om' ? 'Liqiin keenya haguuggii bittaa sanyii, xaa\'oo fi meeshaalee jallisiiti. Galmi keenya oomisha qonnan bultootaa dabaluudha.' :
                     language === 'am' ? 'ብድራችን ዝቅተኛ ወለድ የሚጠየቅበትና ይልቁንም በተለመደው የባንክ ዋስትና ፈንታ በአካባቢው የኅብረት ህግ ዋስትና የሚፈጸም ምቹ ብድር ነው።' :
                     'High-grade micro-credits bypass formal banking bureaucracy. We deliver high-yield variety seeds directly to local smallholders.'}
                  </p>
                  
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-[11px] font-semibold text-amber-950 flex gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong>{language === 'om' ? 'Wabii Qabeenya Malee:' : language === 'am' ? 'ያለ ሪል-ስቴት ማስያዣ፡' : 'Zero Real Estate Collateral Required:'}</strong><br />
                      {language === 'om' ? 'Heera Gadaatiin, miseensonni shan walitti hidhamanii tokko tokko isaaniif ragaa ta\'u.' :
                       language === 'am' ? 'በአዳማ ቅርንጫፋችን ምንም ዓይነት የመሬት ዋስትና ወይም ሪል-ስቴት ማስያዣ አያስፈልግም፤ አባላት እርስ በርስ የሚተማመኑበት የጋራ ዋስትና ምስክር ይበቃል!' :
                       'We completely substitute land deeds with traditional joint-liability 5-member peer-covenants.'}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-8 space-y-6">
                  <div className="bg-emerald-50/30 p-6 rounded-2xl border border-emerald-100">
                    <h5 className="text-xs font-black uppercase tracking-wider text-[#0B6B3A] mb-4">
                      {language === 'om' ? 'Sgantaa Liqii Misoomaa (Loan Specifications & Limits)' : language === 'am' ? 'የብድር አይነቶችና ክፍያ ዝርዝር መመሪያ' : 'Specific Micro-Credit Packages'}
                    </h5>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs font-semibold text-gray-700">
                        <thead>
                          <tr className="border-b border-emerald-150 text-[10px] uppercase text-gray-400">
                            <th className="pb-3 text-left">Package Name</th>
                            <th className="pb-3 text-center">Limit Size</th>
                            <th className="pb-3 text-center">Service Cost</th>
                            <th className="pb-3 text-right">Repayment Terms</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-emerald-50/50">
                          <tr>
                            <td className="py-3 font-bold text-emerald-950">
                              {language === 'om' ? 'Sanyii Filatamaa' : 'Organic Seed Cluster'}
                            </td>
                            <td className="py-3 text-center font-mono text-emerald-800">10,000 - 30,000 ETB</td>
                            <td className="py-3 text-center">3.0% admin charge</td>
                            <td className="py-3 text-right text-[#0B6B3A]">
                              {language === 'om' ? 'Harvest aligned (Ji\'a 6-9)' : 'Aligned with Harvest (6-9 Mo.)'}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 font-bold text-emerald-950">
                              {language === 'om' ? 'Meeshaalee Qonnaa' : 'Micro-Irrigation Tech'}
                            </td>
                            <td className="py-3 text-center font-mono text-emerald-800">30,000 - 80,000 ETB</td>
                            <td className="py-3 text-center">4.5% admin charge</td>
                            <td className="py-3 text-right text-[#0B6B3A]">
                              {language === 'om' ? 'Ji\'a 12-18 dhufe' : 'Cycle monthly (12-18 Mo.)'}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 font-bold text-emerald-950">
                              {language === 'om' ? 'Daldala Dubartootaa' : 'Female Business Credit'}
                            </td>
                            <td className="py-3 text-center font-mono text-emerald-800">5,000 - 25,000 ETB</td>
                            <td className="py-3 text-center">0.0% (Zero-Fee option)</td>
                            <td className="py-3 text-right text-[#0B6B3A]">
                              {language === 'om' ? 'Salphaan (Ji\'a 3-6)' : 'Flexible grace (3-6 Mo.)'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-emerald-50/20 p-4 rounded-xl border border-emerald-100 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0B6B3A] shrink-0" />
                    <p className="text-[11px] text-gray-700 font-semibold leading-relaxed text-left">
                      <strong>{language === 'om' ? 'Heera Maraaf Ta\'u:' : language === 'am' ? 'ወቅታዊ ክፍያ ማመቻቸት፡' : 'Climate Risk Grace Adaptability:'}</strong><br />
                      {language === 'om' ? 'Yoo beelli ykn gogiinsi hammaate, kaffaltiin liqii dafqa malee gara fulduraatti dabarsama (freeze program).' :
                       language === 'am' ? 'የዝናብ መዛባት ወይም ድርቅ በሚያጋጥምበት ወቅት የብድር ክፍያው ያለምንም ቅጣት ወደ ቀጣዩ አመት ይተላለፋል።' :
                       'In the event of weather indices demonstrating severe crop failure across East Shewa, loan payments are structured with zero penalty extensions.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSpecTab === 'insurance' && (
              <motion.div 
                key="insurance-spec"
                className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="md:col-span-4 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-extrabold text-emerald-950 font-sans tracking-tight uppercase">
                    {language === 'om' ? 'Wabii Inshuraansii Satalaayitii' : language === 'am' ? 'የሳተላይት የአየር ሁኔታ ኢንሹራንስ' : 'Satellite Precipitation Indexing'}
                  </h4>
                  <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                    {language === 'om' ? 'Inshuraansiin keenya dhuunfaan sanyii jireenya qonnan bultootaa satalaayitiidhaan rooba hordofee kaffaltii hiika.' :
                     language === 'am' ? 'የአዳማ የሳተላይት ኢንሹራንስ የባለሙያዎችን የመስክ ግምገማ ሳይጠብቅ በረቀቀ የሳተላይት መረጃ መሠረት በድርቅ ቅጽበት ክፍያን መፈጸም ያስችላል።' :
                     'This pioneering technology links community solidarity with satellite rainfall metrics.'}
                  </p>
                  
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-[11px] font-semibold text-emerald-950 leading-relaxed text-left">
                    <strong>{language === 'om' ? 'Gumaacha Diaspora:' : language === 'am' ? 'የዲያስፖራው በጎ መዋጮ አጋዥነት፡' : 'Diaspora Premium Matching Support:'}</strong><br />
                    {language === 'om' ? 'Kaffaltii harki 60 gumaacha Diaspora keenyaan uwwifama; qonnan bultoonni 40% qofa kaffalani.' :
                     language === 'am' ? 'የአንድ ገበሬ 60% ዓመታዊ የዋስትና መዋጮ ክፍያ (Premium) በስደት ባሉ Diaspora ደጋፊዎቻችን ስለሚሸፈን ገበሬው 40% ብቻ ይከፍላል።' :
                     'Every 100 USD contributed from the Diaspora Diaspora Match program offsets the micro-insurance premiums of approximately 10 vulnerable local family farms.'}
                  </div>
                </div>

                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 bg-emerald-50/40 rounded-2xl border border-emerald-100 space-y-3">
                    <h5 className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-emerald-600" />
                      <span>{language === 'om' ? 'Ulaagaa Kaffaltii' : 'Payout Trigger Indices'}</span>
                    </h5>
                    <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                      {language === 'om' ? 'Guddinni roobaa naannichaa satalaayitiidhaan ji\'a ji\'aan safarama. Yoo dhibbantaa 30 gadi ta\'e, kaffaltiin maallaqaa battalumaan ergama.' :
                       language === 'am' ? 'የዝናብ እጥረት ወይም መዛባት በሳተላይት መረጃ መሠረት ከቀደመው 5 ዓመት አማካይ በ25% ሲያንስ ክፍያው በጥሬ ገንዘብ በጥቂት ቀናት ውስጥ ይፈጸማል።' :
                       'Our satellite system measures millimeter crop moisture content monthly. Payouts trigger automatically with zero administrative lag if rainfall levels drop below 30% of normal indices.'}
                    </p>
                  </div>

                  <div className="p-6 bg-emerald-50/40 rounded-2xl border border-emerald-100 space-y-3 font-semibold">
                    <h5 className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-emerald-600" />
                      <span>{language === 'om' ? 'Haguuggii Fayyaa Maatii' : 'Emergency Household Health Buffers'}</span>
                    </h5>
                    <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                      {language === 'om' ? 'Wabii dabalataan rooba qofa osoo hin taane, fayyaa abbaa manaa fi haadha manaa uwwisa.' :
                       language === 'am' ? 'የሰብል ዋስትና ብቻ ሳይሆን ማንኛውም አባል ገበሬ ድንገተኛ የሕክምና አደጋ ሲገጥመው እስከ 15,000 የኢትዮጵያ ብር የህክምና አጋዥ ፈንድ ያገኛል።' :
                       'Beyond weather metrics, registered members access direct emergency medical grants (up to 15,000 ETB) in cases of critical illness, protecting homes against high medical expenses.'}
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-semibold text-amber-950 sm:col-span-2 space-y-1">
                    <span className="font-extrabold uppercase text-[10px] tracking-wider text-amber-800 block text-left">
                      {language === 'om' ? 'Mirkaneessa Teeknolojii' : 'Meteorological Technology Compliance'}
                    </span>
                    <p className="text-xs text-gray-700 leading-normal font-semibold text-left">
                      {language === 'om' ? 'Deetaan satalaayitii keenyaa sirna meteorological adunyaa fi beekamtii ministeera qonnaa Itoophiyaatiin uwwifamaa dhiyaata.' :
                       language === 'am' ? 'ስርዓታችን ከኢትዮጵያ ሚቲዎሮሎጂ ኤጀንሲ እና ከምስራቅ አፍሪካ የአየር ንብረት ተቋማት ጎንዮሽ የሳተላይት የዝናብ መረጃዎችን በማገናኘት የሚሰራ ፍጹም ህጋዊና እውነተኛ ቴክኖሎጂ ነው።' :
                       'Satellite radar grids are sourced in compliance with National Meteorological Agency (NMA) feeds and synchronized through our digital portal for transparency.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Modal inquiries application portal via pure react transition state */}
        <AnimatePresence>
          {activeModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              
              {/* Overlay background */}
              <motion.div 
                className="fixed inset-0 bg-white/70 backdrop-blur-md ring-1 ring-emerald-400/20" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModal(null)}
              />

              {/* Form card boundary */}
              <motion.div 
                id="service-application-form"
                className="relative bg-white w-full max-w-lg rounded-3xl border border-emerald-100/80 shadow-2xl overflow-hidden p-8 z-10"
                initial={{ scale: 0.95, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 15, opacity: 0 }}
              >
                
                {/* Popup Close trigger */}
                <button 
                  onClick={() => setActiveModal(null)}
                  className="absolute top-4 right-4 p-2 text-emerald-900/60 hover:text-emerald-900 hover:bg-emerald-50 rounded-full transition-colors"
                >
                  &times;
                </button>

                {!formSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none">
                        {language === 'om' ? 'Nuyi Iyyadhu' : language === 'am' ? 'የቅርንጫፍ ማመልከቻ' : 'Inquiry Service'}
                      </span>
                      <h3 className="text-lg font-extrabold text-emerald-950 font-sans tracking-tight">
                        {translations.applyModalTitle[language]} / {translations[servicesList.find(s => s.id === activeModal)?.titleKey || '']?.[language]}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      
                      {/* Full Name input */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                          {translations.contribFormName[language]} *
                        </label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full text-xs font-semibold px-4 py-3 rounded-lg border border-emerald-100 focus:outline-hidden focus:border-emerald-600 bg-emerald-50/20"
                          placeholder="Fayyisaa Kabbadaa / በላይነህ በቀለ"
                        />
                        {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
                      </div>

                      {/* Phone Input with validation */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                          {translations.contribFormPhone[language]} *
                        </label>
                        <input 
                          type="text" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full text-xs font-semibold px-4 py-3 rounded-lg border border-emerald-100 focus:outline-hidden focus:border-emerald-600 bg-emerald-50/20"
                          placeholder="+251 911 ..."
                        />
                        {errors.phone && <p className="text-[10px] text-red-500 font-semibold">{errors.phone}</p>}
                      </div>

                      {/* Optional Email */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                          {translations.contribFormEmail[language]} (Optional)
                        </label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full text-xs font-semibold px-4 py-3 rounded-lg border border-emerald-100 focus:outline-hidden focus:border-emerald-600 bg-emerald-50/20"
                          placeholder="member@buusaagonofaa.org"
                        />
                        {errors.email && <p className="text-[10px] text-red-500 font-semibold">{errors.email}</p>}
                      </div>

                      {/* Description / Special parameters */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                          {language === 'om' ? 'Ibsa dabalataa' : language === 'am' ? 'ማብራሪያ ፍላጎት' : 'Inquiry Message / Special Needs'}
                        </label>
                        <textarea 
                          rows={3}
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          className="w-full text-xs font-semibold px-4 py-3 rounded-lg border border-emerald-100 focus:outline-hidden focus:border-emerald-600 bg-emerald-50/20"
                          placeholder={language === 'om' ? 'Qusannaa koo banuun barbaada...' : 'የግብርና ብድር ሚያስፈልገኝ ዘር ዕርዳታ ለመግዛት ነበር...'}
                        />
                      </div>

                    </div>

                    {/* Submit actions */}
                    <button
                      type="submit"
                      style={{
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                      }}
                      className="w-full bg-emerald-600 text-white font-bold text-xs py-3.5 rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer uppercase"
                    >
                      {language === 'om' ? 'Iyyannoo Ergi' : language === 'am' ? 'ማመልከቻውን ይላኩ' : 'Send Service Inquiry'}
                    </button>

                  </form>
                ) : (
                  
                  // Interactive Success State
                  <div className="text-center py-8 space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-emerald-950 font-sans">
                        {language === 'om' ? 'Iyyannoon Mirkaneeffameera' : language === 'am' ? 'በተሳካ ሁኔታ ተልኳል' : 'Inquiry Sent Successfully'}
                      </h3>
                      <p className="text-xs text-emerald-800/70 font-semibold leading-relaxed max-w-sm mx-auto">
                        {translations.applyFormSuccess[language]}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveModal(null)}
                      className="inline-flex items-center justify-center bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-emerald-100 hover:text-emerald-950 transition-colors uppercase cursor-pointer"
                    >
                      {language === 'om' ? 'Cufi' : language === 'am' ? 'ዝጋ' : 'Close Portal'}
                    </button>
                  </div>

                )}

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
