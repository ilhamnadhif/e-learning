const express = require("express");
const router = express.Router();

const quizController = require('../controllers/quizController');

router.post("/", quizController.createQuestion)
router.get("/:id", quizController.findOneQuestion)
router.put("/:id", quizController.editQuestion)
router.delete("/:id", quizController.deleteQuestion)

// question options
router.post("/option", quizController.createQuestOptn)

// user answer
router.post("/answer", quizController.userAnswer)


module.exports = router;