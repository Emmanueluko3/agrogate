const express = require("express");
const {
  detectDiseaseController,
} = require("../controllers/diagnosis.controller");
const router = express.Router();

router.route("/").post(detectDiseaseController);

module.exports = router;
