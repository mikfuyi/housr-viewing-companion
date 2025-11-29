// backend/services/ai.js
// AI-related helpers: generate narration text.
// Uses OpenAI if OPENAI_API_KEY is set, otherwise uses a simple template.

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Node 18+ has global fetch. If you're on older Node, install node-fetch.

async function generateNarrationText(house, viewerType, section) {
  // Fallback if no API key – still works
  if (!OPENAI_API_KEY) {
    console.warn("No OPENAI_API_KEY set – using fallback narration text.");
    const baseDescription =
      house.description ||
      `This is a property called "${house.title || "this home"}".`;

    return `Welcome! You are viewing a property for a ${viewerType}.
${baseDescription}
This short tour is for the section: ${section}.
Imagine I'm walking you through the key features and the surrounding area.`;
  }

  const prompt = `
You are an enthusiastic but clear estate agent.
You are explaining a property to a ${viewerType} during an in-person house viewing.

House data (may be partly free text from landlord):
${JSON.stringify(house, null, 2)}

Section of tour: ${section}

Write a short, friendly spoken narration of 120–180 words.
If available, mention average bills, landlord rating, area pros and cons in natural spoken language.
If those fields are missing, focus on the free-text description.
Keep it natural and conversational. Do not include any formatting or bullet points.
`;

  const body = {
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error("OpenAI error:", await response.text());
    throw new Error("Failed to generate narration text");
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content?.trim();

  return text || "Sorry, I couldn't generate narration right now.";
}

module.exports = {
  generateNarrationText,
};
