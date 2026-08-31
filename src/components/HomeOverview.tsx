import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Calendar, ArrowRight, Sprout, Heart, Users, ShieldAlert, Award, 
  History, Workflow, Building, UserCheck, Shield, HelpCircle, CheckCircle, ArrowUpRight,
  Play, Youtube, CheckCircle2, X, Gift, Plus, Sparkles, DollarSign, Wallet,
  ShieldCheck, Landmark, FileText, Send, Copy, QrCode, RefreshCw, Smartphone, Coins, Check, Download, Loader2, Lock
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Language, ActiveTab, DonationCamp, Giver } from '../types';
import { translations } from '../translations';
import { mockNews, mockCampaigns } from '../data';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface HomeOverviewProps {
  language: Language;
  setActiveTab: (tab: ActiveTab) => void;
  aboutSubTab?: 'mission' | 'history' | 'structure' | 'management';
  setAboutSubTab?: (tab: 'mission' | 'history' | 'structure' | 'management') => void;
  campaigns?: DonationCamp[];
  onContribute?: (campaignId: string, amount: number, giverName: string, paymentMethod?: string) => void;
}

export default function HomeOverview({ language, setActiveTab, aboutSubTab, setAboutSubTab, campaigns, onContribute }: HomeOverviewProps) {
  const [localSubTab, setLocalSubTab] = useState<'mission' | 'history' | 'structure' | 'management'>('mission');
  const activeSubTab = aboutSubTab || localSubTab;
  const setActiveSubTab = setAboutSubTab || setLocalSubTab;

  const activeCampaigns = campaigns || mockCampaigns;

  // Interactive full contribution modal state for direct contribution from Active Relief Campaigns
  const [quickContribCamp, setQuickContribCamp] = useState<DonationCamp | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    amount: '1000',
    paymentMethod: 'cbe' as 'cbe' | 'sinqe' | 'cbe_birr' | 'telebirr' | 'paypal',
    isDiaspora: false,
    transactionId: '',
    receiptFile: null as File | null
  });
  const [paymentStep, setPaymentStep] = useState<'form' | 'verification' | 'submitting' | 'success'>('form');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [showUssdModal, setShowUssdModal] = useState<boolean>(false);
  const [qrModalPlatform, setQrModalPlatform] = useState<string>('telebirr');
  const [qrModalAmount, setQrModalAmount] = useState<string>('1000');
  const [contributionSuccess, setContributionSuccess] = useState<{ name: string; amount: number; campTitle: string; transactionId?: string } | null>(null);

  const handleCopyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(field);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Helper to generate dynamic QR payload
  const getDynamicQrPayload = (method: string, amountStr: string | number, campaignId: string) => {
    const numAmount = Number(amountStr) || 1000;
    const refCode = `BG-ADAMA-${campaignId.replace(/[^a-zA-Z0-9]/g, '').substring(0, 6).toUpperCase()}-${numAmount}`;
    
    switch (method) {
      case 'telebirr':
        return {
          platformName: 'telebirr Quick Pay',
          merchantId: 'BG-992811',
          accountName: 'Buusaa Gonofaa Oromiyaa',
          payload: `telebirr://pay?merchant=BG-992811&amount=${numAmount}&currency=ETB&ref=${refCode}&title=Buusaa%20Gonofaa%20Adamaa`,
          color: '#0284c7',
          bgColor: '#e0f2fe',
          badgeText: 'Ethio Telecom telebirr',
          ussdCode: `*127*1*1*BG-992811*${numAmount}#`
        };
      case 'cbe_birr':
      case 'cbe':
        return {
          platformName: 'CBE Birr Mobile',
          merchantId: '818290',
          accountName: 'Buusaa Gonofaa Adama',
          payload: `cbebirr://pay?merchant=818290&amount=${numAmount}&currency=ETB&ref=${refCode}&title=Buusaa%20Gonofaa%20Adamaa`,
          color: '#054823',
          bgColor: '#dcfce7',
          badgeText: 'Commercial Bank of Ethiopia',
          ussdCode: `*889# -> Merchant: 818290 -> ${numAmount} ETB`
        };
      case 'sinqe':
        return {
          platformName: 'Siinqee Pay (Baankii Siinqee)',
          merchantId: '1019283110293',
          accountName: 'Buusaa Gonofaa - Siinqee',
          payload: `sinqee://pay?account=1019283110293&amount=${numAmount}&currency=ETB&ref=${refCode}`,
          color: '#b45309',
          bgColor: '#fef3c7',
          badgeText: 'Siinqee Bank',
          ussdCode: `*869# -> Account: 1019283110293 -> ${numAmount} ETB`
        };
      case 'awash':
        return {
          platformName: 'Awash Birr',
          merchantId: '99281',
          accountName: 'Buusaa Gonofaa Adama',
          payload: `awashbirr://pay?merchant=99281&amount=${numAmount}&currency=ETB&ref=${refCode}`,
          color: '#7c3aed',
          bgColor: '#f3e8ff',
          badgeText: 'Awash Bank',
          ussdCode: `*901# -> Merchant: 99281 -> ${numAmount} ETB`
        };
      case 'boa':
        return {
          platformName: 'BOA Mobile (Abyssinia)',
          merchantId: '0029381',
          accountName: 'Buusaa Gonofaa Branch',
          payload: `boamobile://pay?merchant=0029381&amount=${numAmount}&currency=ETB&ref=${refCode}`,
          color: '#2563eb',
          bgColor: '#dbeafe',
          badgeText: 'Bank of Abyssinia',
          ussdCode: `*815# -> Merchant: 0029381 -> ${numAmount} ETB`
        };
      default:
        return {
          platformName: 'telebirr Quick Pay',
          merchantId: 'BG-992811',
          accountName: 'Buusaa Gonofaa Oromiyaa',
          payload: `telebirr://pay?merchant=BG-992811&amount=${numAmount}&currency=ETB&ref=${refCode}`,
          color: '#0284c7',
          bgColor: '#e0f2fe',
          badgeText: 'telebirr',
          ussdCode: `*127*1*1*BG-992811*${numAmount}#`
        };
    }
  };

  const downloadQrCode = () => {
    const svgElement = document.getElementById('home-dynamic-qr-code-svg');
    if (!svgElement) return;
    try {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width + 40;
        canvas.height = img.height + 40;
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 20, 20);
          const pngFile = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.download = `Buusaa_Gonofaa_QR_${qrModalPlatform}_${qrModalAmount}ETB.png`;
          downloadLink.href = pngFile;
          downloadLink.click();
        }
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    } catch (err) {
      console.error("Failed to download QR image", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isChecked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? isChecked : value 
    }));

    if (formErrors[name]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
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

    setFormErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setPaymentStep('verification');
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);
    if (!formData.transactionId.trim()) {
      setFormErrors({ transactionId: language === 'om' ? 'Koodii Dabarsaa (Transaction ID) galchuun dirqama' : language === 'am' ? 'እባክዎ የማስተላለፊያ መለያ ቁጥር (Transaction ID) ያስገቡ' : 'Please enter your Transaction Reference ID / Reference Number' });
      return;
    }

    if (!quickContribCamp) return;

    setFormErrors({});
    setPaymentStep('submitting');
    
    try {
      const numericAmount = Number(formData.amount) || 1000;
      await addDoc(collection(db, 'contributions'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        reason: formData.reason,
        amount: numericAmount,
        paymentMethod: formData.paymentMethod,
        isDiaspora: formData.isDiaspora,
        selectedCampaignId: quickContribCamp.id,
        transactionId: formData.transactionId,
        receiptFileName: formData.receiptFile ? formData.receiptFile.name : null,
        timestamp: serverTimestamp()
      });

      if (onContribute) {
        onContribute(
          quickContribCamp.id, 
          numericAmount, 
          formData.name,
          formData.paymentMethod
        );
      }

      setContributionSuccess({
        name: formData.name,
        amount: numericAmount,
        campTitle: quickContribCamp.title[language],
        transactionId: formData.transactionId
      });
      setPaymentStep('success');
    } catch (err) {
      console.error("Error saving contribution: ", err);
      setSubmissionError(
        language === 'om' 
          ? "Gumaacha keessan galmeessuun hin danda'amne. Maaloo irra deebi'aa yaalaa." 
          : language === 'am' 
            ? 'ያደረጉትን የድጋፍ መረጃ ለመመዝገብ አልተቻለም። እባክዎ እንደገና ይሞክሩ።' 
            : 'Unable to save contribution record. Please try again later.'
      );
      setPaymentStep('verification');
    }
  };

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

  // Bank accounts of Buusaa Gonofaa
  const bankDetails = {
    cbe: {
      bankName: "Commercial Bank of Ethiopia (CBE)",
      accName: "Buusaa Gonofaa Oromiyaa - Damee Adamaa",
      accNumber: "1000293102391",
      branch: "Adama Main Branch"
    },
    sinqe: {
      bankName: "Siinqee Bank (Baankii Siinqee)",
      accName: "Buusaa Gonofaa Oromiyaa - Damee Adamaa",
      accNumber: "1019283110293",
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
    { id: 'mission' as const, label: { om: "Ergama & Mul'ata", am: "ተልዕኮ እና ራዕይ", en: "Mission & Vision" }, icon: <Compass className="w-5.5 h-5.5" /> },
    { id: 'history' as const, label: { om: "Seenaa & Guddina", am: "ታሪካዊ ጉዞ", en: "History & Timeline" }, icon: <History className="w-5.5 h-5.5" /> },
    { id: 'structure' as const, label: { om: "Caasaa Bulchiinsaa", am: "የመዋቅር ገበታ", en: "Corporate Structure" }, icon: <Workflow className="w-5.5 h-5.5" /> },
    { id: 'management' as const, label: { om: "Qaama Hoggansaa", am: "የማኔጅመንት አካል", en: "Management & Team" }, icon: <UserCheck className="w-5.5 h-5.5" /> }
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
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 inline-block">
              {language === 'om' ? 'Wabii fi Seenaa Keenya' : language === 'am' ? 'ስለ ቅርሳችንና አስተዳደራችን' : 'Our Identity & Governance'}
            </span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-emerald-950 uppercase tracking-wider font-sans leading-tight">
              {aboutHeadings.title[language]}
            </h3>
            <p className="text-base md:text-lg lg:text-xl text-gray-650 font-semibold leading-relaxed">
              {aboutHeadings.subtitle[language]}
            </p>
          </div>

          {/* Sub Navigation Selectors */}
          <div className="flex flex-wrap justify-center gap-3 border-b border-emerald-100 pb-4">
            {subTabsList.map((tab) => {
              const isSelected = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl text-sm sm:text-base md:text-lg lg:text-xl font-black uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95 ${
                    isSelected 
                      ? 'bg-emerald-600 text-white shadow-md scale-105' 
                      : 'bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-950 border border-emerald-100'
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
                      <div className="bg-emerald-50/20 border border-emerald-100 p-8 rounded-2xl space-y-5 flex flex-col justify-between hover:border-emerald-300 hover:shadow-xs transition-all duration-300">
                        <div className="space-y-5">
                          <div className="w-14 h-14 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-md">
                            <Sprout className="w-7 h-7" />
                          </div>
                          <h4 className="text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-wider">
                            {language === 'om' ? 'Kaayyoo Buusaa Gonofaa Oromiyaa' : language === 'am' ? 'የቡሳ ጎኖፋ ዓላማ' : 'Our Objectives'}
                          </h4>
                          <div className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed space-y-4">
                            {language === 'om' ? (
                              <ul className="list-disc pl-5 space-y-3.5">
                                <li><strong>Duudhaa Cimsuu:</strong> Aadaa fi duudhaa walgargaarsa Ummata Oromoo jabeessee dagaagsuu.</li>
                                <li><strong>Dhaloota Of-Eeggannoo:</strong> Dhaloota jaalala hojii, aadaa qusannaa qabu fi quuqama namoomaa qabu uumuu.</li>
                                <li><strong>Gargaarsa Yeroo Balaa:</strong> Hawaasa balaa uumamaa ykn nam-tolcheen miidhame gargaaruu, fayyisuu fi dandamachiisuu.</li>
                              </ul>
                            ) : language === 'am' ? (
                              <ul className="list-disc pl-5 space-y-3.5">
                                <li><strong>እሴቶችን ማጠናከር፦</strong> የኦሮሞን ሕዝብ የመረዳዳትና የመደጋገፍ በጎ ታሪካዊ ባህል ይበልጥ ማጠናከርና ማስፋፋት።</li>
                                <li><strong>ስራ-ወዳድ ትውልድ፦</strong> ስራን፣ ቁጠባንና ሰብአዊ ርህራሄን የተላበሰ ንቁ የህብረተሰብ ትውልድ መፍጠር።</li>
                                <li><strong>የአደጋ ጊዜ ዕርዳታ፦</strong> በተፈጥሮ ወይም በሰው ሰራሽ አደጋዎች የተጎዱ ወገኖችን መርዳት፣ ማዳንና መልሶ ማቋቋም።</li>
                              </ul>
                            ) : (
                              <ul className="list-disc pl-5 space-y-3.5">
                                <li><strong>Reinforcing Cultural Values:</strong> To strengthen and promote the culture and values of mutual aid among the Oromo people.</li>
                                <li><strong>Prudent Generation:</strong> To cultivate a generation that values labor, possesses a strong savings culture, and harbors human empathy.</li>
                                <li><strong>Disaster Response:</strong> To assist, rescue, and rehabilitate communities affected by natural or man-made disasters.</li>
                              </ul>
                            )}
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-emerald-100">
                          <span className="text-sm font-extrabold text-emerald-700 block uppercase tracking-widest">
                            {language === 'om' ? 'Labsii fi Qajeelfama Gargaarsaa' : 'Statutory Assistance Guidelines'}
                          </span>
                        </div>
                      </div>

                      {/* Vision Card */}
                      <div className="bg-amber-50/25 border border-amber-200 p-8 rounded-2xl space-y-5 flex flex-col justify-between hover:border-amber-300 hover:shadow-md transition-all duration-300">
                        <div className="space-y-5">
                          <div className="w-14 h-14 bg-amber-600 text-white rounded-xl flex items-center justify-center shadow-md">
                            <Compass className="w-7 h-7" />
                          </div>
                          <h4 className="text-xl md:text-2xl font-black text-amber-950 uppercase tracking-wider">
                            {language === 'om' ? 'Mul\'ata Buusaa Gonofaa Oromiyaa' : language === 'am' ? 'የቡሳ ጎኖፋ ራዕይ' : 'Our Vision'}
                          </h4>
                          <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed">
                            {language === 'om' ? (
                              "Milkaa'ina sirna liqii fi qusannoo naannoo Oromiyaatti mirkaneessuun, hawaasa hiyyummaarraa walaba ta'e, of-danda'ee fi dinagdeen jabaate uumuu dha."
                            ) : language === 'am' ? (
                              "የፋይናንስና የቁጠባ ተደራሽነትን በማረጋገጥ፣ ከድህነት ነጻ የሆነ፣ ራሱን የቻለና በኢኮኖሚ የጎለበተ ማህበረሰብ በኦሮሚያ ክልል መፍጠር ነው።"
                            ) : (
                              "To secure a successful microfinance and saving ecosystem in Oromia, fostering a poverty-free, self-reliant, and economically resilient society."
                            )}
                          </p>
                        </div>
                        
                        <div className="pt-4 border-t border-amber-100">
                          <span className="text-sm font-extrabold text-amber-700 block uppercase tracking-widest">
                            {language === 'om' ? 'Mul\'ata Guddina Hawaasaa' : 'Social Progress Vision'}
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
                      <h4 className="text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-widest flex items-center gap-2">
                        <History className="w-6 h-6 text-emerald-600" />
                        <span>{language === 'om' ? 'Seenaa Buusaa Gonofaa' : language === 'am' ? 'የቡሳ ጎኖፋ ታሪካዊ አመጣጥ' : 'History of Buusaa Gonofaa'}</span>
                      </h4>
                      <p className="text-sm sm:text-base text-gray-500 font-bold uppercase mt-1">
                        {language === 'om' ? 'Maalummaa duudhaa fi aadaa walgargaarsa Oromoo' : 'Indigenous Oromo mutual aid traditions and chronological timeline'}
                      </p>
                    </div>

                    <div className="p-8 bg-emerald-50/20 border border-emerald-100 rounded-2xl">
                      <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed">
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
                        <div className="space-y-1.5">
                          <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-widest">
                            {language === 'om' ? 'Bara 1999 - Hundeeffama' : '1999 - Founded'}
                          </span>
                          <h5 className="text-lg sm:text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-tight">
                            {language === 'om' ? 'Hundeeffama Jalqabaa HUNDEE NGO dhaan' : 'Established by Ethiopian NGO Hundee'}
                          </h5>
                          <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed max-w-4xl">
                            {language === 'om' ? "Buusaa Gonofaa NGO biyya keessaa 'Hundee' jedhamuun hundeeffamee tajaajila liqii dhiyeessuu jalqabe. Hundeeffamni isaa aadaa fi wal-gargaarsa miidhamtootaa 'Buusaa Gonofaa' Oromoo irratti hundaa'e." :
                             language === 'am' ? "የአትዮጵያ መንግስታዊ ያልሆነ ድርጅት ሁንዴ (Hundee) በኦሮሚያ ክልል የብድር ፕሮግራሞችን ለማስተዳደር በ1999 ዓ.ም የጀመረው ባህላዊ የቡሳ ጎኖፋ ማህበራዊ ጥበቃን መሠረት በማድረግ ነው።" :
                             "Buusaa Gonofaa was established by the Ethiopian NGO Hundee to manage credit programs in the Oromia region, drawing inspiration from the indigenous Buusaa Gonofaa social protection mechanism."}
                          </p>
                        </div>
                      </div>

                      {/* milestone 2 */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-xs" />
                        <div className="space-y-1.5">
                          <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-widest">
                            {language === 'om' ? 'Babal\'ina fi Guddina' : 'Early Growth'}
                          </span>
                          <h5 className="text-lg sm:text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-tight">
                            {language === 'om' ? 'Babal\'ina Gara Baadiyyaa fi Magaalaa' : 'Reach Expansion & Diverse Products'}
                          </h5>
                          <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed max-w-4xl">
                            {language === 'om' ? "Dhaabbatichi dafnaan tajaajila isaa guutuu Oromiyaa keessatti babal'ise; meeshaalee faayinaansii qonnatotaaf, dubartoota gurmaa'aniif, fi maatii galii dadhaboo ta'aniif kan mijeessan kalaqe." :
                             language === 'am' ? "ተቋሙ በኦሮሚያ የገጠርና የከተማ አካባቢዎች ተደራሽነቱን በማስፋት ለአነስተኛ አርሶ አደሮች፣ ለሴት ስራ ፈጣሪዎች እና ዝቅተኛ ገቢ ላላቸው አባላት የተበጁ ልዩ ልዩ የፋይናንስ ምርቶችን አስተዋውቋል።" :
                             "The institution expanded its reach across rural and urban areas of Oromia, introducing diverse financial products tailored to the needs of smallholder farmers, women entrepreneurs, and low-income households."}
                          </p>
                        </div>
                      </div>

                      {/* milestone 3 */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-xs" />
                        <div className="space-y-1.5">
                          <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-widest">
                            {language === 'om' ? 'Bara 2010 - Kalaqa Wabii' : '2010 - Weather Insurance'}
                          </span>
                          <h5 className="text-lg sm:text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-tight">
                            {language === 'om' ? 'Inshuraansii Roobaa Jalqabsiisuu' : 'Rainfall-Based Crop Insurance Pioneered'}
                          </h5>
                          <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed max-w-4xl">
                            {language === 'om' ? "Bara 2010 keessa, Buusaa Gonofaa inshuraansii oomisha qonnaa balaa roobaa irratti hundaa'e EFPRI waliin mijeessuun Adamaa, Baako, fi Shashemene keessatti jalqabe." :
                             language === 'am' ? "በ2010 ዓ.ም ቡሳ ጎኖፋ በኢትዮጵያ ለመጀመሪያ ጊዜ በዝናብ ጠብታ መለኪያ ላይ የተመሰረተ የሰብል ዋስትና በAdama፣ Bako እና Shashamane ከአለም አቀፍ ድርጅት (EFPRI) ጋር በመተባበር ፈጠራን አስመዝግቧል።" :
                             "In 2010, Buusaa Gonofaa pioneered rainfall-based crop insurance in collaboration with IFPRI/EFPRI, first introducing the product in Adama, Bako, and Shashamane."}
                          </p>
                        </div>
                      </div>

                      {/* milestone 4 */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-xs" />
                        <div className="space-y-1.5">
                          <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-widest">
                            {language === 'om' ? 'Bara 2020 - Beekamtii' : '2020 - European Award Finalist'}
                          </span>
                          <h5 className="text-lg sm:text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-tight">
                            {language === 'om' ? 'Leenjii fi Gudiina Dinagdee Addunyaa' : 'Finalist: European Microfinance Award 2020'}
                          </h5>
                          <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed max-w-4xl">
                            {language === 'om' ? "Dhaabbatichi gumaacha gamtaa qusannoo ijaaruu fi maatiilee dadhaboo tajaajiluuf hojjeteef 'European Microfinance Award 2020' irratti finalist ta'uun addunyaatti adda bahe." :
                             language === 'am' ? "ተቋሙ እ.እ.አ. በ2020 የቁጠባ አሰባሰብ እና ተጋላጭ የሆኑ የህብረተሰብ ክፍሎችን በመደገፍ ላሳየው ልዩ ስራ ለታዋቂው የአውሮፓ ማይክሮ ፋይናንስ ሽልማት (European Microfinance Award) የመጨረሻ እጩ ተወዳዳሪ ሆኖ እውቅና አግኝቷል።" :
                             "The institution was recognized as a finalist for the European Microfinance Award 2020 for its exceptional work in mobilizing savings and serving vulnerable populations."}
                          </p>
                        </div>
                      </div>

                      {/* milestone 5 */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-xs" />
                        <div className="space-y-1.5">
                          <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-105 text-[#054823] font-mono text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-widest">
                            {language === 'om' ? "Har'a - Guddina Guutuu" : 'Today - Robust Standing'}
                          </span>
                          <h5 className="text-lg sm:text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-tight">
                            {language === 'om' ? 'Miseensota Kuma 110 fi Damee Adamaa' : '110,000+ Active Savers Regionwide'}
                          </h5>
                          <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed max-w-4xl">
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
                      <h4 className="text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-widest flex items-center gap-2">
                        <Workflow className="w-6 h-6 text-emerald-600" />
                        <span>{language === 'om' ? 'Caasaa Hojii' : 'Organizational Governance Structure'}</span>
                      </h4>
                      <p className="text-sm sm:text-base text-gray-500 font-bold uppercase mt-1">
                        {language === 'om' ? 'Odeeffannoo hoggansa waajjira damee Adaamaa' : 'Accountable chains rendering professional community support'}
                      </p>
                    </div>

                    <div className="p-8 bg-emerald-50/20 border border-emerald-100 rounded-2xl">
                      <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed">
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
                      <div className="p-8 rounded-2xl bg-emerald-50/30 border border-emerald-100/80 space-y-6">
                        <h5 className="text-base sm:text-lg md:text-xl font-black text-[#054823] uppercase tracking-wider border-b border-emerald-100 pb-3 flex items-center gap-2">
                          <Building className="w-5 h-5" />
                          <span>{language === 'om' ? "Caasaa Gurguddoo Gurmaa'insa Keessaa" : language === 'am' ? 'ዋና የውስጥ መዋቅር' : 'Core Internal Structure'}</span>
                        </h5>
                        <ul className="space-y-4 text-sm sm:text-base text-slate-850 font-semibold leading-relaxed text-slate-800">
                          <li>
                            <strong className="text-emerald-950 block font-bold text-xs sm:text-sm uppercase tracking-wide">
                              {language === 'om' ? '1. Koreewwan Daayirektarootaa' : '1. Board of Directors / Central Committee'}
                            </strong>
                            {language === 'om' ? 'Sadarkaa naannoo gubbaatti dhimmoota tarsiimoo fi murteewwan gurguddoo deeggarsaa ni murteessu.' : 'Provides strategic oversight and critical resource allocation decisions at the highest level.'}
                          </li>
                          <li>
                            <strong className="text-emerald-950 block font-bold text-xs sm:text-sm uppercase tracking-wide">
                              {language === 'om' ? '2. Hoogganaa Buusaa Gonofaa' : '2. General Leader / Managing Director'}
                            </strong>
                            {language === 'om' ? 'Karoora hojii, baajata waggaa gopheessuu fi hoggansa olaanaa manneen hojichaa ni hordofa.' : 'Directs operational targets, formulates annual budgets, and oversees regional progress.'}
                          </li>
                          <li>
                            <strong className="text-emerald-950 block font-bold text-xs sm:text-sm uppercase tracking-wide">
                              {language === 'om' ? '3. Waajjiraalee Sadarkaan Jiran' : '3. Regional & Zonal Office Networks'}
                            </strong>
                            {language === 'om' ? 'Caasaan kun irra jireessan sadarkaa Naannoo, Godinaa fi Aanaa (amma tokko tokkos ganda) irratti diriirfamee jira.' : 'Decentralized layout branching from Regional HQ to Zonal, Woreda, and Kebele support units.'}
                          </li>
                          <li>
                            <strong className="text-emerald-950 block font-bold text-xs sm:text-sm uppercase tracking-wide">
                              {language === 'om' ? '4. Miseensota fi Gurmaa\'insa Hojjettootaa' : '4. Employee & Member Mobilization'}
                            </strong>
                            {language === 'om' ? 'Hojjettoonni manneen hojii mootummaa naannichaa keessa jiran ijaarama kanaan walitti qabamuun ni hirmaatu.' : 'Engaging public and community stakeholders to organize active village committees and savings associations.'}
                          </li>
                        </ul>
                      </div>

                      {/* Quadrant 2: Bulchiinsa Fandii */}
                      <div className="p-8 rounded-2xl bg-emerald-950 text-white space-y-6 shadow-xl">
                        <h5 className="text-base sm:text-lg md:text-xl font-black text-emerald-300 uppercase tracking-wider border-b border-emerald-800 pb-3 flex items-center gap-2">
                          <Shield className="w-5 h-5" />
                          <span>{language === 'om' ? 'Xiyyeeffannoo Bulchiinsaa' : language === 'am' ? 'የበጀትና የድጋፍ ትኩረት' : 'Administrative Mandates'}</span>
                        </h5>
                        <ul className="space-y-5 text-sm sm:text-base text-emerald-100 font-semibold leading-relaxed">
                          <li>
                            <strong className="text-white block font-bold text-xs sm:text-sm uppercase tracking-wide">
                              {language === 'om' ? 'Bulchiinsa Fandii' : 'Fund Administration'}
                            </strong>
                            {language === 'om' ? 'Fandiin sassaabamu akkaataa Qajeelfama Buusaa Gonofaa irratti ibsametti, itti gaafatamaa waajjira maallaqaa fi bulchiinsa Buusaa Gonofaa qofaan socho\'a.' : 'All collected public or institutional funds are administered and disbursed in strict compliance with the statutory Buusaa Gonofaa Guidelines.'}
                          </li>
                          <li>
                            <strong className="text-white block font-bold text-xs sm:text-sm uppercase tracking-wide">
                              {language === 'om' ? 'Gaaddisa Buusaa Gonofaa' : 'Gaaddisa Support Shelters'}
                            </strong>
                            {language === 'om' ? 'Sadarkaa naannootiin dhimma tajaajila bishaanii, midhaan gargaarsaa fi wantoota hatattamaa deeggaruuf dhimma raawwatu dha.' : 'Handles the emergency dispatch of clean water, relief grains, and relief supplies at the regional scale.'}
                          </li>
                        </ul>
                      </div>


                      {/* Quadrant 3 */}
                      <div className="p-8 rounded-2xl bg-emerald-50/30 border border-emerald-100/80 space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs">
                          <UserCheck className="w-6 h-6" />
                        </div>
                        <h5 className="text-base sm:text-lg md:text-xl font-black text-emerald-950 uppercase tracking-wider">
                          {language === 'om' ? 'Hojii Damee Adamaa' : language === 'am' ? 'የቅርንጫፍ ስራዎች' : 'Branch Operations'}
                        </h5>
                        <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">
                          {language === 'om' ? "Dameen keenya Adamaa hawaasa naannoo gargaarsa dhuunfaa bilisa ta'ee fi hordoffi faayinaansii gaariin hojjetoota dedicated ta'aniin kenna." :
                           language === 'am' ? "የአዳማ ቅርንጫፍ የወሰኑ ሰራተኞችን በመመደብ ግላዊ አገልግሎት እና የፋይናንስ መመሪያዎችን ለአካባቢው ማህበረሰብ ያቀርባል።" :
                           "The Adama branch serves the local community with dedicated staff providing personalized service and financial guidance."}
                        </p>
                      </div>

                      {/* Quadrant 4 */}
                      <div className="p-8 rounded-2xl bg-emerald-50/30 border border-emerald-100/80 space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs">
                          <Shield className="w-6 h-6" />
                        </div>
                        <h5 className="text-base sm:text-lg md:text-xl font-black text-emerald-950 uppercase tracking-wider">
                          {language === 'om' ? 'Gareewwan Deggartootaa' : language === 'am' ? 'የድጋፍ ሰጪ ክፍሎች' : 'Support Functions'}
                        </h5>
                        <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">
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
                      <h4 className="text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-widest flex items-center gap-2">
                        <UserCheck className="w-6 h-6 text-emerald-600" />
                        <span>{language === 'om' ? 'Qaama Hoggansaa fi Bulchiinsaa' : 'Management Bodies & Leadership'}</span>
                      </h4>
                      <p className="text-sm sm:text-base text-gray-500 font-bold uppercase mt-1">
                        {language === 'om' ? 'Hoggantoota muuxannoo qaban damee qusannootiin' : 'Accomplished professionals managing grassroots microfinance channels'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left: statements */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="p-8 bg-emerald-50/20 border border-emerald-100/50 rounded-2xl space-y-6">
                          <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed">
                            {language === 'om' ? (
                              "Hoggansi keenya ogeessota dhuunfaa muuxannoo dheeraa maayicroofayinaansii, misooma hawaasummaa, fi tajaajila faayinaansii qaban irraa ijaarame. Yaadi adda addaa fi kutannoon isaanii ergama keenya guddisuuf furtuudha."
                            ) : language === 'am' ? (
                              "የአመራር አካላት በደረጃ ማይክሮ ፋይናንስ፣ በማህበረሰብ ልማት እና በፋይናንስ አገልግሎት ጥልቅ እውቀት ያላቸው ልምድ ያላቸው ባለሙያዎችን ያቀፈ ነው። ተልእኮአችንን ለማራመድ የተለያዩ አመለካከቶችን እና ቁርጠኝነትን ያመጣሉ።"
                            ) : (
                              "Our management bodies are composed of experienced professionals with deep expertise in microfinance, community development, and financial services. They bring diverse perspectives and commitment to advancing our mission."
                            )}
                          </p>

                          <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed">
                            {language === 'om' ? (
                              "Dameen Adamaa hoggantoota damee, ofisara liqii fi deggartoota miseensota keenyaa kallattiin gargaaranii fi furmaata mijeessaniin durfama."
                            ) : language === 'am' ? (
                              "የአዳማ ቅርንጫፍ የማህበረሰቡን የፋይናንስ ፍላጎት ለመረዳት እና ተስማሚ መፍትሄዎችን ለመስጠት በቀጥታ ከህብረተሰቡ ጋር በሚሰሩ ቅርንጫፍ ስራ አስኪያጆች፣ የብድር መኮንኖች እና የደንበኞች አገልግሎት ተወካዮች ይመራል።"
                            ) : (
                              "The Adama branch is led by a dedicated team of branch managers, loan officers, and customer service representatives who work directly with community members to understand their financial needs and provide tailored solutions."
                            )}
                          </p>
                        </div>

                        <div className="p-8 border border-emerald-100/70 bg-emerald-50/10 rounded-2xl">
                          <h5 className="text-base sm:text-lg md:text-xl font-black text-emerald-950 uppercase tracking-wider mb-2">
                            {language === 'om' ? 'Oddeeffannoo Dabalataa' : language === 'am' ? 'ቢሮአችንን ያግኙ' : 'Administrative Transparency'}
                          </h5>
                          <p className="text-sm sm:text-base text-gray-700 font-semibold leading-relaxed">
                            {language === 'om' ? "Waa'ee hoggantoota keenyaa dabalataan argachuuf, desk kora Adamaa keenya kallattiin quunnamuu dandeessu." :
                             language === 'am' ? "ስለ ወቅታዊ አመራራችን እና የአስተዳደር መዋቅራችን ዝርዝር መረጃ ለማግኘት እባክዎን የአዳማ ቅርንጫፍን በቀጥታ ያነጋግሩ።" :
                             "For detailed information about our current leadership, curriculum vitae, and management structure, please contact our Adama branch administrative desk directly."}
                          </p>
                        </div>
                      </div>

                      {/* Right: Contact Call-Out card */}
                      <div className="bg-emerald-950 text-white rounded-2xl p-8 flex flex-col justify-between shadow-xl border border-emerald-900 space-y-6">
                        <div className="space-y-4">
                          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-emerald-300">
                            <Users className="w-6 h-6" />
                          </div>
                          
                          <h4 className="text-base sm:text-lg md:text-xl font-black uppercase tracking-wider text-emerald-300">
                            {language === 'om' ? 'Damee Adamaa Quunnamtuu' : 'Get in Touch Directly'}
                          </h4>

                          <p className="text-xs sm:text-sm text-emerald-100 font-semibold leading-relaxed">
                            {language === 'om' ? 'Dameen keenya gargaarsa dhuunfaa akkasumas marii hoggansaa bilisaan mijeessa. Nu quunnamaa.' :
                             'Connect directly with our local managers at Adama Central Post Office Area or submit a direct enquiry.'}
                          </p>

                          <div className="border-t border-emerald-850 pt-4 mt-3 text-xs sm:text-sm space-y-2.5 text-emerald-200 font-semibold font-sans">
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
                                 'P.O. Box: 20118, Adama (HQ)'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setActiveTab('contact')}
                          className="w-full text-center bg-white hover:bg-emerald-50 text-emerald-800 hover:text-emerald-950 font-extrabold text-xs sm:text-sm py-3.5 rounded-xl transition-all uppercase tracking-wider mt-6 inline-flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          <span>{language === 'om' ? 'Quunnamtii Amma' : 'Navigate to Contact'}</span>
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
          {activeCampaigns.map((camp) => {
            const progress = getCampaignProgress(camp.raisedAmount, camp.goalAmount);

            return (
              <div 
                key={camp.id}
                className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 space-y-6 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                id={`urgent-camp-card-${camp.id}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-extrabold text-[#054823] bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full uppercase tracking-widest">
                      {camp.badge[language]}
                    </span>
                    <span className="text-xs font-bold text-[#054823] uppercase tracking-widest flex items-center gap-1.5 bg-emerald-50/80 px-3 py-1 rounded-full border border-emerald-100/60">
                      <Heart className="w-4 h-4 fill-current text-red-500" />
                      <span>{camp.contributorsCount} {language === 'om' ? 'Arjoomtota (Givers)' : language === 'am' ? 'ለጋሾች' : 'Givers'}</span>
                    </span>
                  </div>

                  <h4 className="text-xl md:text-2xl font-black text-emerald-950 font-sans tracking-tight leading-snug">
                    {camp.title[language]}
                  </h4>

                  <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
                    {camp.description[language]}
                  </p>
                </div>

                <div className="space-y-5 pt-4 border-t border-emerald-50">
                  
                  {/* Highlighted Progress Bar & Percent Metric */}
                  <div className="space-y-2 bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100/80">
                    <div className="flex justify-between items-center text-xs sm:text-sm font-extrabold uppercase">
                      <span className="text-emerald-950 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>{language === 'om' ? 'Baha Gumaachaa (%)' : language === 'am' ? 'የተሰበሰበ መጠን (%)' : 'Progress Raised'}</span>
                      </span>
                      <span className="text-emerald-700 font-mono font-black text-base sm:text-lg bg-emerald-100 px-2.5 py-0.5 rounded-md">
                        {progress}%
                      </span>
                    </div>

                    <div className="w-full h-3.5 bg-gray-200/80 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-emerald-600 to-emerald-500 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {/* Birr Raised vs Goal Display */}
                    <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-extrabold border-t border-emerald-100/60 mt-2">
                      <div>
                        <span className="block text-[10px] text-gray-400 uppercase tracking-wider">{language === 'om' ? 'Kan Funaaname (Birr)' : 'Raised Amount'}</span>
                        <span className="text-emerald-800 font-mono font-black text-sm sm:text-base">{formatBirr(camp.raisedAmount)}</span>
                      </div>
                      
                      <div className="text-right">
                        <span className="block text-[10px] text-gray-400 uppercase tracking-wider">{language === 'om' ? 'Galma (Birr)' : 'Target Goal'}</span>
                        <span className="text-gray-700 font-mono font-bold text-sm sm:text-base">{formatBirr(camp.goalAmount)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar: Quick Contribute & View Portal */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <button
                      onClick={() => {
                        setQuickContribCamp(camp);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          reason: '',
                          amount: '1000',
                          paymentMethod: 'cbe',
                          isDiaspora: false,
                          transactionId: '',
                          receiptFile: null
                        });
                        setPaymentStep('form');
                        setFormErrors({});
                        setSubmissionError(null);
                      }}
                      className="w-full text-center bg-[#054823] hover:bg-[#022b14] text-white font-black text-xs py-3.5 rounded-xl transition shadow-sm active:scale-95 uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{language === 'om' ? 'Gumaacha Kee Add' : language === 'am' ? 'አሁን ይለግሱ' : 'Contribute Now'}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('contribution')}
                      className="w-full text-center bg-emerald-50 hover:bg-emerald-100 text-[#054823] border border-emerald-200 font-bold text-xs py-3.5 rounded-xl transition active:scale-95 uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>{language === 'om' ? 'Poortaalii Guutuu' : language === 'am' ? 'ሙሉ ፖርታል' : 'Full Portal'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Full Comprehensive Contribution Modal on Home Page for Active Campaigns */}
        <AnimatePresence>
          {quickContribCamp && (
            <motion.div 
              className="fixed inset-0 bg-[#06180e]/75 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-white rounded-3xl max-w-3xl w-full border border-emerald-100 shadow-2xl relative text-left my-auto max-h-[92vh] flex flex-col overflow-hidden"
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
              >
                {/* Modal Header */}
                <div className="p-5 sm:p-6 bg-gradient-to-r from-[#054823] to-[#0a6c37] text-white flex items-start justify-between gap-4 shrink-0">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 text-emerald-100 px-2.5 py-0.5 rounded-full">
                        {quickContribCamp.badge[language]}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-emerald-950 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {language === 'om' ? 'Duula Gumaachaa' : language === 'am' ? 'የዕርዳታ ዘመቻ' : 'Relief Campaign'}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-xl font-black tracking-tight text-white line-clamp-1">
                      {quickContribCamp.title[language]}
                    </h3>
                    <p className="text-xs text-emerald-100/90 font-medium line-clamp-2 max-w-2xl">
                      {quickContribCamp.description[language]}
                    </p>
                  </div>

                  <button 
                    type="button"
                    onClick={() => setQuickContribCamp(null)}
                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress bar in header */}
                <div className="bg-emerald-50 px-5 sm:px-6 py-3 border-b border-emerald-100 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-bold block">{language === 'om' ? 'Kan Funaaname' : 'Raised'}</span>
                      <span className="font-mono font-black text-[#054823]">{formatBirr(quickContribCamp.raisedAmount)}</span>
                    </div>
                    <div className="h-6 w-px bg-emerald-200" />
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-bold block">{language === 'om' ? 'Galma' : 'Target Goal'}</span>
                      <span className="font-mono font-bold text-gray-700">{formatBirr(quickContribCamp.goalAmount)}</span>
                    </div>
                    <div className="h-6 w-px bg-emerald-200" />
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-bold block">{language === 'om' ? 'Arjoomtota' : 'Givers'}</span>
                      <span className="font-mono font-bold text-emerald-800">{quickContribCamp.donorsCount || 0}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-xs text-[#054823]">
                      {getCampaignProgress(quickContribCamp.raisedAmount, quickContribCamp.goalAmount)}%
                    </span>
                    <div className="w-24 sm:w-32 h-2.5 bg-emerald-200/70 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#054823] h-full rounded-full transition-all"
                        style={{ width: `${getCampaignProgress(quickContribCamp.raisedAmount, quickContribCamp.goalAmount)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Scrollable Body */}
                <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
                  
                  {/* Step Indicators */}
                  <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                        paymentStep === 'form' ? 'bg-[#054823] text-white' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        1
                      </div>
                      <span className="text-xs font-extrabold text-emerald-950">
                        {language === 'om' ? 'Oduu Gumaachaa' : language === 'am' ? 'የለጋሽ መረጃ' : 'Donor Information'}
                      </span>
                    </div>

                    <div className="w-8 h-px bg-emerald-200" />

                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                        paymentStep === 'verification' || paymentStep === 'submitting' ? 'bg-[#054823] text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        2
                      </div>
                      <span className="text-xs font-extrabold text-emerald-950">
                        {language === 'om' ? 'Mirkaneessa Kaffaltii' : language === 'am' ? 'የክፍያ ማረጋገጫ' : 'Verification & Proof'}
                      </span>
                    </div>

                    <div className="w-8 h-px bg-emerald-200" />

                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                        paymentStep === 'success' ? 'bg-[#054823] text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        3
                      </div>
                      <span className="text-xs font-extrabold text-emerald-950">
                        {language === 'om' ? 'Xumura' : language === 'am' ? 'ማጠቃለያ' : 'Complete'}
                      </span>
                    </div>
                  </div>

                  {/* STEP 1: Full Information Form */}
                  {paymentStep === 'form' && (
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      
                      {/* Dynamic QR and USSD Action Banner */}
                      <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#054823] text-emerald-200 flex items-center justify-center shrink-0">
                            <QrCode className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="text-xs font-black text-emerald-950">
                              {language === 'om' ? 'Kaffaltii QR Koodii & USSD Saffisaa' : language === 'am' ? 'ፈጣን የኪውአር (QR) እና የUSSD ክፍያ' : 'Instant Dynamic QR & USSD Dial'}
                            </h5>
                            <p className="text-[11px] text-gray-500 font-medium">
                              telebirr • CBE Birr • Siinqee Pay • Awash • BOA
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setQrModalAmount(formData.amount || '1000');
                              setQrModalPlatform(formData.paymentMethod === 'paypal' ? 'telebirr' : formData.paymentMethod);
                              setShowQrModal(true);
                            }}
                            className="px-3.5 py-2 bg-[#054823] hover:bg-[#022b14] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                            <span>{language === 'om' ? 'QR Saajjali' : language === 'am' ? 'QR ኮድ' : 'Dynamic QR'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setShowUssdModal(true)}
                            className="px-3.5 py-2 bg-emerald-100 hover:bg-emerald-200 text-[#054823] text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                          >
                            <Smartphone className="w-3.5 h-3.5" />
                            <span>{language === 'om' ? 'USSD Koodii' : language === 'am' ? 'USSD መደወያ' : 'USSD Codes'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Name Field */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                          {language === 'om' ? 'Maqaa Gumaachaa / Sponsor' : language === 'am' ? 'የለጋሽ/ስፖንሰር ሙሉ ስም' : 'Sponsor / Contributor Name'} *
                        </label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-emerald-100 focus:outline-none focus:ring-3 focus:ring-emerald-400/20 focus:border-emerald-500 bg-white transition-all"
                          placeholder={language === 'om' ? 'Fkn: Tolasaa Guutamaa' : language === 'am' ? 'ምሳሌ፡ ቶሎሳ ጉተማ' : 'e.g. Tolasa Gutama'}
                        />
                        {formErrors.name && <p className="text-[10px] text-red-500 font-bold">{formErrors.name}</p>}
                      </div>

                      {/* Phone & Email Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                            {translations.contribFormPhone[language]} *
                          </label>
                          <input 
                            type="text" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-emerald-100 focus:outline-none focus:ring-3 focus:ring-emerald-400/20 focus:border-emerald-500 bg-white transition-all"
                            placeholder="+251 911 234 567"
                          />
                          {formErrors.phone && <p className="text-[10px] text-red-500 font-bold">{formErrors.phone}</p>}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                            {translations.contribFormEmail[language]} *
                          </label>
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-emerald-100 focus:outline-none focus:ring-3 focus:ring-emerald-400/20 focus:border-emerald-500 bg-white transition-all"
                            placeholder="sponsor@example.com"
                          />
                          {formErrors.email && <p className="text-[10px] text-red-500 font-bold">{formErrors.email}</p>}
                        </div>
                      </div>

                      {/* Contribution Amount & Presets */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                            {language === 'om' ? 'Hamma Gumaacha Kee (ETB)' : language === 'am' ? 'የድጋፍ መጠን በብር (ETB)' : 'Pledge Amount (ETB)'} *
                          </label>
                          <span className="text-[11px] font-mono font-black text-[#054823] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                            {Number(formData.amount || 0).toLocaleString()} ETB
                          </span>
                        </div>
                        
                        <div className="relative">
                          <input 
                            type="number" 
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            min="10"
                            step="50"
                            className="w-full text-sm font-extrabold px-4 py-3 pl-10 rounded-xl border border-emerald-100 focus:outline-none focus:ring-3 focus:ring-emerald-400/20 focus:border-emerald-500 bg-white transition-all"
                            placeholder="1000"
                          />
                          <Coins className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>

                        {/* Amount Quick Presets */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {['250', '500', '1000', '2500', '5000', '10000'].map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, amount: preset }))}
                              className={`text-[10.5px] font-extrabold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                                formData.amount === preset
                                  ? 'bg-[#054823] text-white border-[#054823] shadow-xs'
                                  : 'bg-white text-emerald-900 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50'
                              }`}
                            >
                              +{Number(preset).toLocaleString()} ETB
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Reason for Funding */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                          {language === 'om' ? 'Sababa/Kaayyoo Gumaacha Kee' : language === 'am' ? 'ድጋፍ የሚያደርጉበት ዓላማ / መነሻ ምክንያት' : 'What is your purpose or reason for funding?'} *
                        </label>
                        <textarea 
                          name="reason"
                          rows={2}
                          value={formData.reason}
                          onChange={handleInputChange}
                          className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-emerald-100 focus:outline-none focus:ring-3 focus:ring-emerald-400/20 focus:border-emerald-500 bg-white transition-all"
                          placeholder={language === 'om' ? 'Fkn: Lammiilee balaan lolaa qaqqabeef deeggarsa namoomaa dhiyeessuuf' : language === 'am' ? 'ምሳሌ፡ በጎርፍ አደጋ ለተጎዱ ወገኖች የሰብአዊ ድጋፍ ለማበርከት' : 'e.g. Humanitarian relief support for vulnerable communities'}
                        />
                        {formErrors.reason && <p className="text-[10px] text-red-500 font-bold">{formErrors.reason}</p>}
                      </div>

                      {/* Diaspora Checkbox */}
                      <div className="p-3 bg-emerald-50 rounded-xl flex items-center gap-3 border border-emerald-100">
                        <input 
                          type="checkbox"
                          name="isDiaspora"
                          id="homeIsDiaspora"
                          checked={formData.isDiaspora}
                          onChange={(e) => {
                            setFormData(prev => ({ 
                              ...prev, 
                              isDiaspora: e.target.checked,
                              paymentMethod: e.target.checked ? 'paypal' : 'cbe' 
                            }));
                          }}
                          className="w-4 h-4 rounded-xs border-emerald-200 text-[#054823] focus:ring-[#054823]"
                        />
                        <label htmlFor="homeIsDiaspora" className="text-xs font-bold text-emerald-950 cursor-pointer select-none">
                          {language === 'om' ? 'Ani Hawaasa Diaspora dha (Biyya alaa jiru)' : language === 'am' ? 'እኔ የውጭ አካል ነኝ (ዲያስፖራ/Diaspora)' : 'Sponsoring from abroad (Diaspora Solidarity)?'}
                        </label>
                      </div>

                      {/* Payment Channels */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                          {language === 'om' ? 'Karaa Kaffaltii Filadhu' : language === 'am' ? 'ለመደገፍ የሚጠቀሙበት የባንክ ሥርዓት ይምረጡ' : 'Select Funding Account / Payment Gateway Option'}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                          {!formData.isDiaspora ? (
                            <>
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cbe' }))}
                                className={`p-2.5 rounded-xl border text-left flex flex-col justify-between h-18 transition-all cursor-pointer ${
                                  formData.paymentMethod === 'cbe' 
                                    ? 'border-[#054823] bg-emerald-50 text-emerald-950 ring-2 ring-[#054823]/20 shadow-xs' 
                                    : 'border-emerald-100 bg-white hover:border-emerald-200'
                                }`}
                              >
                                <span className="text-[9px] font-bold uppercase tracking-wider bg-orange-100 text-orange-900 px-1.5 py-0.5 rounded text-center shrink-0 w-fit">CBE</span>
                                <span className="text-[11px] font-extrabold text-slate-800 leading-tight">CBE Bank</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'sinqe' }))}
                                className={`p-2.5 rounded-xl border text-left flex flex-col justify-between h-18 transition-all cursor-pointer ${
                                  formData.paymentMethod === 'sinqe' 
                                    ? 'border-[#054823] bg-emerald-50 text-emerald-950 ring-2 ring-[#054823]/20 shadow-xs' 
                                    : 'border-emerald-100 bg-white hover:border-emerald-200'
                                }`}
                              >
                                <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded text-center shrink-0 w-fit">Siinqee</span>
                                <span className="text-[11px] font-extrabold text-slate-800 leading-tight">Siinqee Bank</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cbe_birr' }))}
                                className={`p-2.5 rounded-xl border text-left flex flex-col justify-between h-18 transition-all cursor-pointer ${
                                  formData.paymentMethod === 'cbe_birr' 
                                    ? 'border-[#054823] bg-emerald-50 text-emerald-950 ring-2 ring-[#054823]/20 shadow-xs' 
                                    : 'border-emerald-100 bg-white hover:border-emerald-200'
                                }`}
                              >
                                <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded text-center shrink-0 w-fit">CBE Birr</span>
                                <span className="text-[11px] font-extrabold text-slate-800 leading-tight">CBE Birr</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'telebirr' }))}
                                className={`p-2.5 rounded-xl border text-left flex flex-col justify-between h-18 transition-all cursor-pointer ${
                                  formData.paymentMethod === 'telebirr' 
                                    ? 'border-[#054823] bg-emerald-50 text-emerald-950 ring-2 ring-[#054823]/20 shadow-xs' 
                                    : 'border-emerald-100 bg-white hover:border-emerald-200'
                                }`}
                              >
                                <span className="text-[9px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-center shrink-0 w-fit">telebirr</span>
                                <span className="text-[11px] font-extrabold text-slate-800 leading-tight">telebirr</span>
                              </button>
                            </>
                          ) : null}

                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'paypal' }))}
                            className={`p-2.5 rounded-xl border text-left flex flex-col justify-between h-18 transition-all cursor-pointer ${
                              formData.paymentMethod === 'paypal' 
                                ? 'border-[#054823] bg-emerald-50 text-emerald-950 ring-2 ring-[#054823]/20 shadow-xs' 
                                : 'border-emerald-100 bg-white hover:border-emerald-200'
                            } ${formData.isDiaspora ? 'col-span-full' : ''}`}
                          >
                            <span className="text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-blue-900 px-1.5 py-0.5 rounded text-center shrink-0 w-fit">PayPal</span>
                            <span className="text-[11px] font-extrabold text-slate-800 leading-tight">PayPal Global</span>
                          </button>
                        </div>

                        {/* Official Bank Account Details Card with Copy */}
                        <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200 space-y-2 mt-2">
                          <div className="flex items-center justify-between border-b border-emerald-200 pb-1.5">
                            <div className="flex items-center gap-1.5">
                              <Landmark className="w-3.5 h-3.5 text-[#054823]" />
                              <span className="text-[10px] font-extrabold text-[#054823] uppercase tracking-wider">
                                {language === 'om' ? 'Teessoo Herrega Baankii' : language === 'am' ? 'ኦፊሴላዊ የክፍያ ሂሳብ መረጃ' : 'Official Settlement Bank Details'}
                              </span>
                            </div>
                            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                              Adama Branch
                            </span>
                          </div>

                          {formData.paymentMethod === 'cbe' && (
                            <div className="text-[11.5px] space-y-1.5">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500 font-bold uppercase text-[9px]">Bank</span>
                                <span className="font-bold text-emerald-950">{bankDetails.cbe.bankName}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500 font-bold uppercase text-[9px]">Account Name</span>
                                <span className="font-extrabold text-emerald-950">{bankDetails.cbe.accName}</span>
                              </div>
                              <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-emerald-200">
                                <span className="text-gray-500 font-bold uppercase text-[9px]">Account No</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-black text-[#054823] text-xs">{bankDetails.cbe.accNumber}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyToClipboard(bankDetails.cbe.accNumber, 'cbe_acc')}
                                    className="p-1 text-emerald-700 hover:bg-emerald-100 rounded transition cursor-pointer"
                                    title="Copy Account Number"
                                  >
                                    {copiedText === 'cbe_acc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {formData.paymentMethod === 'sinqe' && (
                            <div className="text-[11.5px] space-y-1.5">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500 font-bold uppercase text-[9px]">Bank</span>
                                <span className="font-bold text-emerald-950">{bankDetails.sinqe.bankName}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500 font-bold uppercase text-[9px]">Account Name</span>
                                <span className="font-extrabold text-emerald-950">{bankDetails.sinqe.accName}</span>
                              </div>
                              <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-emerald-200">
                                <span className="text-gray-500 font-bold uppercase text-[9px]">Account No</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-black text-[#054823] text-xs">{bankDetails.sinqe.accNumber}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyToClipboard(bankDetails.sinqe.accNumber, 'sinqe_acc')}
                                    className="p-1 text-emerald-700 hover:bg-emerald-100 rounded transition cursor-pointer"
                                    title="Copy Account Number"
                                  >
                                    {copiedText === 'sinqe_acc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {formData.paymentMethod === 'cbe_birr' && (
                            <div className="text-[11.5px] space-y-1.5">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500 font-bold uppercase text-[9px]">Channel</span>
                                <span className="font-bold text-emerald-950">{bankDetails.cbe_birr.bankName}</span>
                              </div>
                              <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-emerald-200">
                                <span className="text-gray-500 font-bold uppercase text-[9px]">Merchant Code</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-black text-[#054823] text-xs">{bankDetails.cbe_birr.merchantCode}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyToClipboard(bankDetails.cbe_birr.merchantCode, 'cbe_birr_code')}
                                    className="p-1 text-emerald-700 hover:bg-emerald-100 rounded transition cursor-pointer"
                                    title="Copy Merchant Code"
                                  >
                                    {copiedText === 'cbe_birr_code' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {formData.paymentMethod === 'telebirr' && (
                            <div className="text-[11.5px] space-y-1.5">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500 font-bold uppercase text-[9px]">Channel</span>
                                <span className="font-bold text-emerald-950">{bankDetails.telebirr.bankName}</span>
                              </div>
                              <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-emerald-200">
                                <span className="text-gray-500 font-bold uppercase text-[9px]">Merchant ID</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-black text-blue-700 text-xs">{bankDetails.telebirr.merchantId}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyToClipboard(bankDetails.telebirr.merchantId, 'telebirr_code')}
                                    className="p-1 text-blue-700 hover:bg-blue-100 rounded transition cursor-pointer"
                                    title="Copy Merchant ID"
                                  >
                                    {copiedText === 'telebirr_code' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {formData.paymentMethod === 'paypal' && (
                            <div className="text-[11.5px] space-y-1.5">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500 font-bold uppercase text-[9px]">Channel</span>
                                <span className="font-bold text-emerald-950">{bankDetails.paypal.provider}</span>
                              </div>
                              <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-emerald-200">
                                <span className="text-gray-500 font-bold uppercase text-[9px]">Account Email</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-blue-700 text-xs">{bankDetails.paypal.account}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyToClipboard(bankDetails.paypal.account, 'paypal_email')}
                                    className="p-1 text-blue-700 hover:bg-blue-100 rounded transition cursor-pointer"
                                    title="Copy PayPal Email"
                                  >
                                    {copiedText === 'paypal_email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Next Step Button */}
                      <button
                        type="submit"
                        className="w-full bg-[#054823] hover:bg-[#022b14] text-white font-black text-xs sm:text-sm py-3.5 rounded-xl uppercase tracking-wider transition shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 mt-4"
                      >
                        <span>{language === 'om' ? 'Itti Fufi: Mirkaneessa Kaffaltii' : language === 'am' ? 'ቀጥል፡ የክፍያ ማረጋገጫ' : 'Continue to Payment Verification'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  )}

                  {/* STEP 2: Payment Verification & Reference ID */}
                  {(paymentStep === 'verification' || paymentStep === 'submitting') && (
                    <form onSubmit={handleVerificationSubmit} className="space-y-5">
                      
                      {submissionError && (
                        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold">
                          {submissionError}
                        </div>
                      )}

                      {/* Summary of Pledge */}
                      <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
                        <span className="text-[10px] font-black uppercase text-[#054823] tracking-wider block">
                          {language === 'om' ? 'Cuunfaa Gumaacha Kee' : language === 'am' ? 'የድጋፍዎ ማጠቃለያ' : 'Contribution Pledge Summary'}
                        </span>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="text-gray-500 block text-[10px] uppercase font-bold">{language === 'om' ? 'Gumaachaa' : 'Donor'}</span>
                            <span className="font-bold text-emerald-950 line-clamp-1">{formData.name}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-[10px] uppercase font-bold">{language === 'om' ? 'Hamma (ETB)' : 'Amount'}</span>
                            <span className="font-mono font-black text-[#054823]">{Number(formData.amount).toLocaleString()} ETB</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-[10px] uppercase font-bold">{language === 'om' ? 'Karaa Kaffaltii' : 'Gateway'}</span>
                            <span className="font-bold text-emerald-950 uppercase">{formData.paymentMethod.replace('_', ' ')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Transaction Reference ID Input */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                          {language === 'om' ? 'Koodii Dabarsaa / Transaction Reference ID' : language === 'am' ? 'የማስተላለፊያ መለያ ቁጥር (Transaction ID / Reference)' : 'Transaction ID / Reference Number'} *
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            name="transactionId"
                            value={formData.transactionId}
                            onChange={handleInputChange}
                            placeholder={language === 'om' ? 'Fkn: FT2409892182 / TT1209381' : language === 'am' ? 'ምሳሌ፡ FT2409892182 / TT1209381' : 'e.g. FT2409892182 / TT1209381'}
                            className="w-full text-xs font-mono font-bold px-4 py-3 pl-10 rounded-xl border border-emerald-100 focus:outline-none focus:ring-3 focus:ring-emerald-400/20 focus:border-emerald-500 bg-white transition-all"
                          />
                          <FileText className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                        <p className="text-[10.5px] text-gray-500">
                          {language === 'om' 
                            ? 'Koodii ergaa gabaabaa (SMS) ykn qophii baankii keessan irraa dhufe galchaa.' 
                            : language === 'am'
                              ? 'በባንክ ወይም በቴሌብር የደረሰዎትን የማረጋገጫ መለያ ቁጥር ያስገቡ።'
                              : 'Enter the reference transaction code from your mobile banking receipt or SMS.'}
                        </p>
                        {formErrors.transactionId && <p className="text-[10px] text-red-500 font-bold">{formErrors.transactionId}</p>}
                      </div>

                      {/* Deposit Slip / Receipt File Upload */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                          {language === 'om' ? 'Nagahee / Screenshot Kaffaltii (Filannoo)' : language === 'am' ? 'የክፍያ ደረሰኝ / ስክሪንሽት (አማራጭ)' : 'Deposit Slip / Payment Screenshot (Optional)'}
                        </label>
                        
                        <div
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                          className={`border-2 border-dashed rounded-2xl p-4 text-center transition-all ${
                            dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-emerald-200 hover:border-emerald-300 bg-emerald-50/20'
                          }`}
                        >
                          <input
                            type="file"
                            id="homeReceiptFileUpload"
                            onChange={handleFileChange}
                            accept="image/*,.pdf"
                            className="hidden"
                          />
                          <label htmlFor="homeReceiptFileUpload" className="cursor-pointer flex flex-col items-center gap-1.5">
                            <Download className="w-6 h-6 text-emerald-700" />
                            <span className="text-xs font-bold text-emerald-950">
                              {formData.receiptFile ? formData.receiptFile.name : (language === 'om' ? 'Faayilii nagahee asitti fe\'aa ykn filadhaa' : language === 'am' ? 'የደረሰኝ ፋይል ይምረጡ ወይም እዚህ ይጎትቱ' : 'Click to select or drag and drop receipt file')}
                            </span>
                            <span className="text-[10px] text-gray-400">PNG, JPG, PDF (Max 10MB)</span>
                          </label>
                        </div>
                      </div>

                      {/* Actions Buttons */}
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setPaymentStep('form')}
                          disabled={paymentStep === 'submitting'}
                          className="px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 transition cursor-pointer"
                        >
                          {language === 'om' ? 'Gara Duubaa' : language === 'am' ? 'ተመለስ' : 'Back'}
                        </button>

                        <button
                          type="submit"
                          disabled={paymentStep === 'submitting'}
                          className="flex-1 bg-[#054823] hover:bg-[#022b14] disabled:opacity-50 text-white font-black text-xs sm:text-sm py-3.5 rounded-xl uppercase tracking-wider transition shadow-md cursor-pointer flex items-center justify-center gap-2"
                        >
                          {paymentStep === 'submitting' ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                              <span>{language === 'om' ? 'Galmeessaa jira...' : language === 'am' ? 'እየተመዘገበ ነው...' : 'Registering Contribution...'}</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              <span>{language === 'om' ? 'Mirkaneessi & Xumuri' : language === 'am' ? 'አረጋግጥና አጠናቅቅ' : 'Confirm & Complete Contribution'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* STEP 3: Complete & Celebratory Success */}
                  {paymentStep === 'success' && contributionSuccess && (
                    <div className="text-center py-6 space-y-5">
                      <div className="w-16 h-16 bg-emerald-100 text-[#054823] rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <Sparkles className="w-8 h-8 animate-bounce" />
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                          {language === 'om' ? 'Galatoomaa! Waaqayyo Isin Ha Eebbisu' : language === 'am' ? 'እናመሰግናለን! እግዚአብሔር ይስጥልን' : 'Thank You! Contribution Received'}
                        </span>
                        <h3 className="text-xl font-black text-emerald-950 uppercase tracking-tight">
                          {language === 'om' ? 'Gumaachi Keessan Galmeeffameera!' : language === 'am' ? 'ድጋፍዎ በተሳካ ሁኔታ ተመዝግቧል!' : 'Contribution Successfully Registered!'}
                        </h3>
                        <p className="text-xs text-gray-600 font-semibold leading-relaxed max-w-lg mx-auto">
                          <strong>{contributionSuccess.name}</strong>, {language === 'om' ? 'gumaachi maallaqaa keessan ' : 'your contribution of '}
                          <strong className="text-[#054823] font-mono font-black">{formatBirr(contributionSuccess.amount)}</strong>
                          {language === 'om' ? ' duula gumaachaa ' : ' to relief campaign '}
                          &ldquo;{contributionSuccess.campTitle}&rdquo; {language === 'om' ? ' irratti dabalameera. Koodii Dabarsaa: ' : ' has been added. Transaction ID: '}
                          <strong className="font-mono text-[#054823]">{contributionSuccess.transactionId}</strong>.
                        </p>
                      </div>

                      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-900 font-medium">
                        {language === 'om'
                          ? 'Dhibbeentaan galmaa (%), maallaqni funaaname, fi tarreen arjoomtotaa sirna Buusaa Gonofaa irratti yeroma sana haaromfameera.'
                          : language === 'am'
                            ? 'የልገሳው መቶኛ (%)፣ የተሰበሰበው የብር መጠን እና የለጋሾች ዝርዝር በቅጽበት ተሻሽሏል።'
                            : 'Campaign raised total, percentage (%), and givers roster updated in real-time.'}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setQuickContribCamp(null);
                          setContributionSuccess(null);
                        }}
                        className="w-full bg-[#054823] hover:bg-[#022b14] text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider transition cursor-pointer"
                      >
                        {language === 'om' ? 'Cufi & Haaromsa Ilaali' : language === 'am' ? 'ዝጋና የተሻሻለውን ተመልከት' : 'Done & View Live Progress'}
                      </button>
                    </div>
                  )}

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic QR Code Modal for Home Overview */}
        <AnimatePresence>
          {showQrModal && quickContribCamp && (
            <motion.div
              className="fixed inset-0 bg-[#06180e]/80 backdrop-blur-xs z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-emerald-100 shadow-2xl relative text-center space-y-5"
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
              >
                <button
                  type="button"
                  onClick={() => setShowQrModal(false)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-emerald-950 hover:bg-emerald-50 rounded-full transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-1">
                  <span className="text-[10px] font-black text-[#054823] bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    {language === 'om' ? 'QR Koodii Kaffaltii Saffisaa' : language === 'am' ? 'ፈጣን የኪውአር ክፍያ' : 'Dynamic QR Payment'}
                  </span>
                  <h4 className="text-lg font-black text-emerald-950 uppercase tracking-tight">
                    {language === 'om' ? 'Koodii QR Saajjali' : language === 'am' ? 'የQR ኮድ ስካን ያድርጉ' : 'Scan & Donate via QR Code'}
                  </h4>
                </div>

                {/* Platform selector */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'telebirr', name: 'telebirr' },
                    { id: 'cbe_birr', name: 'CBE Birr' },
                    { id: 'sinqe', name: 'Siinqee' },
                    { id: 'awash', name: 'Awash' },
                    { id: 'boa', name: 'BOA' },
                  ].map((plat) => (
                    <button
                      key={plat.id}
                      type="button"
                      onClick={() => setQrModalPlatform(plat.id)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                        qrModalPlatform === plat.id
                          ? 'bg-[#054823] text-white border-[#054823]'
                          : 'bg-gray-50 text-gray-700 hover:bg-emerald-50 border-gray-200'
                      }`}
                    >
                      {plat.name}
                    </button>
                  ))}
                </div>

                {/* Amount input for QR */}
                <div className="flex items-center gap-2 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <span className="text-xs font-bold text-gray-500 uppercase">{language === 'om' ? 'Hamma:' : 'Amount:'}</span>
                  <input
                    type="number"
                    value={qrModalAmount}
                    onChange={(e) => setQrModalAmount(e.target.value)}
                    className="flex-1 font-mono font-black text-sm bg-white px-3 py-1.5 rounded-lg border border-emerald-200 text-[#054823]"
                    placeholder="1000"
                  />
                  <span className="text-xs font-black text-emerald-800 font-mono">ETB</span>
                </div>

                {/* QR Code Container */}
                {(() => {
                  const qrInfo = getDynamicQrPayload(qrModalPlatform, qrModalAmount, quickContribCamp.id);
                  return (
                    <div className="space-y-3">
                      <div className="p-4 bg-white rounded-2xl border-2 border-emerald-100 inline-block shadow-inner">
                        <QRCodeSVG
                          id="home-dynamic-qr-code-svg"
                          value={qrInfo.payload}
                          size={180}
                          level="H"
                          includeMargin={true}
                          fgColor="#054823"
                        />
                      </div>

                      <div className="text-xs font-bold text-emerald-950">
                        <span>{qrInfo.platformName}</span> • <span className="font-mono text-[#054823]">{qrInfo.merchantId}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={downloadQrCode}
                          className="flex-1 bg-[#054823] hover:bg-[#022b14] text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{language === 'om' ? 'QR Buufadhu' : language === 'am' ? 'QR አውርድ' : 'Download QR (PNG)'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* USSD Quick Dial Modal */}
        <AnimatePresence>
          {showUssdModal && (
            <motion.div
              className="fixed inset-0 bg-[#06180e]/80 backdrop-blur-xs z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-emerald-100 shadow-2xl relative text-left space-y-5"
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
              >
                <button
                  type="button"
                  onClick={() => setShowUssdModal(false)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-emerald-950 hover:bg-emerald-50 rounded-full transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-1">
                  <span className="text-[10px] font-black text-[#054823] bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    {language === 'om' ? 'Qajeelfama USSD' : language === 'am' ? 'የUSSD መደወያ መመሪያ' : 'Mobile USSD Quick Codes'}
                  </span>
                  <h4 className="text-lg font-black text-emerald-950 uppercase tracking-tight">
                    {language === 'om' ? 'Koodii USSD Bilbilaan Kaffali' : language === 'am' ? 'በስልክዎ የUSSD ቁጥር ይደውሉ' : 'Dial USSD Directly from Phone'}
                  </h4>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                    <div>
                      <strong className="block text-emerald-950">telebirr:</strong>
                      <span className="font-mono text-[#054823] font-black">*127#</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyToClipboard('*127#', 'ussd_telebirr')}
                      className="px-2.5 py-1 bg-white border border-emerald-200 rounded-lg text-emerald-900 font-bold hover:bg-emerald-100 cursor-pointer"
                    >
                      {copiedText === 'ussd_telebirr' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                    <div>
                      <strong className="block text-emerald-950">CBE Birr:</strong>
                      <span className="font-mono text-[#054823] font-black">*889#</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyToClipboard('*889#', 'ussd_cbe')}
                      className="px-2.5 py-1 bg-white border border-emerald-200 rounded-lg text-emerald-900 font-bold hover:bg-emerald-100 cursor-pointer"
                    >
                      {copiedText === 'ussd_cbe' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                    <div>
                      <strong className="block text-emerald-950">Siinqee Bank:</strong>
                      <span className="font-mono text-[#054823] font-black">*869#</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyToClipboard('*869#', 'ussd_sinqe')}
                      className="px-2.5 py-1 bg-white border border-emerald-200 rounded-lg text-emerald-900 font-bold hover:bg-emerald-100 cursor-pointer"
                    >
                      {copiedText === 'ussd_sinqe' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowUssdModal(false)}
                  className="w-full bg-[#054823] text-white font-bold text-xs py-3 rounded-xl uppercase tracking-wider cursor-pointer"
                >
                  {language === 'om' ? 'Cufi' : language === 'am' ? 'ዝጋ' : 'Close'}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
