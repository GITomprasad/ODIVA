import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/store";
import { RECIPES } from "@/data/recipes";

const XAI_API_KEY = process.env.XAI_API_KEY;

// Smart rule-based Odia culinary & grocery assistant when XAI_API_KEY is not configured
function generateRuleBasedResponse(prompt: string) {
  const query = prompt.toLowerCase();
  const allProducts = dataStore.getProducts();

  // Recipe queries
  if (
    query.includes("dalma") ||
    query.includes("randa") ||
    query.includes("cook") ||
    query.includes("recipe") ||
    query.includes("today")
  ) {
    const dalma = RECIPES.find((r) => r.id === "recipe-dalma");
    const pakhala = RECIPES.find((r) => r.id === "recipe-pakhala-bhata");
    const suggestedProducts = allProducts.filter((p) =>
      ["odiva-moong-dal-desi", "odiva-pumpkin-kakharu", "odiva-drumstick-sajana", "odiva-panch-phutana"].includes(p.id)
    );

    return {
      reply:
        "Namaskara! 🙏 For lunch today, I highly recommend authentic **Odia Moong Dalma with hot Arua Rice and crispy Keonjhar Phula Badi**! Dalma is wholesome, loaded with vegetables like raw banana, pumpkin, drumsticks, and tempered in pure desi ghee with fragrant Panch Phutana.\n\nWould you like me to add all Dalma ingredients directly to your basket?",
      recommendedProducts: suggestedProducts,
      suggestedRecipes: [dalma, pakhala].filter(Boolean),
    };
  }

  // Budget queries
  if (query.includes("budget") || query.includes("300") || query.includes("400") || query.includes("500") || query.includes("rupee")) {
    const budgetItems = allProducts.filter((p) =>
      ["odiva-usuna-rice", "odiva-moong-dal-desi", "odiva-potato-fresh", "odiva-mustard-oil-kachighani"].includes(p.id)
    );
    const totalCost = budgetItems.reduce((acc, p) => acc + p.price, 0);

    return {
      reply: `I have planned an essential Odisha weekly starter basket for just **₹${totalCost}**!\n- Usuna Parboiled Rice (1 kg): ₹52\n- Desi Moong Dal (1 kg): ₹128\n- Fresh Red Soil Potato (1 kg): ₹32\n- Pure Mustard Oil (1 L): ₹155\n\nThis gives your family 4 wholesome traditional meals well within budget.`,
      recommendedProducts: budgetItems,
    };
  }

  // Chhena Poda / Sweet queries
  if (query.includes("sweet") || query.includes("chhena poda") || query.includes("mitha") || query.includes("rasagola")) {
    const sweets = allProducts.filter((p) =>
      ["odiva-chhena-poda-nayagarh", "odiva-pahala-rasagola", "odiva-puri-khaja-jagannath"].includes(p.id)
    );
    return {
      reply:
        "Odisha is the land of sublime sweets! Our **GI-certified Nayagarh Chhena Poda** is baked overnight in Sal leaves to achieve that iconic caramelized crust. We also have authentic **Pahala Rasagola** and crispy **Puri Bada Danda Pheni Khaja** freshly stocked!",
      recommendedProducts: sweets,
    };
  }

  // Pakhala queries
  if (query.includes("pakhala") || query.includes("summer") || query.includes("dahi")) {
    const pakhalaItems = allProducts.filter((p) =>
      ["odiva-usuna-rice", "odiva-curd-dahi", "odiva-keonjhar-phula-badi", "odiva-ambula-dried-mango"].includes(p.id)
    );
    return {
      reply:
        "Nothing beats a cold bowl of **Dahi Pakhala**! Savor it with crunchy Keonjhar Badi Chura, sun-dried Ambula, mashed spicy potato (Aloo Chakata), and fresh green chillies. Here are the essential ingredients from our catalogue:",
      recommendedProducts: pakhalaItems,
    };
  }

  // Default friendly grocery assistant
  const specials = allProducts.filter((p) => p.isOdishaSpecial).slice(0, 4);
  return {
    reply:
      "Namaskara! I am **ODIVA Sangathi**, your personal Odisha grocery assistant. How can I help you today? You can ask me:\n• 'What shall I cook for lunch today?'\n• 'Suggest a healthy basket under ₹400'\n• 'What is special about Nayagarh Chhena Poda?'\n• 'Ingredients needed for Dalma'",
    recommendedProducts: specials,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const prompt = (body.prompt || "").trim();

    if (!prompt) {
      return NextResponse.json({ success: false, error: "Prompt cannot be empty" }, { status: 400 });
    }

    if (prompt.length > 500) {
      return NextResponse.json({ success: false, error: "Prompt is too long (max 500 characters)" }, { status: 400 });
    }

    // If xAI API key is present, attempt call to official xAI API (https://api.x.ai/v1/chat/completions)
    if (XAI_API_KEY && !XAI_API_KEY.includes("your-xai")) {
      try {
        const xaiResponse = await fetch("https://api.x.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${XAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "grok-2-latest",
            messages: [
              {
                role: "system",
                content:
                  "You are ODIVA Sangathi, an expert Odia chef and grocery assistant for the ODIVA e-commerce platform in Odisha, India. Always provide warm, culturally authentic recommendations for Odia foods (Dalma, Pakhala, Besara, Chhena Poda, Pitha) and everyday staples. Keep responses under 150 words.",
              },
              { role: "user", content: prompt },
            ],
            temperature: 0.7,
            max_tokens: 300,
          }),
        });

        if (xaiResponse.ok) {
          const data = await xaiResponse.json();
          const replyText = data.choices?.[0]?.message?.content || "";

          // Match relevant products from catalogue to attach
          const allProducts = dataStore.getProducts();
          const matched = allProducts.filter((p) =>
            replyText.toLowerCase().includes(p.name.toLowerCase()) ||
            p.searchKeywords?.some((kw) => replyText.toLowerCase().includes(kw.toLowerCase()))
          ).slice(0, 4);

          return NextResponse.json({
            success: true,
            reply: replyText,
            recommendedProducts: matched.length > 0 ? matched : allProducts.filter((p) => p.isOdishaSpecial).slice(0, 3),
            source: "xai",
          });
        }
      } catch (e) {
        console.warn("xAI call failed, falling back to rule engine:", e);
      }
    }

    // Fallback rule engine
    const fallback = generateRuleBasedResponse(prompt);
    return NextResponse.json({
      success: true,
      ...fallback,
      source: "rule-engine",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
