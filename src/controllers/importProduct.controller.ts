import CreateImportProductDto from '@/dtos/importProduct.dto';
import { ImportProduct } from '@/interfaces/importProduct.interface';
import ImportProductService from '@/services/importProduct.service';
import CRUDController from './base/crud.controller';

class ImportProductController extends CRUDController<ImportProduct, CreateImportProductDto, CreateImportProductDto, ImportProductService> {
  constructor() {
    super(new ImportProductService());
  }
}

export default ImportProductController;
