const recommendController = require("./../controllers/recommendController");
const express = require("express");
const router = express.Router();

router.route("/:responseId").get(recommendController.getRecommendations);

module.exports = router;
