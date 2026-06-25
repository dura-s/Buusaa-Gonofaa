import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();

// Middleware
app.use(express.json());

// API Health check - support both /api/health and /health, plus Vercel-style path rewrites
app.get(['/api/health', '/health', '/api/index.ts', '/api/index.ts/health', '/api'], (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Smart local knowledge-base fallback to ensure Gadaa-AI is robust when API keys are missing or failing
function getLocalResponse(message: string, language: string): string {
  const msgLower = (message || '').toLowerCase();
  const lang = (language === 'om' || language === 'am' || language === 'en') ? language : 'en';

  // Topic 3: Weather-indexed crop insurance
  if (
    msgLower.includes('insur') || msgLower.includes('inshur') || msgLower.includes('infir') ||
    msgLower.includes('weather') || msgLower.includes('climate') || msgLower.includes('rain') ||
    msgLower.includes('ongee') || msgLower.includes('roob') || msgLower.includes('crop') ||
    msgLower.includes('midhaan') || msgLower.includes('ኢንሹራንስ') || msgLower.includes('ዋስትና') ||
    msgLower.includes('አየር')
  ) {
    if (lang === 'om') {
      return `Inshuraansii Qonnaa Haala Qilleensaa Irratti Hundaa'e (Index-Based Agricultural Insurance):
      
Nuyi rooba fi odeeffannoo saatelaayitii hordofuun jireenya qonnaan bultootaa gargaarra. Balaan ongee ykn rooba dhabamuu yoo uumame, adeemsa dheeraa fi herrega walxaxaa malee herrega keessan irratti kaffaltii battalaa ni goona. Kunis midhaan keessan ongee irraa ittisuuf gargaara.`;
    } else if (lang === 'am') {
      return `የአየር ሁኔታ ጠቋሚ የግብርና ማይክሮ-ኢንሹራንስ (Index-Based Agricultural Insurance)፦
      
የዝናብ መጠንን እና የሳተላይት መረጃዎችን በቅርበት በመከታተል፣ ድርቅ ወይም የዝናብ እጥረት ሲከሰት ያለምንም ቢሮክራሲና መዘግየት ክፍያዎችን በቀጥታ ለአርሶ አደሩ እናስተላልፋለን። ይህ ገበሬው ከአየር ንብረት መዛባት አደጋ እንዲጠበቅ ይረዳል።`;
    } else {
      return `Our Weather-Indexed Crop Insurance tracks localized rainfall and satellite precipitation indices.
      
If a localized drought occurs and precipitation drops below predetermined threshold indices, farmers receive automated and quick payouts directly without lengthy physical damage assessments, protecting their livelihoods from extreme climate risks.`;
    }
  }

  // Topic 2: Loans/Credits
  if (
    msgLower.includes('loan') || msgLower.includes('credit') || msgLower.includes('liqii') ||
    msgLower.includes('iyyad') || msgLower.includes('qualify') || msgLower.includes('ግብርና') ||
    msgLower.includes('ብድር') || msgLower.includes('መመዝገብ')
  ) {
    if (lang === 'om') {
      return `Dameen keenya Adamaa liqii qonnaa fi daldalaa adda addaa haala mijeessuun ni kenna:

1. **Liqii Qonnaa**: Sanyii filatamaa, xaa'oo, fi meeshaalee bishaan fageessuu (drip irrigation) bituuf gargaara.
2. **Liqii Maaykiroo Dubartootaa**: Dubartoota hojii daldala xiqqaatti jiran jajjabeessuuf haala salphaan liqii ni mijeessina.

Iyyachuuf waajjira keenya Adamaa (fuuldura Hoteela Postaa) dhufuun ykn dhuunfaan nu quunnamuu dandeessu.`;
    } else if (lang === 'am') {
      return `ቅርንጫፋችን የሚከተሉትን የብድር አገልግሎቶች ያቀርባል፡

1. **የግብርና ብድር**፦ ለምርጥ ዘር、 ማዳበሪያ እና ዘመናዊ የመስኖ እቃዎች መግዣ የሚውል ወቅታዊ ብድር።
2. **የሴቶች ማይክሮ-ብድር**፦ አነስተኛ የንግድ ስራ ላይ ለተሰማሩ ሴቶች ያለአስቸጋሪ ዋስትና የሚሰጥ ብድር።

ለመመዝገብ በአዳማ ፖስታ ቤት ፊት ለፊት በሚገኘው ቢሮአችን በአካል መምጣት ወይም በቀጥታ ማመልከቻ ማስገባት ይችላሉ።`;
    } else {
      return `Our Adama branch offers tailored financial credits to boost local productivity:

1. **Agricultural Input Loans**: Seasonal credits for certified seeds, organic fertilizers, and ecological drip irrigation kits.
2. **Micro-Loans for Women Merchants**: Group-guaranteed low-interest credits to boost retail businesses.

To apply, visit our office opposite the Central Post Office Area in Adama.`;
    }
  }

  // Topic 4: Location/Address/GPS/Hours
  if (
    msgLower.includes('location') || msgLower.includes('address') || msgLower.includes('gps') ||
    msgLower.includes('where') || msgLower.includes('office') || msgLower.includes('hour') ||
    msgLower.includes('teessoo') || msgLower.includes('biroo') || msgLower.includes('sa\'aatii') ||
    msgLower.includes('adama') || msgLower.includes('wonji') || msgLower.includes('mojo') ||
    msgLower.includes('አድራሻ') || msgLower.includes('አዳማ') || msgLower.includes('የት ነው') ||
    msgLower.includes('ሰዓት')
  ) {
    if (lang === 'om') {
      return `Teessoo fi Sa'aatii Hojii Waajjira Keenyaa (Damee Adamaa):

📌 **Adama HQ**: Fuuldura Hoteela Postaa, Adamaa, Oromiyaa (GPS: 8.5414° N, 39.2689° E)
📌 **Wonji Sub-office**: GPS: 8.4325° N, 39.2241° E
📌 **Mojo Sub-office**: GPS: 8.5912° N, 39.1184° E

🕒 **Sa'aatii Hojii**: Wiixata - Jimaata, sa'aatii 2:00 saafaa hanga 11:30 waaree boodatti (EAT). Sambataa fi Dilbata cufaadha.`;
    } else if (lang === 'am') {
      return `የቢሮአችን አድራሻ እና የስራ ሰዓት (አዳማ ቅርንጫፍ)፦

📌 **አዳማ ዋና ቢሮ**፦ አዳማ፣ ፖስታ ቤት ፊት ለፊት (GPS: 8.5414° N, 39.2689° E)
📌 **ወንጂ ንዑስ ቢሮ**፦ GPS: 8.4325° N, 39.2241° E
📌 **ሞጆ ንዑስ ቢሮ**፦ GPS: 8.5912° N, 39.1184° E

🕒 **የስራ ሰዓት**፦ ከሰኞ እስከ አርብ ጠዋት 2፡00 - ማታ 11፡30 (የምስራቅ አፍሪካ ሰዓት)። ቅዳሜና እሁድ ዝግ ነው።`;
    } else {
      return `Office Address, Locations, and Business Hours (Adama Branch):

📌 **Adama main office**: Opposite Central Post Office Area, Adama, Oromia (GPS: 8.5414° N, 39.2689° E)
📌 **Wonji sub-office**: GPS: 8.4325° N, 39.2241° E
📌 **Mojo sub-office**: GPS: 8.5912° N, 39.1184° E

🕒 **Hours**: Monday to Friday, 8:00 AM to 5:30 PM (East Africa Time). Closed on weekends and public holidays.`;
    }
  }

  // Topic 1: What is Buusaa Gonofaa / general info
  if (
    msgLower.includes('buusaa') || msgLower.includes('gonofaa') || msgLower.includes('solol') ||
    msgLower.includes('what is') || msgLower.includes('about') || msgLower.includes('who are') ||
    msgLower.includes('maali') || msgLower.includes('ምንድን') || msgLower.includes('ነው') ||
    msgLower.includes('coop') || msgLower.includes('walda')
  ) {
    if (lang === 'om') {
      return `Buusaa Gonofaa Oromiyaa (Damee Adamaa) tajaajila maaykiroofaayinaansii fi networkii riijansii aadaa Oromoo irratti hundaa'eedha.

Nuyi aadaa keenya Buusaa Gonofaa (wal-gargaarsa yeroo balaa fi rakkinaa) fi Sololiyaa (waldaa qusannoo fi dorgommii dubartootaa) maaykiroofaayinaansii ammayyaa waliin mijeessuun miseensota keenya hundaaf tajaajila qusannoo fi liqii gurgurtaa ni kennina.

**Galma keenya**: Harka wal qabannee waliin guddachuu, hiyyuma balleessuu fi qonnaan bultoota keenya humneessuudha!`;
    } else if (lang === 'am') {
      return `ቡሳ ጎኖፋ ኦሮሚያ (የአዳማ ቅርንጫፍ) ባህላዊ እሴቶችን እና ዘመናዊ የማይክሮፋይናንስ አገልግሎትን ያቀናጀ ተቋም ነው።

ባህላዊ የጋራ መረዳጃ መንገዶችን (ቡሳ ጎኖፋ - በአደጋ ጊዜ እርስ በርስ መረዳዳት) እና የሴቶች የቁጠባ ቡድኖችን (ሶሎሊያ) በመጠቀም ለአባላት፣ ለአነስተኛ ገበሬዎች እና ነጋዴዎች የቁጠባ እና የብድር አገልግሎት እናቀርባለን።

**አላማችን**፦ አርሶ አደሩን እና አነስተኛ ነጋዴዎችን በጋራ በማብቃት ድህነትን መቀነስ ነው።`;
    } else {
      return `Buusaa Gonofaa Oromiyaa (Adama Branch) is a digital-first microfinance and Oromo-indigenous solidarity network.

We blend modern microfinance safety nets with traditional Gadaa cooperative principles (like Buusaa Gonofaa for disaster relief and Sololiyaa for women-led savings clubs) to empower smallholder farmers, local merchants, and vulnerable households.`;
    }
  }

  // General/Greeting Fallback
  if (lang === 'om') {
    return `Akkam jirtu! Ani GadaaAI, gargaaraa fayiinaansii fi aadaa keessan. 

Miseensa Buusaa Gonofaa ta'uuf, liqii qonnaa argachuuf, inshuraansii qilleensaa ykn qusannoo irratti gaaffii qabdan hunda natti himuu dandeessu. Maal isiniif gochuu danda'a?`;
  } else if (lang === 'am') {
    return `ጤና ይስጥልኝ! እኔ ገዳAI ነኝ፤ የአዳማ ቅርንጫፍ የባህልና አነስተኛ ፋይናንስ አማካሪዎ።

ስለ ብድር፣ ቁጠባ፣ የአየር ሁኔታ ጠቋሚ ኢንሹራንስ ወይም ስለ ቡሳ ጎኖፋ ባህላዊ መረዳጃዎች ጥያቄ ካለዎት እባክዎ ይጠይቁኝ። ምን ልርዳዎት?`;
  } else {
    return `Greetings! I am GadaaAI, your cultural microfinance and climatic safety-net advisor.

How can I assist you today with cooperative savings, seasonal loans, weather-indexed insurance, or Buusaa Gonofaa solidarity?`;
  }
}

// API router for Gemini AI Integration - support both /api/ai/chat and /ai/chat, plus Vercel serverless rewritten paths
app.post(['/api/ai/chat', '/ai/chat', '/api/index.ts', '/api/index.ts/ai/chat', '/api', '/'], async (req, res) => {
  try {
    const { message, history, language } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message payload is required' });
    }

    // Check multiple potential environment variable names for maximum robustness in Vercel/AI Studio
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.VITE_GOOGLE_API_KEY;
    
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      const localText = getLocalResponse(message, language);
      return res.json({
        text: localText,
        isConfigError: true
      });
    }

    // Lazy load GoogleGenAI as recommended by guidelines
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // System instruction explaining roles, cultural systems, services, etc.
    const systemInstruction = `You are "GadaaAI", the expert cultural financial advisor and microfinance assistant for the Buusaa Gonofaa Oromiyaa - Adama Branch (Damee Adamaa). Your role is to assist members, Oromo smallholder farmers, Diaspora contributors, and local merchants in Adama, Oromia, Ethiopia.

### GENERAL DIRECTIVES:
1. Always adapt your language to the visitor's prompt/selected language.
- If the user/UI language is Afaan Oromoo ('om'), respond in warm, polite, and grammatically complete Afaan Oromoo.
- If the user/UI language is Amharic ('am'), respond in beautiful Amharic.
- If the user/UI language is English ('en'), respond in clear, high-quality, professional English.
2. Be incredibly warm, respectful, and encouraging. Embrace the Gadaa traditional mutual-aid philosophy (sharing joys and lifting each other's burdens).
3. Respond in concise, highly readable paragraphs or bullet points. Avoid overwhelming the reader with long blocks of text.

### DETAILED KNOWLEDGE BASE:
1. **Who is Buusaa Gonofaa Oromiyaa (Damee Adamaa)?**
   - It is a digital-first microfinance and Oromo-indigenous solidarity network headquartered in Adama, Oromia.
   - It blends modern financial safety tools with traditional cooperative principles to empower individuals, ultra-poor families, and smallholder farmers.
2. **What are the Ancient Gadaa Cooperatives?**
   - **Buusaa Gonofaa**: The core community mutual-assistance mechanism. If a member experiences a sudden disaster (crop loss, drought, fire, loss of herd), the clan/assembly pools resources together to rebuild their livelihood, ensuring nobody falls into destitute poverty.
   - **Sololiyaa**: Women-led solidarity and savings clubs, fostering economic independence and mutual assistance under traditional matriarchal structures.
3. **Core Financial Services Provided**:
   - **Savings Accounts (Tajiijila Qusannoo)**: Includes regular voluntary savings and compulsory commitment savings, offering competitive resilience. Perfect for small businesses to grow.
   - **Agricultural & Micro Loans**: Tailored seasonal credits to purchase high-quality certified seeds, organic fertilizers, and ecological drip irrigation equipment. Also supports livestock breeding as well as women-merchant micro-credits with friendly guarantees.
   - **Micro-Insurance (Index-Based Agricultural Insurance)**: Custom risk-protection index sheets. We track rainfall and satellite indices. If a localized drought occurs and precipitation drops below predetermined threshold indices, farmers receive automated mutual compensation payouts. This avoids bureaucratic assessment delays.
4. **Active Campaigns (Support Portal)**:
   - *Emergency Crop & Farmer Relief*: Funding seeds/fertilizers recovery for distress seasons.
   - *Vulnerable Families Health Coverage*: Providing premium sponsorships for ultra-poor households to gain healthcare access.
   - *Rural Educational & Water Infrastructure*: Helping drilling clean water wells and building Gadaa rural classrooms.
5. **Office Branches & Location Details**:
   - **Adama Headquarters**: Located in Adama, Oromia, Ethiopia, in front of the Central Post Office (Fuuldura Hoteela Postaa). GPS: 8.5414° N, 39.2689° E.
   - **Wonji Sub-office**: GPS: 8.4325° N, 39.2241° E.
   - **Mojo Sub-office**: GPS: 8.5912° N, 39.1184° E.
   - **Business Hours**: Monday to Friday, 8:00 AM to 5:30 PM (East Africa Time). Closed on weekends and public holidays.

### REPLIES AND GREETINGS STYLE:
- Keep formatting clean using markdown.
- Always begin with a warm local greeting if friendly, such as "Akkam jirtu?" (Afaan Oromoo) or "ጤና ይስጥልኝ" (Amharic) or "Greetings!" (English). Give helpful financial tips and encourage cooperatives!`;

    // Structure history correctly for the new model SDK
    const contentsList: any[] = [];
    
    if (Array.isArray(history)) {
      history.forEach((h: any) => {
        const role = (h.sender === 'user') ? 'user' : 'model';
        contentsList.push({
          role: role,
          parts: [{ text: h.text || '' }]
        });
      });
    }

    // Add the final user message
    contentsList.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Call generateContent with recommended model, utilizing fallback models in case of high demand (503)
    let response;
    let success = false;
    let lastError: any = null;
    const modelsToTry = ['gemini-3.5-flash', 'gemini-3.1-flash-lite', 'gemini-2.5-flash'];

    for (const modelName of modelsToTry) {
      try {
        console.log(`Attempting to generate content using model: ${modelName}`);
        response = await ai.models.generateContent({
          model: modelName,
          contents: contentsList,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
          }
        });
        success = true;
        console.log(`Successfully generated content using model: ${modelName}`);
        break;
      } catch (err: any) {
        console.warn(`Failed to generate content with ${modelName}:`, err);
        lastError = err;
        // Continue to the next fallback model if 503 or server errors occur
      }
    }

    if (!success || !response) {
      throw lastError || new Error('All fallback models failed to respond.');
    }

    res.json({
      text: response.text || 'Thank you for contacting Buusaa Gonofaa Oromiyaa Adama Branch support.'
    });

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    // Graceful fallback: return the smart local response but indicate the exact error details
    const localText = getLocalResponse(req.body.message || '', req.body.language || 'en');
    const keyToCheck = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.VITE_GOOGLE_API_KEY;
    const isApiKeyError = !keyToCheck || keyToCheck === 'MY_GEMINI_API_KEY';
    res.json({
      text: `${localText}\n\n*(Note: GadaaAI is running in local knowledge-base mode. ${error.message || error})*`,
      isConfigError: isApiKeyError
    });
  }
});

export default app;

