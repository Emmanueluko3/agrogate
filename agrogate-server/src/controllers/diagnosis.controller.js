const asyncErrorHandler = require("../utils/asyncErrorHandler");
const openai = require("../config/openai");

const detectDiseaseController = asyncErrorHandler(async (req, res) => {
  // gpt-4-vision-preview
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Please make a joke" }],
    model: "dall-e-3",
  });
  const data = chatCompletion.choices[0].message.content;
  return res
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK, message: "Successful", data });
});

module.exports = { detectDiseaseController };
