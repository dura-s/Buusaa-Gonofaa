import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, Users, Award, TrendingUp, ArrowUpRight, Compass, 
  ChevronLeft, ChevronRight, Maximize2, X, ZoomIn, ZoomOut, 
  RotateCcw, Play, Pause, ScanEye 
} from 'lucide-react';
import { Language, ActiveTab } from '../types';
import { translations } from '../translations';
import { branchStatistics } from '../data';
import bgLogo from '../assets/images/photo_2026-06-29_12-12-03.jpg';
import wadooImage from '../assets/images/photo_2026-06-25_11-35-11.jpg';
import latestAssemblyImage from '../assets/images/photo_2026-06-25_11-53-35.jpg';
import img_20_1 from '../assets/images/photo_2026-06-25_11-53-20.jpg';
import img_20_2 from '../assets/images/photo_2026-06-25_11-53-20 (2).jpg';
import img_21 from '../assets/images/photo_2026-06-25_11-53-21.jpg';
import img_22_1 from '../assets/images/photo_2026-06-25_11-53-22.jpg';
import img_22_2 from '../assets/images/photo_2026-06-25_11-53-22 (2).jpg';
import img_23 from '../assets/images/photo_2026-06-25_11-53-23.jpg';
import img_24_1 from '../assets/images/photo_2026-06-25_11-53-24.jpg';
import img_24_2 from '../assets/images/photo_2026-06-25_11-53-24 (2).jpg';

interface HeroProps {
  language: Language;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Hero({ language, setActiveTab }: HeroProps) {
  // Slideshow config
  const slideshowImages = [
    {
      src: latestAssemblyImage,
      title: {
        om: "Marii Waltajjii Yaa'ii Buusaa Gonofaa Damee Adaamaa Marsaa 3ffaa",
        am: "3ኛው ዙር የቡሳ ጎኖፋ የአዳማ ቅርንጫፍ ጉባኤ ውይይት",
        en: "3rd Round Buusaa Gonofaa Adama Branch Assembly Forum"
      },
      subtitle: {
        om: "Adama Branch Outreach & Cooperative Assembly • June 25, 2026",
        am: "አዳማ ቅርንጫፍ ህዝባዊ ስብሰባ • ሰኔ 25, 2026",
        en: "Adama Branch Outreach & Cooperative Assembly • June 25, 2026"
      },
      badge: {
        om: "YAA'II MARSAA 3FFAA DAMEE ADAAMAA",
        am: "3ኛው ዙር የአዳማ ቅርንጫፍ ጉባኤ",
        en: "3RD ROUND ADAMA BRANCH GENERAL ASSEMBLY"
      }
    },
    {
      src: img_20_1,
      title: {
        om: "Marii Koree Gorsituu Damee Adaamaa Marsaa 3ffaa",
        am: "የአዳማ ቅርንጫፍ አማካሪ ኮሚቴ ስብሰባ",
        en: "Adama Branch Advisory Committee Consultative Forum"
      },
      subtitle: {
        om: "Hojjettoota fi koree gorsituu gidduutti marii uumame",
        am: "በአማካሪ ኮሚቴው እና በስራ አስፈፃሚዎች መካከል የተደረገ ውይይት",
        en: "Collaborative consultation between committee members & local staff"
      },
      badge: {
        om: "KOOPII GORSITUU",
        am: "አማካሪ ኮሚቴ",
        en: "ADVISORY COMMITTEE"
      }
    },
    {
      src: img_20_2,
      title: {
        om: "Hirmaattota Walgahii Buusaa Gonofaa Damee Adaamaa",
        am: "የአዳማ ቅርንጫፍ ቡሳ ጎኖፋ ጠቅላላ ጉባኤ ተሳታፊዎች",
        en: "Buusaa Gonofaa Adama Branch General Assembly Attendees"
      },
      subtitle: {
        om: "Marii bal'aa qooda fudhattota waliin taasifame",
        am: "ከባለድርሻ አካላት ጋር የተደረገ የጋራ የልማት ውይይት",
        en: "Participatory development discussions with key community stakeholders"
      },
      badge: {
        om: "HIRMAATTOTA YAA'II",
        am: "የጉባኤው ተሳታፊዎች",
        en: "ASSEMBLY ATTENDEES"
      }
    },
    {
      src: img_21,
      title: {
        om: "Waraqaa Qorannoo fi Gabaasa Hojii Dhiyeessuu",
        am: "የስራ አፈፃፀም ሪፖርት እና የጥናት ጽሑፍ አቀራረብ",
        en: "Presentation of Performance Report & Review Papers"
      },
      subtitle: {
        om: "Gabaasa raawwii hojii fi qorannoo dhiyaate irratti mari'achuu",
        am: "በቀረቡት የስራ አፈፃፀምና የምርምር ጽሁፎች ላይ ውይይት ማድረግ",
        en: "Reviewing accomplishments, statistical milestones & strategic paths"
      },
      badge: {
        om: "GABAASA HOJII",
        am: "የስራ አፈፃፀም ሪፖርት",
        en: "PERFORMANCE REPORT"
      }
    },
    {
      src: img_22_1,
      title: {
        om: "Yaada fi Gaaffii Hirmaattota Yaa'ii",
        am: "ከተሳታፊዎች የተነሱ ጠቃሚ ጥያቄዎችና ሀሳቦች",
        en: "Inquiries & Constructive Feedback from Assembly Participants"
      },
      subtitle: {
        om: "Hirmaattonni yaada fi gaaffii isaanii yoo dhiyeessan",
        am: "ተሳታፊዎች የቅርንጫፉን ስራ የሚያጠናክሩ ጥያቄዎችን ሲያቀርቡ",
        en: "Community partners raising questions to strengthen support systems"
      },
      badge: {
        om: "YAA'II HIRMAATTOTA",
        am: "ውይይትና ተሳትፎ",
        en: "CONSTRUCTIVE FEEDBACK"
      }
    },
    {
      src: img_22_2,
      title: {
        om: "Mariif Deebii fi Ibsa Hoggansa Buusaa Gonofaa",
        am: "በቡሳ ጎኖፋ አመራሮች የተሰጠ ምላሽ እና ሰፊ ማብራሪያ",
        en: "Detailed Responses & Guidance from Buusaa Gonofaa Leadership"
      },
      subtitle: {
        om: "Hoggantoonni gaaffiilee ka'aniif ibsa fi deebii kennan",
        am: "አመራሮቹ ለተነሱት ጥያቄዎች ዝርዝር ማብራሪያዎችን ሲሰጡ",
        en: "Executive directors addressing community issues and laying out strategies"
      },
      badge: {
        om: "DEEBII HOGGANSA",
        am: "የአመራር ምላሽ",
        en: "LEADERSHIP GUIDANCE"
      }
    },
    {
      src: img_23,
      title: {
        om: "Murtii fi Karoora Hojii Gara Fuulduraa",
        am: "የቀጣይ ስራዎች ውሳኔዎችና እቅዶች ማፅደቅ",
        en: "Approval of Resolutions & Action Plans for the Upcoming Year"
      },
      subtitle: {
        om: "Koreen dhimmoota ijoo irratti murtii yoo dabarsan",
        am: "ጉባኤው ለቀጣይ ስራዎች ጠቃሚ የሆኑ ውሳኔዎችን ሲያሳልፍ",
        en: "Establishing solid commitments and approving budget/welfare expansions"
      },
      badge: {
        om: "MURTII YAA'II",
        am: "የቀጣይ እቅዶች",
        en: "APPROVED RESOLUTIONS"
      }
    },
    {
      src: img_24_1,
      title: {
        om: "Kallattii Hojii fi Guduunfaa Yaa'ii Damee Adaamaa",
        am: "የአዳማ ቅርንጫፍ ጉባኤ የስራ አቅጣጫዎች እና ማጠቃለያ",
        en: "Strategic Operational Guidelines & Concluding Remarks"
      },
      subtitle: {
        om: "Guduunfaa yaa'ii irratti kallattii xiyyeeffannoo kaa'uu",
        am: "በጉባኤው ማጠቃለያ ላይ የወደፊት ትኩረት አቅጣጫዎችን ማስቀመጥ",
        en: "Setting targeted benchmarks for localized safety nets and food security"
      },
      badge: {
        om: "GUDUUNFAA YAA'II",
        am: "የጉባኤው ማጠቃለያ",
        en: "CONCLUDING REMARKS"
      }
    },
    {
      src: img_24_2,
      title: {
        om: "Hawaasummaa fi Tokkummaa Hojjettoota Buusaa Gonofaa",
        am: "የቡሳ ጎኖፋ ሰራተኞች የጋራ ህብረት እና ወንድማማችነት",
        en: "Social Cohesion and Team Unity of Buusaa Gonofaa Staff"
      },
      subtitle: {
        om: "Hojjettoonni yaa'ii milkaa'aa booda walitti dhufuun",
        am: "የቅርንጫፉ ሰራተኞች ከጉባኤው መጠናቀቅ በኋላ በደስታ ሲገናኙ",
        en: "Staff members celebrating a highly successful 3rd branch assembly"
      },
      badge: {
        om: "TOKKUMMAA HOJJETTOOTAA",
        am: "የሰራተኞች አንድነት",
        en: "TEAM COHESION"
      }
    },
    {
      src: wadooImage,
      title: {
        om: "Obbo Waadoo Abdulkarim - Hoggonaa Buusaa Gonofaa Damee Adaamaa",
        am: "አቶ ዋዶ አብዱልከሪም - የአዳማ ቅርንጫፍ ቡሳ ጎኖፋ ኃላፊ",
        en: "Obbo Waadoo Abdulkarim - Head of Buusaa Gonofaa Adama Branch"
      },
      subtitle: {
        om: "Hoggansa hojii deeggarsaa fi birmannaa hawaasummaa",
        am: "የማህበራዊ ዋስትና እና ፈጣን ምላሽ አመራር",
        en: "Directing localized social safety-net & microfinance systems"
      },
      badge: {
        om: "HOGGANAA DAMEE ADAAMAA",
        am: "የቅርንጫፍ ኃላፊ",
        en: "ADAMA BRANCH HEAD"
      }
    }
  ];

  // States
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Auto-play interval
  useEffect(() => {
    if (isPaused || isLightboxOpen) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, isLightboxOpen, slideshowImages.length]);

  // Handle slide transitions manually
  const nextSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  // Lightbox navigation
  const nextLightboxSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    resetZoom();
  };

  const prevLightboxSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
    resetZoom();
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        resetZoom();
      } else if (e.key === 'ArrowRight') {
        nextLightboxSlide();
      } else if (e.key === 'ArrowLeft') {
        prevLightboxSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  // Zoom control helpers
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  // Dragging / Panning inside the lightbox
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAF8] via-white to-[#F0F4F1] py-12 md:py-20" id="home-hero-section">
      
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
        
        {/* Main Content Card in Split Layout Style */}
        <div className="bg-white rounded-3xl p-6 md:p-12 border border-emerald-100/80 shadow-[0_15px_40px_-15px_rgba(11,76,40,0.06)] relative overflow-hidden">
          {/* Decorative background circles matching theme */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30 z-0 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-50/40 rounded-full translate-y-1/2 -translate-x-1/2 z-0 blur-2xl" />

          {/* Dynamic Hero Layout Grid - Beautifully split 6:6 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Column: Hero text panel */}
            <motion.div 
              className="lg:col-span-6 space-y-8 text-left"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Oromia branch batch indicator pill and Logo container */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col gap-2.5"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EE] border border-emerald-100 text-[#0B4C28] text-xs font-bold uppercase tracking-wider w-fit shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16803E] animate-pulse" />
                  <span>Adama Branch &bull; Damee Adamaa</span>
                </div>
                <span className="text-[11px] text-emerald-800 font-extrabold uppercase tracking-widest leading-relaxed">
                  {language === 'om' ? 'TAJAAJILA MISOOMA HAWAASAA OROMIYAA' : 'Social Protection & Microfinance Hub'}
                </span>
              </motion.div>

              {/* Welcome Statement placed on top of the main hero title */}
              <motion.h2 
                variants={itemVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-4.5xl font-black text-[#16803E] tracking-tight leading-tight font-display"
              >
                {language === 'om' ? 'Baga Gara Buusaa Gonofaa Damee Adaamaa Nagaan Dhuftan!' :
                 language === 'am' ? 'ወደ ቡሳ ጎኖፋ የአዳማ ቅርንጫፍ በደህና መጡ!' :
                 'Welcome to Buusaa Gonofaa Adama Branch!'}
              </motion.h2>

              {/* Title display block - styled beautifully with Outfit display font */}
              <motion.h1 
                variants={itemVariants}
                className="text-3.5xl sm:text-4.5xl md:text-5.5xl lg:text-6xl font-extrabold text-[#0B4C28] tracking-tight leading-tight font-display"
              >
                {translations.heroTitle[language]}
              </motion.h1>

              {/* Description Subtitle details */}
              <motion.p 
                variants={itemVariants}
                className="text-base md:text-lg text-slate-600 font-medium sm:leading-loose leading-relaxed max-w-2xl"
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
                  className="group flex items-center gap-2 bg-[#0B4C28] text-white px-7 py-4 rounded-xl text-xs font-extrabold tracking-widest hover:bg-[#063118] active:scale-[0.97] hover:shadow-[0_10px_25px_rgba(11,76,40,0.25)] transition-all transform hover:-translate-y-0.5 cursor-pointer uppercase border border-transparent"
                  id="hero-cta-btn-primary"
                >
                  <span>{translations.heroCtaPrimary[language]}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-yellow-400" />
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className="flex items-center gap-2 border-2 border-[#0B4C28]/80 text-[#0B4C28] bg-transparent px-7 py-4 rounded-xl text-xs font-extrabold tracking-widest hover:bg-emerald-50/50 active:scale-[0.97] transition-all cursor-pointer uppercase"
                  id="hero-cta-btn-secondary"
                >
                  <span>{translations.heroCtaSecondary[language]}</span>
                </button>
              </motion.div>

              {/* Small trust indicator under action buttons */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 pt-4 text-xs text-slate-500 font-semibold"
              >
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">10k+</div>
                  <div className="w-7 h-7 rounded-full bg-yellow-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">★</div>
                </div>
                <span>
                  {language === 'om' ? 'Mirkaneessitoota hundaaf wabii amansiisaa' : 'Trusted by thousands across East Shewa region'}
                </span>
              </motion.div>
            </motion.div>

            {/* Right Column: Automated Interactive Slideshow */}
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Automated Interactive Slideshow with Zoom Face HD Focus Lightbox */}
              <div 
                className="bg-slate-50/50 rounded-3xl border border-slate-200/60 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col items-center hover:border-emerald-200 hover:shadow-lg active:scale-[0.995] transition-all w-full relative"
                id="interactive-slideshow-container"
              >
                {/* Image Stage Container - Modern landscape banner design */}
                <div className="w-full h-64 sm:h-80 md:h-[380px] lg:h-[450px] rounded-2xl bg-slate-100 flex flex-col items-center justify-center relative overflow-hidden group border border-emerald-100/50">
                  {/* Premium blurred backdrop image layer */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center blur-lg opacity-25 scale-110" 
                    style={{ backgroundImage: `url(${slideshowImages[currentSlide].src})` }}
                  />

                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentSlide}
                      src={slideshowImages[currentSlide].src} 
                      alt={slideshowImages[currentSlide].title[language]} 
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.55 }}
                      className="w-full h-full object-contain cursor-zoom-in rounded-2xl bg-transparent relative z-10"
                      onClick={() => setIsLightboxOpen(true)}
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>

                  {/* Floating Badge on top-left of image */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-white bg-[#0B4C28]/95 px-3 py-1 rounded-full shadow-sm backdrop-blur-xs border border-white/10">
                      {slideshowImages[currentSlide].badge[language]}
                    </span>
                  </div>

                  {/* Floating Navigation Controls */}
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <button 
                      onClick={prevSlide}
                      className="w-8 h-8 rounded-full bg-black/60 hover:bg-[#0B4C28] active:scale-90 text-white flex items-center justify-center transition-all border border-white/10 shadow-md cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <button 
                      onClick={nextSlide}
                      className="w-8 h-8 rounded-full bg-black/60 hover:bg-[#0B4C28] active:scale-90 text-white flex items-center justify-center transition-all border border-white/10 shadow-md cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Meta Details & Captions */}
                <div className="w-full text-center mt-4 space-y-1">
                  <h4 className="text-sm md:text-base font-extrabold text-[#0B4C28] leading-snug font-sans line-clamp-2 min-h-[2.5rem] flex items-center justify-center px-2">
                    {slideshowImages[currentSlide].title[language]}
                  </h4>
                  <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider">
                    {slideshowImages[currentSlide].subtitle[language]}
                  </p>
                </div>

                {/* Slider pagination indicators dots */}
                <div className="flex items-center gap-1.5 mt-3 justify-center">
                  {slideshowImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer active:scale-90 ${idx === currentSlide ? 'bg-[#0B4C28] w-5' : 'bg-slate-200 hover:bg-slate-400'}`}
                      title={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Editorial Spotlight Card: Head of Buusaa Gonofaa (Obbo Waadoo Abdulkarim) */}
        <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-10 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all text-left relative overflow-hidden">
          {/* Elegant top-right golden decoration strip */}
          <div className="absolute top-0 right-0 w-32 h-2 bg-gradient-to-r from-amber-400 to-[#D4AF37]" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left side: Leader Portrait Frame */}
            <div className="md:col-span-5 w-full flex flex-col items-center justify-center relative overflow-hidden shrink-0">
              <div className="relative group w-full max-w-sm aspect-[4/5] rounded-2xl bg-[#F3F6F4] border border-slate-200 overflow-hidden shadow-md">
                {/* Premium subtle glow background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0B4C28]/10 via-transparent to-amber-500/5 opacity-50" />
                
                {/* Blurred backdrop image layer */}
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-lg opacity-25 scale-110" 
                  style={{ backgroundImage: `url(${wadooImage})` }}
                />
                
                <img 
                  src={wadooImage} 
                  alt="Obbo Waadoo Abdulkarim" 
                  className="w-full h-full object-cover relative z-10 group-hover:scale-[1.03] transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
                
                {/* Premium tag overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-900/80 to-transparent text-white pt-10 pb-4 px-4 text-center z-20">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                    {language === 'om' ? 'Damee Adaamaa' : 'Adama Branch'}
                  </div>
                  <div className="text-sm font-extrabold uppercase tracking-wide mt-0.5">
                    {language === 'om' ? 'OBBO WAADOO ABDULKARIM' : 'OBBO WAADOO ABDULKARIM'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Prestige Welcome message */}
            <div className="md:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs md:text-sm font-bold uppercase tracking-wider w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {language === 'om' ? 'Grootii fi Deeggarsa Hawaasummaa' : language === 'am' ? 'የቅርንጫፍ መልእክት' : 'Branch Welcome Statement'}
                </div>
                
                {/* Cultural digital seal */}
                <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-emerald-800 font-bold uppercase tracking-widest border border-emerald-100 bg-[#F4F9F5] px-3 py-1.5 rounded-lg w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Verified Executive</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B4C28] font-display tracking-tight leading-tight">
                  Obbo Waadoo Abdulkarim
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-emerald-800 font-extrabold uppercase tracking-wider">
                  {language === 'om' ? 'Hoggonaa Buusaa Gonofaa Damee Adaamaa' : 
                   language === 'am' ? 'የአዳማ ቅርንጫፍ ቡሳ ጎኖፋ ኃላፊ' : 
                   'Head of Buusaa Gonofaa Adama Branch'}
                </p>
              </div>

              <div className="relative pt-2">
                {/* Stylish giant quote mark decoration */}
                <span className="absolute -top-7 -left-3 text-8xl text-emerald-100 font-serif select-none -z-10">“</span>
                <p className="text-base md:text-lg text-slate-700 font-semibold leading-relaxed relative z-10 italic">
                  {language === 'om' ? 'Damee Bulchiinsa Magaalaa Adaamaatti Buusaa Gonofaa guutummaatti olaantummaan kan hogganan yoo ta\'an, tajaajila gargaarsaa, wal-gargaarsaa fi birmannaa hawaasummaa qindeessuun hawaasa deeggaruuf dhimma raawwatu dha.' : 
                   language === 'am' ? 'የአዳማ ከተማ ቅርንጫፍ ቡሳ ጎኖፋ ኃላፊ በመሆን የማህበራዊ ዋስትና፣ የጋራ መረዳጃ እና የልማት ስራዎችን በበላይነት ይመራሉ::' : 
                   'Serving as the head of Adama City branch, leading social safety-net programs, mutual cooperative welfare and community development activities.'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Integrated Quick Alert Notification */}
        <div className="bg-gradient-to-r from-[#0B4C28] to-[#125D34] text-white rounded-2xl p-4 md:p-6 border border-[#093F20] shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping shrink-0" />
            <div>
              <h5 className="text-xs font-extrabold text-amber-300 uppercase tracking-widest">
                {language === 'om' ? 'Sagantaa Deeggarsa Gadaa' : 'Gadaa Governance Protocol'}
              </h5>
              <p className="text-[11px] text-emerald-100 font-semibold mt-0.5">
                {language === 'om' ? 'Damee Adamaa jalatti tajaajila hawaasummaa bilisaa guutuu' : 'Fully localized microfinance integration services across East Shewa'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('services')}
            className="text-[10px] uppercase font-bold tracking-wider bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-all cursor-pointer shrink-0"
          >
            {language === 'om' ? 'Baradhu' : 'Learn More'}
          </button>
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
        <div className="mt-16 bg-[#1B5E20] text-emerald-100 border border-emerald-800/40 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden" id="mission-statement-card">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-900/20 rounded-full opacity-60 -translate-y-10 translate-x-10 -z-10" />
          
          <div className="w-full space-y-8">
            <div className="space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-widest bg-emerald-900 border border-emerald-800/50 w-fit px-3.5 py-1.5 rounded-full text-emerald-300">
                {translations.missionTitle[language]}
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">
                {translations.missionTitle[language]} : {translations.appName[language]}
              </h3>
              <p className="text-sm md:text-base font-medium leading-relaxed text-emerald-100">
                {translations.missionText[language]}
              </p>
            </div>

            {/* Core Services dynamic highlight block for Gadaa protection */}
            <div className="pt-8 border-t border-emerald-800/30">
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-6">
                {language === 'om' ? 'Tajaajila Keenya Maayicroofayinaansii' : 'Our Microfinance Services'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Savings Account */}
                <div className="bg-[#114216] border border-emerald-800/30 p-5 rounded-2xl space-y-3 hover:bg-[#16501c] transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-[#0d3411] flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-300" />
                  </div>
                  <h5 className="text-sm font-extrabold uppercase tracking-wider text-emerald-100">
                    {translations.serviceSavingsTitle[language]}
                  </h5>
                  <p className="text-xs text-emerald-200/90 font-semibold leading-relaxed">
                    {translations.serviceSavingsDesc[language]}
                  </p>
                </div>

                {/* Agricultural & Micro Loans */}
                <div className="bg-[#114216] border border-emerald-800/30 p-5 rounded-2xl space-y-3 hover:bg-[#16501c] transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-[#0d3411] flex items-center justify-center">
                    <Sprout className="w-5 h-5 text-emerald-300" />
                  </div>
                  <h5 className="text-sm font-extrabold uppercase tracking-wider text-emerald-100">
                    {translations.serviceLoansTitle[language]}
                  </h5>
                  <p className="text-xs text-emerald-200/90 font-semibold leading-relaxed">
                    {translations.serviceLoansDesc[language]}
                  </p>
                </div>

                {/* Micro-Insurance (Welfare) */}
                <div className="bg-[#114216] border border-emerald-800/30 p-5 rounded-2xl space-y-3 hover:bg-[#16501c] transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-[#0d3411] flex items-center justify-center">
                    <Award className="w-5 h-5 text-emerald-300" />
                  </div>
                  <h5 className="text-sm font-extrabold uppercase tracking-wider text-emerald-100">
                    {translations.serviceInsuranceTitle[language]}
                  </h5>
                  <p className="text-xs text-emerald-200/90 font-semibold leading-relaxed">
                    {translations.serviceInsuranceDesc[language]}
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Full-Screen Ultra HD Zoom Lightbox Modal */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#020d05]/98 backdrop-blur-xl flex flex-col justify-between overflow-hidden"
              onMouseUp={handleMouseUp}
              id="ultra-hd-lightbox-modal"
            >
              {/* Header section with branding, slide info and zoom controls */}
              <div className="w-full bg-black/40 border-b border-emerald-950/40 p-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 z-10 shrink-0">
                <div className="text-left space-y-1">
                  <span className="text-[9px] font-bold tracking-widest text-[#054823] bg-emerald-950/60 border border-emerald-900/40 px-3 py-1 rounded-full uppercase">
                    {slideshowImages[currentSlide].badge[language]}
                  </span>
                  <h3 className="text-sm md:text-base font-extrabold text-white leading-tight font-sans mt-1">
                    {slideshowImages[currentSlide].title[language]}
                  </h3>
                </div>

                {/* Toolbar containing precise zoom adjustments, instructions & close btn */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <div className="flex items-center bg-emerald-950/50 border border-emerald-900/40 rounded-xl p-1 gap-1">
                    <button 
                      onClick={handleZoomOut} 
                      disabled={zoomLevel <= 1}
                      className="p-2 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-900/30 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] font-mono font-bold text-emerald-300 px-2 min-w-[3rem] text-center">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button 
                      onClick={handleZoomIn} 
                      disabled={zoomLevel >= 4}
                      className="p-2 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-900/30 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={resetZoom} 
                      disabled={zoomLevel === 1 && panOffset.x === 0 && panOffset.y === 0}
                      className="p-2 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-900/30 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                      title="Reset Zoom & Pan"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  <button 
                    onClick={() => {
                      setIsLightboxOpen(false);
                      resetZoom();
                    }}
                    className="p-2 md:p-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-200 border border-red-900/40 transition-all cursor-pointer shadow-md"
                    title="Close Lightbox (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Interactive Stage with draggable viewport */}
              <div 
                className="flex-1 w-full relative flex items-center justify-center overflow-hidden p-4 select-none cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {/* Overlay navigation buttons inside the viewport */}
                <button 
                  onClick={(e) => { e.stopPropagation(); prevLightboxSlide(); }}
                  className="absolute left-4 md:left-8 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-emerald-950 text-white flex items-center justify-center transition-all border border-emerald-900/40 shadow-xl cursor-pointer"
                  title="Previous Image (Arrow Left)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button 
                  onClick={(e) => { e.stopPropagation(); nextLightboxSlide(); }}
                  className="absolute right-4 md:right-8 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-emerald-950 text-white flex items-center justify-center transition-all border border-emerald-900/40 shadow-xl cursor-pointer"
                  title="Next Image (Arrow Right)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Animated image container */}
                <div className="w-full h-full max-w-5xl max-h-[70vh] flex items-center justify-center relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img 
                        src={slideshowImages[currentSlide].src}
                        alt={slideshowImages[currentSlide].title[language]}
                        style={{
                          transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                          transition: isDragging ? 'none' : 'transform 0.15s ease-out'
                        }}
                        className="max-w-full max-h-full object-contain select-none pointer-events-none rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Helper overlay tips */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-900/20 text-xs font-semibold text-emerald-300 tracking-wide shadow-xl flex items-center gap-2">
                  <ScanEye className="w-4 h-4 text-emerald-400" />
                  <span>
                    {zoomLevel > 1 
                      ? (language === 'om' ? "GUDDISTEE JIRTA: Qabadhu harkisi garasii deebisi" : language === 'am' ? "አጎልተውታል: ምስሉን በመያዝ ማንቀሳቀስ ይችላሉ" : "ZOOMED IN: Grab and drag to pan around and inspect faces")
                      : (language === 'om' ? "Guddisee laaluuf badbii + cuqqisi yookaan harkiisi" : language === 'am' ? "ለማጉላት የ+ ምልክቱን ይጫኑ" : "Use zoom controls (+/-) to view details in High-Definition")}
                  </span>
                </div>
              </div>

              {/* Bottom Thumbnail Selector and Caption */}
              <div className="w-full bg-black/50 border-t border-emerald-950/40 p-4 shrink-0 flex flex-col items-center gap-4 z-10">
                <div className="flex items-center gap-3 justify-start md:justify-center overflow-x-auto max-w-full pb-2 px-4 no-scrollbar">
                  {slideshowImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentSlide(idx);
                        resetZoom();
                      }}
                      className={`relative w-20 md:w-28 aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shrink-0 ${
                        idx === currentSlide 
                          ? 'border-[#054823] scale-105 shadow-md shadow-[#054823]/20' 
                          : 'border-transparent opacity-50 hover:opacity-100 hover:scale-102'
                      }`}
                    >
                      <img 
                        src={img.src} 
                        alt="Thumbnail" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
