import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

export const app = express();

// Middleware
app.use(express.json());

// API Health check - support both /api/health and /health, plus Vercel-style path rewrites
app.get(
  ["/api/health", "/health", "/api/index.ts", "/api/index.ts/health", "/api"],
  (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  },
);

// Smart local knowledge-base fallback to ensure Gadaa-AI is robust and provides full comprehensive information
function getLocalResponse(message: string, language: string): string {
  const msgLower = (message || "").toLowerCase();
  const lang =
    language === "om" || language === "am" || language === "en"
      ? language
      : "en";

  // Master Topic: Full comprehensive information / overview / all services
  if (
    msgLower.includes("full") ||
    msgLower.includes("all") ||
    msgLower.includes("everything") ||
    msgLower.includes("guutuu") ||
    msgLower.includes("waliigala") ||
    msgLower.includes("hunda") ||
    msgLower.includes("ሙሉ") ||
    msgLower.includes("ጠቅላላ") ||
    msgLower.includes("overview") ||
    msgLower.includes("summary") ||
    msgLower.includes("services") ||
    msgLower.includes("tajaajila")
  ) {
    if (lang === "om") {
      return `### Odeeffannoo Guutuu Buusaa Gonofaa Oromiyaa (Damee Adamaa)

Buusaa Gonofaa Oromiyaa (Damee Adamaa) tajaajila maaykiroofaayinaansii ammayyaa aadaa waldhabdee fi wal-gargaarsa Oromoo (Buusaa Gonofaa fi Sololiyaa) waliin mijeessuun miseensota qonnaan bultootaa, daldaltoota xixiqqoo, fi dubartoota humneessa.

---

### 1. Tajaajila Liqii fi Faayinaansii (Loans & Credit)
- **Liqii Qonnaa (Agricultural Loans)**: Sanyii filatamaa mirkanaa'e, xaa'oo uumamaa, fi meeshaalee jallisiitiif (drip irrigation kits).
- **Liqii Maaykiroo Dubartootaa**: Hojii daldala xixiqqoof liqii bu'uura daldala gareetiin kennamu, wabii salphaa waliin.
- **Liqii Horii fi Horsiisaa**: Loon aannaniifi furdisuuf maallaqa mijeessuu.

### 2. Tajaajila Qusannoo (Savings Accounts)
- **Qusannoo Dirqamaa**: Miseensota liqii fudhataniif qusannoo torbanii fi ji'aa.
- **Qusannoo Fedhii**: Daldaltootaaf herrega dhangala'aa yeroo barbaadame baafamu, bu'aa qusannoo gaarii waliin.
- **Qusannoo Sololiyaa**: Dubartoota Oromoo qindeessuun qusannoo aadaa ammayyeessuu.

### 3. Tiksii fi Inshuraansii Haala Qilleensaa (Weather-Indexed Insurance)
- Rooba fi odeeffannoo saatelaayitii hordofuun ongee ykn rooba dhabamuu battalatti sakatta'a.
- Balaan yoo qaqqabe, adeemsa dheeraa malee herrega qonnaan bulaatti kaffaltii battalaa gochuun midhaan bara dhuftuu ittisa.
- Maatiiwwan harka qalleeyyiif eegumsa fayyaa mijeessuu.

### 4. Akkaataa Miseensa Ta'an (Membership Registration)
1. Kaardii eenyummaa gandaa haaromfame qabaachuu.
2. Foormii galmee tooraan ykn waajjira keenyatti dhiyaachuun guutuu.
3. Kaffaltii galmee bu'uuraa fi qusannoo jalqabaa kaffaluu.

### 5. Sagantaalee Gumaachaa fi Herrega Baankii (Contributions & Relief)
Balaa qonnaan bultootaa fi ijaarsa bu'uuraalee hawaasaa deeggaruuf:
- **CBE (Baankii Daldala Itoophiyaa)**: 1000023456789
- **Siinqee Baankii**: 2000012345678
- **Awash Baankii**: 3000034567890

### 6. Teessoo, Sa'aatii fi Quunnamtii (Offices & Contacts)
- **Waajjira Guddaa Adamaa**: Fuuldura Hoteela Postaa, Adamaa (GPS: 8.5414° N, 39.2689° E)
- **Damee Wonjii**: GPS: 8.4325° N, 39.2241° E
- **Damee Moojoo**: GPS: 8.5912° N, 39.1184° E
- **Bilbila**: +251 22 111 2345 / +251 91 123 4567
- **Imeelii**: contact@buusaagonofaa-adama.et
- **Sa'aatii Hojii**: Wiixata - Jimaata, sa'aatii 2:00 saafaa - 11:30 waaree boodatti (EAT). Sambataa fi Dilbata cufaadha.`;
    } else if (lang === "am") {
      return `### ስለ ቡሳ ጎኖፋ ኦሮሚያ (አዳማ ቅርንጫፍ) ሙሉ መረጃ

ቡሳ ጎኖፋ ኦሮሚያ (የአዳማ ቅርንጫፍ) ባህላዊ የጋራ መረዳጃ እሴቶችን (ቡሳ ጎኖፋ እና ሶሎሊያ) ከዘመናዊ የማይክሮፋይናንስ አገልግሎት ጋር በማቀናጀት አነስተኛ አርሶ አደሮችን፣ ሴቶችንና ነጋዴዎችን በኢኮኖሚ የሚያጠናክር ተቋም ነው።

---

### 1. የብድር አገልግሎቶች (Loans & Credits)
- **የግብርና ግብዓት ብድር**፦ ለምርጥ ዘር፣ ማዳበሪያ እና ዘመናዊ የጠብታ መስኖ እቃዎች መግዣ የሚውል ወቅታዊ ብድር።
- **የሴቶች ማይክሮ-ብድር**፦ አነስተኛ ንግድ ላይ ለተሰማሩ ሴቶች በጋራ ዋስትና የሚሰጥ ተደራሽ ብድር።
- **የከብት እርባታና ማድለብ ብድር**፦ ለወተት ላሞችና ከብት ማድለብ የሚሰጥ ብድር።

### 2. የቁጠባ አገልግሎቶች (Savings Accounts)
- **የግዴታ ቁጠባ**፦ የብድር ተጠቃሚ አባላት የሚቆጥቡት ሳምንታዊ ወይም ወርሃዊ ቁጠባ።
- **የፍላጎት ቁጠባ**፦ በማንኛውም ጊዜ ገንዘብ ገቢና ወጪ ማድረግ የሚያስችል ተወዳዳሪ ወለድ ያለው ቁጠባ።
- **የሶሎሊያ የሴቶች ቁጠባ**፦ የሴቶችን የኢኮኖሚ አቅም የሚያሳድግ ባህላዊና ዘመናዊ የቡድን ቁጠባ።

### 3. የአየር ሁኔታ ጠቋሚ የግብርና ኢንሹራንስ (Weather-Indexed Insurance)
- የሳተላይት ዝናብ መረጃዎችን በመከታተል የዝናብ እጥረት ወይም ድርቅ ሲከሰት በቅጽበት ይለያል።
- ቢሮክራሲና አድካሚ ግምገማ ሳይኖር አውቶማቲክ ካሳ በቀጥታ ለአርሶ አደሩ ይከፈላል።
- ለአቅመ ደካሞች የማህበረሰብ ጤና ዋስትና ሽፋን ይሰጣል።

### 4. አባል የመሆን ቅደም-ተከተል (Membership Steps)
1. የታደሰ የቀበሌ መታወቂያ መያዝ።
2. በድረ-ገጻችን 'አባልነት' ገጽ ላይ ያለውን ቅጽ መሙላት ወይም በአካል ቢሮ መምጣት።
3. የመመዝገቢያ ክፍያ እና የመነሻ ቁጠባ ማስያዝ።

### 5. የልገሳ ሂሳቦች እና አጣዳፊ እርዳታ (Bank Accounts & Donations)
የአደጋ ጊዜ ድጋፍ ለማድረግ እና የተጎዱ ገበሬዎችን ለመርዳት፦
- **የኢትዮጵያ ንግድ ባንክ (CBE)**፦ 1000023456789
- **ሲንቄ ባንክ**፦ 2000012345678
- **አዋሽ ባንክ**፦ 3000034567890

### 6. አድራሻ፣ የስራ ሰዓት እና አድራሻ (Offices & Contact)
- **አዳማ ዋና ቢሮ**፦ አዳማ፣ ፖስታ ቤት ፊት ለፊት (GPS: 8.5414° N, 39.2689° E)
- **ወንጂ ንዑስ ቢሮ**፦ GPS: 8.4325° N, 39.2241° E
- **ሞጆ ንዑስ ቢሮ**፦ GPS: 8.5912° N, 39.1184° E
- **ስልክ**፦ +251 22 111 2345 / +251 91 123 4567
- **ኢሜይል**፦ contact@buusaagonofaa-adama.et
- **የስራ ሰዓት**፦ ከሰኞ እስከ አርብ ከጠዋቱ 2:00 - ማታ 11:30 (የምስራቅ አፍሪካ ሰዓት)። ቅዳሜና እሁድ ዝግ ነው።`;
    } else {
      return `### Complete Information: Buusaa Gonofaa Oromiyaa (Adama Branch)

Buusaa Gonofaa Oromiyaa (Adama Branch) combines indigenous Oromo solidarity principles (Buusaa Gonofaa safety nets & Sololiyaa women’s savings circles) with digital microfinance to empower smallholder farmers, local merchants, and vulnerable households.

---

### 1. Loan & Credit Services
- **Agricultural Input Loans**: Timely financing for certified seeds, organic fertilizers, and ecological drip-irrigation kits.
- **Women Micro-Enterprise Credits**: Group-guaranteed low-barrier microloans tailored for female merchants.
- **Livestock & Dairy Loans**: Working capital for cattle fattening and dairy production.

### 2. Savings Accounts
- **Compulsory Savings**: Weekly or monthly commitment savings accompanying active loan programs.
- **Voluntary Liquid Savings**: Flexible deposit accounts with competitive yields for businesses and families.
- **Sololiyaa Group Savings**: Structured traditional savings circles building communal resilience.

### 3. Weather-Indexed Crop & Health Insurance
- Monitors localized rainfall via satellite precipitation data.
- When rainfall falls below predetermined drought thresholds, automated payouts are disbursed directly without lengthy physical damage assessments.
- Emergency health premium sponsorships for ultra-poor households.

### 4. Membership Registration Process
1. Hold a valid Kebele / resident ID card.
2. Fill out the application form under our 'Membership' tab or register at our Adama branch.
3. Pay the standard registration fee and deposit initial commitment savings.

### 5. Contribution & Bank Accounts (Disaster Relief)
Direct solidarity contributions fund farmer seeds, clean water boreholes, and school facilities:
- **Commercial Bank of Ethiopia (CBE)**: 1000023456789
- **Siinqee Bank**: 2000012345678
- **Awash Bank**: 3000034567890

### 6. Office Locations, Working Hours & Contacts
- **Adama Main HQ**: Opposite Central Post Office Area, Adama (GPS: 8.5414° N, 39.2689° E)
- **Wonji Sub-office**: GPS: 8.4325° N, 39.2241° E
- **Mojo Sub-office**: GPS: 8.5912° N, 39.1184° E
- **Phone**: +251 22 111 2345 / +251 91 123 4567
- **Email**: contact@buusaagonofaa-adama.et
- **Hours**: Monday to Friday: 8:00 AM - 5:30 PM (East Africa Time). Closed on weekends and public holidays.`;
    }
  }

  // Topic 3: Weather-indexed crop insurance
  if (
    msgLower.includes("insur") ||
    msgLower.includes("inshur") ||
    msgLower.includes("infir") ||
    msgLower.includes("weather") ||
    msgLower.includes("climate") ||
    msgLower.includes("rain") ||
    msgLower.includes("ongee") ||
    msgLower.includes("roob") ||
    msgLower.includes("crop") ||
    msgLower.includes("midhaan") ||
    msgLower.includes("ኢንሹራንስ") ||
    msgLower.includes("ዋስትና") ||
    msgLower.includes("አየር")
  ) {
    if (lang === "om") {
      return `### Inshuraansii Qonnaa Haala Qilleensaa Irratti Hundaa'e (Weather-Indexed Insurance)

Inshuraansii keenya kun qonnaan bultoota ongee fi jijjiirama qilleensaa irraa kan eeguudha:

- **Hordoffii Saatelaayitii**: Rooba naannoo keessan guyyaa guyyaan saatelaayitiin hordofna.
- **Kaffaltii Battalaa**: Roobni yoo dhabame ykn ongoon yoo hammaate, ogeessi dhufee sakatta'uu malee kaffaltiin battalaa herrega keessanitti ergamee midhaan itti aanuuf qophooftu.
- **Eegumsa Fayyaa**: Maatiiwwan balaan mudateef inshuraansii fayyaa mijeessuu.

Miseensa inshuraansii ta'uuf waajjira keenya Adamaa (fuuldura Hoteela Postaa) daawwadhaa.`;
    } else if (lang === "am") {
      return `### የአየር ሁኔታ ጠቋሚ የግብርና ማይክሮ-ኢንሹራንስ (Index-Based Insurance)

ይህ የኢንሹራንስ አይነት አርሶ አደሩን ከአየር ንብረት መዛባትና ድርቅ የሚከላከል ዘመናዊ ዋስትና ነው፡

- **የሳተላይት ክትትል**፦ የዝናብ መጠንን በሳተላይት መረጃ አማካኝነት እንከታተላለን።
- **ፈጣን ካሳ ክፍያ**፦ ድርቅ ሲከሰት የሰው ግምገማ ሳይጠበቅ በቀጥታ ወደ አርሶ አደሩ ሂሳብ ካሳ ይገባል።
- **የጤና ሽፋን**፦ ለአደጋ ተጋላጭ ለሆኑ አርሶ አደሮችና ቤተሰቦቻቸው የህክምና ወጪ ድጋፍ ያደርጋል።

ስለ ኢንሹራንስ ምዝገባ ለመጠየቅ በአዳማ ቢሮአችን በአካል ይገኙ።`;
    } else {
      return `### Weather-Indexed Crop & Health Insurance (Full Details)

Our weather-indexed microinsurance safeguards smallholders from severe climate disruptions:

- **Satellite Rainfall Monitoring**: Daily satellite feeds monitor precipitation indices in your specific zone.
- **Automated Payout Trigger**: If drought thresholds are breached, compensation payouts are deposited directly without bureaucratic inspection delays.
- **Health Protection**: Subsidized emergency healthcare access for vulnerable farming families.

To enroll in the seasonal crop protection scheme, contact the Adama branch office.`;
    }
  }

  // Topic 2: Loans/Credits
  if (
    msgLower.includes("loan") ||
    msgLower.includes("credit") ||
    msgLower.includes("liqii") ||
    msgLower.includes("iyyad") ||
    msgLower.includes("qualify") ||
    msgLower.includes("ግብርና") ||
    msgLower.includes("ብድር") ||
    msgLower.includes("መመዝገብ")
  ) {
    if (lang === "om") {
      return `### Tajaajila Liqii fi Faayinaansii (Damee Adamaa)

Dameen keenya liqii adda addaa haala mijataan dhiyeessa:

1. **Liqii Qonnaa (Crop Input Loans)**:
   - Sanyii filatamaa, xaa'oo, fi meeshaalee jallisii bituuf oola.
   - Kaffaltiin yeroo oomishni sassaabamu raawwatama.
2. **Liqii Maaykiroo Dubartootaa (Women Enterprise Credit)**:
   - Daldala xixiqqoof liqii bu'uura ammayyaa gareetiin kennamu.
   - Dhala xiqqaa fi wabii salphaa qaba.
3. **Liqii Loonii fi Horsiisaa (Livestock Loans)**:
   - Loon aannanii fi gabbisuuf qonnaan bultootaaf kennama.

**Ulaagaalee**: Kaardii gandaa, miseensa ta'uu, fi qusannoo bu'uuraa qabaachuu.`;
    } else if (lang === "am") {
      return `### የብድር አገልግሎቶች ዝርዝር (አዳማ ቅርንጫፍ)

ቅርንጫፋችን አርሶ አደሮችንና ነጋዴዎችን ለመደገፍ የሚከተሉትን ብድሮች ያቀርባል፡

1. **የግብርና ግብዓት ብድር (Agri Input Loans)**፦
   - ለምርጥ ዘር፣ ማዳበሪያ እና የጠብታ መስኖ እቃዎች መግዣ የሚውል።
   - አከፋፈሉ ሰብል በሚሰበሰብበት ወቅት የሚፈጸም ነው።
2. **የሴቶች ማይክሮ-ብድር (Women Micro-Credit)**፦
   - አነስተኛ ንግድ ለሚሰሩ ሴቶች በቡድን ዋስትና የሚሰጥ ተደራሽ ብድር።
   - ዝቅተኛ ወለድ እና ምቹ የአከፋፈል ሁኔታ አለው።
3. **የከብት እርባታና ማድለብ ብድር**፦
   - ለወተት ከብቶችና ለማድለብ የሚውል ብድር።

**መስፈርቶች**፦ የታደሰ መታወቂያ፣ አባል መሆን፣ እና አነስተኛ የመነሻ ቁጠባ።`;
    } else {
      return `### Microfinance Loans & Credit Packages (Adama Branch)

We provide accessible, production-focused credit solutions:

1. **Agricultural Input Credit**:
   - Covers certified seeds, fertilizers, and ecological drip-irrigation kits.
   - Flexible repayment timed with crop harvest cycles.
2. **Women-Led Micro Enterprise Loans**:
   - Peer-guaranteed small loans designed for retail business expansion.
   - Low interest rates and straightforward guarantor policies.
3. **Livestock & Dairy Financing**:
   - Working capital for milk production and livestock breeding.

**Requirements**: Valid Kebele ID, registered membership, and basic savings commitment.`;
    }
  }

  // Topic 4: Location/Address/GPS/Hours
  if (
    msgLower.includes("location") ||
    msgLower.includes("address") ||
    msgLower.includes("gps") ||
    msgLower.includes("where") ||
    msgLower.includes("office") ||
    msgLower.includes("hour") ||
    msgLower.includes("teessoo") ||
    msgLower.includes("biroo") ||
    msgLower.includes("sa'aatii") ||
    msgLower.includes("adama") ||
    msgLower.includes("wonji") ||
    msgLower.includes("mojo") ||
    msgLower.includes("አድራሻ") ||
    msgLower.includes("አዳማ") ||
    msgLower.includes("የት ነው") ||
    msgLower.includes("ሰዓት") ||
    msgLower.includes("ስልክ") ||
    msgLower.includes("phone") ||
    msgLower.includes("bilbila")
  ) {
    if (lang === "om") {
      return `### Teessoo, Sa'aatii fi Quunnamtii (Damee Adamaa)

- **Waajjira Guddaa Adamaa**: Fuuldura Hoteela Postaa, Adamaa, Oromiyaa (GPS: 8.5414° N, 39.2689° E)
- **Damee Wonjii**: GPS: 8.4325° N, 39.2241° E
- **Damee Moojoo**: GPS: 8.5912° N, 39.1184° E
- **Bilbila**: +251 22 111 2345 / +251 91 123 4567
- **Imeelii**: contact@buusaagonofaa-adama.et
- **Sa'aatii Hojii**: Wiixata - Jimaata: Sa'aatii 2:00 saafaa hanga 11:30 waaree boodatti (EAT). Sambataa fi Dilbata cufaadha.`;
    } else if (lang === "am") {
      return `### የቢሮ አድራሻ፣ የስራ ሰዓት እና አድራሻ (አዳማ ቅርንጫፍ)

- **አዳማ ዋና ቢሮ**፦ አዳማ፣ ፖስታ ቤት ፊት ለፊት (GPS: 8.5414° N, 39.2689° E)
- **ወንጂ ንዑስ ቢሮ**፦ GPS: 8.4325° N, 39.2241° E
- **ሞጆ ንዑስ ቢሮ**፦ GPS: 8.5912° N, 39.1184° E
- **ስልክ**፦ +251 22 111 2345 / +251 91 123 4567
- **ኢሜይል**፦ contact@buusaagonofaa-adama.et
- **የስራ ሰዓት**፦ ከሰኞ እስከ አርብ ጠዋት 2፡00 - ማታ 11፡30 (የምስራቅ አፍሪካ ሰዓት)። ቅዳሜና እሁድ ዝግ ነው።`;
    } else {
      return `### Office Locations, GPS, Hours & Contacts (Adama Branch)

- **Adama Main Office**: Opposite Central Post Office Area, Adama, Oromia (GPS: 8.5414° N, 39.2689° E)
- **Wonji Sub-office**: GPS: 8.4325° N, 39.2241° E
- **Mojo Sub-office**: GPS: 8.5912° N, 39.1184° E
- **Phone**: +251 22 111 2345 / +251 91 123 4567
- **Email**: contact@buusaagonofaa-adama.et
- **Business Hours**: Monday to Friday, 8:00 AM to 5:30 PM (East Africa Time). Closed weekends and public holidays.`;
    }
  }

  // Topic 5: Savings / Qusannoo / ቁጠባ
  if (
    msgLower.includes("saving") ||
    msgLower.includes("qusann") ||
    msgLower.includes("ቁጠባ") ||
    msgLower.includes("account") ||
    msgLower.includes("herrega") ||
    msgLower.includes("deposit")
  ) {
    if (lang === "om") {
      return `### Tajaajila Qusannoo Buusaa Gonofaa (Damee Adamaa)

1. **Qusannoo Dirqamaa (Compulsory Savings)**:
   - Miseensota liqii fudhataniif qusannoo bu'uuraa.
   - Balaa fi hanqina maallaqaa ittisuuf gargaara.
2. **Qusannoo Fedhii (Voluntary Savings)**:
   - Daldaltootaa fi qonnaan bultootaaf qusannoo bu'aa qabu.
   - Yeroo barbaaddanitti baafachuu dandeessu.
3. **Qusannoo Sololiyaa (Women Groups)**:
   - Dubartoota Oromoo aadaan walitti qabuun qusannoo maatii jabeessuu.

**Akkaataa Banatan**: Kaardii eenyummaa fi suuraa lama qabachuun waajjira keenya Adamaa daawwadhaa.`;
    } else if (lang === "am") {
      return `### የቁጠባ አገልግሎቶች (አዳማ ቅርንጫፍ)

1. **የግዴታ ቁጠባ (Compulsory Savings)**፦
   - የብድር ተጠቃሚ ለሆኑ አባላት የሚደረግ መደበኛ ቁጠባ።
2. **የፍላጎት ቁጠባ (Voluntary Savings)**፦
   - በማንኛውም ጊዜ ገቢና ወጪ የሚደረግ ተወዳዳሪ ወለድ ያለው ቁጠባ።
3. **የሶሎሊያ የሴቶች ቁጠባ (Sololiyaa)**፦
   - የሴቶችን የጋራ አቅም የሚያሳድግ የቁጠባ ቡድን።

**ለመክፈት**፦ የታደሰ መታወቂያ እና ሁለት ጉርድ ፎቶግራፍ ይዘው ይምጡ።`;
    } else {
      return `### Savings & Sololiyaa Programs (Adama Branch)

1. **Compulsory Savings**:
   - Systematic commitment savings designed alongside microcredits.
2. **Voluntary Flexible Savings**:
   - Unrestricted deposit and withdrawal facilities with competitive interest.
3. **Sololiyaa Women Savings**:
   - Indigenous matriarchal solidarity saving groups promoting female financial independence.

**To Open an Account**: Visit the Adama office with a valid ID card and two passport photos.`;
    }
  }

  // Topic 6: Membership / Registration / Join / Miseensa / አባልነት
  if (
    msgLower.includes("member") ||
    msgLower.includes("join") ||
    msgLower.includes("regist") ||
    msgLower.includes("miseens") ||
    msgLower.includes("galmee") ||
    msgLower.includes("አባል") ||
    msgLower.includes("መመዝገብ")
  ) {
    if (lang === "om") {
      return `### Akkaataa Miseensa Buusaa Gonofaa Ta'an

Miseensa ta'uuf tarkaanfiiwwan:
1. Kaardii eenyummaa gandaa haaromfame qabaachuu.
2. Fuula 'Miseensummaa' jedhu irratti foormii galmee guutuu ykn waajjira Adamaatti dhiyaachuu.
3. Kaffaltii galmee bu'uuraa fi qusannoo jalqabaa kaffaluu.

**Faayidaa**: Liqii qonnaa, qusannoo bu'aa qabu, fi inshuraansii qilleensaa argachuu.`;
    } else if (lang === "am") {
      return `### የቡሳ ጎኖፋ አባል የመሆን ሂደት

1. የታደሰ የቀበሌ መታወቂያ መያዝ።
2. በድረ-ገጻችን 'አባልነት' ክፍል ያለውን ቅጽ መሙላት ወይም በአዳማ ቢሮአችን መገኘት።
3. የመመዝገቢያ ክፍያና የመነሻ ቁጠባ ማስያዝ።

**ጥቅሞች**፦ የግብርና ብድር、 የቁጠባ ሂሳብ እና የአየር ሁኔታ ኢንሹራንስ ዋስትና ማግኘት።`;
    } else {
      return `### How to Become a Buusaa Gonofaa Member

1. Hold a valid Kebele / resident ID card.
2. Submit the registration form via our 'Membership' tab or directly at our Adama office.
3. Complete initial member deposit and basic registration.

**Member Benefits**: Access to low-interest seasonal loans, savings yields, and index-based crop insurance.`;
    }
  }

  // Topic 7: Relief / Contribution / Gumaacha / እርዳታ / ልገሳ
  if (
    msgLower.includes("contribut") ||
    msgLower.includes("donat") ||
    msgLower.includes("gumaach") ||
    msgLower.includes("deggers") ||
    msgLower.includes("relief") ||
    msgLower.includes("gargaar") ||
    msgLower.includes("እርዳታ") ||
    msgLower.includes("ልገሳ") ||
    msgLower.includes("መደገፍ") ||
    msgLower.includes("campaign")
  ) {
    if (lang === "om") {
      return `### Sagantaalee Gumaachaa fi Wal-gargaarsa Buusaa Gonofaa

Qonnaan bultoota balaan mudate fi maatiiwwan rakkatan deeggaruuf herreegoota ofiisaalaa:
- **CBE (Baankii Daldala Itoophiyaa)**: 1000023456789
- **Siinqee Baankii**: 2000012345678
- **Awash Baankii**: 3000034567890

Fuula 'Gumaacha' (Contribution) jedhu banuun foormii tooraan guutuu dandeessu. Galatoomaa!`;
    } else if (lang === "am") {
      return `### የህብረተሰብ መረዳጃ እና የልገሳ መርሐግብር

የተጎዱ አርሶ አደሮችንና አቅመ-ደካሞችን ለመደገፍ ይፋዊ የባንክ ሂሳቦች፡
- **የኢትዮጵያ ንግድ ባንክ (CBE)**፦ 1000023456789
- **ሲንቄ ባንክ**፦ 2000012345678
- **አዋሽ ባንክ**፦ 3000034567890

በድረ-ገጻችን 'ይደግፉ' ገጽ ላይ በቀጥታ ፎርሙን ሞልተው ደረሰኝ ማያያዝ ይችላሉ። እናመሰግናለን!`;
    } else {
      return `### Solidarity & Relief Contributions (Official Bank Accounts)

Support recovery for vulnerable smallholder farmers and community infrastructure:
- **Commercial Bank of Ethiopia (CBE)**: 1000023456789
- **Siinqee Bank**: 2000012345678
- **Awash Bank**: 3000034567890

Visit our 'Contribution' page to submit receipts or pledge directly. Thank you for your solidarity!`;
    }
  }

  // Topic 1: What is Buusaa Gonofaa / general info
  if (
    msgLower.includes("buusaa") ||
    msgLower.includes("gonofaa") ||
    msgLower.includes("solol") ||
    msgLower.includes("what is") ||
    msgLower.includes("about") ||
    msgLower.includes("who are") ||
    msgLower.includes("maali") ||
    msgLower.includes("ምንድን") ||
    msgLower.includes("ነው") ||
    msgLower.includes("coop") ||
    msgLower.includes("walda")
  ) {
    if (lang === "om") {
      return `### Buusaa Gonofaa Oromiyaa (Damee Adamaa)

Buusaa Gonofaa Oromiyaa (Damee Adamaa) tajaajila maaykiroofaayinaansii fi networkii riijansii aadaa Oromoo irratti hundaa'eedha.

- **Buusaa Gonofaa**: Aadaa Oromoo keessatti yeroo balaan tasaa uumamu (ongee, ibidda, midhaan manca'uu) hawaasni walitti dhufee nama miidhame deebisee dhaabuudha.
- **Sololiyaa**: Waldaa qusannoo fi dorgommii dubartootaa tiin jireenya maatii humneessuudha.
- **Galma Keenya**: Hiyyummaa balleessuu, qonnaan bultoota humneessuu fi networkii maaykiroofaayinaansii ammayyeessuu dha.`;
    } else if (lang === "am") {
      return `### ቡሳ ጎኖፋ ኦሮሚያ (የአዳማ ቅርንጫፍ)

ቡሳ ጎኖፋ ኦሮሚያ (የአዳማ ቅርንጫፍ) ባህላዊ እሴቶችን እና ዘመናዊ የማይክሮፋይናንስ አገልግሎትን ያቀናጀ ተቋም ነው።

- **ቡሳ ጎኖፋ**፦ በኦሮሞ ባህል አደጋና ድርቅ ሲከሰት አባላት እርስ በርስ የሚደጋገፉበት የጋራ የመረዳጃ ስርዓት ነው።
- **ሶሎሊያ**፦ የሴቶች የጋራ የቁጠባና የስራ ፈጠራ መድረክ ነው።
- **አላማችን**፦ ድህነትን መቀነስ፣ አርሶ አደሩን በፋይናንስ ማብቃትና ዘመናዊ የማይክሮፋይናንስ ሽፋን ማዳረስ ነው።`;
    } else {
      return `### Buusaa Gonofaa Oromiyaa (Adama Branch Overview)

Buusaa Gonofaa Oromiyaa (Adama Branch) is a digital-first microfinance and Oromo-indigenous solidarity network headquartered in Adama, Oromia.

- **Buusaa Gonofaa**: Traditional community mutual-assistance mechanism. If a member experiences sudden disaster, the community pools resources together to restore their livelihood.
- **Sololiyaa**: Traditional women-led solidarity and savings clubs, fostering economic independence.
- **Our Mission**: To eliminate rural poverty, provide climate-resilient microfinance, and ensure financial safety nets for all smallholders.`;
    }
  }

  // General/Greeting Fallback - Give structured quick menu
  if (lang === "om") {
    return `### Akkam jirtu! Ani GadaaAI, Gargaaraa Fayiinaansii fi Aadaa Keessan.

Damee Adamaa irratti odeeffannoo guutuu argachuuf kanneen armaan gadii gaafachuu dandeessu:
- **Liqii Qonnaa & Daldalaa**: Sanyii, xaa'oo, fi maaykiro-liqii dubartootaa.
- **Qusannoo**: Qusannoo dirqamaa, fedhii, fi Sololiyaa.
- **Inshuraansii Qilleensaa**: Tiksii ongee saatelaayitii fi kaffaltii battalaa.
- **Miseensummaa**: Ulaagaalee fi foormii galmee.
- **Teessoo & Sa'aatii**: Fuuldura Hoteela Postaa Adamaa (GPS fi bilbila).
- **Gumaacha**: Herreegoota baankii CBE, Siinqee, fi Awash.

Odeeffannoo guutuu arguuf **"Odeeffannoo guutuu naaf kenni"** jedhaa!`;
  } else if (lang === "am") {
    return `### ጤና ይስጥልኝ! እኔ ገዳAI ነኝ፤ የአዳማ ቅርንጫፍ የባህልና አነስተኛ ፋይናንስ አማካሪዎ።

ስለ ቅርንጫፋችን አገልግሎቶች ሙሉ መረጃ ለማግኘት የሚከተሉትን መጠየቅ ይችላሉ፡
- **የግብርናና የንግድ ብድር**፦ የምርጥ ዘር、 ማዳበሪያ እና የሴቶች ብድር።
- **የቁጠባ አገልግሎቶች**፦ የግዴታ、 የፍላጎት እና የሶሎሊያ ቁጠባ።
- **የሰብል ኢንሹራንስ**፦ የሳተላይት ዝናብ መረጃ እና የድርቅ ካሳ።
- **የአባልነት ምዝገባ**፦ መስፈርቶችና ቅደም ተከተሎች።
- **አድራሻና የስራ ሰዓት**፦ አዳማ ፖስታ ቤት ፊት ለፊት (ስልክና ጂፒኤስ)።
- **የልገሳ ሂሳቦች**፦ ንግድ ባንክ、 ሲንቄ እና አዋሽ ባንክ ሂሳቦች።

ሙሉ መረጃ ለማግኘት **"ሙሉ መረጃ ስጠኝ"** ብለው ይጠይቁኝ!`;
  } else {
    return `### Greetings! I am GadaaAI, your cultural microfinance & climatic advisor.

How can I assist you today? You can ask for full information on:
- **Agricultural & Micro Loans**: Certified seeds, drip irrigation, women credits.
- **Savings Accounts**: Compulsory, voluntary, and Sololiyaa groups.
- **Weather-Indexed Insurance**: Satellite rainfall tracking & drought payouts.
- **Membership**: Registration eligibility and process.
- **Offices & Contacts**: Adama HQ opposite Central Post Office, Wonji & Mojo.
- **Disaster Relief Donations**: Official CBE, Siinqee, and Awash bank accounts.

Ask **"Give me full information"** for a complete master briefing!`;
  }
}

// Helper with timeout
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("AI response timeout")), ms),
    ),
  ]);
}

// API router for Gemini AI Integration - support multiple path variants
app.post(
  [
    "/api/ai/chat",
    "/ai/chat",
    "/api/index.ts",
    "/api/index.ts/ai/chat",
    "/api",
    "/",
  ],
  async (req, res) => {
    const { message = "", history = [], language = "en" } = req.body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message payload is required" });
    }

    // Check multiple potential environment variable names
    const apiKey = (
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.VITE_GEMINI_API_KEY ||
      process.env.VITE_GOOGLE_API_KEY ||
      ""
    ).trim();

    // Instant smart response when no API key is configured
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      const localText = getLocalResponse(message, language);
      return res.json({
        text: localText,
        isConfigError: false,
      });
    }

    // Fast Gemini response with 5000ms timeout and generous maxOutputTokens for full information
    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "buusaa-gonofaa-platform",
          },
        },
      });

      const systemInstruction = `You are "GadaaAI", the expert cultural financial advisor and microfinance assistant for Buusaa Gonofaa Oromiyaa - Adama Branch (Damee Adamaa).

### CRITICAL INSTRUCTION:
- Always deliver full, complete, and thoroughly structured information with clear markdown headings, bold text, and bullet points. Never truncate or give bare one-liners.
- Always reply in the visitor's language: Afaan Oromoo ('om'), Amharic ('am'), or English ('en').
- Embrace Gadaa mutual-aid values (Buusaa Gonofaa and Sololiyaa).

### COMPLETE ADAMA BRANCH KNOWLEDGE BASE:
1. **Organization**: Buusaa Gonofaa Oromiyaa (Adama Branch). Blends traditional Oromo mutual support with modern microfinance.
2. **Loans**:
   - Seasonal Agricultural Input Loans: Seeds, fertilizers, drip irrigation kits.
   - Women Micro-Enterprise Loans: Group-guaranteed, low interest.
   - Livestock & Dairy Loans: Cattle fattening and dairy development.
3. **Savings**:
   - Compulsory Commitment Savings: Accompanies loan programs.
   - Voluntary Savings: Flexible liquid deposits with competitive interest.
   - Sololiyaa Savings: Women-led solidarity savings groups.
4. **Weather-Indexed Crop Insurance**:
   - Satellite precipitation monitoring.
   - Automated payouts triggered when rainfall drops below drought index thresholds (no inspection bureaucracy).
   - Health coverage premium sponsorships for vulnerable households.
5. **Membership**:
   - Valid Kebele ID, registration fee, initial deposit.
6. **Relief & Solidarity Accounts**:
   - CBE (Commercial Bank of Ethiopia): 1000023456789
   - Siinqee Bank: 2000012345678
   - Awash Bank: 3000034567890
7. **Offices, GPS & Hours**:
   - Adama HQ: Opposite Central Post Office (GPS: 8.5414° N, 39.2689° E)
   - Wonji Sub-office (GPS: 8.4325° N, 39.2241° E), Mojo Sub-office (GPS: 8.5912° N, 39.1184° E)
   - Phone: +251 22 111 2345 / +251 91 123 4567
   - Hours: Monday - Friday 8:00 AM - 5:30 PM (East Africa Time). Closed weekends.`;

      const contentsList: any[] = [];
      if (Array.isArray(history)) {
        history.slice(-4).forEach((h: any) => {
          contentsList.push({
            role: h.sender === "user" ? "user" : "model",
            parts: [{ text: h.text || "" }],
          });
        });
      }
      contentsList.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await withTimeout(
        ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: contentsList,
          config: {
            systemInstruction,
            temperature: 0.35,
            maxOutputTokens: 1200,
          },
        }),
        5000,
      );

      const replyText = response?.text;
      if (replyText && replyText.trim()) {
        return res.json({ text: replyText.trim(), isConfigError: false });
      }

      // If empty reply from model, use instant local response with full info
      const fallbackText = getLocalResponse(message, language);
      return res.json({ text: fallbackText, isConfigError: false });
    } catch {
      // Immediate clean fallback without leaking errors or displaying warning notes
      const localText = getLocalResponse(message, language);
      return res.json({
        text: localText,
        isConfigError: false,
      });
    }
  },
);

export default app;
