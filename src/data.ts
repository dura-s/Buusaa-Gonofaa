import { NewsItem, EventItem, DonationCamp } from './types';

export const mockNews: NewsItem[] = [
  {
    id: 'n1',
    date: '2026-06-10',
    category: 'Institutional Development',
    imagePlaceholder: 'https://images.unsplash.com/photo-1590650154854-4139e557dcdb?auto=format&fit=crop&q=80&w=800',
    title: {
      om: "Dameen Adamaa Qorannoo Waloo Buusaa Eegalera",
      am: "የአዳማው ቅርንጫፍ የኅብረት ስብሳባዎችን በይፋ ጀምሯል",
      en: "Adama Branch Commences Cooperative Micro-insurance Assessments"
    },
    summary: {
      om: "Hojjettoonni damee keenyaa qonnaan bultoota hiriirsuun sirna qusannaa fi inshuraansii qonnaa irratti haasofsiisan.",
      am: "የቅርንጫፉ የስራ ባልደረቦች ከአርሶ አደሮች ጋር በመሆን በግብርና ቁጠባና ዋስትና ዙሪያ ውይይት አካሂደዋል።",
      en: "Our crop adaptation safety experts started training smallholders around Adama Rural and Boset on mitigating rain delay risks."
    },
    content: {
      om: "Bara daldalaa kana keessata, dameen Adamaa dhumarratti qonnaan bultoota kuma sadii ol gargaaruuf hundi danda'u irratti ragaa bahaa jira. Qorannoon kunis carraa wabii argachuu guddisa.",
      am: "በዚህ የምርት ዘመን የአዳማው ቅርንጫፍ ከ3,000 በላይ አርሶ አደሮችን በማድረስ ለመደገፍ አቅዷል። ይህ ድጋፍ በድርቅና በአደጋ ወቅት ዋስትና የሚሰጥ ነው።",
      en: "This season, the Buusaa Gonofaa Adama branch aims to register over 3,000 smallholder farmers into the newly subsidized climate-indexed micro-insurance schema, aligning traditional solidarity structures with dynamic rainfall analysis."
    }
  },
  {
    id: 'n2',
    date: '2026-06-02',
    category: 'Community Support',
    imagePlaceholder: 'https://images.unsplash.com/photo-1531206715517-5c0ba140e2b8?auto=format&fit=crop&q=80&w=800',
    title: {
      om: "Maayicroo-Fayinaansii Adamaa: Guddina Hojii Xixiqqaa Dubartootaa",
      am: "የአነስተኛ ቢዝነስ ብድር ለሴት ድርጅቶች መበልጸግ አስገኝቷል",
      en: "Adama Micro-Finance Fueling Female-Led Microenterprises Growth"
    },
    summary: {
      om: "Dubartoota daldala irratti hirmaatan 120f liqiin salphaa dhibbantaa 100 milkaa'inaan raawwatameera.",
      am: "በአዳማ ከተማና አካባቢው ላሉ 120 ሴት ስራ ፈጣሪዎች የተሰጠው ብድር የ100% እድገት አስመዝግቧል።",
      en: "Over 120 women-led enterprise cooperatives received low-interest micro-loans, completing their expansion and starting local processing units."
    },
    content: {
      om: "Guddinni daldaltoota xixiqqaa dubartootaa bu'uura dinagdee magaalaa fi baadiyaa Adamaati. Liqii salphaa kanaan bu'urri daldala jireenya isaanii jijjireera.",
      am: "የአነስተኛ የንግድ ዘርፍ መስፋፋት የከተማችንና ገጠር መንደሮች ኢኮኖሚ ምሰሶ ነው። በተሰጠው ምቹ የብድር ሥርዓት ሴቶቹ ራሳቸውን መቻል ችለዋል።",
      en: "A newly allocated 5-million Birr fund tailored for fast collateral-free group guarantees has enabled women-led agro-dealers, local food stalls, and textile handlers in Adama to expand operations, driving household financial independence."
    }
  },
  {
    id: 'n3',
    date: '2026-05-24',
    category: 'Partnership',
    imagePlaceholder: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
    title: {
      om: "Waliigaltee Baankiilee Hawaasaa Waliin Taasifame",
      am: "ከኅብረት ባንኮች ጋር የተደረገው አዲስ አጋርነት",
      en: "Strategic Collaboration Formed to Expand Diaspora Support"
    },
    summary: {
      om: "Buusaa Gonofaa Oromiyaan baankiilee dhuunfaa waliin hojjechuun gargaarsa Diaspora mijeessaa jira.",
      am: "የቡሳ ጎኖፋ ማኅበር ከሀገር ውስጥ ባንኮች ጋር በመተባበር የዲያስፖራውን መዋጮ ለማቀላጠፍ ውል ተፈራርሟል።",
      en: "New secure digital integration bridges enable Diaspora donors to sponsor specific rural farming clusters directly."
    },
    content: {
      om: "Sirni gumaacha Diaspora keenyaa amma caalaatti amansiisaa fi saffisaa ta'eera. Waliigalteen kun damelee hundaaf mijeessi hojii umma.",
      am: "አዲሱ የዲያስፖራ ድጋፍ መተግበሪያ በአስተማማኝና ቀልጣፋ መንገድ መዋጮዎትን ለታለመለት የገበሬ ማኅበር እንዲያደርሱ ታስቦ የተሰራ ነው።",
      en: "By pairing local cooperative databases with modern digital gateway interfaces, members living abroad can monitor localized contributions and witness live social protection distributions for Adama rural water rehabilitation programs."
    }
  },
  {
    id: 'n_obn',
    date: '2026-06-16',
    category: 'OBN Broadcast News',
    imagePlaceholder: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    title: {
      om: "Gabaasa OBN: Buusaa Gonofaa Adamaa fi Inshuraansii Satalaayitiin deeggarame",
      am: "የኦቢኤን (OBN) ልዩ ዘገባ፦ በሳተላይት የታገዘው የአዳማ የገበሬዎች ኢንሹራንስ ስኬት",
      en: "OBN Broadcast: Adama Satellite-Indexed Farmers Insurance System Featured on Oromia Broadcasting Network"
    },
    summary: {
      om: "Tajiijilli inshuraansii satalaayitiin rooba fiduu irratti qusannoo kaffaltii Buusaa Gonofaa Adama gabaasa addaa OBN irratti dhihaate.",
      am: "የኦቢኤን የቴሌቪዥን ቡድን በአዳማና ቦሰት ወረዳ የዝናብ እጥረትን ለመከላከል የሚረዳውን የሳተላይት መረጃ መመርመሪያ ስርዓት በትኩረት ዘግቧል።",
      en: "Oromia Broadcasting Network (OBN) featured an in-depth news documentary on Buusaa Gonofaa Adama, tracking automated climate payout payouts."
    },
    content: {
      om: "Gabaasa addaa OBN kessatti, hoogganaan Buusaa Gonofaa damee Adamaa akka ibsetti: 'Sirni qusannaa fi inshuraansii qonnaa keenyaa aadaa Gadaatiin deeggaramee technology hammayyaa dabalatee guddina dhabu qonnaan bultootaaf guddina humna qaama hundaa ta'eera.' OBN gabaasa kana guutummaa naannichaatti dabarseera.",
      am: "በኦቢኤን (OBN) የቀጥታ ቃለ-ምልልስ የቅርንጫፍ ኃላፊው እንደገለጹት፤ 'የእኛ የማይክሮ ኢንሹራንስና የማይክሮ ፋይናንስ ስርዓታችን የገዳ ባህላዊ ዕሴቶችን ከዘመናዊ ቴክኖሎጂ ጋር አቀናጅቶ የያዘ ስለሆነ ውጤታማነቱን አሳይቷል።' የቴሌቪዥን ጣቢያው የካሜራ ባለሙያዎች አዳማ ዙሪያ በመንቀሳቀስ የታደሉትን አርሶ አደሮች አነጋግረዋል።",
      en: "In the OBN Broadcast special news segment, dynamic farmers illustrated how mobile signals verify rainfall index drops. The report highlighted that over 1,500 smallholder families in East Shewa zone received automatic climate shock cash guarantees within days of satellite anomaly verification, proving that coupling ancient Gadaa covenants with FinTech ledger platforms creates a world-class model for national social safety grids."
    }
  }
];

export const mockEvents: EventItem[] = [
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
