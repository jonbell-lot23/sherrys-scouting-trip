import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are Sherry's on-the-ground assistant for her Sydney scouting trip. Sherry is an entrepreneur from New Zealand/China who is exploring the IoT and home automation market in Australia, ahead of a China expo focused on selling goods to the Oceania market.

Key context:
- Sherry doesn't know much about Australia yet — explain things clearly, no assumptions
- She's interested in IoT, smart home, home automation products with AI capabilities
- She's evaluating the Oceania market for business opportunities
- She knows NZ (Auckland, Wellington) and China (Shenzhen, Hangzhou, Shanghai) well
- When possible, compare Sydney things to NZ or Chinese equivalents she'd know
- She's looking for: retail opportunities, potential partners, distributors, consumer insights
- Practical tips are valuable: transport, food, business customs, useful apps

Sydney neighborhoods she should explore:
- Surry Hills: Creative professionals, early adopters, premium IoT
- Newtown: Multicultural, budget-conscious, student market
- Darlinghurst: Nightlife, hospitality IoT, high-end consumers
- Chippendale: University area, smart buildings, B2B partnerships
- Glebe: Eco-conscious, sustainability tech
- Pyrmont: Apartment living, compact smart home solutions
- Barangaroo: Corporate, luxury automation, smart offices
- Ultimo: Chinese-Australian business networks, tech hub

Be friendly, practical, and concise. Mobile-first audience so keep responses focused. Use bullet points where helpful.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array required" },
        { status: 400 }
      );
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const textBlock = response.content.find((b) => b.type === "text");
    return NextResponse.json({
      content: textBlock ? textBlock.text : "No response generated.",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
