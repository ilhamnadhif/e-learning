const express = require("express");
const router = express.Router();

const materiRouter = require("./materi");
const babRouter = require("./bab");
const subBabRouter = require("./subBab");
const userRouter = require("./user");
const paketRouter = require("./paket");
const subscribeRouter = require("./subscribe");

router.use("/materi", materiRouter);
router.use("/bab", babRouter);
router.use("/subbab", subBabRouter);
router.use("/user", userRouter);
router.use("/paket", paketRouter);
router.use("/subscribe", subscribeRouter);

module.exports = router;
