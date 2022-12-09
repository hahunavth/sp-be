import ImportProductController from '@/controllers/importProduct.controller';
import CreateImportProductDto from '@/dtos/importProduct.dto';
import CRUDRoute from './base/crud.routes';

class ImportProductRoute extends CRUDRoute {
  constructor() {
    super('/import', new ImportProductController(), CreateImportProductDto, CreateImportProductDto);
  }
}

export default ImportProductRoute;
