const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const db = require("../models");

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./images");
  },

  filename: function (request, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = {
  upload: multer({
    storage: storage,
  }),

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
    const { userId, paketId } = req.body;
    const image = req.file.filename;
    const payment = await db.Payment.create({
      userId: userId,
      paketId: paketId,
      bukti_bayar: image,
      status: "belum diterima",
    });
    res.json(payment);
  },
  showAllUser: async (req, res) => {
    const findAllUser = await db.User.findAll({
      include: [
        {
          model: db.Biodata,
        },
        {
          model: db.QuizUserAnswer,
          include: [
            {
              model: db.QuizQuestion
            },
            {
              model: db.QuestionOption,
              as: "option"
            },
            {
              model: db.QuestionOption,
              as: "iscorrect"
            },
          ]
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
          model: db.QuizUserAnswer,
          include: [
            {
              model: db.QuizQuestion
            },
            {
              model: db.QuestionOption,
              as: "option"
            },
            {
              model: db.QuestionOption,
              as: "iscorrect"
            },
          ]
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
