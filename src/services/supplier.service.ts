import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { Supplier } from '@interfaces/supplier.interface';
import CRUDService from './base/crud.service';
import { CreateSupplierDto } from '@/dtos/supplier.dto';

class SupplierService extends CRUDService<Supplier, CreateSupplierDto, CreateSupplierDto> {
  public constructor() {
    super('Supplier', DB.Suppliers);
  }
}

export default SupplierService;
