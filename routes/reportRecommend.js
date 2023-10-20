const recommendController = require("./../controllers/recommendController");
const authcontroller = require("./../controllers/authcontroller");
const express = require("express");
const router = express.Router();

router.use(authcontroller.protect);
router.route("/:responseId").get(recommendController.getRecommendations);

module.exports = router;
