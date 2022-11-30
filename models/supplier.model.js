module.exports = (sequelize, DataTypes) => {
  const supplier = sequelize.define(
    "supplier",
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "name is required" },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 10],
        },
      },
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      star: DataTypes.INTEGER,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
    },
    {
      paranoid: false,
      freezeTableName: true,
      tableName: "supplier",
    }
  );

  supplier.associate = function (models) {
    // associations can be defined here
    supplier.hasMany(models.import_history, {
      foreignKey: "product_id",
    });
  };

  return supplier;
};
