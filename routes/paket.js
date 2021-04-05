const express = require("express");
const router = express.Router();

const paketController = require('../controllers/paketController');

router.post("/", paketController.createPaket)
router.post("/materi", paketController.createPaketMateri)
router.get("/", paketController.showAllPaket)
router.get("/:id", paketController.findOnePaket)
router.put("/:id", paketController.editPaket)

module.exports = router;