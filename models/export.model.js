module.exports = (sequelize, DataTypes) => {
    const Export = sequelize.define(
      'Exports',
      {
        productId: DataTypes.INTEGER,
        size: DataTypes.STRING,
        color: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        from: DataTypes.STRING,
        to: DataTypes.STRING,
        shipDate: DataTypes.DATE,
      },
      {
        timestamp: true,
      }
    );
  
    return Export;
  };