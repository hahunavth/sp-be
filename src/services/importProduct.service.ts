import { ImportProduct } from '@/interfaces/importProduct.interface';
import CRUDService from './base/crud.service';
import CreateImportProductDto from '@/dtos/importProduct.dto';
import DB from '@/databases';

class ImportProductService extends CRUDService<ImportProduct, CreateImportProductDto, CreateImportProductDto> {
  constructor() {
    super('Import Product', DB.ImportProducts);
  }
}

export default ImportProductService;
