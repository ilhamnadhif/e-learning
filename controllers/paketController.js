const db = require("../models");

module.exports = {
  createPaket: (req, res) => {
    db.Paket.create({
      nama: req.body.nama,
      harga: req.body.harga,
      durasi: req.body.durasi,
    }).then((paket) => {
      res.json(paket);
    });
  },
  createPaketMateri: (req, res) => {
    db.PaketMateri.create({
      PaketId: req.body.PaketId,
      MateriId: req.body.MateriId,
    }).then((materi) => {
      res.json(materi);
    });
  },
  showAllPaket: (req, res) => {
    db.Paket.findAll({
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
    }).then((pakets) => {
      res.json(pakets);
    });
  },
  findOnePaket: (req, res) => {
    db.Paket.findOne({
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
    }).then((paket) => {
      res.json(paket);
    });
  },
  editPaket: (req, res) => {
    db.Paket.update(
      {
        nama: req.body.nama,
        harga: req.body.harga,
        durasi: req.body.durasi,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((paket) => {
      res.send("succes update paket");
    });
  },
  deletePaket: async (req, res) => {
    await db.Paket.destroy({ where: { id: req.params.id } });
    res.send("succes delete paket");
  },
};
