export const buildPrompt =( //Paremters denge for prompt building
    {
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart

    }
)=> {
    return ` 
You are a STRICT JSON generator for an exam preparation system.

⚠️VERY IMPORTANT:
- Output MUST be valid JSON
- Your response will be parsed using JSON.parse()
- INVALID JSONwill cause system failure
- Use only double quotes ""
- No comments, No trailing commas
- Escape line breaks using \\n
- Do NOT use emojis inside text values

TASK:
Convert the Given topic into Detailed and well explained for learning and Exam-focused notes.

INPUT:
Topic: ${topic}
Class Level: ${classLevel || "Not Specified"}
Exam Type: ${examType || "General"}
Revision Mode: ${revisionMode ? "ON" : "OFF"}
Include Diagram: ${includeDiagram ? "YES" : "NO"}
Include Charts: ${includeChart ? "YES" : "NO"}

GLOBAL CONTENT RULES:
-Use clear, simple, yet detailed exam-oriented language
- Notes MUST be Markdown formatted
- Headings, bullet points and explanation of topic only

REVISION MODE RULES (CRITICAL):
- If REVISION MODE is ON:
     -Notes must be VERY SHORT
     -Only Bullet Points
     -One line answers Only
     -Definitions, formulas, keywords
     -No paragraphs
     -No explanations
     -Content must feel like:
       -last day revision
       -5-minute exam cheat-sheet
    -revisionPoints MUST summarize ALL important facts
    
- If REVISION MODE if OFF:
     -Notes must be very detailed and exam/learning focused
     -Each topic should include:
       -Definition
       -Explanation
       -Examples(if applicable)
    -Paragraph length- max-8-10 lines
    -No unnecessary storytelling or theory

IMPORTANT RULES:
-Divide sub-topics imto Three categories:
    -⭐ Very Important Topics
    -⭐⭐Important Topics
    -⭐⭐⭐Frequently Asked Topics
-All three categories MUST be present
-Base Importance on exam frequency and weightage

DIAGRAM RULES:
- If INCLUDE DIAGRAM is YES:
   - diagram.data MUST be a SINGLE STRING
   - Valid mermaid syntax only
   - Must start with: graph TD
   -Wrap EVERY node label in square blackets[]
   - Do NOT use special characters inside labels
- If INCLUDE DIAGRAM is NO:
   - diagram.data MUST be ""

CHART RULES (RECHARTS):
- If INCLUDE CHARTS is YES:
  - charts array MUST NOT be empty
  - Generate at least ONE chart
  - Choose chart based on topic type:
    - THEORY topic → bar or pie (importance / weightage)
    - PROCESS topic → bar or line (steps / stages)
  - Use numeric values ONLY
  - Labels must be short and exam-oriented
- If INCLUDE CHARTS is NO:
  - charts MUST be []

CHART TYPES ALLOWED:
- bar
- line
- pie


CHART OBJECT FORMAT:
{
  "type": "bar | line | pie",
  "title": "string",
  "data": [
    { "name": "string", "value": 10 }
  ]
}


STRICT JSON FORMAT (DO NOT CHANGE):

{
  "subTopics": {
    "⭐": [],
    "⭐⭐": [],
    "⭐⭐⭐": []
  },
  "importance": "⭐ | ⭐⭐ | ⭐⭐⭐",
  "notes": "string",
  "revisionPoints": [],
  "questions": {
    "short": [],
    "long": [],
    "diagram": ""
  },
  "diagram": {
    "type": "flowchart | graph | process",
    "data": ""
  },
  "charts": []
}

RETURN ONLY VALID JSON.`;
};