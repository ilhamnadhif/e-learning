const db = require("../models");

module.exports = {
  createBab: (req, res) => {
    db.Bab.create({
      bab: req.body.bab,
      materi_id: req.body.materi_id,
    }).then((bab) => {
      res.json(bab);
    });
  },
  findOneBab: (req, res) => {
    db.Bab.findOne({
      include: [
        {
          model: db.SubBab,
        },
      ],
      where: { id: req.params.id },
    }).then((bab) => {
      res.json(bab);
    });
  },
  editBab: (req, res) => {
    db.Bab.update(
      {
        bab: req.body.bab,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((bab) => {
      res.send("succes update")
    });
  },
};
