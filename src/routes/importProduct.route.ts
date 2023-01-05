import ImportProductController from '@/controllers/importProduct.controller';
import CreateImportProductDto from '@/dtos/importProduct.dto';
import CRUDRoute from './base/crud.routes';

class ImportProductRoute extends CRUDRoute {
  constructor() {
    const controller = new ImportProductController();
    super('/api/v1/import', controller, CreateImportProductDto, CreateImportProductDto);

    // statistical endpoint by HieuTT
    this.router.get('/api/v1/import/count-per-month', controller.getHistoryStatistical);
    this.router.get('/api/v1/getHistory', controller.getHistory);
    // provide api to SP_06: lay gia nhap
    this.router.get('/api/v1/import/get-price', controller.getImportRecommentUnitPrice);
  }
}

export default ImportProductRoute;
