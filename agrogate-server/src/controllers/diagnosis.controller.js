const asyncErrorHandler = require("../utils/asyncErrorHandler");
const openai = require("../config/openai");

const detectDiseaseController = asyncErrorHandler(async (req, res) => {
  const base64Image = "base64";
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You have to give concise and short answers",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "GPT, your task is to identify plant or animal health issues with precision. Analyze any image of a plant or leaf or animal I provide, and detect all abnormal conditions, whether they are diseases, pests, deficiencies, or decay. Respond strictly with the name of the condition identified diseases and provide pest control advice, and nothing else—no explanations, no additional text. If a condition is unrecognizable, reply with 'I don't know'. If the image is not plant-related or animal-related, say 'Please pick another image'",
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    max_tokens: 50,
  });
  const data = chatCompletion.choices[0].message.content;
  return res
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK, message: "Successful", data });
});

module.exports = { detectDiseaseController };
