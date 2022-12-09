import { Request, Response } from 'express';

type ApiSuccess<T> = {
  data: T;
  message?: string;
};

type Paginate = {
  page: number | undefined;
  limit: number | undefined;
  count: number | undefined;
};

type ApiPaginateSuccess<T> = ApiSuccess<T> & Paginate;

class BaseController {
  protected readonly _res = {
    success: <T>(res: Response, { data, message }: ApiSuccess<T>) => {
      return res.status(200).json({
        message: message || 'Sucessfully',
        data,
      });
    },
    paginate: <T>(res: Response, { data, message, count, limit, page }: ApiPaginateSuccess<T>) => {
      return res.status(200).json({
        message: message || 'Successfully',
        page,
        limit,
        count,
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
  };
}

export default BaseController;
