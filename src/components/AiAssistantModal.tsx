"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ShoppingBag,
  ChefHat,
  Tag,
  Plus,
  Check,
} from "lucide-react";
import { Product, Recipe } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  recommendedProducts?: Product[];
  suggestedRecipes?: Recipe[];
}

export default function AiAssistantModal() {
  const { language } = useLanguage();
  const { addToCart } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "assistant",
      text:
        language === "or"
          ? "ନମସ୍କାର! 🙏 ମୁଁ ଆପଣଙ୍କ ଓଡ଼ିଭା ସାଙ୍ଗା (AI Assistant)। ଆଜି ଆପଣ କଣ ରାନ୍ଧିବାକୁ ଚାହାଁନ୍ତି କିମ୍ବା ବଜେଟ୍ ରାସନ ତିଆରି କରିବାକୁ ଚାହାଁନ୍ତି? ମୋତେ ପଚାରନ୍ତୁ!"
          : "Namaskara! 🙏 I am **ODIVA Sangathi**, your AI Odisha grocery & cooking assistant. How can I help you today? I can suggest traditional meals, plan your grocery budget, or recommend authentic ingredients!",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (promptText: string) => {
    const q = promptText.trim();
    if (!q || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: q,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: q }),
      });
      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: `asst-${Date.now()}`,
            sender: "assistant",
            text: data.reply,
            recommendedProducts: data.recommendedProducts,
            suggestedRecipes: data.suggestedRecipes,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `asst-${Date.now()}`,
            sender: "assistant",
            text: "Apologies! I encountered an issue. Please try asking about Dalma, Pakhala, or budget baskets.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: "assistant",
          text: "I am having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    { label: "🍲 What shall I cook today?", prompt: "What shall I cook for lunch today in Odia style?" },
    { label: "💰 Budget Basket under ₹400", prompt: "Suggest an essential weekly grocery basket under ₹400" },
    { label: "🌾 Dalma ingredients", prompt: "What are the ingredients needed for authentic Moong Dalma?" },
    { label: "🍰 Best Odia sweet?", prompt: "Tell me about Nayagarh Chhena Poda and how it is made" },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-odiva-forest to-emerald-700 hover:from-emerald-700 hover:to-odiva-forest text-white p-3.5 rounded-full shadow-2xl border-2 border-odiva-turmeric flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95 group"
        aria-label="Open ODIVA AI Assistant"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-odiva-turmeric group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-odiva-orange rounded-full animate-ping" />
        </div>
        <span className="font-bold text-xs pr-1 hidden sm:inline">
          {language === "or" ? "ଓଡ଼ିଭା ସାଙ୍ଗା (AI)" : "Ask Sangathi (AI)"}
        </span>
      </button>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[550px] bg-white rounded-3xl shadow-2xl border border-odiva-border flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-odiva-forest via-emerald-800 to-odiva-dark text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-odiva-turmeric font-black shadow-inner">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  <span>ODIVA Sangathi</span>
                  <span className="text-[10px] bg-odiva-orange text-white px-1.5 py-0.2 rounded font-extrabold uppercase">
                    AI
                  </span>
                </h3>
                <p className="text-[11px] text-white/75 font-medium">
                  {language === "or" ? "ଆପଣଙ୍କ ଓଡ଼ିଆ ରୋଷେଇ ଓ ବଜେଟ୍ ସହଯୋଗୀ" : "Your Odia Cooking & Grocery Companion"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/70 hover:text-white rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2.5 bg-odiva-cream/50 border-b border-odiva-border flex gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
            {samplePrompts.map((sp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(sp.prompt)}
                className="px-2.5 py-1 bg-white hover:bg-odiva-cream text-odiva-forest font-semibold rounded-full border border-odiva-border whitespace-nowrap shadow-xs transition"
              >
                {sp.label}
              </button>
            ))}
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gray-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-odiva-forest text-white flex items-center justify-center flex-shrink-0 text-xs font-black">
                    ଓ
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-odiva-forest text-white rounded-tr-xs shadow-xs"
                      : "bg-white text-gray-800 border border-gray-200 rounded-tl-xs shadow-xs"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Attached Recommended Products */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-gray-100 space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Recommended Items ({msg.recommendedProducts.length}):
                      </p>
                      <div className="grid grid-cols-1 gap-1.5">
                        {msg.recommendedProducts.map((prod) => (
                          <div
                            key={prod.id}
                            className="flex items-center justify-between p-1.5 bg-odiva-cream/70 rounded-xl border border-odiva-border"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <img
                                src={prod.imageUrl}
                                alt={prod.name}
                                className="w-8 h-8 rounded-lg object-cover"
                              />
                              <div className="truncate">
                                <span className="font-bold text-[11px] block truncate text-gray-800">
                                  {prod.name}
                                </span>
                                <span className="text-[10px] text-odiva-forest font-black">
                                  {formatPrice(prod.price)}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => addToCart(prod, 1)}
                              className="px-2 py-1 bg-odiva-forest hover:bg-emerald-800 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-xs transition"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-odiva-orange text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-gray-400 p-2">
                <Sparkles className="w-4 h-4 text-odiva-orange animate-spin" />
                <span>Sangathi is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about recipes, budget, ingredients..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-odiva-forest"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 bg-odiva-forest hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
