import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ImportProduct } from '@interfaces/importProduct.interface';

export type ImportProductCreationAttributes = Optional<ImportProduct, 'id' | 'created_by' | 'updated_by' | 'note'>;

export class ImportProductModel extends Model<ImportProduct, ImportProductCreationAttributes> implements ImportProduct {
  public id: number;

  public price_quotation_id: number;
  public supplier_id: number;

  // Định danh product
  public product_id: number;
  public subproduct_id: number;

  public quantity: number;
  public original_cost: number; // tổng tiền chưa tính thuế = quantity * price_quotation.unit_price
  public other_cost: number; // tiền khác (ko tính thuế)
  public tax: number; // tiền thuế (Mặc định tính 10% original_cost)

  public payment_status: string; // trạng thái thanh toán: PAID, UNPAID,NO_PAYMENT_REQUIRE
  public payment_term: Date; // thời hạn thanh toán
  public payment_date: Date; // ngày thanh toán trong thực tế

  public status: string; // trạng thái của đơn nhập hàng: REQUEST, REJECT, APPROVE, CANCELED, P_Q_ASSIGNED, WAITING_FOR_STOCK, COMPLETED
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
      original_cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'original_cost is required' },
        },
      },
      other_cost: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      payment_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      payment_status: {
        type: DataTypes.STRING,
      },
      payment_term: {
        type: DataTypes.DATE,
      },
      tax: {
        type: DataTypes.INTEGER,
      },
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
