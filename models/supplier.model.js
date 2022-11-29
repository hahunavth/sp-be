module.exports = (sequelize, DataTypes) => {
  const supplier = sequelize.define(
    "supplier",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Name: DataTypes.STRING,
      Phone: DataTypes.STRING,
      Email: DataTypes.STRING,
      Address: DataTypes.STRING,
      Star: DataTypes.INTEGER,
      CREATEBY: DataTypes.STRING,
      UPDATEBY: DataTypes.STRING,
    },
    {
      paranoid: false,
      freezeTableName: true,
      tableName: "supplier",
    }
  );

  return supplier;
};
