const db = require("../models");

module.exports = {
  createPaket: async (req, res) => {
    const { name, price, duration } = req.body;
    const savedPaket = await db.Paket.create({
      name: name,
      price: price,
      duration: duration,
    });
    res.json(savedPaket);
  },
  createPaketMateri: async (req, res) => {
    const { paketId, materiId } = req.body;
    const savedPaketMateri = await db.PaketMateri.create({
      paketId: paketId,
      materiId: materiId,
    });
    res.json(savedPaketMateri);
  },
  showAllPaket: async (req, res) => {
    const findAllPaket = await db.Paket.findAll({
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
    });
    res.json(findAllPaket);
  },
  findOnePaket: async (req, res) => {
    const findOnePaket = await db.Paket.findOne({
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
      where: { id: req.params.id },
    });
    res.json(findOnePaket);
  },
  editPaket: async (req, res) => {
    const { name, price, duration } = req.body;
    await db.Paket.update(
      {
        name: name,
        price: price,
        duration: duration,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send("succes update paket");
  },
  deletePaket: async (req, res) => {
    await db.Paket.destroy({ where: { id: req.params.id } });
    res.send("succes delete paket");
  },
};
