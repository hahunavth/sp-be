module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    'products',
    {
      name: DataTypes.STRING,
      size: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      paranoid: true,
    }
  );

  return product;
};
