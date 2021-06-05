const db = require("../db/models");

module.exports = {
  createMateri: async (req, res) => {
    const savedMateri = await db.Materi.create({
      title: req.body.title,
      desc: req.body.desc,
    });
    res.json(savedMateri);
  },
  showAllMateri: async (req, res) => {
    const findAllMateris = await db.Materi.findAll({
      include: [
        {
          model: db.Bab,
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
        },
      ],
    });
    res.json(findAllMateris);
  },
  findOneMateri: async (req, res) => {
    const findOneMateri = await db.Materi.findOne({
      include: [
        {
          model: db.Bab,
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
        },
      ],
      where: { id: req.params.id },
    });
    res.json(findOneMateri);
  },
  editMateri: async (req, res) => {
    await db.Materi.update(
      {
        title: req.body.title,
        desc: req.body.desc,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send("succes update materi");
  },
  deleteMateri: async (req, res) => {
    await db.Materi.destroy({
      where: { id: req.params.id },
    });
    res.send("delete materi succes");
  },
};
