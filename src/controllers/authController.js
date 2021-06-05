const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const db = require("../db/models");

const jwtForgotPasw = "gfwyfbnwrigsdfsdfg";

module.exports = {
  loginUser: async (req, res) => {
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).send("email is not found");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("invalid password");

    res.redirect("/api/v1/user/" + user.id);
  },
  forgotPassword: async (req, res) => {
    const email = req.body.email;
    const user = await db.User.findOne({ where: { email } });
    if (!user) return res.status(400).send("email is not found");

    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(payload, jwtForgotPasw, { expiresIn: "15m" });
    let link = req.protocol + '://' + req.get('host') + req.originalUrl.split("/").slice(0,4).join("/") + "/reset-password/" + token;

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "backfrontend@gmail.com",
    //     pass: "nlloieiycmstokfl",
    //   },
    // });
    // try {
    //   let info = await transporter.sendMail({
    //     from: "backfrontend@gmail.com",
    //     to: "backfrontend@gmail.com",
    //     subject: "Hello",
    //     text: `Link asdasd ${link}`,
    //     html: `<a href=${link}>Klik disini</a>`,
    //   });
    //   console.log(info);
    // } catch (error) {
    //   console.log(error);
    // }

    res.send(link);
  },
  resetPassword: async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    const decode = jwt.verify(token, jwtForgotPasw);

    if (password !== confirmPassword) return res.send("Password tidak cocok");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await db.User.update(
      { password: hashPassword },
      { where: { email: decode.email } }
    );

    res.send("update password succes");
  },
};
