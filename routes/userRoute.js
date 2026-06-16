const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");

router.post(
  "/",
  authentication,
  authorization("admin", "hr"),
  userController.createUser,
);

router.post("/login", userController.userLogin);

router.get(
  "/getusers",
  authentication,
  authorization("admin", "hr"),
  userController.getUsers,
);
router.get(
  "/get/:id",
  authentication,
  authorization("admin", "hr"),
  userController.getUserById,
);
router.delete(
  "/delete/:id",
  authentication,
  authorization("admin", "hr"),
  userController.deleteUser,
);
router.put(
  "/update/:id",
  authentication,
  authorization("admin", "hr"),
  userController.updateUser,
);

module.exports = router;
