const bcrypt = require("bcryptjs");
const db = require("../models");
const { Op } = require("sequelize");

module.exports = {
  findAllSubscribe: async (req, res) => {
    const payments = await db.Payment.findAll();
    res.json(payments);
  },
  findOneSubscribe: async (req, res) => {
    const payment = await db.Payment.findOne({ where: { id: req.params.id } });
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
        status: "diterima"
      },
      {
        where: {
          id: payment.id,
        },
      }
    );
    const subscribe = await db.Subscribe.create(
      {
        userId: payment.userId,
        paketId: payment.paketId,
      }
    );
    res.send(subscribe);

    const paket = await db.Paket.findOne({ where: { id: subscribe.paketId } });

    let leftTime = paket.duration;
    let month = leftTime * 3;
    setTimeout(() => {
      db.Subscribe.destroy({
        where: { userId: subscribe.userId, paketId: subscribe.paketId },
      });
    }, month);
  },
};
