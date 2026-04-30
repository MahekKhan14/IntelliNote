// We will use gemini-2.5-flash but add a retry mechanism since it gets overloaded often
const Gemini_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to call Gemini API
export const generateGeminiResponse = async (prompt) => {
  let lastError;
  let retries = 3;
  
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(
        `${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`,
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

      console.log(`Gemini raw response (Attempt ${i+1}):`, JSON.stringify(data, null, 2));

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
      console.log(`Gemini Fetch Error (Attempt ${i+1}):`, error.message);
      lastError = error;
      
      // If we still have retries left, wait 2 seconds and try again
      if (i < retries - 1) {
          console.log(`Retrying in 2 seconds...`);
          await delay(2000);
          continue;
      }
    }
  }
  
  // If all retries fail, throw the last error
  throw new Error(lastError.message);
};