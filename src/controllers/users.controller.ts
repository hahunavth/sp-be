// import { NextFunction, Request, Response } from 'express';
// import { CreateUserDto } from '@dtos/users.dto';
// import { User } from '@interfaces/users.interface';
// import CRUDController from './base/crud.controller';
// import UserService from '@services/users.service';

// class UsersController extends CRUDController<User, CreateUserDto, CreateUserDto, UserService> {
//   public constructor() {
//     const service = new UserService();
//     super(service);
//   }
// }

// class UsersController {
//   public userService = new userService();

//   public getUsers = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const findAllUsersData: User[] = await this.userService.findAll();

//       res.status(200).json({ data: findAllUsersData, message: 'findAll' });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public getUserById = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = Number(req.params.id);
//       const findOneUserData: User = await this.userService.findById(userId);

//       res.status(200).json({ data: findOneUserData, message: 'findOne' });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userData: CreateUserDto = req.body;
//       const createUserData: User = await this.userService.create(userData);

//       res.status(201).json({ data: createUserData, message: 'created' });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public updateUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = Number(req.params.id);
//       const userData: CreateUserDto = req.body;
//       const updateUserData: User = await this.userService.update(userId, userData);

//       res.status(200).json({ data: updateUserData, message: 'updated' });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = Number(req.params.id);
//       const deleteUserData: User = await this.userService.delete(userId);

//       res.status(200).json({ data: deleteUserData, message: 'deleted' });
//     } catch (error) {
//       next(error);
//     }
//   };
// }

type ImportT = {
  id: number;
  name: string;
};

import { Request, Response } from 'express';
import DB from '@/databases';
import { QueryTypes } from 'sequelize';
import { HttpException } from '@/exceptions/HttpException';
import BaseController from './base/base.controller';
import BaseRoute from '@/routes/base/base.routes';

// class ImportController {
//   public importProduct = async (req: Request, res: Response) => {
//     const { importId, prodId } = req.params;
//     // query data from database
//     const sql = `select * from imports where id=${importId};`;
//     const data: any = await DB.sequelize.query(sql, { type: QueryTypes.SELECT });
//     // business logic
//     if (data.length > 0) {
//       const imp: ImportT = data[0];
//       this.processImport(imp, prodId);
//     }

//     res.status(200).json({ data });
//   };

//   processImport(imp, prodId) {
//     return;
//   }
// }

// export default ImportController;

class ImportRepository {
  public async getOne(id: number) {
    // query data from database
    const sql = `select * from imports where id=${id};`;
    const data = await DB.sequelize.query(sql, { type: QueryTypes.SELECT });

    if (!data.length) throw new HttpException(400, 'Not found supplier');

    return data;
  }
}

class ImportService {
  constructor(private repository: ImportRepository) {}

  public getOne(impId: number, prodId: number) {
    const data = this.repository.getOne(impId);
    // business logic
    const imp: ImportT = data[0];
    return this.processImport(imp, prodId);
  }

  processImport(imp, prodId) {
    return;
  }
}

class ImportController extends BaseRoute {
  constructor(private service: ImportService) {
    super('');
    this.router.get('/import', this.getOne); // register route
  }

  public getOne(req: Request, res: Response) {
    const { importId, prodId } = req.params as any;
    return this.service.getOne(importId, prodId);
  }
}
