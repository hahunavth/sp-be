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
import { Op } from 'sequelize';

process.on('uncaughtException', function (exception) {
  logger.verbose(exception);
});

DB.sequelize
  .sync({ force: false, logging: false })
  .then(result => {
    logger.info('DB Connect successfully');
  })
  .catch(err => {
    logger.error(err);
  });

const Users = DB.Users;
const Suppliers = DB.Suppliers;
const PriceQuotations = DB.PriceQuotations;
const ImportProducts = DB.ImportProducts;
const sequelize = DB.sequelize;

(async () => {
  // NOTE: TEST QUERY HERE

  const startDate = '2020-12-12 00:00:00';
  const endDate = '2022-12-09T17:22:01.644Z';

  const where = {
    created_at: {
      [Op.between]: [startDate, endDate],
    },
  };

  const res = await Suppliers.findAndCountAll({
    limit: 100,
    offset: 0,
    where,
  });
  logger.verbose(res.count);
  // logger.verbose(res.rows);

  const res2 = await Suppliers.findAndCountAll({
    limit: 100,
    offset: 0,
    order: [['created_at', 'DESC']],
  });

  logger.verbose(res2.count);
  logger.verbose(res2.rows);

  // res = await res.filter(v => v.id == 1);

  // Link: https://sequelize.org/docs/v6/core-concepts/raw-queries/
  // const supls = await sequelize.query('SELECT * FROM import_product', { type: QueryTypes.SELECT });

  // Users.colu
  for (const key in Users.getAttributes()) {
    logger.verbose('Field: ', key); // this is name of the field
    logger.verbose('TypeField: ', Users.getAttributes()[key].type.key); // Sequelize type of field
  }
})();
