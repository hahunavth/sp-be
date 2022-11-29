module.exports = (sequelize, DataTypes) => {
    const supplier = sequelize.define(
      'supplier',
      {
        // Id: DataTypes.INTEGER,
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
        tableName: 'supplier',
      }
    );
  
    return import_history;
  };
  