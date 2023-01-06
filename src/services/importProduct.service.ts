import { ImportProduct } from '@/interfaces/importProduct.interface';
import CRUDService from './base/crud.service';
import CreateImportProductDto from '@/dtos/importProduct.dto';
import DB from '@/databases';
import { Includeable } from 'sequelize';

class ImportProductService extends CRUDService<ImportProduct, CreateImportProductDto, CreateImportProductDto> {
  private ImportProducts = DB.ImportProducts;

  constructor() {
    super('Import Product', DB.ImportProducts);
  }

  /*
   * @brief Find importproduct and join with price_quotation_id
   *
   * Created on Sat Jan 07 2023
   * Copyright (c) 2023 HaVT
   */
  public async findAndCountWithJoinedPQ(query: any): Promise<{ count: number; rows: ImportProduct[] }> {
    let include: Includeable | Includeable[] = [
      {
        model: DB.PriceQuotations,
        required: false,
        attributes: ['unit_price'],
      },
      {
        model: DB.Suppliers,
        required: false,
        attributes: ['name', 'phone', 'email', 'address', 'note'],
      },
    ];
    if (query?.include) {
      include = [...include, ...query?.include];
    }

    return this.ImportProducts.findAndCountAll({
      // NOTE: disable nesting
      raw: true,
      ...query,
      include,
    });
  }
}

export default ImportProductService;
