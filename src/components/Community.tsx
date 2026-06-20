import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, ArrowRight, Image as ImageIcon, Sparkles, X } from 'lucide-react';
import { Language, NewsItem, EventItem } from '../types';
import { translations } from '../translations';
import { mockNews, mockEvents } from '../data';

interface CommunityProps {
  language: Language;
}

export default function Community({ language }: CommunityProps) {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  // Custom dummy image gallery representing Adama and nearby farming zones
  const galleryPlaceholders = [
    {
      id: 'g1',
      title: { om: "Maatiilee Oromia deeggaramaa jiran", am: "የድጋፍ አሰጣጥ ሥነ-ሥርዓት", en: "Adama Elder Co-insurance Handouts" },
      src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 'g2',
      title: { om: "Misooma Sanyii Filatamaa damee qonnaa", am: "የምርጥ ዘር ልማት በአዳማ ዙሪያ", en: "Wheat Strain Adaptation Monitoring" },
      src: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 'g3',
      title: { om: "Wal-gahi Hawaasa Wal-gargaarsaa", am: "የኅብረት ምክክር በአዳማ ቅርንጫፍ", en: "Regional Member Cooperative Assembly" },
      src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 'g4',
      title: { om: "Leenjii daldala dubartootaa", am: "ለሴቶች የሚደረግ የልማት ውይይት", en: "Adama Microenterprise Training Class" },
      src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 'g5',
      title: { om: "Gabaasa Kaameraa OBN Adamaa", am: "የኦቢኤን ካሜራ ቡድን በአዳማ ሰብል ምርመራ", en: "OBN Broadcast Crew Capturing Crop Stories" },
      src: "https://images.unsplash.com/photo-1492534513006-37715f336a39?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 'g6',
      title: { om: "Oomisha Qoranii Misooma Liqii", am: "በግብርና ብድር የታገዘ የሽምብራ ምርት", en: "Wheat Harvesting Funded by Agriculture Loans" },
      src: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 'g7',
      title: { om: "Marii Abbooti Gadaa Adamaa", am: "የአዳማ አባገዳዎች ባህላዊ ምክክር ስብሰባ", en: "Gadaa Cultural General Council in Session" },
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 'g8',
      title: { om: "Leenjii CBE Birr fi Telebirr", am: "ለአርሶ አደሮች የታሰበ ዲጂታል ቴክኖሎጂ ስልጠና", en: "Mobile Money & Premium Payout Tutorial" },
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-white via-emerald-50/15 to-white py-12 md:py-16 shadow-[0_0_50px_rgba(16,185,129,0.05)_inset] border-t border-emerald-100" id="community-section">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Core Header section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-white border border-emerald-100/100 text-[#0B6B3A] text-xs font-bold uppercase tracking-widest">
            {language === 'om' ? 'Aadaan Keenya Hawaasa Keenya' : language === 'am' ? 'የገዳ ባህል ዕሴቶች' : 'Gadaa Mutual Safety'}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B6B3A] tracking-tight font-sans">
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
            <h3 className="text-lg font-extrabold text-[#0B6B3A] uppercase tracking-widest flex items-center gap-2 mb-6">
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
                  <div className="w-full md:w-44 aspect-video md:aspect-square rounded-2xl bg-emerald-50 overflow-hidden shrink-0 border border-emerald-100">
                    <img 
                      src={news.imagePlaceholder} 
                      alt={news.title[language]} 
                      className="w-full h-full object-cover grayscale-0 brightness-100"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* News metadata details */}
                  <div className="flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                        <span>{news.category}</span>
                        <span>&bull;</span>
                        <span>{news.date}</span>
                      </div>
                      
                      <h4 className="text-sm font-bold text-[#0B6B3A] tracking-tight">
                        {news.title[language]}
                      </h4>
                      <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                        {news.summary[language]}
                      </p>
                    </div>

                    <div>
                      <button
                        onClick={() => setSelectedNews(news)}
                        className="inline-flex items-center gap-2 text-[#0B6B3A] hover:text-emerald-900 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        <span>{translations.readMore[language]}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Local Active Gadaa-led Safety Events list */}
          <div className="lg:col-span-5 space-y-8" id="events-subcontainer">
            <h3 className="text-lg font-extrabold text-[#0B6B3A] uppercase tracking-widest flex items-center gap-2 mb-6">
              <span className="w-1.5 h-3.5 rounded-sm bg-emerald-600 block" />
              <span>{translations.eventsTitle[language]}</span>
            </h3>

            <div className="space-y-6">
              {mockEvents.map((event) => (
                <div 
                  key={event.id}
                  className="bg-white rounded-3xl border border-emerald-100 p-6 hover:border-[#0B6B3A] hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                  id={`event-item-card-${event.id}`}
                >
                  
                  {/* Event active state banner */}
                  {event.status === 'ongoing' && (
                    <div className="absolute top-0 right-0 bg-[#0B6B3A] text-white text-[9px] font-bold tracking-widest uppercase px-3.5 py-1">
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
            {galleryPlaceholders.map((img) => (
              <div 
                key={img.id}
                className="group relative h-64 rounded-2xl bg-emerald-50 overflow-hidden border border-emerald-100 hover:shadow-md transition-all duration-300"
                id={`gallery-photo-idx-${img.id}`}
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
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                    {img.title[language]}
                  </h5>
                  <span className="text-[10px] font-semibold text-emerald-300 uppercase tracking-widest mt-1 block">
                    Buusaa Gonofaa Adama
                  </span>
                </div>
              </div>
            ))}
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
                  <div className="aspect-video w-full rounded-2xl bg-emerald-100 overflow-hidden border border-emerald-100">
                    <img 
                      src={selectedNews.imagePlaceholder} 
                      alt={selectedNews.title[language]} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
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

                  <div className="pt-4 border-t border-emerald-50 flex justify-end">
                    <button
                      onClick={() => setSelectedNews(null)}
                      className="bg-emerald-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl hover:bg-emerald-700 transition"
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
