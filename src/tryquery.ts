import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import DB from '@databases';
import { QueryTypes } from 'sequelize';

process.on('uncaughtException', function (exception) {
  console.log(exception);
});

DB.sequelize
  .sync({ force: false, logging: false })
  .then(result => {
    console.log('DB Connect successfully');
  })
  .catch(err => {
    console.error(err);
  });

const Users = DB.Users;
const Suppliers = DB.Suppliers;
const PriceQuotations = DB.PriceQuotations;
const ImportProducts = DB.ImportProducts;
const sequelize = DB.sequelize;

(async () => {
  // NOTE: TEST QUERY HERE

  const res = await Suppliers.findAndCountAll({ limit: 100, offset: 0 });
  console.log(res.count);
  console.log(res.rows);
  // res = await res.filter(v => v.id == 1);
  // console.log(res);

  // Link: https://sequelize.org/docs/v6/core-concepts/raw-queries/
  // const supls = await sequelize.query('SELECT * FROM supplier', { type: QueryTypes.SELECT });
  // console.log(supls);
})();
