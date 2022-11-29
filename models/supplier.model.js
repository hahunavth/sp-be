module.exports = (sequelize, DataTypes) => {
  const supplier = sequelize.define(
    "supplier",
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      star: DataTypes.INTEGER,
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
    },
    {
      paranoid: false,
      freezeTableName: true,
      tableName: "supplier",
    }
  );

  return supplier;
};
