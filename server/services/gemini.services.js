// Models to try in order of preference
const models = [
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
];

// Function to call Gemini API
export const generateGeminiResponse = async (prompt) => {
  let lastError;
  
  for (const url of models) {
    try {
      const response = await fetch(
        `${url}?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ]
          })
        }
      );

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      const data = await response.json();

      console.log(`Gemini raw response from ${url}:`, JSON.stringify(data, null, 2));

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("No text returned from Gemini");
      }

      const cleanText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      let parsed;
      try {
        parsed = JSON.parse(cleanText);
      } catch {
        parsed = cleanText;
      }

      return parsed;

    } catch (error) {
      console.log(`Gemini Fetch Error on ${url}:`, error.message);
      lastError = error;
      
      // Attempt fallback if it fails
      console.log("Attempting fallback model...");
      continue;
    }
  }
  
  // If all models fail, throw the last error
  throw new Error(lastError.message);
};