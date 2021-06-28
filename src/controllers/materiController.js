const fs = require("fs");
const path = require("path");
const multer = require("multer");
const db = require("../db/models");

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./images");
  },

  filename: function (request, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = {
  upload: multer({
    storage: storage,
  }),
  createMateri: async (req, res) => {
    const { title, desc } = req.body;
    const image = req.file.filename;
    const savedMateri = await db.Materi.create({ title, desc, image });
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
                  model: db.QuestionOption,
                },
              ],
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
                  model: db.QuestionOption,
                },
              ],
            },
          ],
        },
      ],
      where: { id: req.params.id },
    });
    res.json(findOneMateri);
  },
  editMateri: async (req, res) => {
    const { title, desc } = req.body;
    const image = req.file.filename;
    const materi = await db.Materi.findOne({ where: { id: req.params.id } });
    await db.Materi.update(
      {
        title,
        desc,
        image,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    removeImage(materi.image);
    res.send("succes update materi");
  },
  deleteMateri: async (req, res) => {
    const materi = await db.Materi.findOne({ where: { id: req.params.id } });
    await db.Materi.destroy({
      where: { id: req.params.id },
    });
    const bab = await db.Bab.findAll({ where: { materiId: materi.id } });
    await db.Bab.destroy({
      where: { materiId: materi.id },
    });
    const babIdd = bab.map((e) => e.id);
    babIdd.forEach(async (a) => {
      await db.SubBab.destroy({
        where: { babId: a },
      });
    });
    removeImage(materi.image);
    res.send("delete materi succes");
  },
};
const removeImage = (filePath) => {
  // console.log('filePath', filePath)
  // console.log('__dirname', __dirname)
  filePath = path.join(__dirname, "../../images/", filePath);
  console.log(filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
