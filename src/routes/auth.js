const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController');

router.post("/login", authController.loginUser)
router.get("/forgot-password", authController.forgotPassword)
router.put("/reset-password/:token", authController.resetPassword)


module.exports = router;