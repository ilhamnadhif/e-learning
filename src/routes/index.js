const path = require("path");
const express = require("express");
const router = express.Router();

// view image
router.use("/images", express.static(path.join(__dirname, "../../images")));

router.use("/materi", require("./materi"));
router.use("/bab", require("./bab"));
router.use("/subbab", require("./subBab"));
router.use("/user", require("./user"));
router.use("/paket", require("./paket"));
router.use("/payment", require("./payment"));
router.use("/quiz", require("./quiz"));
router.use("/auth", require("./auth"));

module.exports = router;
