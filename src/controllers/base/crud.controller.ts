import { NextFunction, Request, Response } from 'express';
import CRUDService from '@/services/base/crud.service';
import BaseController from './base.controller';

class CRUDController<I, C extends Object, U extends Object, S extends CRUDService<I, C, U>> extends BaseController {
  public service: S;

  public constructor(service: any) {
    super();
    this.service = service;
    if (!(service instanceof CRUDService)) {
      throw new Error('Must use CRUDService instead of ' + this.service);
    }
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllsData: I[] = await this.service.findAll();

      this._res.paginate(res, {
        message: 'findAll',
        count: undefined,
        data: findAllsData,
        limit: undefined,
        page: undefined,
      });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Id = Number(req.params.id);
      const findOneData: I = await this.service.findById(Id);

      this._res.success(res, {
        data: findOneData,
        message: 'findOne',
      });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: C = req.body;
      const createData: I = await this.service.create(data);

      this._res.success(res, { data: createData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data: C = req.body;
      const updateData: I = await this.service.update(id, data);

      this._res.success(res, { data: updateData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const deleteData: I = await this.service.delete(id);

      this._res.success(res, { data: deleteData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CRUDController;
