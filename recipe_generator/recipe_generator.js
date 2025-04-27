/* eslint-disable */
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const fetch = require("node-fetch");
const cors = require("cors")({ origin: true });

const DEEPSEEK_API_KEY = defineSecret("DEEPSEEK_API_KEY");

exports.generateDeepseekRecipe = onRequest(
  { secrets: [DEEPSEEK_API_KEY] },
  (req, res) => {
    cors(req, res, async () => {
      if (req.method === "OPTIONS") {
        return res.status(204).send("");
      }

      if (req.method !== "POST") {
        return res.status(405).send("Only POST requests allowed.");
      }

      const { fridgecontents, spices, userPrompt } = req.body;
      if (!fridgecontents) {
        return res.status(400).json({ error: "Missing fridge contents" });
      }
      if (!spices) {
        spices = "undefined";
      }

      const apiKey = DEEPSEEK_API_KEY.value();
      if (!apiKey) {
        return res.status(500).json({ error: "Missing DeepSeek API key" });
      }

      const prompt = `You are a practical AI nutritionist and recipe assistant.
       Your role is to help users figure out what foods they can make based on the
       ingredients they have in their pantry and grocery list, avoiding any dietary restrictions.
      
       Prioritize pantry items. Use grocery items only as needed.
       If a recipe cannot be fully made, suggest minimal, widely usable substitutions.

       Here is the user's fridge list: ${fridgecontents}

       Here is the user's spice list: ${spices}
      
       Please suggest 1–3 meal ideas. For each:
       - Include a title
       - List ingredients and measurements
       - Describe simple preparation steps
       - Estimate calories, protein, carbs, and fat (approximate)
      
        Respond with valid JSON only.
        DO NOT include any explanation, commentary, or formatting.
        DO NOT wrap the JSON in backticks or markdown.
        DO NOT say "Here's a recipe" or anything similar.
        Only return a pure JSON object matching this schema:
        {
          "recipes": [
            {
              "title": "...",
              "ingredients": ["..."],
              "instructions": ["..."],
              "macros": { "calories": 0, "protein": 0, "fat": 0, "carbs": 0 }
            }
          ]
        }
        `.trim();

      const fullPrompt = userPrompt
        ? `User: ${userPrompt}\n\n` + prompt
        : prompt;

      console.log("Full prompt sent to DeepSeek:", fullPrompt);

      try {
        const response = await fetch(
          "https://api.deepseek.com/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: "deepseek-chat",
              messages: [{ role: "user", content: fullPrompt }],
              temperature: 0.7,
            }),
          }
        );

        const data = await response.json();
        let content = null;
        if (
          data &&
          Array.isArray(data.choices) &&
          data.choices[0] &&
          data.choices[0].message &&
          data.choices[0].message.content
        ) {
          content = data.choices[0].message.content;
        }

        if (!content) {
          console.error("No content from DeepSeek:", data);
          return res.status(500).json({ error: "No content from DeepSeek" });
        }
        try {
          console.log("Raw content from DeepSeek:", content);
          const recipes = JSON.parse(content);
          return res.status(200).json({ recipes });
        } catch (err) {
          console.error("Error parsing JSON:", err);
          console.error("DeepSeek returned:", content);
          return res
            .status(500)
            .json({ error: "Invalid JSON response from DeepSeek" });
        }
      } catch (err) {
        console.error("Function error:", err);
        return res.status(500).json({ error: "Internal server error.", err });
      }
    });
  }
);
