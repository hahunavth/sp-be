const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const path = require("path");

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT,
    dialect: process.env.DIALECT || "mysql",
  }
);

async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// STUB: import model
db.import_history = require("./models/importHistory.model")(
  sequelize,
  DataTypes
);
db.supplier = require("./models/supplier.model")(sequelize, DataTypes);

// STUB: relation
db.supplier.hasMany(db.import_history, {
  foreignKey: "product_id",
});
db.import_history.belongsTo(db.supplier);

db.sequelize
  .sync({ force: false })
  .then((result) => {
    console.log("DB Connect successfully");
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = db;
