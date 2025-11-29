// This file contains AI-related helpers.
// For now: generate narration text using OpenAI if key is present.
// If no OPENAI_API_KEY, it falls back to a simple template.


const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


// Optional: Node 18+ has global fetch; if not, you'd install node-fetch.


async function generateNarrationText(house, viewerType, section) {
  // Fallback if no API key – still works for hackathon demo
  if (!OPENAI_API_KEY) {
    console.warn("No OPENAI_API_KEY set – using fallback narration text.");
    return `You are viewing ${house.title} at ${
      house.address
    }. This place is great for a ${viewerType}.
Average bills are around £${house.avgBills}.
The landlord has a rating of ${house.landlordRating} out of 5.
Pros of the area: ${house.areaPros}.
Cons: ${house.areaCons}.`;
  }


  const prompt = `
You are an enthusiastic but clear estate agent.
You are explaining a property to a ${viewerType} during an in-person house viewing.


House data:
${JSON.stringify(house, null, 2)}


Section of tour: ${section}


Write a short, friendly spoken narration of 120–180 words.
Mention average bills, landlord rating, area pros and cons in natural spoken language.
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


// Stub: backend contract for audio generation.
// Your ElevenLabs teammate will replace this.
async function generateAudioPlaceholder(text, viewerType) {
  // For now just return null or a placeholder file.
  // Later you'll call ElevenLabs API here and return an actual .mp3 URL.
  console.log(
    `Pretending to generate audio for viewerType=${viewerType}, text length=${text.length}`
  );
  return null; // or "/sample-audio.mp3" if you drop a file into /public
}


module.exports = {
  generateNarrationText,
  generateAudioPlaceholder,
};

