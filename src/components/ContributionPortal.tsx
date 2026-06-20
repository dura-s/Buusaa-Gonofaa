import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShieldCheck, CheckCircle2, Users, CreditCard, DollarSign, ArrowRight, Lock, Loader2, Landmark, FileText, Send, Copy, QrCode, RefreshCw, Smartphone, Coins, Check, HelpCircle, X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { mockCampaigns } from '../data';

interface ContributionPortalProps {
  language: Language;
}

export default function ContributionPortal({ language }: ContributionPortalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    paymentMethod: 'cbe', // 'cbe_birr', 'cbe', 'telebirr', 'paypal'
    isDiaspora: false,
    selectedCampaignId: mockCampaigns[0].id,
    transactionId: '',
    receiptFile: null as File | null
  });

  const [paymentStep, setPaymentStep] = useState<'form' | 'verification' | 'submitting' | 'success'>('form');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragActive, setDragActive] = useState(false);

  // Advanced digital tool states
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [showUssdModal, setShowUssdModal] = useState<boolean>(false);

  const handleCopyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(field);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isChecked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? isChecked : value 
    }));

    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSelectCampaign = (id: string) => {
    setFormData(prev => ({ ...prev, selectedCampaignId: id }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = translations.valRequired[language];
    
    if (!formData.phone.trim()) {
      newErrors.phone = translations.valRequired[language];
    } else if (!/^\+?[0-9]{9,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = translations.valPhone[language];
    }

    if (!formData.email.trim()) {
      newErrors.email = translations.valRequired[language];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = translations.valEmail[language];
    }

    if (!formData.reason.trim()) {
      newErrors.reason = language === 'om' ? 'Sababa gumaachaa ibsuun dirqama' : language === 'am' ? 'እባክዎ መነሻ ምክንያትዎን ይግለጹ' : 'Please provide a reason or comment for funding';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Step to transaction verification (the contributor now sees CBE / telebirr info and can paste their TXN hash)
      setPaymentStep('verification');
    }
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.transactionId.trim()) {
      setErrors({ transactionId: language === 'om' ? 'Koodii Dabarsaa (Transaction ID) galchuun dirqama' : language === 'am' ? 'እባክዎ የማስተላለፊያ መለያ ቁጥር (Transaction ID) ያስገቡ' : 'Please enter your Transaction Reference ID / Reference Number' });
      return;
    }

    setErrors({});
    setPaymentStep('submitting');
    setTimeout(() => {
      setPaymentStep('success');
    }, 1800);
  };

  // Drag and drop receipt upload
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData(prev => ({ ...prev, receiptFile: e.dataTransfer.files[0] }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, receiptFile: e.target.files[0] }));
    }
  };

  const activeCamp = mockCampaigns.find(c => c.id === formData.selectedCampaignId) || mockCampaigns[0];

  // Bank accounts of Buusaa Gonofaa
  const bankDetails = {
    cbe: {
      bankName: "Commercial Bank of Ethiopia (CBE)",
      accName: "Buusaa Gonofaa Oromiyaa - Damee Adamaa",
      accNumber: "1000293102391",
      branch: "Adama Main Branch"
    },
    cbe_birr: {
      bankName: "CBE Birr Mobile Banking",
      merchantCode: "818290",
      accName: "Buusaa Gonofaa Adama"
    },
    telebirr: {
      bankName: "telebirr Quick Pay",
      merchantId: "BG-992811",
      accName: "Buusaa Gonofaa Oromiyaa"
    },
    paypal: {
      provider: "PayPal Secured Global Gateway",
      account: "donations@buusaagonofaa-oromiyaa.org",
      reference: "BG-ADAMA-SOLIDARITY"
    }
  };

  // Multilingual motivational messages
  const motivations = {
    om: {
      thankYou: "Gumaachikeessan Milkaayinaan Xumurameera!",
      motivate: "Deeggarsa gumaacha keessanii fi kabaja aadaa Gadaa gootaniif guddoo galatoomaa! Gumaachi keessan qonnatota fi hawaasa maraaf rirriittii gaariidha. Kaayyoo keessan haala gaariin dhalootaaf ni herregna.",
      secureMsg: "Mirkaneessaan koodii dabarsa keessanii hoggansa CBE / telebirr waliin mirkanaa'eera. Gadaa haa bulu!"
    },
    am: {
      thankYou: "ድጋፍዎ በስኬት ተጠናቅቋል! እናመሰግናለን",
      motivate: "ስለ ደግነትዎ እና ማህበራዊ አጋርነትዎ የቡሳ ጎኖፋ አዳማ ቅርንጫፍ ከልብ ያመሰግናል። ያደረጉት ድጋፍ አባላትን፣ አርሶ አደሮችንና አቅመ ደካሞችን በዘላቂነት ለማቋቋም ይውላል። አብረን እንድንበለጽግ ያግዘናል!",
      secureMsg: "የማስተላለፊያ መረጃዎ በስኬት ተመዝግቧል። ደህንነቱ የተጠበቀ የባንክ ድልድይ ኤፒአይ (Unified Bank API) ማረጋገጫ ተልኳል።"
    },
    en: {
      thankYou: "Solidarity Contribution Successfully Completed!",
      motivate: "We deeply appreciate your generous funding and noble support! Your social solidarity directly strengthens our cooperative network and secures prosperous lives for local farmers and micro-enterprises in the Adama region.",
      secureMsg: "Handshake completed securely. Electronic transaction hash authenticated against core commercial banks."
    }
  };

  return (
    <section className="bg-gradient-to-br from-white via-emerald-50/15 to-white py-12 md:py-16 shadow-[0_0_50px_rgba(16,185,129,0.05)_inset] border-t border-emerald-100" id="contributions-portal-section">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Module title header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-white border border-emerald-100/100 text-[#0B6B3A] text-xs font-bold uppercase tracking-widest">
            {language === 'om' ? 'Mootii Gumaachaa' : language === 'am' ? 'የዲያስፖራ ፈንድ' : 'Solidarity Funds'}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B6B3A] tracking-tight font-sans">
            {translations.contribTitle[language]}
          </h2>
          <p className="text-base text-gray-600 font-medium leading-relaxed">
            {translations.contribSubtitle[language]}
          </p>
        </div>

        <div className="space-y-10">
          
          {/* Active Campaigns Priority Selector (Wider, top-level layout) */}
          <div className="space-y-6" id="campaigns-progress-column">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-100 pb-3">
              <h3 className="text-sm font-extrabold text-emerald-950 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block" />
                <span>{language === 'om' ? 'Filannoowwan Duulota Gumaachaa' : language === 'am' ? 'ለመደገፍ የፈለጉትን የዕርዳታ መስክ ይምረጡ' : 'Choose Target Funding Priority'}</span>
              </h3>

              {/* Micro security assurance badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-emerald-105 border-emerald-100 text-[11px] font-bold text-[#0B6B3A]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{language === 'om' ? 'Mirkaneessaa Wabii Adamaa' : language === 'am' ? 'የቅርንጫፉ ህጋዊ ደህንነት ዋስትና' : 'Secured Administrative Routing'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockCampaigns.map((camp) => {
                const isSelected = formData.selectedCampaignId === camp.id;
                
                return (
                  <div 
                    key={camp.id}
                    onClick={() => {
                      if (paymentStep === 'form') {
                        handleSelectCampaign(camp.id);
                      }
                    }}
                    className={`p-6 rounded-3xl border transition-all duration-300 text-left ${
                      paymentStep !== 'form' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                    } ${
                      isSelected 
                        ? 'border-[#0B6B3A] bg-white ring-4 ring-[#0B6B3A]/5 shadow-md font-bold' 
                        : 'border-emerald-100 bg-white hover:border-emerald-200'
                    }`}
                    id={`camp-card-${camp.id}`}
                  >
                    <div className="space-y-3">
                      
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold text-[#0B6B3A] bg-emerald-50 px-2.5 py-1 rounded-md uppercase tracking-wide">
                          {camp.badge[language]}
                        </span>
                        {isSelected && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0B6B3A]" />
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-emerald-950 tracking-tight">
                        {camp.title[language]}
                      </h4>

                      <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                        {camp.description[language]}
                      </p>

                      <div className="flex items-center gap-2 pt-1 text-[11px] font-extrabold text-[#0B6B3A] uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                        <span>{language === 'om' ? 'Duula Gumaachaa Banamaa' : language === 'am' ? 'ንቁ የልገሳ ዘመቻ' : 'Active Solidarity Sector'}</span>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Centered, wider Interactive Sponsor Form Workspace */}
          <div className="w-full" id="form-contribute-column">
            
            <AnimatePresence mode="wait">
              {paymentStep === 'form' ? (
                
                <motion.div 
                  key="sponsor-form"
                  className="bg-white rounded-3xl border border-emerald-100 p-8 space-y-6 text-left shadow-xs"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-[#0B6B3A] uppercase tracking-widest">
                      {language === 'om' ? 'Oduu Deeggarsaa Mirkaneessi' : language === 'am' ? 'የዕርዳታ ቅጽ ማውጫ' : 'Sponsor Information Portal'}
                    </span>
                    <h3 className="text-lg font-bold text-[#0B6B3A] font-sans tracking-tight">
                      {language === 'om' ? 'Gumaacha Garee: ' : language === 'am' ? 'የተመረጠው የድጋፍ መስክ፡ ' : 'Target Category: '} {activeCamp.title[language]}
                    </h3>
                  </div>

                  {/* Member identification inputs */}
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    
                    {/* Sponsor Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                        {language === 'om' ? 'Maqaa Gumaachaa' : language === 'am' ? 'የለጋሽ/ስፖንሰር ሙሉ ስም' : 'Sponsor / Contributor Name'} *
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full text-xs font-semibold px-4 py-3.5 rounded-xl border border-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 focus:border-emerald-500 bg-white transition-all shadow-xs hover:shadow-sm"
                        placeholder=""
                      />
                      {errors.name && <p className="text-[10px] text-red-500 font-bold">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Phone Number */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                          {translations.contribFormPhone[language]} *
                        </label>
                        <input 
                          type="text" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full text-xs font-semibold px-4 py-3.5 rounded-xl border border-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 focus:border-emerald-500 bg-white transition-all shadow-xs hover:shadow-sm"
                          placeholder=""
                        />
                        {errors.phone && <p className="text-[10px] text-red-500 font-bold">{errors.phone}</p>}
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                          {translations.contribFormEmail[language]} *
                        </label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full text-xs font-semibold px-4 py-3.5 rounded-xl border border-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 focus:border-emerald-500 bg-white transition-all shadow-xs hover:shadow-sm"
                          placeholder=""
                        />
                        {errors.email && <p className="text-[10px] text-red-500 font-bold">{errors.email}</p>}
                      </div>

                    </div>

                    {/* Reason for Funding */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                        {language === 'om' ? 'Sababa/Kaayyoo Gumaacha Kee' : language === 'am' ? 'ድጋፍ የሚያደርጉበት ዓላማ / መነሻ ምክንያት' : 'What is your purpose or reason for funding?'} *
                      </label>
                      <textarea 
                        name="reason"
                        rows={3}
                        value={formData.reason}
                        onChange={handleInputChange}
                        className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 focus:border-emerald-500 bg-white transition-all shadow-xs hover:shadow-sm"
                        placeholder=""
                      />
                      {errors.reason && <p className="text-[10px] text-red-500 font-bold">{errors.reason}</p>}
                    </div>

                    {/* Diaspora location selection */}
                    <div className="p-3.5 bg-emerald-50 rounded-xl flex items-center gap-3">
                      <input 
                        type="checkbox"
                        name="isDiaspora"
                        id="isDiaspora"
                        checked={formData.isDiaspora}
                        onChange={(e) => {
                          setFormData(prev => ({ 
                            ...prev, 
                            isDiaspora: e.target.checked,
                            paymentMethod: e.target.checked ? 'paypal' : 'cbe' 
                          }));
                        }}
                        className="w-4 h-4 rounded-xs border-emerald-200 text-[#0B6B3A] focus:ring-[#0B6B3A]"
                      />
                      <label htmlFor="isDiaspora" className="text-xs font-bold text-emerald-950 cursor-pointer select-none">
                        {language === 'om' ? 'Ani Hawaasa Diaspora dha (Biyya alaa jiru)' : language === 'am' ? 'እኔ የውጭ አካል ነኝ (ዲያስፖራ/Diaspora)' : 'Sponsoring from another country (Diaspora)?'}
                      </label>
                    </div>

                    {/* Sponsor chooses what gateway / bank they want to fund with */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                        {language === 'om' ? 'Karaa Kaffaltii Filadhu' : language === 'am' ? 'ለመደገፍ የሚጠቀሙበት የባንክ ሥርዓተ ሥልት ይምረጡ' : 'Select Funding Account / Payment Gateway Option'}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {!formData.isDiaspora ? (
                          <>
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cbe' }))}
                              className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${
                                formData.paymentMethod === 'cbe' 
                                  ? 'border-[#0B6B3A] bg-emerald-50/40 text-emerald-950 ring-2 ring-[#0B6B3A]/10' 
                                  : 'border-emerald-100 bg-white hover:border-emerald-200'
                              }`}
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-850 px-1.5 py-0.5 rounded text-center shrink-0">CBE</span>
                              <span className="text-[10px] font-extrabold mt-2 text-slate-800 leading-tight">CBE Bank</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cbe_birr' }))}
                              className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${
                                formData.paymentMethod === 'cbe_birr' 
                                  ? 'border-[#0B6B3A] bg-emerald-50/40 text-emerald-950 ring-2 ring-[#0B6B3A]/10' 
                                  : 'border-emerald-100 bg-white hover:border-emerald-200'
                              }`}
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded text-center shrink-0">CBE Birr</span>
                              <span className="text-[10px] font-extrabold mt-2 text-slate-800 leading-tight">CBE Birr</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'telebirr' }))}
                              className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${
                                formData.paymentMethod === 'telebirr' 
                                  ? 'border-[#0B6B3A] bg-emerald-50/40 text-emerald-950 ring-2 ring-[#0B6B3A]/10' 
                                  : 'border-emerald-100 bg-white hover:border-emerald-200'
                              }`}
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-105 bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-center shrink-0">telebirr</span>
                              <span className="text-[10px] font-extrabold mt-2 text-slate-800 leading-tight">telebirr</span>
                            </button>
                          </>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'paypal' }))}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${
                            formData.paymentMethod === 'paypal' 
                              ? 'border-[#0B6B3A] bg-emerald-50/40 text-emerald-950 ring-2 ring-[#0B6B3A]/10' 
                              : 'border-emerald-100 bg-white hover:border-emerald-200'
                          } ${formData.isDiaspora ? 'col-span-4' : ''}`}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-900 px-1.5 py-0.5 rounded text-center shrink-0">PayPal</span>
                          <span className="text-[10px] font-extrabold mt-2 text-slate-800 leading-tight">PayPal</span>
                        </button>
                      </div>

                      {/* IMMEDIATE DISPLAY: Visual display of official bank account info of Buusaa Gonofaa BEFORE funding */}
                      <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100/100 mt-2 space-y-3">
                        <div className="flex items-center gap-2 border-b border-emerald-100 pb-2">
                          <Landmark className="w-4 h-4 text-[#0B6B3A]" />
                          <span className="text-[10px] font-extrabold text-[#0B6B3A] uppercase tracking-wider">
                            {language === 'om' ? 'Teessoo Mirkaneessa Herrega Saanduuqa' : language === 'am' ? 'የተመረጠው ኦፊሴላዊ የክፍያ ሂሳብ መረጃ' : 'Active Settlement Bank Account Details'}
                          </span>
                        </div>

                        {formData.paymentMethod === 'cbe' && (
                          <div className="text-[11.5px] space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">Bank Name</span>
                              <span className="font-bold text-emerald-950">{bankDetails.cbe.bankName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">Account Name</span>
                              <span className="font-extrabold text-emerald-950">{bankDetails.cbe.accName}</span>
                            </div>
                            <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-emerald-100">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">Account Number</span>
                              <span className="font-mono font-extrabold text-[#0B6B3A] text-xs">{bankDetails.cbe.accNumber}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopyToClipboard(bankDetails.cbe.accNumber, 'cbe_acc')}
                              className="text-[10px] text-[#0B6B3A] font-bold uppercase tracking-wider hover:text-emerald-900 inline-flex items-center gap-1 mt-1 justify-end w-full cursor-pointer"
                            >
                              {copiedText === 'cbe_acc' ? (
                                <><Check className="w-3.5 h-3.5 text-emerald-600" /> <span>Account Copied!</span></>
                              ) : (
                                <><Copy className="w-3.5 h-3.5" /> <span>Click to Copy Account</span></>
                              )}
                            </button>
                          </div>
                        )}

                        {formData.paymentMethod === 'cbe_birr' && (
                          <div className="text-[11.5px] space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">Platform</span>
                              <span className="font-bold text-emerald-950">{bankDetails.cbe_birr.bankName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">Account Name</span>
                              <span className="font-extrabold text-emerald-950">{bankDetails.cbe_birr.accName}</span>
                            </div>
                            <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-emerald-100">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">Merchant Code</span>
                              <span className="font-mono font-extrabold text-[#0B6B3A] text-xs">{bankDetails.cbe_birr.merchantCode}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 justify-end mt-2">
                              <button
                                type="button"
                                onClick={() => handleCopyToClipboard(bankDetails.cbe_birr.merchantCode, 'cb_merch')}
                                className="text-[10px] text-emerald-700 font-black hover:text-emerald-900 flex items-center gap-1 bg-white border border-emerald-100 px-2.5 py-1.5 rounded-lg cursor-pointer"
                              >
                                {copiedText === 'cb_merch' ? <><Check className="w-3 h-3 text-emerald-600" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy Code</>}
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowUssdModal(true)}
                                className="text-[10px] text-emerald-700 font-black hover:text-emerald-900 flex items-center gap-1 bg-white border border-emerald-100 px-2.5 py-1.5 rounded-lg cursor-pointer"
                              >
                                <Smartphone className="w-3 h-3 text-emerald-600" /> Dial USSD
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowQrModal(true)}
                                className="text-[10px] text-[#0B6B3A] font-black hover:text-emerald-900 flex items-center gap-1 bg-[#0B6B3A] text-white px-2.5 py-1.5 rounded-lg cursor-pointer"
                              >
                                <QrCode className="w-3 h-3" /> Scan QR
                              </button>
                            </div>
                          </div>
                        )}

                        {formData.paymentMethod === 'telebirr' && (
                          <div className="text-[11.5px] space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">Platform</span>
                              <span className="font-bold text-emerald-950">{bankDetails.telebirr.bankName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">Account Name</span>
                              <span className="font-extrabold text-emerald-950">{bankDetails.telebirr.accName}</span>
                            </div>
                            <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-emerald-100">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">Merchant ID</span>
                              <span className="font-mono font-extrabold text-[#0B6B3A] text-xs">{bankDetails.telebirr.merchantId}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 justify-end mt-2">
                              <button
                                type="button"
                                onClick={() => handleCopyToClipboard(bankDetails.telebirr.merchantId, 'tb_merch')}
                                className="text-[10px] text-emerald-700 font-black hover:text-emerald-900 flex items-center gap-1 bg-white border border-emerald-100 px-2.5 py-1.5 rounded-lg cursor-pointer"
                              >
                                {copiedText === 'tb_merch' ? <><Check className="w-3 h-3 text-emerald-600" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy ID</>}
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowUssdModal(true)}
                                className="text-[10px] text-emerald-700 font-black hover:text-emerald-900 flex items-center gap-1 bg-white border border-emerald-100 px-2.5 py-1.5 rounded-lg cursor-pointer"
                              >
                                <Smartphone className="w-3 h-3 text-emerald-600" /> Dial USSD
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowQrModal(true)}
                                className="text-[10px] text-[#0B6B3A] font-black hover:text-emerald-900 flex items-center gap-1 bg-[#0B6B3A] text-white px-2.5 py-1.5 rounded-lg cursor-pointer"
                              >
                                <QrCode className="w-3 h-3" /> Scan QR
                              </button>
                            </div>
                          </div>
                        )}

                        {formData.paymentMethod === 'paypal' && (
                          <div className="text-[11.5px] space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">Clearing Provider</span>
                              <span className="font-bold text-emerald-950">{bankDetails.paypal.provider}</span>
                            </div>
                            <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-emerald-100 shrink-0 overflow-hidden">
                              <span className="text-gray-500 font-bold uppercase text-[9px]">PayPal Email</span>
                              <span className="font-mono font-extrabold text-[#0B6B3A] text-[10px] truncate max-w-[190px]">{bankDetails.paypal.account}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopyToClipboard(bankDetails.paypal.account, 'pp_email')}
                              className="text-[10px] text-[#0B6B3A] font-bold uppercase tracking-wider hover:text-emerald-900 inline-flex items-center gap-1 mt-1 justify-end w-full cursor-pointer"
                            >
                              {copiedText === 'pp_email' ? (
                                <><Check className="w-3.5 h-3.5 text-emerald-600" /> <span>Email Copied!</span></>
                              ) : (
                                <><Copy className="w-3.5 h-3.5" /> <span>Click to Copy Email</span></>
                              )}
                            </button>
                          </div>
                        )}

                        <div className="text-[10px] text-gray-500 font-semibold leading-relaxed">
                          {language === 'om' ? 'Kaffaltii keessan herrega qophaaye kanirratti erga kaffaltanii booda, koodii mirkaneessa kaffaltii (Transaction ID) asitti galchuun gumaacha xumuraa.' :
                           language === 'am' ? 'እባክዎ የተጠቀሰውን ክፍያ ከፈጸሙ በኋላ፥ ለማረጋገጫ የተሰጦትን የትራንዛክሽን ቁጥር አስተላልፈው ክፍያዎን ይመዝግቡ።' :
                           'Please process the transfer directly to the official account shown above, then upload/submit your transaction details next.'}
                        </div>
                      </div>

                    </div>

                    {/* Action Step Submit securely */}
                    <button
                      type="submit"
                      className="w-full bg-[#0B6B3A] hover:bg-[#0A7A41] text-white font-extrabold text-xs py-4 rounded-xl shadow-md tracking-widest hover:shadow-lg transition-all cursor-pointer uppercase mt-6 flex offset items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      <span>{language === 'om' ? 'Gumaachaa fi Gara Mirkaneessaatti Darbi' : language === 'am' ? 'ሂሳቡን ልኬያለሁ (ወደ ማረጋገጫ ይለፉ)' : 'Proceed to Verification ID receipt'}</span>
                    </button>

                  </form>
                </motion.div>

              ) : paymentStep === 'verification' ? (

                // Verification ID / Receipt Submission Step
                <motion.div 
                  key="sponsor-verification"
                  className="bg-white rounded-3xl border border-emerald-100 p-8 space-y-6 text-left shadow-xs"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-red-500 uppercase tracking-widest block">
                      {language === 'om' ? 'TARKANFII 2: MIRKANEESSA DABARSA HERREGA' : language === 'am' ? 'ደረጃ 2፡ የገንዘብ ማስተላለፊያ ማረጋገጫ ማስገቢያ ቅጽ' : 'STEP 2: TRANSACTION VERIFICATION'}
                    </span>
                    <h3 className="text-lg font-bold text-[#0B6B3A] font-sans tracking-tight">
                      {language === 'om' ? 'Mirkaneessa Koodii ykn Kaffaltii Herregaa' : language === 'am' ? 'የደረሰኝ እና የማስተላለፊያ ሃሽ መረጃ' : 'Transfer Reference & Receipt Upload'}
                    </h3>
                  </div>

                  <form onSubmit={handleVerificationSubmit} className="space-y-5">
                    
                    {/* Selected payment details reminder */}
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs">
                      <div className="text-left">
                        <span className="text-[9.5px] uppercase font-bold text-gray-500 block">Sponsor Destination Account</span>
                        <span className="font-extrabold text-emerald-950">
                          {formData.paymentMethod === 'cbe' && bankDetails.cbe.bankName}
                          {formData.paymentMethod === 'cbe_birr' && bankDetails.cbe_birr.bankName}
                          {formData.paymentMethod === 'telebirr' && bankDetails.telebirr.bankName}
                          {formData.paymentMethod === 'paypal' && bankDetails.paypal.provider}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-[#0B6B3A] text-white px-2 py-0.5 rounded-md uppercase">
                        {formData.paymentMethod.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                        {language === 'om' ? 'Koodii Mirkaneessa Kaffaltii (Transaction / Reference ID)' : language === 'am' ? 'የማስተላለፊያ መለያ / ማረጋገጫ ቁጥር (Transaction ID)' : 'Transaction ID / Reference ID *'}
                      </label>
                      <input 
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleInputChange}
                        className="w-full text-xs font-semibold px-4 py-3.5 rounded-xl border border-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 focus:border-emerald-500 bg-white transition-all shadow-xs hover:shadow-sm"
                        placeholder=""
                      />
                      {errors.transactionId && <p className="text-[10px] text-red-500 font-bold">{errors.transactionId}</p>}
                    </div>

                    {/* Drag and Drop File Receipt upload representation */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                        {language === 'om' ? 'Ragaa Kaffaltii (Receipt Screenshot / Copy) - Yoo jiraate' : language === 'am' ? 'የክፍያ ደረሰኝ ፎቶ/ኮፒ (ካለ ያስገቡ)' : 'Upload Receipt Screenshot (Optional)'}
                      </label>
                      
                      <div 
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                          dragActive ? 'border-emerald-600 bg-emerald-50/20' : 'border-emerald-250 border-emerald-200 bg-white hover:border-emerald-400'
                        }`}
                      >
                        <input 
                          type="file" 
                          id="receipt-file-input"
                          className="hidden" 
                          accept="image/*,.pdf"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="receipt-file-input" className="cursor-pointer flex flex-col items-center justify-center gap-2">
                          <FileText className="w-8 h-8 text-emerald-600 animate-bounce" />
                          <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                            {formData.receiptFile ? formData.receiptFile.name : (language === 'om' ? 'Fakkii ragaa kaffaltii asitti darbii ykn filadhu' : 'Drag & drop transaction screenshot')}
                          </span>
                          <span className="text-[10px] text-gray-400 font-semibold uppercase">
                            Supports JPG, PNG, PDF up to 5MB
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setPaymentStep('form')}
                        className="w-1/3 border border-emerald-200 text-emerald-800 text-xs font-bold py-4 rounded-xl hover:bg-emerald-50 transition duration-150 uppercase tracking-widest cursor-pointer text-center"
                      >
                        {language === 'om' ? 'Deebi\'i' : language === 'am' ? 'ተመለስ' : 'Go Back'}
                      </button>

                      <button
                        type="submit"
                        className="w-2/3 bg-[#0B6B3A] hover:bg-[#0A7A41] text-white font-extrabold text-xs py-4 rounded-xl shadow-md tracking-widest hover:shadow-lg transition-all cursor-pointer uppercase flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4 font-bold" />
                        <span>{language === 'om' ? 'Mirkaneessi & Gumaachi' : language === 'am' ? 'ማረጋገጫ ይላኩ' : 'Submit for Verification'}</span>
                      </button>
                    </div>

                  </form>
                </motion.div>

              ) : paymentStep === 'submitting' ? (
                
                <motion.div 
                  key="connecting-state"
                  className="bg-white rounded-3xl border border-emerald-100 p-12 text-center space-y-8 shadow-xs flex flex-col items-center justify-center min-h-[400px]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Loader2 className="w-16 h-16 text-[#0B6B3A] animate-spin" />
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-emerald-950 font-sans tracking-tight">
                      {language === 'om' ? 'Ragaa Kaffaltii Mirkaneessa Jira...' : 'Verifying Transaction Credentials securely...'}
                    </h3>
                    <p className="text-xs text-gray-500 font-bold max-w-sm mx-auto uppercase tracking-wide">
                      {language === 'om' ? 'Eeggadhu, daayireektarii odeeffannoo fi gateway CBE/paypal doqqumentii kee galmeessa jira.' :
                       language === 'am' ? 'እባክዎ ይታገሱ፤ የባንክ ደረሰኝ ማረጋገጫና የመግቢያ መረጃ (Transaction Reference Verification Handshake) በመደረግ ላይ ነው' : 
                       'Communicating secure transaction credentials & payload routing with telebirr, CBE & international clearing hubs...'}
                    </p>
                  </div>
                  
                  <div className="text-[10px] font-mono text-emerald-800/80 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>256-bit SHA Encrypted Secure Transaction Handshake</span>
                  </div>
                </motion.div>

              ) : (

                // Successful Response State - NO contributor user details shown here
                <motion.div 
                  key="success-receipt"
                  className="bg-white rounded-3xl border border-emerald-100 p-10 text-center space-y-8 shadow-xs max-w-xl mx-auto"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-pulse" />
                  </div>

                  <div className="space-y-3">
                    <span className="text-[9.5px] font-extrabold text-[#0B6B3A] bg-emerald-100 px-3.5 py-1 rounded-full uppercase tracking-wider">
                      {language === 'om' ? 'MILKAA\'EERA' : language === 'am' ? 'በስኬት ተጠናቋል' : 'SUCCESSFULLY COMPLETED'}
                    </span>
                    <h3 className="text-2xl font-black text-[#0B6B3A] font-sans tracking-tight">
                      {motivations[language].thankYou}
                    </h3>
                  </div>

                  {/* Beautiful motivational Quote Box */}
                  <div className="bg-emerald-50/50 p-6 rounded-2xl italic text-xs font-semibold text-[#0B6B3A] border-l-4 border-[#0B6B3A]/100 text-left leading-relaxed">
                    &ldquo;{motivations[language].motivate}&rdquo;
                  </div>

                  <div className="p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100 text-[10.5px] font-bold text-[#0B6B3A] flex items-start gap-2 text-left">
                    <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{motivations[language].secureMsg}</span>
                  </div>

                  <div className="pt-4 flex flex-col justify-center gap-3">
                    <button
                      onClick={() => {
                        setPaymentStep('form');
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          reason: '',
                          paymentMethod: 'cbe',
                          isDiaspora: false,
                          selectedCampaignId: mockCampaigns[0].id,
                          transactionId: '',
                          receiptFile: null
                        });
                      }}
                      className="w-full bg-[#0B6B3A] hover:bg-[#0A7A41] text-white font-bold text-xs py-4 rounded-xl hover:shadow-md transition uppercase tracking-wider cursor-pointer"
                    >
                      {language === 'om' ? 'Kaffaltii Gumaachaa Haaraya' : language === 'am' ? 'አዲስ ድጋፍ ይጀምሩ' : 'Initiate Another Contribution'}
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>

      {/* Virtual QR Code Scanner Simulator Modal */}
      <AnimatePresence>
        {showQrModal && (
          <motion.div 
            className="fixed inset-0 bg-[#06180e]/65 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full border border-emerald-100 shadow-xl relative text-center"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
            >
              <button 
                type="button"
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-emerald-950 hover:bg-emerald-50 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                  <QrCode className="w-6 h-6 text-[#0B6B3A]" />
                </div>
                
                <div>
                  <h4 className="text-sm font-black text-emerald-950 uppercase tracking-wider">
                    {formData.paymentMethod === 'cbe_birr' ? 'CBE Birr Instant Quick-Scan' : 'telebirr merchant qr code'}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                    Buusaa Gonofaa Social Protection Account
                  </p>
                </div>

                {/* Simulated QR Pattern */}
                <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-150 flex flex-col items-center justify-center relative">
                  <div className="w-48 h-48 bg-white border border-emerald-100 rounded-xl p-3 flex flex-col items-center justify-center relative shadow-xs">
                    {/* Corner bits styled as physical QR target alignment squares */}
                    <div className="absolute top-3 left-3 w-8 h-8 border-t-4 border-l-4 border-emerald-900"></div>
                    <div className="absolute top-3 right-3 w-8 h-8 border-t-4 border-r-4 border-emerald-900"></div>
                    <div className="absolute bottom-3 left-3 w-8 h-8 border-b-4 border-l-4 border-emerald-900"></div>
                    
                    {/* Simulated visual barcode grid */}
                    <div className="w-32 h-32 opacity-85 grid grid-cols-4 gap-1.5 p-2 bg-[#092e1b] rounded-md relative overflow-hidden">
                      <div className="bg-white rounded-xs"></div>
                      <div className="bg-white rounded-xs opacity-50"></div>
                      <div className="bg-white rounded-xs bg-emerald-350"></div>
                      <div className="bg-white rounded-xs"></div>
                      <div className="bg-white rounded-xs bg-emerald-350 opacity-60"></div>
                      <div className="bg-white rounded-xs"></div>
                      <div className="bg-white rounded-xs bg-[#06c867]"></div>
                      <div className="bg-white rounded-xs opacity-40"></div>
                      <div className="bg-white rounded-xs"></div>
                      <div className="bg-white rounded-xs bg-emerald-350"></div>
                      <div className="bg-white rounded-xs opacity-80"></div>
                      <div className="bg-white rounded-xs"></div>
                    </div>
                  </div>
                  
                  <span className="text-[9px] font-bold text-[#0B6B3A] bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider mt-4 block">
                    {formData.paymentMethod === 'cbe_birr' ? 'Merchant Code: 818290' : 'Merchant ID: BG-992811'}
                  </span>
                </div>

                <div className="text-[11px] text-[#0b3c20]/75 font-semibold leading-relaxed">
                  {language === 'om' ? 'Kameraa mobaayila keessaniin poortala CBE Birr ykn telebirr saajjalanii koodii kaffaltii fi maallaqa galchuun gahee keessan bahadhaa.' :
                   language === 'am' ? 'የሞባይል ባንኪንግ መተግበሪያዎን (CBE Birr / telebirr App) በመክፈት ይህንን ኪውአር ኮድ (QR Code) ስካን በማድረግ ክፍያውን በቀላሉ መፈጸም ይችላሉ።' :
                   'Launch your Commercial Bank (CBE Birr) or Ethio Telecom (telebirr) application on your smartphone, scan this dynamic QR code reader, enter your pledge value, and authenticate.'}
                </div>

                <button
                  type="button"
                  onClick={() => setShowQrModal(false)}
                  className="w-full bg-[#0b6b3a]/15 hover:bg-[#0b6b3a]/20 text-[#0B6B3A] font-extrabold text-xs py-3.5 rounded-xl uppercase tracking-widest transition cursor-pointer"
                >
                  {language === 'om' ? 'Cufi' : language === 'am' ? 'ዝጋ' : 'Close Helper'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offline USSD Step-by-Step Guideline Modal */}
      <AnimatePresence>
        {showUssdModal && (
          <motion.div 
            className="fixed inset-0 bg-[#06180e]/65 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full border border-emerald-100 shadow-xl relative text-left"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
            >
              <button 
                type="button"
                onClick={() => setShowUssdModal(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-emerald-950 hover:bg-emerald-50 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-[#0B6B3A]" />
                </div>
                
                <div>
                  <h4 className="text-sm font-black text-emerald-950 uppercase tracking-wider">
                    {formData.paymentMethod === 'cbe_birr' ? 'CBE Birr Offline USSD Direct Dial' : 'telebirr offline shortcode instruction'}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                    Easy Digital Tool for Offline Contributors
                  </p>
                </div>

                <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100 space-y-3">
                  {formData.paymentMethod === 'cbe_birr' ? (
                    <div className="space-y-2 text-xs text-slate-850 font-semibold">
                      <div className="flex gap-2 items-start">
                        <span className="font-mono bg-emerald-200 text-emerald-900 w-5 h-5 rounded-full flex items-center justify-center shrink-0">1</span>
                        <span>Dial <strong className="font-mono text-[#0B6B3A] bg-emerald-100/60 px-1.5 py-0.5 rounded">*889#</strong> on your phone</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="font-mono bg-emerald-200 text-emerald-900 w-5 h-5 rounded-full flex items-center justify-center shrink-0">2</span>
                        <span>Select option <strong className="text-[#0B6B3A]">3</strong> (Pay Merchant)</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="font-mono bg-emerald-200 text-emerald-900 w-5 h-5 rounded-full flex items-center justify-center shrink-0">3</span>
                        <span>Enter Merchant Code: <strong className="font-mono text-[#0B6B3A] bg-emerald-100/60 px-1.5 py-0.5 rounded">818290</strong></span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="font-mono bg-emerald-200 text-emerald-900 w-5 h-5 rounded-full flex items-center justify-center shrink-0">4</span>
                        <span>Enter your donation amount, confirm with your mobile banking PIN.</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 text-xs text-slate-850 font-semibold">
                      <div className="p-3 bg-white rounded-lg border border-emerald-100/60 space-y-1">
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">Direct Shortcode Dial</span>
                        <p className="font-mono text-emerald-800 leading-relaxed font-extrabold text-[11px] bg-emerald-50/60 p-1.5 rounded-lg border border-dashed border-emerald-200 break-all select-all">
                          *127*1*1*BG-992811*AMOUNT#
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">Step-By-Step Standard</span>
                        <div className="space-y-1.5 text-[11.5px] leading-relaxed text-slate-700 font-semibold">
                          <p className="flex gap-1.5 items-center"><span className="w-4 h-4 bg-emerald-100 text-[#0B6B3A] text-[10px] flex items-center justify-center rounded-full">1</span> Dial *127# on your mobile</p>
                          <p className="flex gap-1.5 items-center"><span className="w-4 h-4 bg-emerald-100 text-[#0B6B3A] text-[10px] flex items-center justify-center rounded-full">2</span> Choose Option 1 (Pay Merchant)</p>
                          <p className="flex gap-1.5 items-center"><span className="w-4 h-4 bg-emerald-100 text-[#0B6B3A] text-[10px] flex items-center justify-center rounded-full">3</span> Enter Merchant ID: <strong className="font-mono text-[#0B6B3A]">BG-992811</strong></p>
                          <p className="flex gap-1.5 items-center"><span className="w-4 h-4 bg-emerald-100 text-[#0B6B3A] text-[10px] flex items-center justify-center rounded-full">4</span> Type Amount and input telebirr account PIN.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-[10.5px] text-gray-400 font-bold leading-normal">
                  * All offline donations match immediately inside our administrative database after you type the Transaction reference code in Step 2.
                </div>

                <button
                  type="button"
                  onClick={() => setShowUssdModal(false)}
                  className="w-full bg-[#0b6b3a] text-white font-extrabold text-xs py-3.5 rounded-xl uppercase tracking-widest transition cursor-pointer"
                >
                  {language === 'om' ? 'Hubadheera' : language === 'am' ? 'ተረድቻለሁ' : 'Acknowledged'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
