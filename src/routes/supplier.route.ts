import SupplierController from '@/controllers/supplier.controller';
import { CreateSupplierDto } from '@/dtos/supplier.dto';
import CRUDRoute from './base/crud.routes';

class SupplierRoute extends CRUDRoute {
  constructor() {
    const controller = new SupplierController();
    super('/api/v1/supplier', controller, CreateSupplierDto, CreateSupplierDto);
    // by HieuTT
    this.router.get('/api/v1/supplier/getStatistical', controller.getStatistical);
  }
}

export default SupplierRoute;
