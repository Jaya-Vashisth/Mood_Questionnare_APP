const contentConrtoller = require("./../controllers/contentController");
const authcontroller = require("./../controllers/authcontroller");

const express = require("express");
const router = express.Router();

//For authenticated users only
router.use(authcontroller.protect);
router.use(authcontroller.restrictTo("admin"));

router
  .route("/")
  .get(contentConrtoller.getAll)
  .post(contentConrtoller.createContent);

router
  .route("/:id")
  .get(contentConrtoller.getByid)
  .patch(contentConrtoller.updateContent)
  .delete(contentConrtoller.deleteContent);

module.exports = router;
