const db = require("../models");

module.exports = {
  createSubBab: (req, res) => {
    db.SubBab.create({
      bab_id: req.body.bab_id,
      subbab: req.body.subbab,
    }).then((subbab) => {
      res.json(subbab);
    });
  },
  findOneSubBab: (req, res) => {
    db.SubBab.findOne({
      where: { id: req.params.id },
    }).then((subbab) => {
      res.json(subbab);
    });
  },
  editSubBab: (req, res) => {
    db.SubBab.update(
      {
        subbab: req.body.subbab,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((subbab) => {
      res.send("succes update");
    });
  },
  deleteSubBab: (req, res) => {
    db.Bab.destroy({
      where: { id: req.params.id },
    }).then((subbab) => {
      res.send("delete succes")
    });
  }
};
