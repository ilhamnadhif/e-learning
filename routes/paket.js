const express = require("express");
const router = express.Router();

const paketController = require('../controllers/paketController');

router.post("/", paketController.createPaket)
router.post("/materi", paketController.createMateri)
router.get("/", paketController.showAllMateri)
router.get("/:id", paketController.findOneMateri)

module.exports = router;