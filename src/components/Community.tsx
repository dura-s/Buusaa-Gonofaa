import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, ArrowRight, Image as ImageIcon, Sparkles, X, Play, ExternalLink, Youtube } from 'lucide-react';
import { Language, NewsItem, EventItem } from '../types';
import { translations } from '../translations';
import { mockNews, mockEvents } from '../data';
import fbAssemblyImage from '../assets/images/photo_2026-06-25_11-53-22.jpg';
import absSupportImage from '../assets/images/photo_2026-06-25_11-53-21.jpg';

interface CommunityProps {
  language: Language;
}

export default function Community({ language }: CommunityProps) {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  // Custom image gallery representing actual Adama branch activities and official sources
  const galleryPlaceholders = [
    {
      id: 'g_youtube',
      title: { om: "Vidiyoo Gabaasa Hojii Buusaa Gonofaa Magaalaa Adaamaa", am: "የአዳማ ከተማ ቡሳ ጎኖፋ ቪዲዮ መግለጫ", en: "Official Adama City Buusaa Gonofaa Video Documentary" },
      src: "https://img.youtube.com/vi/HwJf1wdU4lk/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=HwJf1wdU4lk"
    },
    {
      id: 'g_yt_screenshot1',
      title: { 
        om: "Abbootii Gadaa fi Hoggansa Yaa'ii irratti (Viidiyoo irraa)", 
        am: "አባገዳዎችና አመራሮች በስብሰባው ላይ (ከቪዲዮው የተወሰደ)", 
        en: "Council Elders & Branch Leaders at Assembly (Captured from Video)" 
      },
      src: "https://img.youtube.com/vi/HwJf1wdU4lk/hq1.jpg",
      link: "https://www.youtube.com/watch?v=HwJf1wdU4lk"
    },
    {
      id: 'g_yt_screenshot2',
      title: { 
        om: "Marii Fi Hirmaannaa Hawaasa Adaamaa (Viidiyoo irraa)", 
        am: "የአዳማ ከተማ ማህበረሰብ ውይይትና ተさとፎ (ከቪዲዮው)", 
        en: "Adama Community Group Discussion & Mutual Support (From Video)" 
      },
      src: "https://img.youtube.com/vi/HwJf1wdU4lk/hq2.jpg",
      link: "https://www.youtube.com/watch?v=HwJf1wdU4lk"
    },
    {
      id: 'g_yt_screenshot3',
      title: { 
        om: "Hark-qalleeyyoota Deeggarsa Fudhatan (Viidiyoo irraa)", 
        am: "የእህል እርዳታና ሰብአዊ ድጋፍ ስርጭት (ከቪዲዮው)", 
        en: "Distribution of Local Safety Net Resources (From Video)" 
      },
      src: "https://img.youtube.com/vi/HwJf1wdU4lk/hq3.jpg",
      link: "https://www.youtube.com/watch?v=HwJf1wdU4lk"
    },
    {
      id: 'g_fb_assembly',
      title: { om: "Yaa'ii Buusaa Gonofaa Damee Magaalaa Adaamaa (Suuraalee)", am: "የአዳማ ከተማ የቡሳ ጎኖፋ ጠቅላላ ጉባኤ በምስል", en: "Adama City Branch General Assembly (Photo Stream)" },
      src: fbAssemblyImage,
      link: "https://www.facebook.com/biru61d/posts/yaaii-buusaa-gonofaa-damee-magaalaa-adaamaa-suuraan/1300527142092755/"
    },
    {
      id: 'g_abs_grain',
      title: { om: "Deeggarsa Midhaan Nyaataa Harka-qalleeyyoota 50f Kennamedha", am: "የእህል ምግቦች ድጋፍ ለ 50 ችግረኛ ነዋሪዎች", en: "Adama Grain Support and Food Security Delivery" },
      src: absSupportImage,
      link: "https://abs.gov.et/waajjirri-buusaa-gonofaa-damee-adaamaa-harka-qalleeyyoota-50f-deeggarsa-midhaan-nyaataa-taasisee/"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-white via-emerald-50/15 to-white py-12 md:py-16 shadow-[0_0_50px_rgba(16,185,129,0.05)_inset] border-t border-emerald-100" id="community-section">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Core Header section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-white border border-emerald-100/100 text-[#054823] text-xs font-bold uppercase tracking-widest">
            {language === 'om' ? 'Aadaan Keenya Hawaasa Keenya' : language === 'am' ? 'የገዳ ባህል ዕሴቶች' : 'Gadaa Mutual Safety'}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#054823] tracking-tight font-sans">
            {translations.communityHeader[language]}
          </h2>
          <p className="text-base text-gray-600 font-medium leading-relaxed">
            {translations.communitySubtitle[language]}
          </p>
        </div>

        {/* Dynamic Grid: Columns split between News (7 Cols) and Events (5 Cols) on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main News flow (Left Hand Side) */}
          <div className="lg:col-span-7 space-y-8" id="news-subcontainer">
            <h3 className="text-lg font-extrabold text-[#054823] uppercase tracking-widest flex items-center gap-2 mb-6">
              <span className="w-1.5 h-3.5 rounded-sm bg-emerald-600 block" />
              <span>{translations.newsTitle[language]}</span>
            </h3>

            <div className="space-y-6">
              {mockNews.map((news) => (
                <div 
                  key={news.id}
                  className="bg-white rounded-3xl border border-emerald-100 p-6 flex flex-col md:flex-row gap-6 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
                  id={`news-item-card-${news.id}`}
                >
                  {/* Photo Container */}
                  <div 
                    className="w-full md:w-72 aspect-video rounded-2xl bg-[#1B5E20] overflow-hidden shrink-0 border border-emerald-900/20 shadow-sm relative group cursor-pointer"
                    onClick={() => {
                      if (news.youtubeId && news.externalLink) {
                        window.open(news.externalLink, '_blank');
                      } else {
                        setSelectedNews(news);
                      }
                    }}
                  >
                    <img 
                      src={news.imagePlaceholder} 
                      alt={news.title[language]} 
                      className="w-full h-full object-cover grayscale-0 brightness-100 transform transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {news.youtubeId && (
                      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors flex items-center justify-center">
                        <div className="w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 duration-200">
                          <Play className="w-6 h-6 fill-current translate-x-0.5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* News metadata details */}
                  <div className="flex flex-col justify-between space-y-4 flex-grow">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                        <span>{news.category}</span>
                        <span>&bull;</span>
                        <span>{news.date}</span>
                      </div>
                      
                      <h4 className="text-sm font-bold text-[#054823] tracking-tight">
                        {news.title[language]}
                      </h4>
                      <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                        {news.summary[language]}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                      <button
                        onClick={() => {
                          if (news.youtubeId && news.externalLink) {
                            window.open(news.externalLink, '_blank');
                          } else {
                            setSelectedNews(news);
                          }
                        }}
                        className="inline-flex items-center gap-2 text-[#054823] hover:text-emerald-900 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        <span>{news.youtubeId ? (language === 'om' ? 'Fiilmii Daawwadhu' : language === 'am' ? 'ቪዲዮውን ይመልከቱ' : 'Watch Video') : translations.readMore[language]}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {news.externalLink && (
                        <a
                          href={news.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-800 text-xs font-black uppercase tracking-widest transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {news.youtubeId ? (
                            <>
                              <Youtube className="w-4 h-4 text-red-600 shrink-0" />
                              <span>YouTube</span>
                            </>
                          ) : news.externalLink.includes('facebook') ? (
                            <>
                              <span className="text-blue-600 font-black shrink-0">Facebook</span>
                            </>
                          ) : (
                            <>
                              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                              <span>{language === 'om' ? 'ABS Gabaasa' : language === 'am' ? 'ኤቢኤስ ዘገባ' : 'ABS News'}</span>
                            </>
                          )}
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Local Active Gadaa-led Safety Events list */}
          <div className="lg:col-span-5 space-y-8" id="events-subcontainer">
            <h3 className="text-lg font-extrabold text-[#054823] uppercase tracking-widest flex items-center gap-2 mb-6">
              <span className="w-1.5 h-3.5 rounded-sm bg-emerald-600 block" />
              <span>{translations.eventsTitle[language]}</span>
            </h3>

            <div className="space-y-6">
              {mockEvents.map((event) => (
                <div 
                  key={event.id}
                  className="bg-white rounded-3xl border border-emerald-100 p-6 hover:border-[#054823] hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                  id={`event-item-card-${event.id}`}
                >
                  
                  {/* Event active state banner */}
                  {event.status === 'ongoing' && (
                    <div className="absolute top-0 right-0 bg-[#054823] text-white text-[9px] font-bold tracking-widest uppercase px-3.5 py-1">
                      {language === 'om' ? 'Amma' : language === 'am' ? 'በሂደት ላይ' : 'Active'}
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Gadaa Local Framework terms */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-lg text-emerald-800 text-[10px] font-bold uppercase tracking-wide">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{event.gadaaTerm[language]}</span>
                    </div>

                    <h4 className="text-sm font-bold text-emerald-950 tracking-tight">
                      {event.title[language]}
                    </h4>

                    <p className="text-xs text-emerald-800/60 font-semibold leading-relaxed">
                      {event.description[language]}
                    </p>

                    {/* Meta info tags */}
                    <div className="pt-4 border-t border-emerald-50 grid grid-cols-2 gap-2 text-[10.5px] font-semibold text-emerald-900/70 uppercase tracking-wide">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate">{event.location[language]}</span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Integrated Beautiful Image gallery displaying local action */}
        <div className="mt-20 pt-16 border-t border-emerald-50" id="gallery-section-wrapper">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <h3 className="text-lg font-bold text-emerald-950 uppercase tracking-widest">
                {translations.galleryTitle[language]}
              </h3>
              <p className="text-xs text-emerald-800/60 font-semibold uppercase mt-1">
                {language === 'om' ? 'Gochaa fi jireenya qonnaan bultootaa damee keenya biratti' : 
                 language === 'am' ? 'የአዳማ አርሶ አደሮች የዕድገት ገጽታዎች' : 
                 'Empowered families & member snapshots from Central Adama District'}
              </p>
            </div>
            <div className="flex gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl">
              <ImageIcon className="w-4 h-4 text-emerald-600" />
              <span>{language === 'om' ? 'Kuma 4 Ol Kaafame' : language === 'am' ? 'ከ4ሽ በላይ ፎቶዎች' : '4,000+ Assets'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryPlaceholders.map((img) => {
              const CardWrapper = (img as any).link ? 'a' : 'div';
              const extraProps = (img as any).link ? {
                href: (img as any).link,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "group relative h-64 rounded-2xl bg-emerald-50 overflow-hidden border border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 cursor-pointer block"
              } : {
                className: "group relative h-64 rounded-2xl bg-emerald-50 overflow-hidden border border-emerald-100 hover:shadow-md transition-all duration-300 block"
              };

              return (
                <CardWrapper 
                  key={img.id}
                  id={`gallery-photo-idx-${img.id}`}
                  {...extraProps}
                >
                  {/* Image overlay */}
                  <img 
                    src={img.src} 
                    alt={img.title[language]} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Cover label on Hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-emerald-950/90 to-emerald-900/20 p-4 transition-opacity duration-300">
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider line-clamp-2">
                      {img.title[language]}
                    </h5>
                    <span className="text-[10px] font-semibold text-emerald-300 uppercase tracking-widest mt-1 block">
                      {(img as any).link ? (img.id === 'g_youtube' ? 'Watch Documentary ↗' : 'Official Page ↗') : 'Buusaa Gonofaa Adama'}
                    </span>
                  </div>
                </CardWrapper>
              );
            })}
          </div>
        </div>

        {/* Detailed News Modal (AnimatePresence) */}
        <AnimatePresence>
          {selectedNews && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                className="fixed inset-0 bg-white/70 backdrop-blur-md ring-1 ring-emerald-400/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedNews(null)}
              />

              <motion.div 
                className="relative bg-white w-full max-w-2xl rounded-3xl border border-emerald-100 shadow-2xl overflow-hidden p-8 z-10"
                initial={{ scale: 0.95, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 15, opacity: 0 }}
              >
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 p-2 text-emerald-900/60 hover:text-emerald-900 hover:bg-emerald-50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  <div className="aspect-video w-full rounded-2xl bg-black overflow-hidden border border-emerald-900/20 relative">
                    {selectedNews.youtubeId ? (
                      <iframe 
                        src={`https://www.youtube.com/embed/${selectedNews.youtubeId}?autoplay=1`} 
                        title={selectedNews.title[language]}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    ) : (
                      <img 
                        src={selectedNews.imagePlaceholder} 
                        alt={selectedNews.title[language]} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                      <span>{selectedNews.category}</span>
                      <span>&bull;</span>
                      <span>{selectedNews.date}</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-emerald-950 font-sans tracking-tight leading-normal">
                      {selectedNews.title[language]}
                    </h3>

                    <p className="text-xs font-semibold text-emerald-900/70 leading-relaxed uppercase bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-100/50">
                      {selectedNews.summary[language]}
                    </p>

                    <p className="text-xs text-emerald-800/80 font-medium leading-relaxed font-sans">
                      {selectedNews.content[language]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-emerald-50 flex justify-between items-center">
                    {selectedNews.externalLink ? (
                      <a
                        href={selectedNews.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-black text-xs px-5 py-2.5 rounded-xl transition-colors"
                      >
                        {selectedNews.youtubeId ? (
                          <>
                            <Youtube className="w-4 h-4 text-red-600" />
                            <span>{language === 'om' ? 'YouTube irratti Ilaali' : language === 'am' ? 'በዩቲዩብ ይመልከቱ' : 'Watch on YouTube'}</span>
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-4 h-4 text-emerald-600" />
                            <span>{language === 'om' ? 'Madda Guutuu Dubbisi' : language === 'am' ? 'ሙሉውን ምንጭ አንብብ' : 'Read Full Original Article'}</span>
                          </>
                        )}
                      </a>
                    ) : <div />}

                    <button
                      onClick={() => setSelectedNews(null)}
                      className="bg-[#0B4C28] text-white font-bold text-xs px-6 py-2.5 rounded-xl hover:bg-[#063118] transition"
                    >
                      {language === 'om' ? 'Cufi' : language === 'am' ? 'ዝጋ' : 'Close Article'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
