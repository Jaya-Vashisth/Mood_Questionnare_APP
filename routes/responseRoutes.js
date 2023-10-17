const quesController = require("./../controllers/quesstionareController");
const express = require("express");
const router = express.Router();
const authcontroller = require("./../controllers/authcontroller");
const responseController = require("./../controllers/responseController");

//logged in user can access
router.use(authcontroller.protect);

router.post("/submitResponse", responseController.saveResponse);
router.get("/myResponses", responseController.myResponses);

router.get(
  "/allResponses",
  authcontroller.restrictTo("admin"),
  responseController.returnAll
);
