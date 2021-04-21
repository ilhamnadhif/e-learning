const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const db = require("../models");

module.exports = {
  findAllSubscribe: async (req, res) => {
    const payments = await db.Payment.findAll({
      include: [{ model: db.User }, { model: db.Paket }],
    });
    res.json(payments);
  },
  findOneSubscribe: async (req, res) => {
    const payment = await db.Payment.findOne({
      include: [{ model: db.User }, { model: db.Paket }],
      where: { id: req.params.id },
    });
    res.json(payment);
  },
  acceptSubscription: async (req, res) => {
    const { paketId } = req.body;
    const payment = await db.Payment.findOne({
      where: {
        id: req.params.id,
      },
    });
    const updatePayment = await db.Payment.update(
      {
        status: "diterima",
      },
      {
        where: {
          id: payment.id,
        },
      }
    );
    const subscribe = await db.Subscribe.create({
      userId: payment.userId,
      paketId: payment.paketId,
    });
    res.send("diterima");

    const paket = await db.Paket.findOne({ where: { id: subscribe.paketId } });

    let leftTime = paket.duration;
    let month = leftTime * 3;
    setTimeout(() => {
      db.Subscribe.destroy({
        where: { userId: subscribe.userId, paketId: subscribe.paketId },
      });
    }, month);
  },
  deletePayment: async (req, res) => {
    id = req.params.id;
    const payment = await db.Payment.findOne({ where: { id: id } });
    await db.Payment.destroy({
      where: { id: payment.id },
    });
    removeImage(payment.bukti_bayar);
    res.send("delete payment succes");
  },
};

const removeImage = (filePath) => {
  // console.log('filePath', filePath)
  // console.log('__dirname', __dirname)
  filePath = path.join(__dirname, "../images/", filePath);
  console.log(filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
