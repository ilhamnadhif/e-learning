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
  createMateri: (req, res) => {
    db.PaketMateri.create({
      PaketId: req.body.PaketId,
      MateriId: req.body.MateriId,
    }).then((materi) => {
      res.json(materi);
    });
  },
  showAllMateri: (req, res) => {
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
  findOneMateri: (req, res) => {
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
      where: { id: req.params.id}
    }).then((paket) => {
      res.json(paket);
    });
  }
};
