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
    const { username, email } = req.body;
    const savedUser = await db.User.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    res.json(savedUser);
  },
  createUserBiodata: async (req, res) => {
    const { userId, name, address, gender, age } = req.body;
    const svaedBiodata = await db.Biodata.create({
      userId: userId,
      name: name,
      address: address,
      gender: gender,
      age: age,
    });
    res.json(svaedBiodata);
  },
  createUserPaket: async (req, res) => {
    const { userId, pilih_paket, gambar_bayar } = req.body;
    const subscribe = await db.Subscribe.create({
      userId: userId,
      pilih_paket: pilih_paket,
      gambar_bayar: "gambar.jpg",
      status: "belum diterima",
    });
    res.json(subscribe);
    // const paket = await db.Paket.findOne({ where: { id: subscribe.paketId } });

    // let leftTime = paket.duration;
    // let month = leftTime * 3;
    // setTimeout(() => {
    //   db.Subscribe.destroy({
    //     where: { userId: subscribe.userId, paketId: subscribe.paketId },
    //   });
    // }, month);
  },
  showAllUser: async (req, res) => {
    const findAllUser = await db.User.findAll({
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
    });
    res.json(findAllUser);
  },
  findOneUser: async (req, res) => {
    const findOneUser = await db.User.findOne({
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
    });
    res.json(findOneUser);
  },
  editUserBiodata: async (req, res) => {
    const { name, address, gender, age } = req.body;
    await db.Biodata.update(
      {
        name: name,
        address: address,
        gender: gender,
        age: age,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send("succes update biodata");
  },
  loginUser: async (req, res) => {
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).send("email is not found");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("invalid password");

    res.redirect("/api/v1/user/" + user.id);
  },
};
