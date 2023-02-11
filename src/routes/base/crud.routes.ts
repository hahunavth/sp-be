import BaseRoute from './base.routes';
import validationMiddleware from '@middlewares/validation.middleware';
import CRUDController from '@/controllers/base/crud.controller';

/**
 * CRUD route
 * contains common routes for CRUD:
 * {path}/ GET - getAll
 * {path}/:id GET - getById
 * {path}/ POST - create
 * {path}/:id PUT - update
 * {path}/:id DELETE - delete
 */
class CRUDRoute extends BaseRoute {
  public controller;
  constructor(path: string, controller: CRUDController<any, any, any, any>, CreateDtoCls: Object, UpdateDtoCls: Object) {
    super(path);
    this.controller = controller;

    this.initializeRoutes(CreateDtoCls, UpdateDtoCls);
  }

  private initializeRoutes(CreateDtoCls: Object, UpdateDtoCls: Object) {
    this.router.get(`${this.path}`, this.controller.getAll);
    this.router.get(`${this.path}/:id(\\d+)`, this.controller.getById);
    this.router.post(`${this.path}`, validationMiddleware(CreateDtoCls, 'body'), this.controller.create);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(UpdateDtoCls, 'body', true), this.controller.update);
    this.router.delete(`${this.path}/:id(\\d+)`, this.controller.delete);
  }
}

export default CRUDRoute;
