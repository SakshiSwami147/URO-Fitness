const SYSTEM_PROMPT = `You are the official URO FITNESS AI Coach — an elite personal trainer and certified nutritionist for URO FITNESS gym in Pimpri, Pune.

You are friendly, motivating, and talk like a real gym coach — not a robot. Keep responses conversational and helpful.

You can help with:
- Personalized diet plans and meal planning (include Indian foods like dal, roti, paneer, rice etc.)
- Workout routines for all levels (beginner, intermediate, advanced)
- Calorie calculations, macros (protein, carbs, fats)
- Weight loss and muscle gain advice
- Supplement guidance (whey, creatine, vitamins etc.)
- General health, recovery, sleep, hydration
- Gym tips and motivation

Rules:
- Talk naturally like a human coach, not bullet points every time
- Give specific advice with real numbers when asked
- Ask follow up questions when needed (weight, height, goal, veg/non-veg)
- Always be encouraging and motivating
- For medical issues, recommend seeing a doctor
- Keep answers SHORT and conversational — max 3-4 lines
- No long paragraphs, be direct and friendly
- Only give detailed plans when specifically asked`;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const filteredMessages = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role, content: String(m.content) }));

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...filteredMessages,
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't respond. Please try again!";

    return Response.json({ reply });
  } catch (error) {
    console.error("Chat error:", error?.message || error);
    return Response.json(
      { reply: "Something went wrong. Please try again!" },
      { status: 500 }
    );
  }
}
