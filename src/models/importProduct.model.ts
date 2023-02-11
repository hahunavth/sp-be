/**
 * Define ImportProduct model
 */

import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ImportProduct } from '@interfaces/importProduct.interface';

export type ImportProductCreationAttributes = Optional<ImportProduct, 'id' | 'created_by' | 'updated_by' | 'note'>;

export class ImportProductModel extends Model<ImportProduct, ImportProductCreationAttributes> implements ImportProduct {
  public id: number;
  public price_quotation_id: number;
  public supplier_id: number;
  public product_id: number;
  public subproduct_id: number;
  public quantity: number;
  public total_cost: number;
  public status: string;
  public note: string;
  public created_by: string;
  public updated_by: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ImportProductModel {
  ImportProductModel.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      //
      price_quotation_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'product_id is required' },
        },
      },
      subproduct_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'subproduct_id is required' },
        },
      },
      //
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'quantity is required' },
        },
      }, // Slg sp
      total_cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'total_cost is required' },
        },
      }, // Tong so tien
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'status is required' },
        },
      },
      note: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
    },
    {
      tableName: 'import_product',
      sequelize,
      timestamps: true,
    },
  );

  return ImportProductModel;
}
