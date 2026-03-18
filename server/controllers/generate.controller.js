// Notes ke liye Proper response generate krayenge 
// and credits minus karenge and also user model js pe save bhi karayenge
import Notes from "../models/notes.model.js";
import { generateGeminiResponse } from "../services/gemini.services.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import UserModel from "../models/user.model.js";
export const generateNotes = async (req, res) => {
    console.log("Incoming request body:", req.body);
    try {
        // Request body se fields nikalenge
        const {
            topic,
            classLevel,
            examType,
            revisionMode = false,
            includeDiagram = false,
            includeChart = false
        } = req.body;
        // Agar topic missing hai to error bhejenge
        if (!topic) {
            return res.status(400).json({ message: "Topic is required" });
        }
        // User find krenge
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }
        // Condition check karenge for credits agar kam hai
        if (user.credits < 10) {
            user.isCreditAvailable = false;
            await user.save();
            return res.status(403).json({
                message: "Insufficient Credits",
            });
        }
        // PROMPT likhenge
        const prompt = buildPrompt({
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeChart
        });
        // Ai response generate karenge
        const aiResponse = await generateGeminiResponse(prompt);
        // Agar AI response fail ho gaya to error bhejenge
        if (!aiResponse || aiResponse.length === 0) {
            return res.status(500).json({
                error: "AI Generation failed",
                message: "Gemini API fetch failed!"
            });
        }
        // ✅ Gemini response parse karenge (removes ```json ``` wrappers)
        let parsedResponse;
        try {
            const cleaned = aiResponse
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();
            parsedResponse = JSON.parse(cleaned);
        } catch (parseError) {
            return res.status(500).json({
                error: "AI Generation failed",
                message: "Failed to parse AI response"
            });
        }
        // Ab notes create karenge aur DB me save karenge
        const notes = await Notes.create({
            user: user._id,
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeChart,
            content: JSON.stringify(parsedResponse) // ✅ parsed response save karenge
        });
        // User update karenge (credits minus + notes push)
        user.credits -= 10;
        if (user.credits <= 0) user.isCreditAvailable = false;
        if (!Array.isArray(user.notes)) {
            user.notes = [];
        }
        user.notes.push(notes._id);
        await user.save();
        // Final response bhejenge
        return res.status(200).json({
            data: parsedResponse,   // ✅ parsed object bhejenge frontend ko
            noteId: notes._id,      // Saved note ID
            creditsLeft: user.credits // Remaining credits
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "AI Generation failed",
            message: error.message
        });
    }
};
