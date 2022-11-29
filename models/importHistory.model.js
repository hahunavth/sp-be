module.exports = (sequelize, DataTypes) => {
  const import_history = sequelize.define(
    "import_history",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      size: DataTypes.INTEGER,
      color: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      cost: DataTypes.INTEGER,
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
    },
    {
      paranoid: false,
      freezeTableName: true,
      tableName: "import_history",
    }
  );

  return import_history;
};
