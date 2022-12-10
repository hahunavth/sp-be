const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = require('./index');

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
