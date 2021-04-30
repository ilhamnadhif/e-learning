const { Op } = require("sequelize");
const db = require("../models");

module.exports = {
  createQuestion: async (req, res) => {
    const { materiId, question } = req.body;
    const savedQuestion = await db.QuizQuestion.create({
      babId: materiId,
      question: question,
    });
    res.json(savedQuestion);
  },
  findOneQuestion: async (req, res) => {
    const findOneQuestion = await db.QuizQuestion.findOne({
      include: [
        {
          model: db.QuestionOption,
        },
      ],
      where: { id: req.params.id },
    });
    res.json(findOneQuestion);
  },
  editQuestion: async (req, res) => {
    const { question } = req.body;
    await db.QuizQuestion.update(
      {
        question: question,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send("succes update question");
  },
  deleteQuestion: async (req, res) => {
    await db.QuizQuestion.destroy({
      where: { id: req.params.id },
    });
    res.send("delete subbab succes");
  },
  // question options
  createQuestOptn: async (req, res) => {
    const { questionId, option, is_correct } = req.body;
    const createOpt = await db.QuestionOption.create({
      questionId: questionId,
      option: option,
      is_correct: is_correct,
    });
    res.json(createOpt);
  },
  userAnswer: async (req, res) => {
    const { userId, questionId, optionId } = req.body;
    const iscorrect = await db.QuestionOption.findOne({
      where: {
        [Op.and]: [
          { questionId: questionId },
          { is_correct: "true" || "TRUE" },
        ],
      },
    });
    const answer = await db.QuizUserAnswer.create({
      userId: userId,
      questionId: questionId,
      optionId: optionId,
      is_correct: iscorrect.id,
    });
    res.json(answer);
  },
};
