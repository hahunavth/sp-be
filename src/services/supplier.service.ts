import DB from '@databases';
import { Supplier } from '@interfaces/supplier.interface';
import CRUDService from './base/crud.service';
import { CreateSupplierDto } from '@/dtos/supplier.dto';

class SupplierService extends CRUDService<Supplier, CreateSupplierDto, CreateSupplierDto> {
  public constructor() {
    super('Supplier', DB.Suppliers);
  }
}

export default SupplierService;
