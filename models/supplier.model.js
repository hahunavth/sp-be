module.exports = (sequelize, DataTypes) => {
    const supplier = sequelize.define(
      'supplier',
      {
        // Id: DataTypes.INTEGER,
        Name: DataTypes.INTEGER,
        Phone: DataTypes.STRING,
        Email: DataTypes.STRING,
        Address: DataTypes.INTEGER,
        Star: DataTypes.INTEGER,
        CREATEBY: DataTypes.STRING,
        UPDATEBY: DataTypes.STRING,
      },
      {
        paranoid: false,
        freezeTableName: true,
        tableName: 'supplier',
      }
    );
  
    return import_history;
  };
  