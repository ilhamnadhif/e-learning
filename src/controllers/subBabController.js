const db = require("../db/models");

module.exports = {
  createSubBab: async (req, res) => {
    const { babId, title, body } = req.body;
    const savedSubbab = await db.SubBab.create({
      babId: babId,
      title: title,
      body: body,
    });
    res.json(savedSubbab);
  },
  findOneSubBab: async (req, res) => {
    const findOneSubbab = await db.SubBab.findOne({
      where: { id: req.params.id },
    });
    res.json(findOneSubbab);
  },
  editSubBab: async (req, res) => {
    const { title, body } = req.body;
    await db.SubBab.update(
      {
        title: title,
        body: body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send("succes update subbab");
  },
  deleteSubBab: async (req, res) => {
    await db.SubBab.destroy({
      where: { id: req.params.id },
    });
    res.send("delete subbab succes");
  },
};
