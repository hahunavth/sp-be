/**
 * Execute this file to sync the database
 * external modules
 */

import DB from '@databases';
import { logger, stream } from '@utils/logger';

process.on('uncaughtException', function (exception) {
  logger.verbose(exception);
});

DB.sequelize
  .sync({ force: true, logging: true })
  .then(result => {
    logger.info('DB Connect successfully');
  })
  .catch(err => {
    logger.error(err);
  });
