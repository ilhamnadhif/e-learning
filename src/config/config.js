require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: "fahmibahtiar",
    password: "blimbing_",
    database: "e-learning_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "fahmibahtiar",
    password: "blimbing_",
    database: "e-learning_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
