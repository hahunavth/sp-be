import { logger } from '@/utils/logger';
import { Request, Response } from 'express';
import moment from 'moment';
import { Op } from 'sequelize';

type ApiSuccess<T> = {
  data: T;
  message?: string;
};

type Paginate = {
  page: number | undefined;
  limit: number | undefined;
  count: number | undefined;
};

type KV = {
  [k: string]: any;
};

type TimeFilter = {
  startAt?: string;
  endAt?: string;
  filter?: KV;
};

type ApiPaginateSuccess<T> = ApiSuccess<T> & Paginate & TimeFilter;

class BaseController {
  protected readonly _res = {
    success: <T>(res: Response, { data, message }: ApiSuccess<T>) => {
      return res.status(200).json({
        message: message || 'Sucessfully',
        data,
      });
    },
    paginate: <T>(res: Response, { data, message, count, limit, page, endAt, startAt, filter }: ApiPaginateSuccess<T>) => {
      return res.status(200).json({
        message: message || 'Successfully',
        page,
        limit,
        count,
        startAt,
        endAt,
        filter,
        data,
      });
    },
  };

  protected readonly _req = {
    parse_paginate: (req: Request) => {
      const { page, limit } = req.query;
      const _page = Number.parseInt(page as string);
      const _limit = Number.parseInt(limit as string);

      const offset = (_page - 1) * _limit;
      return {
        page: _page || undefined,
        offset: offset || undefined,
        limit: _limit || undefined,
      };
    },

    parse_time: (req: Request) => {
      const { startAt, endAt } = req.query;
      const result: { startAt?: string; endAt?: string; where?: any } = {};
      if (startAt && moment(String(startAt))) {
        result.startAt = moment(String(startAt)).format('YYYY-MM-DD HH:mm:ss');
      }
      if (endAt && moment(String(endAt))) {
        result.endAt = moment(String(endAt)).format('YYYY-MM-DD HH:mm:ss');
      }

      const list = [];
      result.where = { created_at: { [Op.and]: list } };
      if (startAt) {
        list.push({ [Op.gte]: startAt });
      }
      if (endAt) {
        list.push({ [Op.lte]: endAt });
      }

      return result;
    },

    parse_filter: (req: Request, model) => {
      const where_filter = {};
      const filter = {};
      Object.keys(req.query)
        .filter(key => key != 'startAt' && key != 'endAt')
        .forEach(key => {
          if (Object.keys(model.getAttributes()).includes(key)) {
            if (model.getAttributes()[key].type.key === 'STRING') where_filter[key] = { [Op.like]: '%' + req.query[key] + '%' };
            if (model.getAttributes()[key].type.key === 'INTEGER') where_filter[key] = req.query[key];
            if (model.getAttributes()[key].type.key === 'DATE') where_filter[key] = req.query[key];
            filter[key] = req.query[key];
          }
        });
      // logger.data(filter);

      return { where_filter, filter };
    },

    parse_filter_raw: (req: Request, model: { [key: string]: string }) => {
      const filter = {};
      Object.keys(req.query)
        .filter(key => key != 'startAt' && key != 'endAt')
        .forEach(key => {
          if (Object.keys(model).includes(key)) {
            if (model[key] === 'STRING') filter[key] = req.query[key];
            if (model[key] === 'INTEGER') filter[key] = Number.parseInt(req.query[key] as string);
            // if (model[key] === 'DATE') filter[key] = req.query[key];
          }
        });
      return { filter };
    },
  };
}

export default BaseController;
