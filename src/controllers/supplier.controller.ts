import { CreateSupplierDto } from '@/dtos/supplier.dto';
import { Supplier } from '@/interfaces/supplier.interface';
import SupplierService from '@/services/supplier.service';
import CRUDController from './base/crud.controller';

class SupplierController extends CRUDController<Supplier, CreateSupplierDto, CreateSupplierDto, SupplierService> {
  public constructor() {
    const service = new SupplierService();
    super(service);
  }
}

export default SupplierController;
