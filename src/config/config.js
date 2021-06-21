require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    "dialectOptions": {
      "ssl": {
          "require": true,
          "rejectUnauthorized": false
      }
  }
  },
  test: {
    username: "fahmibahtiar",
    password: "blimbing_",
    database: "e-learning_test",
    host: "127.0.0.1",
    dialect: "postgres",
    "dialectOptions": {
      "ssl": {
          "require": true,
          "rejectUnauthorized": false
      }
  }
  },
  production: {
    username: "ansipqujfvdhll",
    password: "a72656f06d2db2ad873aa2257907d7b02715b1c08587e751ce4b97a7bf3a050f",
    database: "df0ea0iv54ncki",
    host: "ec2-3-218-71-191.compute-1.amazonaws.com",
    dialect: "postgres",
    "dialectOptions": {
      "ssl": {
          "require": true,
          "rejectUnauthorized": false
      }
  }
  },
};
