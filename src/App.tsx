import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Users, Heart, Award, ArrowUp, ArrowRight, Sprout } from 'lucide-react';

import { Language, ActiveTab } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Community from './components/Community';
import ContributionPortal from './components/ContributionPortal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HomeOverview from './components/HomeOverview';
import GadaaAssistant from './components/GadaaAssistant';

export default function App() {
  const [language, setLanguage] = useState<Language>('om'); // Default to Afaan Oromo as cultural home branch focus
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [aboutSubTab, setAboutSubTab] = useState<'mission' | 'history' | 'structure' | 'management'>('mission');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSubItem = (tabId: ActiveTab, elementId: string, subTab?: string) => {
    setActiveTab(tabId);
    if (subTab) {
      setAboutSubTab(subTab as any);
    }
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-emerald-50 text-slate-900 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-950">

      {/* Modern Navigation header component */}
      <Navbar 
        language={language} 
        setLanguage={setLanguage} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onNavigateSubItem={handleNavigateSubItem}
      />

      {/* Main viewport area with animated transition switches */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + '_' + language}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {activeTab === 'home' && (
              <>
                {/* Hero Showcase containing statistics & Gadaa mission cards */}
                <Hero language={language} setActiveTab={setActiveTab} />
                
                {/* Summary Services Teaser Grid on landing page */}
                <div className="bg-emerald-50/20 py-16 border-t border-emerald-50">
                  <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 text-center space-y-12">
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                        {language === 'om' ? 'Finfinnii fi Adamaa' : 'Regional Protection'}
                      </span>
                      <h3 className="text-xl md:text-2xl font-extrabold text-emerald-950 uppercase tracking-wider font-sans">
                        {language === 'om' ? 'Maaliif Buusaa Gonofaa Damee Adamaa Filattu?' :
                         language === 'am' ? 'ለምን የአዳማ ቅርንጫፍን ይመርጣሉ?' :
                         'Why Partner with Buusaa Gonofaa Adama Branch?'}
                      </h3>
                      <p className="text-xs text-emerald-800/60 font-semibold max-w-xl mx-auto leading-relaxed">
                        {language === 'om' ? 'Moodeela misooma qusachaa amansiisaa sirna aadaa herregatiin gargaarramee dhalootaaf dhiyeessuuf' :
                         language === 'am' ? 'ባህላዊ እሴቶቻችንን ከዘመናዊ የማይክሮ ፋይናንስ ዋስትና ጋር በማጣመር አስተማማኝ ድጋፍ እንሰጣለን።' :
                         'By embedding ancient Gadaa cooperative principles into indexed agricultural safety tools.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="bg-white p-6 rounded-2xl border border-emerald-50 text-left space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                          <Users className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider">
                          {language === 'om' ? 'Dhuunfaa fi Waliin' : 'Member Authority'}
                        </h4>
                        <p className="text-[11px] text-emerald-800/60 font-semibold leading-relaxed">
                          {language === 'om' ? 'Mirkaneessitoota keenya hundaaf tajaajila liqii dhalata malee safiisaan qopheessuun dhimma jalqabaati.' :
                           language === 'am' ? 'ለአባላቶች ያለ ወለድና ያለ ምንም አስተዳደራዊ ውዝግብ ፈጣን ብድሮችን እናዘጋጃለን።' :
                           'Direct participatory decisions. Fully controlled, transparent crop risk calculations for mutual growth.'}
                        </p>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-emerald-50 text-left space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                          <Compass className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider">
                          {language === 'om' ? 'Kallattii Misoomaa' : 'Agricultural Focus'}
                        </h4>
                        <p className="text-[11px] text-emerald-800/60 font-semibold leading-relaxed">
                          {language === 'om' ? 'Sanyii filatamaa, xaa\'oo fi meeshalee jallisi mijeessuun qonnaan bultootaaf tajaajila liqiin dhiheessu.' :
                           language === 'am' ? 'አንድ ለአምስት የኅብረት ዋስትናዎችን እና የምርጥ ዘር ልማት ብድሮችን ለአርሶ አደሮች እናቀርባለን።' :
                           'Specialized seasonal loans for high-grade crop strains, inputs, and advanced drip irrigation.'}
                        </p>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-emerald-50 text-left space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                          <Heart className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider">
                          {language === 'om' ? 'Wabii Hawaasummaa' : 'Cultural Solidarity'}
                        </h4>
                        <p className="text-[11px] text-emerald-800/60 font-semibold leading-relaxed">
                          {language === 'om' ? 'Wal-ta\'insaa aadaa Sololiyaa fi gargaarsa balaa maatii deeggaraa jiran haguuggii inshuraansii dhiyeessu.' :
                           language === 'am' ? 'በአስቸጋሪ ወቅት በአገር ውስጥና በውጭ አገር የሚኖሩ ወገኖችን በማቀናጀት ማህበራዊ ድጋፍ እንመድባለን።' :
                           'Guarding elders and ultra-poor families through local and Diaspora support solidarity resources.'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => setActiveTab('services')}
                        className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        {language === 'om' ? 'Tajaajila Keenya Hunda Ilaali' : 'Check All Core Services'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>

                {/* Branch Mission, News feed, and Urgent campaigns overview */}
                <HomeOverview 
                  language={language} 
                  setActiveTab={setActiveTab} 
                  aboutSubTab={aboutSubTab} 
                  setAboutSubTab={setAboutSubTab} 
                />
              </>
            )}

            {/* Individual Page components rendering dynamic content */}
            {activeTab === 'services' && (
              <Services 
                language={language} 
                initialInquiryActive={aboutSubTab === 'inquiry'} 
              />
            )}
            {activeTab === 'community' && <Community language={language} />}
            {activeTab === 'contribution' && <ContributionPortal language={language} />}
            {activeTab === 'contact' && <Contact language={language} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Sustainable Bottom Footer containing quick pathways and legal details */}
      <Footer language={language} setActiveTab={setActiveTab} />

      {/* Sustainable Floating AI Assistant */}
      <GadaaAssistant language={language} />

      {/* Modern float-to-top micro-interaction shortcut */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all z-40 border border-emerald-500 cursor-pointer"
        aria-label="Scroll to top"
        id="scroll-to-top-btn"
      >
        <ArrowUp className="w-4.5 h-4.5" />
      </button>

    </div>
  );
}
