const db = require("../db/models");

module.exports = {
  createBab: async (req, res) => {
    const { materiId, title } = req.body;
    const savedBab = await db.Bab.create({
      materiId: materiId,
      title: title,
    });
    res.json(savedBab);
  },
  findOneBab: async (req, res) => {
    const findOneBab = await db.Bab.findOne({
      include: [
        {
          model: db.SubBab,
        },
        {
          model: db.QuizQuestion,
          include: [
            {
              model: db.QuestionOption
            },
          ]
        },
      ],
      where: { id: req.params.id },
    });
    res.json(findOneBab);
  },
  editBab: async (req, res) => {
    await db.Bab.update(
      {
        title: req.body.title,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send("succes update bab");
  },
  deleteBab: async (req, res) => {
    await db.Bab.destroy({
      where: { id: req.params.id },
    });
    res.send("delete bab succes");
  },
};
