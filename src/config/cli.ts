const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = require('./index');

/**
 * Config for sequelize-cli
 * @see https://sequelize.org/master/manual/migrations.html
 */
module.exports = {
  development: {
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: 'postgres',
  },
  test: {
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: 'postgres',
  },
  production: {
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: 'postgres',
  },
};
