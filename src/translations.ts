import { Language } from './types';

export const translations: Record<string, Record<Language, string>> = {
  // Navigation
  appName: {
    om: "Buusaa Gonofaa Adamaa",
    am: "ቡሳ ጎኖፋ አዳማ ቅርንጫፍ",
    en: "Buusaa Gonofaa Adama"
  },
  appSubtitle: {
    om: "Wajjiin Guddinaaf, Wal-Gargaarsaaf",
    am: "ለጋራ እድገትና ለውህደት",
    en: "Together for Development & Support"
  },
  navHome: {
    om: "Mana",
    am: "መነሻ",
    en: "Home"
  },
  navServices: {
    om: "Tajaajiloota",
    am: "አገልግሎቶች",
    en: "Services"
  },
  navCommunity: {
    om: "Hawaasa & Miidiyaa",
    am: "ማህበረሰብ እና ሚዲያ",
    en: "Community & Media"
  },
  navContribution: {
    om: "Gumaacha",
    am: "ልገሳ እና መዋጮ",
    en: "Contributions"
  },
  navContact: {
    om: "Quunnamtii",
    am: "ግንኙነት",
    en: "Contact Us"
  },

  // Hero Section
  heroTitle: {
    om: "Hawaasa Humneessuu fi Wal-gargaarsa Babal'isuu",
    am: "ማህበረሰቡን ማብቃት እና እርስ በእርስ መረዳዳትን ማስፋፋት",
    en: "Empowering Communities & Strengthening Mutual Support"
  },
  heroSubtitle: {
    om: "Buusaa Gonofaa Oromiyaa - Damee Adamaa: Tajaajila maayicroofayinaansii fi tajaajiloota hawaasummaa aadaa keenya Buusaa Gonofaa irratti hundaa'e dhiyeessuu.",
    am: "ቡሳ ጎኖፋ ኦሮሚያ - አዳማ ቅርንጫፍ- በባህላዊው የቡሳ ጎኖፋ እሴት ላይ የተመሰረተ የማይክሮ ፋይናንስ እና የማህበራዊ ዋስትና አገልግሎቶችን እናቀርባለን።",
    en: "Buusaa Gonofaa Oromiyaa - Adama Branch: Delivering microfinance and customized social protection services rooted in our cultural Buusaa Gonofaa cooperative values."
  },
  heroCtaPrimary: {
    om: "Amma Gumaachi",
    am: "አሁኑኑ ይደግፉ",
    en: "Contribute Now"
  },
  heroCtaSecondary: {
    om: "Tajaajila Keenya Meerree",
    am: "አገልግሎታችንን ይመልከቱ",
    en: "Explore Services"
  },
  missionTitle: {
    om: "Ergama Keenya",
    am: "ራእይና ተልዕኳችን",
    en: "Our Mission"
  },
  missionText: {
    om: "Tajaajila maayicroofayinaansii fi gargaarsa hawaasummaa wal-ta'insaa aadaa Oromoo 'Buusaa Gonofaa' irratti hundaa'e dhiyeessuun, hawaasa damee qonnaa fi daldala xixiqqoo jireenya isaanii akka fooyyeffatan gochuu.",
    am: "በባህላዊው የኦሮሞ 'ቡሳ ጎኖፋ' የእርዳታ እሴት ላይ የተመሰረቱ የቁጠባ፣ የብድር እና የማይክሮ-ኢንሹራንስ አገልግሎቶችን ለአርሶ አደሩና ለአነስተኛ ነጋዴው በማቅረብ ኑሮአቸውን ማሻሻል።",
    en: "To leverage the traditional Oromo mutual-aid system 'Buusaa Gonofaa' by delivering sound microfinance, tailored micro-insurance, and sustainable community support to transform livelihoods."
  },

  // Services View
  servicesTitle: {
    om: "Tajaajila Keenya Maayicroofayinaansii",
    am: "የማይክሮ ፋይናንስ አገልግሎቶቻችን",
    en: "Our Microfinance Services"
  },
  servicesSubtitle: {
    om: "Kunuunsa, liqii, fi tajaajila tiksii yeroo balaa hawaasa keenyaf heeraa fi aadaa irratti hundoofnee dhiyeessinu.",
    am: "ለአባላቶቻችን ብድርን ፣ ቁጠባን እና የማይክሮ-ኢንሹራንስ ዋስትናዎችን ምቹ በሆነ መንገድ እናቀርባለን።",
    en: "Thoughtfully structured, accessible products optimized for members, smallholder farmers, and local merchants in Adama."
  },
  serviceSavingsTitle: {
    om: "Tajiijila Qusannoo (Savings)",
    am: "የቁጠባ አገልግሎት",
    en: "Savings Accounts"
  },
  serviceSavingsDesc: {
    om: "Qusannoo dirqamaa fi fedhii irratti hundaa'e, kan amansiisaa ta'e fi guddina daldala keetiif bu'uura ta'u.",
    am: "የግዴታ እና ፍላጎት ላይ የተመሰረተ ቁጠባ ለቤትዎ ወይም ለንግድዎ መሠረት የሚጥሉበት አስተማማኝ አማራጭ።",
    en: "Flexible compulsory and voluntary savings accounts tailored for secure wealth building and business investments."
  },
  serviceLoansTitle: {
    om: "Liqii Qonnaa fi Daldaala Xixiqqaa",
    am: "የግብርና እና አነስተኛ ንግድ ብድር",
    en: "Agricultural & Micro Loans"
  },
  serviceLoansDesc: {
    om: "Sanyii filatamaa, xaa'oo fi meeshaalee qonnaa bituuf liqii gargaarsaa, fi daldaltoota xixiqqoof liqii hojii mijeessuu.",
    am: "ለግብርና ግብዓቶች ግዢ የሚሆን ምቹ ብድር እና ለአነስተኛ የንግድ ዘርፎች የሚውል ዝቅተኛ ወለድ ያለው ብድር።",
    en: "Low-interest loans tailored for purchasing farming inputs, seeds, implements, and capital injection for local businesses."
  },
  serviceInsuranceTitle: {
    om: "Maayicroo-Inshuraansii (Gargaarsa Waloo)",
    am: "የማይክሮ-ኢንሹራንስ ዋስትና",
    en: "Micro-Insurance"
  },
  serviceInsuranceDesc: {
    om: "Tikisii wabii balaa qonnaa fi fayyaa dhuunfaa kan gargaarsa hawaasa 'Buusaa Gonofaa' bu'ureeffate.",
    am: "በቡሳ ጎኖፋ ባህላዊ ዋስትና ላይ የተመሰረተ በሰብል ውድመት ወይም በታገቱ አደጋዎች ማህበራዊ ድጋፍ ሰጪ ሽፋን።",
    en: "Cooperative risk coverage shielding farmers and families from harvest failures patterns, illness, or emergency losses."
  },
  serviceApplyBtn: {
    om: "Amma Nootti Naffasii (Iyyadhu)",
    am: "አሁኑኑ ያመልክቱ",
    en: "Apply / Inquire Now"
  },
  applyModalTitle: {
    om: "Iyyannoo Tajaajilaa",
    am: "የአገልግሎት መጠይቅ ማመልከቻ",
    en: "Service Inquiry Form"
  },
  applyFormSuccess: {
    om: "Galatoomaa! Iyyannoon keessan damee Adamaa biraan gaheera. Dhihyeen isini qunnamna.",
    am: "እናመሰግናለን! መጠይቅዎ በተሳካ ሁኔታ ተልኳል፤ በቅርቡ እናገኝዎታለን።",
    en: "Thank you! Your service inquiry has been successfully sent to the Adama Branch. We will contact you shortly."
  },

  // Community & News Section
  communityHeader: {
    om: "Hawaasa Keenya fi Seenaa",
    am: "ማህበረሰብ እና ዜናዎች",
    en: "Our Community & News Updates"
  },
  communitySubtitle: {
    om: "Oduu haaraa, gumaacha hawaasaa fi saba-hawaasa aadaa Gadaa irratti hundaa'e.",
    am: "የቅርብ ጊዜ ዜናዎች ፣ የቡሳ ጎኖፋ ማህበራዊ ክንውኖች እና የገዳ ባህላዊ በዓላትን እዚህ ያገኛሉ።",
    en: "Stay updated with recent branch announcements, community stories, and cultural Gadaa-led initiatives."
  },
  newsTitle: {
    om: "Oduu fi Beeksisa Haaraa",
    am: "አዳዲስ ዜናዎችና ማስታወቂያዎች",
    en: "Latest Announcements"
  },
  eventsTitle: {
    om: "Kabaja Sirna Gadaa & Hawaasummaa",
    am: "የገዳ እና ማህበራዊ ዝግጅቶች",
    en: "Gadaa & Social Support Events"
  },
  galleryTitle: {
    om: "Kuusaa Fakkii Hawaasaa",
    am: "የፎቶ ማህደር",
    en: "Community Gallery"
  },
  readMore: {
    om: "Dubbisi",
    am: "ሙሉውን ያንብቡ",
    en: "Read Full Details"
  },

  // Contributions Portal
  contribTitle: {
    om: "Gumaacha fi Deeggarsa Hawaasummaa",
    am: "የማህበረሰብ መዋጮ እና ድጋፍ",
    en: "Diaspora & Member Contribution Portal"
  },
  contribSubtitle: {
    om: "Lammiilee keenya biyya keessaa fi biyya alaa (Diaspora) gargaarsa waliinii dhiyeessuuf meeshaa qunnamtii.",
    am: "በአገር ውስጥና በውጭ አገር የሚኖሩ ወገኖቻችን ለቡሳ ጎኖፋ ማህበራዊ ፈንድ የሚያደርጉት ድጋፍ ማስተባበሪያ።",
    en: "Enable local members and our global Diaspora network to co-invest in urgent social relief and agricultural recovery funds."
  },
  contribCampaigns: {
    om: "Duula Gumaacha Ammaa",
    am: "ወቅታዊ የድጋፍ ዘመቻዎች",
    en: "Active Relief Campaigns"
  },
  contribCustomAmount: {
    om: "Hamma Gumaacha Keetii Mirkaneessi",
    am: "የመዋጮ መጠን ይምረጡ",
    en: "Select Contribution Amount"
  },
  contribFormName: {
    om: "Maqaa Guutuu",
    am: "ሙሉ ስም",
    en: "Full Name"
  },
  contribFormEmail: {
    om: "Imeelii",
    am: "ኢሜይል",
    en: "Email Address"
  },
  contribFormPhone: {
    om: "Bilbila",
    am: "ስልክ ቁጥር",
    en: "Phone Number"
  },
  contribFormFund: {
    om: "Wajjiin Filadhu (Fund Category)",
    am: "የድጋፍ ዓይነት ማህደር",
    en: "Target Social Fund"
  },
  contribFund1: {
    om: "Gargaarsa Balaa Qonnattootaa",
    am: "የአደጋ ጊዜ ግብርና ፈንድ",
    en: "Emergency Crop & Farmer Relief"
  },
  contribFund2: {
    om: "Gargaarsa Fayyaa Hawaasa Dadhaboo",
    am: "ደካሞችን መርጃ የሕክምና ፈንድ",
    en: "Vulnerable Families Health Coverage"
  },
  contribFund3: {
    om: "Misooma Barnoota fi Bishaanii",
    am: "ለትምህርትና ንፁህ ውሃ ልማት",
    en: "Rural Educational & Water Infrastructure"
  },
  contribSubmitBtn: {
    om: "Gumaacha Eegali",
    am: "ድጋፉን ይጀምሩ",
    en: "Initiate Secure Contribution"
  },
  contribSuccessMsg: {
    om: "Gumaachi keessan milkiin galmeeffameera! Dameen Adamaa kabajaa guddasaa isiniif qaba.",
    am: "ድጋፍዎ በተሳካ ሁኔታ ተመዝግቧል! ስለ ደግነትዎ የቡሳ ጎኖፋ አዳማ ቅርንጫፍ ላቅ ያለ ምስጋና ያቀርባል።",
    en: "Your contribution has been successfully initiated! Buusaa Gonofaa Adama Branch deeply appreciates your solidarity."
  },

  // Contact Page
  contactHeader: {
    om: "Nuyi Quunnamaa",
    am: "ያግኙን",
    en: "Contact Adama Branch"
  },
  contactSubtitle: {
    om: "Biroo keenya jiru koottaa yookan bilbilaan nu quunnamaa.",
    am: "በቀጥታ በኢሜይል፣ በስልክ ወይም ቢሮአችን ድረስ በመምጣት ያነጋግሩን።",
    en: "Visit our executive offices in Adama or request information using the form below."
  },
  contactOfficeAddress: {
    om: "Teessoo Biroo: Adamaa, Oromiyaa, Itoophiyaa. Fuuldura Hoteela Postaa. Lakk. Postaa (P.O. Box): 20118, Addis Ababa.",
    am: "አድራሻ አዳማ፣ ኦሮሚያ፣ ኢትዮጵያ (ፖስታ ቤት ፊት ለፊት)፤ የፖስታ ሳጥን ቁጥር (P.O. Box): 20118፣ አዲስ አበባ።",
    en: "Address: Adama, Oromia, Ethiopia (Opposite Central Post Office Area) | P.O. Box: 20118, Addis Ababa."
  },
  contactPhoneLabel: {
    om: "Bilbila Biroo",
    am: "የስልክ መስመር",
    en: "Office Phone"
  },
  contactEmailLabel: {
    om: "Imeelii Biroo",
    am: "ኢሜይል",
    en: "Email Address"
  },
  contactWorkingHours: {
    om: "Sa'aatii Hojii: Wiixata - Jimaata (W.B. 2:00 Am - 11:30 Pm)",
    am: "የሥራ ሰዓት፡ ከሰኞ እስከ አርብ (ከጠዋቱ 2፡00 እስከ 11፡30 ሰዓት)",
    en: "Business Hours: Monday - Friday (8:00 AM - 5:30 PM East Africa Time)"
  },
  contactFormSubject: {
    om: "Dhimma",
    am: "አርዕስት",
    en: "Subject"
  },
  contactFormMessage: {
    om: "Ergaa Keeti",
    am: "መልዕክትዎ",
    en: "Your Message"
  },
  contactFormSubmit: {
    om: "Ergaa Ergi",
    am: "መልዕክቱ ይተላለፍ",
    en: "Send Message"
  },
  contactFormSuccess: {
    om: "Galatoomaa! Ergaan keessan damee keenyaan gaheera. Dhihyeen isini qunnamna.",
    am: "መልዕክትዎ በተሳካ ሁኔታ ደርሶናል፤ በአጭር ጊዜ ውስጥ ምላሽ እንሰጣለን።",
    en: "Message successfully sent! Our administrative team in Adama will review and respond to you shortly."
  },

  // Validation
  valRequired: {
    om: "Dirqama Guutamuu Qaba",
    am: "እባክዎ ይህንን ክፍል ይሙሉ",
    en: "This field is required"
  },
  valEmail: {
    om: "Imeelii sirrii galchaa",
    am: "ትክክለኛ ኢሜይል አድራሻ ያስገቡ",
    en: "Please enter a valid email address"
  },
  valPhone: {
    om: "Lakkoofsa bilbilaa sirrii",
    am: "ትክክለኛ የቁጥር ስልክ ያስገቡ",
    en: "Please enter a valid phone number"
  },
  valSuccess: {
    om: "Tole sirriidha",
    am: "በተሳካ ሁኔታ ተፈጽሟል",
    en: "Validation passed"
  }
};
