const express = require("express");
const router = express.Router();

const subscribeController = require('../controllers/subscribeController');

router.get("/", subscribeController.findAllSubscribe)
router.get("/:id", subscribeController.findOneSubscribe)
router.put("/:id", subscribeController.acceptSubscription)


module.exports = router;