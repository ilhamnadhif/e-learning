const express = require("express");
const router = express.Router();

const babController = require('../controllers/babController');

router.post("/", babController.createBab)
router.get("/:id", babController.findOneBab)
router.put("/:id", babController.editBab)

module.exports = router;