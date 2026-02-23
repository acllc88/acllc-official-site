import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Helper to get the base URL
const getBaseUrl = (req: Request) => {
  if (process.env.APP_URL) return process.env.APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `${req.protocol}://${req.get('host')}`;
};

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", env: process.env.NODE_ENV });
});

app.post("/api/create-checkout-session", async (req: Request, res: Response) => {
  console.log("Checkout request received:", req.body);
  
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    console.error("STRIPE_SECRET_KEY is not configured");
    return res.status(500).json({ error: "Stripe API key is not configured in environment variables." });
  }

  const stripe = new Stripe(stripeKey);

  try {
    const { title, price, subtitle } = req.body;
    
    if (!title || !price) {
      return res.status(400).json({ error: "Title and price are required." });
    }

    const firstPart = String(price).split('-')[0];
    const numericPrice = parseInt(firstPart.replace(/[^0-9]/g, ""), 10);
    
    if (isNaN(numericPrice)) {
      return res.status(400).json({ error: `Invalid price format: ${price}` });
    }

    const baseUrl = getBaseUrl(req);

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
            unit_amount: numericPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/?success=true`,
      cancel_url: `${baseUrl}/?canceled=true`,
    });

    return res.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Session Error:", error);
    return res.status(500).json({ error: error.message || "Failed to create checkout session" });
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
        "HTTP-Referer": "https://acllc.studio",
        "X-Title": "ACLLC Support Agent",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
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

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({
    error: "An internal server error occurred.",
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Development and static serving logic
if (!process.env.VERCEL) {
  const PORT = 3000;
  
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "../dist")));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "../dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
