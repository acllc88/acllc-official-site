import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/create-checkout-session", async (req: Request, res: Response) => {
    console.log("Checkout request received:", req.body);
    try {
      const { title, price, subtitle } = req.body;
      
      // Extract numeric price. If it's a range like "300-500", take the first number.
      const firstPart = price.split('-')[0];
      const numericPrice = parseInt(firstPart.replace(/[^0-9]/g, ""), 10);
      
      if (isNaN(numericPrice)) {
        return res.status(400).json({ error: "Invalid price format" });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `ACLLC Service: ${title}`,
                description: subtitle || "Professional Creative Service",
              },
              unit_amount: numericPrice * 100, // Stripe expects amounts in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.APP_URL || `http://localhost:${PORT}`}/?success=true`,
        cancel_url: `${process.env.APP_URL || `http://localhost:${PORT}`}/?canceled=true`,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/chat", async (req: Request, res: Response) => {
    const { messages } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "OpenRouter API key not configured" });
    }

    const systemPrompt = `
You are the ACLLC Multi-Agent System. You start as "ACLLC Support (General Strategist) 💼".

GOAL: Be PROACTIVE and SALES-DRIVEN. Your mission is to qualify leads and move them toward a high-ticket sale or consultation.

AGENT PERSONAS:
1. **ACLLC Support (General Strategist) 💼**: Qualifies the lead. Asks high-level business questions (e.g., "What is your primary revenue goal for this project?").
2. **Alex (Web Specialist) 🌐**: Focuses on conversion-optimized web architecture.
3. **Leo (Performance Expert) ⚡**: Focuses on technical ROI, speed, and security as business assets.
4. **Maya (Branding Guru) 🎨**: Focuses on market positioning and visual authority.
5. **Sam (Marketing Strategist) 📈**: Focuses on lead generation and market reach.
6. **Jordan (App Architect) 📱**: Focuses on user retention and mobile ecosystem strategy.

TRANSFER PROTOCOL:
- If a user mentions a specific service, transfer them to the specialist.
- Transfer phrase: "That project requires deep technical insight. I'm transferring you to [Specialist Name], our [Title]. One moment..."
- Specialist intro: "Hello! I am [Specialist Name] [Emoji]. I've reviewed your request. To tailor the best strategy, [Ask a clarifying question]?"

Strict Sales Rules:
1. **PROACTIVE QUALIFICATION**: Always ask 1-2 clarifying questions to understand their budget, timeline, or business objectives before giving a full recommendation.
2. **SENIOR TONE**: Use words like "ROI," "Market Positioning," "Scalability," and "Conversion Optimization."
3. **SERVICE LINKS**: When recommending a service, you MUST include a checkout link in this EXACT format: \`[PAY: Service Name - $Price]\`. Example: \`[PAY: Standard Web - $800]\`. This is the ONLY way for them to buy in the chat.
4. **URGENCY**: Mention that our production slots for this month are filling up fast.
5. **BULLET POINTS**: Use for features, pricing tiers, or strategic benefits.
6. **CONCISE**: Max 5 sentences. Every word must sell.
7. **CTA**: Always end with a question or a push to WhatsApp (+212 638 426 738) for a formal quote.

Example:
"I'll transfer you to Alex, our Web Specialist.
---
Hello! I am Alex 🌐. A new website is a powerful asset. To ensure we maximize your ROI:
- Are you looking for a fresh brand launch or a redesign of an existing site?
- What is the primary action you want users to take?
I recommend our Standard Web package to start: [PAY: Standard Web - $800]. Shall we discuss your specific features? 🎯"
`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "https://acllc.studio", // Optional, for OpenRouter rankings
          "X-Title": "ACLLC Support Agent", // Optional
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-001", // Using a fast, capable model
          messages: [
            { role: "system", content: systemPrompt },
            ...messages
          ]
        })
      });

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: "Failed to communicate with AI" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
