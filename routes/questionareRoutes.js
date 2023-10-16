const quesController = require("./../controllers/quesstionareController");
const express = require("express");
const router = express.Router();
const authcontroller = require("./../controllers/authcontroller");

//list all present in database
router.get("/listAll", quesController.getlist);

//////////////////////////////////////////

//For authenticated users only

router.use(authcontroller.protect);

//get the assesment by title
router.get("/:title", quesController.getOne);

/////////////////////////////////////////////////

//Following routes are restricted to admin only

router.use(authcontroller.restrictTo("admin"));

router
  .route("/")
  .get(quesController.getAll)
  .post(quesController.createQuestionaries);

router
  .route("/:id")
  .get(quesController.getByid)
  .patch(quesController.updateQuestionaries)
  .delete(quesController.deleteQuestionaries);

module.exports = router;
