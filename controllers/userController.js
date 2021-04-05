const db = require("../models");
const biodata = require("../models/biodata");

module.exports = {
  createUser: (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    }).then((user) => {
      res.json(user);
    });
  },
  createUserBiodata: (req, res) => {
    db.Biodata.create({
      user_id: req.body.user_id,
      name: req.body.name,
      addres: req.body.addres,
      gender: req.body.gender,
      age: req.body.age,
    }).then((biodata) => {
      res.json(biodata);
    });
  },
  createUserPaket: (req, res) => {
    db.UserPaket.create({
      UserId: req.body.UserId,
      PaketId: req.body.PaketId,
    }).then((result) => {
      res.json(result);
    });
  },
  showAllUser: (req, res) => {
    db.User.findAll({
      include: [
        {
          model: db.Biodata,
        },
        {
          model: db.Paket,
          include: [
            {
              model: db.Materi,
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
            },
          ],
        },
      ],
    }).then((users) => {
      res.json(users);
    });
  },
  findOneUser: (req, res) => {
    db.User.findOne({
      include: [
        {
          model: db.Biodata,
        },
        {
          model: db.Paket,
          include: [
            {
              model: db.Materi,
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
            },
          ],
        },
      ],
      where: { id: req.params.id },
    }).then((user) => {
      res.json(user);
    });
  },
  editUserBiodata: (req, res) => {
    db.Biodata.update(
      {
        name: req.body.name,
        addres: req.body.addres,
        gender: req.body.gender,
        age: req.body.age,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((biodata) => {
      res.send("succes update biodata");
    });
  },
};
