const express = require("express");
const app = express();
const port = 3000;

const router = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
