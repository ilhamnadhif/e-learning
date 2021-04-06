const bcrypt = require("bcryptjs");
const db = require("../models");

module.exports = {
  createUser: async (req, res) => {
    const emailExist = await db.User.findOne({
      where: { email: req.body.email },
    });
    if (emailExist) return res.status(400).send("email already exists");
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = await db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    res.json(user);
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
      db.Paket.findOne({ where: { id: result.PaketId } }).then((paket) => {
        let leftTime = paket.durasi;
        let month = leftTime * 2
        setTimeout(() => {
          db.UserPaket.destroy({
            where: { UserId: result.UserId, PaketId: result.PaketId },
          });
        }, month);
      });
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
  loginUser: async (req, res) => {
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).send("email is not found");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("invalid password");

    res.redirect("/api/v1/user/" + user.id);
  },

  subscibe: (req, res, next) => {},
};
