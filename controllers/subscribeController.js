const bcrypt = require("bcryptjs");
const db = require("../models");
const { Op } = require("sequelize");

module.exports = {
  findAllSubscribe: async (req, res) => {
    const subscribes = await db.Subscribe.findAll();
    res.json(subscribes);
  },
  findOneSubscribe: async (req, res) => {
    const subscribe = await db.Subscribe.findOne({where: {id: req.params.id}});
    res.json(subscribe);
  },
  acceptSubscription: async (req, res) => {
    const { paketId } = req.body;
    const subscribe = await db.Subscribe.findOne({
      where: {
        id: req.params.id,
      },
    });
    await db.Subscribe.update(
      {
        // paketId: paketId,
        paketId: subscribe.pilih_paket,
        status: "diterima",
      },
      {
        where: {
          [Op.and]: [
            { userId: subscribe.userId },
            { pilih_paket: subscribe.pilih_paket },
          ],
        },
      }
    );
    const subs = await db.Subscribe.findOne({
      where: {
        id: req.params.id,
      },
    });
    // res.send("diterima");
    const paket = await db.Paket.findOne({ where: { id: subs.paketId } });
    res.json(subs);

    let leftTime = paket.duration;
    let month = leftTime * 3;
    setTimeout(() => {
      db.Subscribe.destroy({
        where: { userId: subs.userId, paketId: subs.pilih_paket },
      });
    }, month);
  },
};
