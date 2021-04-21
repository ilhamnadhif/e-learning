const path = require('path');
const express = require("express");
const router = express.Router();

const paymentController = require('../controllers/paymentController');

// view image
router.use('/images', express.static(path.join(__dirname, '../images')))

router.get("/", paymentController.findAllSubscribe)
router.get("/:id", paymentController.findOneSubscribe)
router.post("/:id", paymentController.acceptSubscription)
router.delete("/:id", paymentController.deletePayment)


module.exports = router;