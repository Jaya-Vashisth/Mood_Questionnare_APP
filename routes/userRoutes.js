const express = require("express");
const authController = require("./../controllers/authcontroller");
const userController = require("./../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

//protect all routes after this middleware
router.use(authController.protect);

router.get("/me", userController.getMe, userController.getUser);

router.patch("/updateMe", userController.updateMe);

router.delete("/deleteMe", userController.deleteMe);

//following routes are restricted to admins only
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
