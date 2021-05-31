const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", require("./src/routes"));

//Internal Server Error handler
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).json({
    status: "Fail",
    errors: err.message,
  });
});

//404 Handler
app.use(function (req, res, next) {
  res.status(404).json({
    status: "Fail",
    errors: "Error Found 404",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
