/**
 * Define PriceQuotation model
 */

import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { PriceQuotation } from '@interfaces/priceQuotation.interface';

export type PriceQuotationCreationAttributes = Optional<PriceQuotation, 'id' | 'created_by' | 'updated_by' | 'note'>;

export class PriceQuotationModel extends Model<PriceQuotation, PriceQuotationCreationAttributes> implements PriceQuotation {
  public id: number;
  public import_id: number;
  public supplier_id: number;
  public product_id: number;
  public subproduct_id: number;
  public unit_price: number;
  public note: string;

  public created_by: string;
  public updated_by: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof PriceQuotationModel {
  PriceQuotationModel.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      // relation
      import_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'import_id is required' },
        },
      },
      supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'supplier_id is required' },
        },
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
      unit_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'unit_price is required' },
        },
      }, // Tong so tien
      note: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      // ?
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
    },
    {
      tableName: 'price_quotation',
      sequelize,
      timestamps: true,
    },
  );

  return PriceQuotationModel;
}
