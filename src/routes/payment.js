const express = require("express");
const router = express.Router();

const paymentController = require('../controllers/paymentController');

router.get("/", paymentController.findAllSubscribe)
router.get("/:id", paymentController.findOneSubscribe)
router.post("/:id", paymentController.acceptSubscription)
router.delete("/:id", paymentController.deletePayment)


module.exports = router;