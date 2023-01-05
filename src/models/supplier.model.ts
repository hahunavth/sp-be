import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Supplier } from '@interfaces/supplier.interface';

export type SupplierCreationAttributes = Optional<Supplier, 'id' | 'created_by' | 'updated_by' | 'note'>;

export class SupplierModel extends Model<Supplier, SupplierCreationAttributes> implements Supplier {
  public id: number;
  public name: string;
  public phone: string;
  public email: string;
  public address: string;
  //
  public tax_code: string;
  public bank_acc_num: string;
  public bank_name: string;
  public bank_city: string;
  //
  public note: string;
  public created_by: string;
  public updated_by: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof SupplierModel {
  SupplierModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'name is required' },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {},
      },
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
      },
      address: DataTypes.STRING,
      //
      tax_code: DataTypes.STRING,
      bank_acc_num: DataTypes.STRING,
      bank_name: DataTypes.STRING,
      bank_city: DataTypes.STRING,
      //
      note: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
      // createdAt: '',
      // updatedAt: '',
    },
    {
      tableName: 'supplier',
      sequelize,
      timestamps: true,
    },
  );

  return SupplierModel;
}
