/**
 * This is an example of a file with sql query.
 * You can write your query here and execute it.
 */

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

const Suppliers = DB.Suppliers;
const PriceQuotations = DB.PriceQuotations;
const ImportProducts = DB.ImportProducts;
const sequelize = DB.sequelize;

(async () => {
  // NOTE: TEST QUERY HERE
  // const startDate = '2020-12-12 00:00:00';
  // const endDate = '2022-12-09T17:22:01.644Z';
  // const where = {
  //   created_at: {
  //     [Op.between]: [startDate, endDate],
  //   },
  // };
  // const res = await Suppliers.findAndCountAll({
  //   limit: 100,
  //   offset: 0,
  //   where,
  // });
  // logger.verbose(res.count);
  // // logger.verbose(res.rows);
  // const res2 = await Suppliers.findAndCountAll({
  //   limit: 100,
  //   offset: 0,
  //   order: [['created_at', 'DESC']],
  // });
  // logger.verbose(res2.count);
  // logger.verbose(res2.rows);
  // // res = await res.filter(v => v.id == 1);
  // // Link: https://sequelize.org/docs/v6/core-concepts/raw-queries/
  // // const supls = await sequelize.query('SELECT * FROM import_product', { type: QueryTypes.SELECT });
  // // Users.colu
  // for (const key in Users.getAttributes()) {
  //   logger.verbose('Field: ', key); // this is name of the field
  //   logger.verbose('TypeField: ', Users.getAttributes()[key].type.key); // Sequelize type of field
  // }
  // const year = 2022;
  // const sql = `select date_part('month',"created_at"::timestamp) thang, sum(quantity) count
  //         from import_product
  //         where date_part('year',"created_at"::timestamp) = ${year}
  //         group by date_part('month',"created_at"::timestamp)
  //         ;`;
  // const data = await DB.sequelize.query(sql, { type: QueryTypes.SELECT, logging: console.log });
  // console.log({
  //   data: {
  //     year,
  //     data,
  //   },
  // });
  // console.log(data);

  // const data = await DB.PriceQuotations.findAndCountAll({
  //   include: [
  //     {
  //       model: DB.Suppliers,
  //       required: true,
  //     },
  //     {
  //       model: DB.ImportProducts,
  //       required: true,
  //     },
  //   ],
  // });

  const sql = `
  select imp.product_id, imp.subproduct_id, max(price_quotation.unit_price) from (
    select ROW_NUMBER() OVER (PARTITION BY price_quotation_id ORDER BY created_at DESC) AS stt,
      import_product.product_id, import_product.subproduct_id, import_product.price_quotation_id
    from import_product
    where import_product.created_at >= date_trunc('year', now())
  ) as imp
  inner join price_quotation on price_quotation.id = imp.price_quotation_id
  where stt < 10
  group by imp.product_id, imp.subproduct_id;`;

  const data = await DB.sequelize.query(sql, { type: QueryTypes.SELECT, logging: console.log });

  console.log(data);
})();
