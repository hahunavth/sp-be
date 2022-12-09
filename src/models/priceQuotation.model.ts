import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { PriceQuotation } from '@interfaces/priceQuotation.interface';

export type PriceQuotationCreationAttributes = Optional<PriceQuotation, 'id' | 'created_by' | 'updated_by'>;

export class PriceQuotationModel extends Model<PriceQuotation, PriceQuotationCreationAttributes> implements PriceQuotation {
  public id: number;
  public supplier_id: number;
  public product_id: number;
  public subproduct_id: number;
  public unit_price: number;
  public created_by: string;
  public updated_by: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof PriceQuotationModel {
  PriceQuotationModel.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      //
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
