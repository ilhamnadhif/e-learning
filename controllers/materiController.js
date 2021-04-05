const db = require("../models");

module.exports = {
  createMateri: (req, res) => {
    db.Materi.create({
      materi: req.body.materi,
    }).then((materi) => {
      res.json(materi);
    });
  },
  showAllMateri: (req, res) => {
    db.Materi.findAll({
      include: [
        {
          model: db.Bab,
          include: [
            {
              model: db.SubBab,
            },
          ],
        },
      ],
    }).then((materis) => {
      res.json(materis);
    });
  },
  findOneMateri: (req, res) => {
    db.Materi.findOne({
      include: [
        {
          model: db.Bab,
          include: [
            {
              model: db.SubBab,
            },
          ],
        },
      ],
      where: { id: req.params.id },
    }).then((materi) => {
      res.json(materi);
    });
  },
  editMateri: (req, res) => {
    db.Materi.update(
      {
        materi: req.body.materi,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((materi) => {
      res.send("succes update");
    });
  },
  deleteMateri: (req, res) => {
    db.Materi.destroy({
      where: { id: req.params.id },
    }).then((materi) => {
      res.send("delete succes")
    });
  },
};
