import { NewsItem, EventItem, DonationCamp } from './types';
import latestAssemblyImage from './assets/images/photo_2026-06-25_11-53-35.jpg';
import absSupportImage from './assets/images/photo_2026-06-25_11-53-21.jpg';
import fbAssemblyImage from './assets/images/photo_2026-06-25_11-53-22.jpg';

export const mockNews: NewsItem[] = [
  {
    id: 'n_youtube_video',
    date: '2026-06-20',
    category: 'Official Video Broadcast',
    imagePlaceholder: 'https://img.youtube.com/vi/HwJf1wdU4lk/maxresdefault.jpg',
    youtubeId: 'HwJf1wdU4lk',
    externalLink: 'https://www.youtube.com/watch?v=HwJf1wdU4lk',
    title: {
      om: "Daawwadhaa: Gabaasa Fi Viidiyoo Buusaa Gonofaa Damee Magaalaa Adaamaa",
      am: "ይመልከቱ፦ የአዳማ ከተማ የቡሳ ጎኖፋ ልዩ የቪዲዮ ዘገባ",
      en: "Watch: Official Video Documentary of Buusaa Gonofaa Adama Branch"
    },
    summary: {
      om: "Hojiiwwan gurguddoo fi tattaaffii buusaa gonofaa damee Magaalaa Adaamaa irratti viidiyoo gabaasa dhihaate kanaan daawwadhaa.",
      am: "በአዳማ ከተማ ቅርንጫፍ የቡሳ ጎኖፋ ዋና ዋና ተግባራትና ህዝባዊ መረዳጃዎች ዙሪያ የተዘጋጀውን ልዩ የቪዲዮ ዘገባ እዚህ ይመልከቱ።",
      en: "Watch the comprehensive video broadcast highlighting the official Buusaa Gonofaa operations and traditional safety nets in Adama."
    },
    content: {
      om: "Hojiiwwan gurguddoo, miseensummaa qusannaa fi gargaarsa namoomaa sassaabbii maallaqaa damee Magaalaa Adaamaa irratti ragaan gabaasa viidiyoo bal'aan dhihaateera. Marsariitii kanaan daawwachuun ni danda'ama.",
      am: "በአዳማ ከተማ የቡሳ ጎኖፋ ማህበረሰብ ድጋፍ፣ መደበኛ መዋጮዎችና ሰብአዊ ረድኤቶች ዙሪያ ሰፊ መግለጫና ቃለ ምልልስ ያካተተ ቪዲዮ ነው። ይህ የገዳ ስርዓት ስራዎችን ያጎላል።",
      en: "A fully documented broadcast of Adama branch activities showcasing community-led insurance, collective fundraising, and traditional safety nets. It perfectly demonstrates how ancient Gadaa values integrate with modern local administration."
    }
  },
  {
    id: 'n_abs_support',
    date: '2026-06-28',
    category: 'Humanitarian Aid',
    imagePlaceholder: absSupportImage,
    externalLink: 'https://abs.gov.et/waajjirri-buusaa-gonofaa-damee-adaamaa-harka-qalleeyyoota-50f-deeggarsa-midhaan-nyaataa-taasisee/',
    title: {
      om: "Waajjirri Buusaa Gonofaa Damee Adaamaa Harka-qalleeyyoota 50f Deeggarsa Midhaan Nyaataa Taasise",
      am: "የአዳማ ቅርንጫፍ የቡሳ ጎኖፋ ጽሕፈት ቤት ለ 50 ችግረኛ ነዋሪዎች የእህል ምግብ ድጋፍ አደረገ",
      en: "Adama Branch Buusaa Gonofaa Office Distributed Food Grain Support to 50 Underprivileged Residents"
    },
    summary: {
      om: "Dameen Adaamaa harka-qalleeyyoota magaalaa keessa jiraniif deeggarsa midhaan nyaataa raawwachuun gargaarsa namoomaa dhiyeesseera.",
      am: "የአዳማ ቅርንጫፍ ጽሕፈት ቤት በከተማዋ ለሚገኙ 50 አቅመ ደካሞችና ችግረኞች የእህል ድጋፍ በማድረግ ሰብአዊ አጋርነቱን አሳይቷል።",
      en: "Adama branch office delivered emergency grain and food packages directly to 50 highly vulnerable city resident families."
    },
    content: {
      om: "Gabaasa guutuu Waajjira Buusaa Gonofaa Damee Adaamaa irraa argame kanaan, harka-qalleeyyoota humna hin qabne 50f deeggarsi midhaan nyaataa kun kennamuun jireenya maatii isaanii kan deeggaru dha. Marsariitii ABS irraa dubbisuun ni danda'ama.",
      am: "የአዳማ ከተማ ቅርንጫፍ ባደረገው በዚህ የበጎ አድራጎት ዘመቻ፣ ለ50 ችግረኛ አባወራዎችና እማወራዎች የእህል እህል ድጋፍ በይፋ ተከፋፍሏል። ሙሉ ዘገባውን በኤቢኤስ (ABS) ድረ-ገጽ ላይ ያንብቡ።",
      en: "Through localized resource mobilization, the Adama branch team coordinated a fast grain distribution event, assisting 50 underprivileged families facing dry climate stress in East Shewa."
    }
  },
  {
    id: 'n_fb_assembly',
    date: '2026-06-25',
    category: 'General Assembly',
    imagePlaceholder: fbAssemblyImage,
    externalLink: 'https://www.facebook.com/biru61d/posts/yaaii-buusaa-gonofaa-damee-magaalaa-adaamaa-suuraan/1300527142092755/',
    title: {
      om: "Yaa'ii Buusaa Gonofaa Damee Magaalaa Adaamaa (Suuraan)",
      am: "የአዳማ ከተማ የቡሳ ጎኖፋ መደበኛ ጉባኤ በምስል",
      en: "Adama City Branch Buusaa Gonofaa General Assembly (In Photos)"
    },
    summary: {
      om: "Suuraalee yaa'ii gurguddaa fi hirmaannaa abbootii Gadaa damee Magaalaa Adaamaa irratti fuula Facebook keenya irratti dhihaate daawwadhaa.",
      am: "በአዳማ ከተማ የቡሳ ጎኖፋ አባገዳዎችና አመራሮች የተሳተፉበትን ታላቅ ጉባኤ በፌስቡክ ገጻችን ላይ ያሉትን ምስሎች ይመልከቱ።",
      en: "Explore the full photograph collection and council decisions from the Adama City Buusaa Gonofaa assembly via Facebook."
    },
    content: {
      om: "Yaa'ii miseensotaa fi hoggansa Buusaa Gonofaa Damee Magaalaa Adaamaa irratti suuraaleen ragaa gurguddoo hirmaannaa Abbootii Gadaa mul'isatn Facebook irratti dhihaataniiru.",
      am: "በአዳማ ከተማ የተካሄደው የቡሳ ጎኖፋ ጠቅላላ ጉባኤ በታላቅ ድምቀት ተካሂዷል። የአባገዳዎችና የአመራሮችን ተሳትፎ የሚያሳዩ ፎቶግራፎችን በፌስቡክ ይመልከቱ።",
      en: "A beautiful visual exhibition showing elders, local branch coordinators, and development agents discussing traditional insurance programs in central Adama."
    }
  },
  {
    id: 'n_assembly_3',
    date: '2026-06-25',
    category: 'Latest Assembly Event',
    imagePlaceholder: latestAssemblyImage,
    title: {
      om: "Marii Waltajjii Yaa'ii Buusaa Gonofaa Damee Adaamaa Marsaa 3ffaa Gaggeeffame",
      am: "3ኛው ዙር የቡሳ ጎኖፋ የአዳማ ቅርንጫፍ ጉባኤ ውይይት ተካሄደ",
      en: "3rd Round Buusaa Gonofaa Adama Branch Assembly Forum Held"
    },
    summary: {
      om: "Marii waltajjii kanarratti hooggantoonni, Abbootiin Gadaa fi hawaasni damee Adaamaa argamuun marii bal'aa gaggeessanii jiru.",
      am: "በዚህ ጉባኤ ላይ የአመራር አባላት፣ አባገዳዎችና የአዳማ ቅርንጫፍ ማህበረሰብ አባላት በመገኘት ሰፊ ውይይት አድርገዋል።",
      en: "Branch leaders, Abbaa Gadaas, and community members gathered for a comprehensive general assembly discussion."
    },
    content: {
      om: "Yaa'ii marsaa 3ffaa kanaan, hojiilee misooma hawaasummaa, inshuraansii qonnaa fi wal-gargaarsa Buusaa Gonofaa babal'isuuf xiyyeeffannoo guddaan kennameera. Waltajjichi tokkummaa fi ragaa sirna Gadaa irratti hundaa'ee milkaa'inaan xumurame.",
      am: "በዚህ 3ኛው ዙር ጉባኤ የማህበራዊ ልማት ስራዎችን፣ የግብርና ኢንሹራንስን እና የቡሳ ጎኖፋ የጋራ መረዳጃ ስርዓትን ለማጠናከር ትኩረት ተሰጥቷል። ውይይቱ በገዳ ስርዓት እሴቶችና በአንድነት መንፈስ በተሳካ ሁኔታ ተጠናቋል።",
      en: "During this 3rd round forum, key focus was placed on enhancing community social protection, expanding micro-insurance coverage for smallholder farmers, and strengthening the traditional Buusaa Gonofaa mutual aid mechanisms. The session successfully concluded highlighting Gadaa-led sustainability initiatives."
    }
  }
];

export const mockEvents: EventItem[] = [
  {
    id: 'e_assembly_3',
    title: {
      om: "Marii Waltajjii Yaa'ii Marsaa 3ffaa",
      am: "3ኛው ዙር የቡሳ ጎኖፋ ጠቅላላ ጉባኤ",
      en: "3rd Round Buusaa Gonofaa Adama Assembly"
    },
    date: '2026-06-25',
    gadaaTerm: {
      om: "Yaa'ii Buusaa Gonofaa",
      am: "የቡሳ ጎኖፋ ጠቅላላ ጉባኤ",
      en: "Gadaa General Council"
    },
    description: {
      om: "Marii waltajjii yaa'ii Buusaa Gonofaa Damee Adaamaa Marsaa 3ffaa adda durummaan dhimmoota misooma hawaasaa irratti xiyyeeffate.",
      am: "በአዳማ ቅርንጫፍ የተካሄደው 3ኛው ዙር የቡሳ ጎኖፋ ጉባኤ የግብርና ኢንሹራንስንና ማህበራዊ ጥበቃን ለማስፋፋት የተዘጋጀ ትልቅ መድረክ ነው።",
      en: "The 3rd Round Adama Branch General Assembly focused heavily on micro-insurance adaptation and local cooperative assistance mechanisms."
    },
    location: {
      om: "Galma Abbaa Gadaa Adamaa",
      am: "አዳማ አባ ገዳ አዳራሽ",
      en: "Abbaa Gadaa Hall, Central Adama"
    },
    status: 'completed'
  },
  {
    id: 'e_gadaa_social',
    title: {
      om: "Sirna Gadaa Dabaree Hawaasummaa fi Kunuunsa Dubartootaa",
      am: "የገዳ ባህላዊ ማህበራዊ ጥበቃ እና የመረዳጃ ስነ-ስርዓት",
      en: "Gadaa Social Protection Assembly & Hirphaa Safety-Net Allocations"
    },
    date: '2026-07-28',
    gadaaTerm: {
      om: "Sirna Gadaa - Gumaa Dabaree",
      am: "የገዳ ማህበራዊ መረዳጃ ስርዓት",
      en: "Gadaa Hirphaa Mutual Relief"
    },
    description: {
      om: "Walga'ii sirna Gadaatiin maatii dubartoota liqii qaban gargaaruun qusannaa isaanii deebisanii dandeessisuuf raawwatamu.",
      am: "የአዳማ አባገዳዎች ከመቶዎች ለሚበልጡ አቅመ ደካማ ገበሬዎችና መበለቶች የጋራ የገንዘብ ኢንሹራንስ ዋስትና ዕርዳታ የሚሰጡበት ባህላዊ የኅብረት ስብሰባ ማእከል።",
      en: "An integrated community Welfare Council based on Gadaa's Hirphaa (mutual relief) standards, allocating collective micro-insurance premiums & safety stipends directly to vulnerable widows and smallholders."
    },
    location: {
      om: "Ora Harsadii Adama Area",
      am: "አዳማ ኦራ ሀርሰዲ አዳራሽ (Ora Harsadii)",
      en: "Ora Harsadii Assembly Ground, Adama Rural Zone"
    },
    status: 'upcoming'
  },
  {
    id: 'e1',
    title: {
      om: "Wal-ga'ii Wadaa Gadaa fi Wabii Hawaasummaa",
      am: "የገዳ ባህል ማህበራዊ ዋስትና ምክክር ስብሰባ",
      en: "Gadaa Cultural Welfare Council & Risk Consultation"
    },
    date: '2026-07-15',
    gadaaTerm: {
      om: "Sirna Gadaa - Buusaa Gonofaa Sololiyaa",
      am: "የገዳ ባህል ማህበራዊ መደጋገፍ ህግ",
      en: "Gadaa Cooperative Support Framework"
    },
    description: {
      om: "Marii bal'aa qonnaan bultootaa fi daldaltoota wajjiin Adamaatti taasisamu, aadaa kessan fufsiisuuf.",
      am: "አርሶ አደሩን እና ነጋዴውን ያሳተፈ የቡሳ ጎኖፋ ባህላዊ መረዳዳት ሥነ-ሥርዓት ውይይት በአዳማ ከተማ ይካሄዳል።",
      en: "A central council assembly exploring traditional Gadaa cooperative welfare standards, validating index insurance benefits with community elders."
    },
    location: {
      om: "Galma Abbaa Gadaa Adamaa",
      am: "አዳማ አባ ገዳ አዳራሽ",
      en: "Abbaa Gadaa Hall, Central Adama"
    },
    status: 'upcoming'
  },
  {
    id: 'e2',
    title: {
      om: "Leenjii Qonna Gadaa Misoomaa",
      am: "ለገጠር አርሶ አደሮች የሚቀርብ ዘመናዊ የልማት ስልጠና",
      en: "Sustainable Sprout Initiative: Cooperative Farmer Workshop"
    },
    date: '2026-06-18',
    gadaaTerm: {
      om: "Wal-gargaarsa Dabaree Misoomaa",
      am: "የጋራ እርሻ ልማት ትብብር",
      en: "Dabaree Communal Labor Mutual Aid"
    },
    description: {
      om: "Malkaalee daggala jallisi qilleensa jijjiirama madaqsuu irratti qonnaan bultootaaf leenjii dhiyeessuu.",
      am: "አርሶ አደሮች የአየር ንብረት ለውጥን ተቋቁመው ዘመናዊ መስኖን በመጠቀም ምርታማነታቸውን እንዲያሳድጉ የሚሰጥ ጠቃሚ ስልጠና።",
      en: "Hands-on field training in climate-smart agriculture and micro-irrigation management for local member syndicates."
    },
    location: {
      om: "Kilaasii Leenjii Damee Adamaa, Dirree Qonna",
      am: "አዳማ ገጠር ወረዳ የግብርና ማሰልጠኛ ጣቢያ",
      en: "Adama Rural District Training Center & Demo Farm"
    },
    status: 'ongoing'
  }
];

export const mockCampaigns: DonationCamp[] = [
  {
    id: 'c1',
    goalAmount: 1200000,
    raisedAmount: 824500,
    contributorsCount: 341,
    title: {
      om: "Deeggarsa Duula Qonnaan Bultoota Midhamee",
      am: "ለተጎዱ የገበሬ ማህበራት የአደጋ ጊዜ የሰብል ዘር ፈንድ",
      en: "Emergency Crop Seed Mutual Fund for Afflicted Farms"
    },
    description: {
      om: "Qonnaan bultoota fi maatii sababa rooba dhabuurraan rakkatan deebisanii dhaabuuf sanyii fi meeshaalee gargaaruu.",
      am: "የዝናብ እጥረት ለገጠማቸውና ለተጎዱ አነስተኛ አርሶ አደሮች የዘር፣ የባዮ-ምዳብሪያዎች እና የመስኖ መርጫ መግዣ ቁሳቁሶች ማቅረቢያ ፈንድ።",
      en: "Direct supply of early-maturing climate-adapted seed varieties and organic components to 500 vulnerable farming households in East Shewa zone."
    },
    badge: {
      om: "Duula Balaa Gargaaruu",
      am: "የአደጋ ጊዜ ፈንድ",
      en: "Emergency Relief Campaign"
    }
  },
  {
    id: 'c2',
    goalAmount: 800000,
    raisedAmount: 610000,
    contributorsCount: 198,
    title: {
      om: "Maayicroo-Inshuraansii maatii hiyyeeyyi",
      am: "ለደካማ ማህበረሰቦች የጤና ዋስትና ሽፋን ድጋፍ",
      en: "Micro-insurance Subsidies for Ultra-poor Families"
    },
    description: {
      om: "Maatii dandeettii xiqqaa qaban gargaarsa fayyaa fi eegumsa maayicroofayinaansii guutuu dhaban haguugguu.",
      am: "ዝቅተኛ ገቢ ያላቸው አዛውንቶችና አቅመ-ደካሞች የሕክምና ዕርዳታ እንዲያገኙና የቡሳ ጎኖፋ ኢንሹራንስ ተጠቃሚ እንዲሆኑ መሸፈኛ ፈንድ።",
      en: "Sponsor premium contributions for healthcare and emergency protection for ultra-poor families and elders across Adama outlying sectors."
    },
    badge: {
      om: "Gargaarsa Fayyaa Hawaasaa",
      am: "ጤናና ደህንነት",
      en: "Health Mutual Coverage"
    }
  }
];

export const branchStatistics = {
  activeMembers: "135,460+",
  activeFarmsSponsored: "32,850+",
  womenEntrepreneursSupported: "48,650+",
  emergencyDisbursementsBirr: "22.4 Million"
};
