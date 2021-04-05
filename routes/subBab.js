const express = require("express");
const router = express.Router();

const subBabController = require('../controllers/subBabController');

router.post("/", subBabController.createSubBab)
router.get("/:id", subBabController.findOneSubBab)
router.put("/:id", subBabController.editSubBab)

module.exports = router;