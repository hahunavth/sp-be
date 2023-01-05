import { QueryInterface, DataTypes, QueryTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable(
      'import_product',
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
        // NOT AUTO CREATE WHEN MIGRATION
        updatedAt: DataTypes.DATE,
        createdAt: DataTypes.DATE,
      },
      {},
    );
  },

  down: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async transaction => {
      // here go all migration undo changes
    }),
};

// module.exports = {
//   up: (queryInterface: QueryInterface): Promise<void> =>
//     queryInterface.sequelize.transaction(async transaction => {
//       // here go all migration changes
//     }),

//   down: (queryInterface: QueryInterface): Promise<void> =>
//     queryInterface.sequelize.transaction(async transaction => {
//       // here go all migration undo changes
//     }),
// };

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     /**
//      * Add altering commands here.
//      *
//      * Example:
//      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//      */
//   },

//   async down(queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//   },
// };
