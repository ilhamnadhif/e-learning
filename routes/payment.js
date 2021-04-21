const express = require("express");
const router = express.Router();

const paymentController = require('../controllers/paymentController');

router.get("/", paymentController.findAllSubscribe)
router.get("/:id", paymentController.findOneSubscribe)
router.post("/:id", paymentController.acceptSubscription)


module.exports = router;