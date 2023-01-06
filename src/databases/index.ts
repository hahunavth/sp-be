import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
// import UserModel from '@models/users.model';
import ImportProductModel from '@models/importProduct.model';
import PriceQuotationModel from '@models/priceQuotation.model';
import SupplierModel from '@models/supplier.model';
import { logger } from '@utils/logger';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: Number.parseInt(DB_PORT),
  timezone: '+07:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.debug(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

const DB = {
  // Users: UserModel(sequelize),
  ImportProducts: ImportProductModel(sequelize),
  Suppliers: SupplierModel(sequelize),
  PriceQuotations: PriceQuotationModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

// NOTE: relation
DB.PriceQuotations.belongsTo(DB.Suppliers, {
  foreignKey: 'supplier_id',
});
DB.PriceQuotations.belongsTo(DB.ImportProducts, {
  foreignKey: 'import_id',
});
DB.ImportProducts.belongsTo(DB.Suppliers, {
  foreignKey: {
    field: 'supplier_id',
    // NOTE: cause null
    // allowNull: true,
    // defaultValue: null,
  },
});
DB.ImportProducts.belongsTo(DB.PriceQuotations, {
  foreignKey: 'price_quotation_id',
});

export default DB;
