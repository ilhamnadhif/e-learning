const express = require("express");
const router = express.Router();

const materiController = require('../controllers/materiController');

router.post("/", materiController.createMateri)
router.get("/", materiController.showAllMateri)
router.get("/:id", materiController.findOneMateri)
router.put("/:id", materiController.editMateri)
// router.delete("/:id", materiController.deleteMateri)

module.exports = router;