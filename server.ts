import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();

// Middleware
app.use(express.json());

// API Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API router for Gemini AI Integration
app.post('/api/ai/chat', async (req, res) => {
    try {
      const { message, history, language } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message payload is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        const errorMsg = {
          om: 'Deeggarsi Gadaa-AI qorannoodhaaf qophaa\'aa jira. Maaloo \'Settings > Secrets\' irratti GEMINI_API_KEY sajeessi.',
          am: 'የገዳ-AI ድጋፍ እየተዘጋጀ ነው። እባክዎ በ \'Settings > Secrets\' ውስጥ GEMINI_API_KEY ያስገቡ።',
          en: 'Gadaa-AI is currently warming up. Please configure the GEMINI_API_KEY in the Settings > Secrets panel to activate me!'
        };
        const selectedLang = (language === 'om' || language === 'am' || language === 'en') ? language : 'en';
        return res.json({
          text: errorMsg[selectedLang],
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
      // Model expects array of { role: 'user' | 'model', parts: [{ text: string }] }
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

      // Call generateContent with recommended model
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: contentsList,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({
        text: response.text || 'Thank you for contacting Buusaa Gonofaa Oromiyaa Adama Branch support.'
      });

    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({
        error: 'Unable to communicate with Gadaa-AI service',
        details: error.message || error
      });
    }
  });

async function startServer() {
  const PORT = 3000;

  // Vite development middleware vs Static serving
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Bind exclusively to Port 3000 as mandated by environment rules
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server successfully started on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}
