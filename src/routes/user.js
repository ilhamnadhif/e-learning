const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.post("/biodata", userController.createUserBiodata);
router.post(
  "/paket",
  userController.upload.single("image"),
  userController.createUserPaket
);
router.get("/", userController.showAllUser);
router.get("/:id", userController.findOneUser);
router.put("/:id", userController.editUserBiodata);

module.exports = router;
