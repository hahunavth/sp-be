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

type TimeFilter = {
  startAt?: string;
  endAt?: string;
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
    paginate: <T>(res: Response, { data, message, count, limit, page, endAt, startAt }: ApiPaginateSuccess<T>) => {
      return res.status(200).json({
        message: message || 'Successfully',
        page,
        limit,
        count,
        startAt,
        endAt,
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
      if (startAt != null && moment(String(startAt))) {
        result.startAt = moment(String(startAt)).format('YYYY-MM-DD HH:mm:ss');
      }
      if (endAt != null && moment(String(endAt))) {
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
  };
}

export default BaseController;
