import CRUDService from './base/crud.service';
import DB from '@/databases';
import { PriceQuotation } from '@/interfaces/priceQuotation.interface';
import CreatePriceQuotationDto from '@/dtos/priceQuotation.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class PriceQuotationService extends CRUDService<PriceQuotation, CreatePriceQuotationDto, CreatePriceQuotationDto> {
  private PriceQuotations = DB.PriceQuotations;

  constructor() {
    super('Price quotation', DB.PriceQuotations);
  }

  /**
   * override
   * price quotation join import and supplier
   */
  public async findAndCountAll(query: any): Promise<{ count: number; rows: PriceQuotation[] }> {
    
    let include = [
      {
        model: DB.Suppliers,
        required: true,
      },
      {
        model: DB.ImportProducts,
        required: true,
      },
    ];
    if (query?.include) {
      include = [...include, ...query?.include];
    }

    return this.PriceQuotations.findAndCountAll({
      ...query,
      include,
    });
  }

  /**
   * override
   * price quotation join import and supplier
   */
  public async findById(id: number): Promise<PriceQuotation> {
    if (isEmpty(id)) throw new HttpException(400, 'Id is empty');

    const foundRecord: PriceQuotation = await this.PriceQuotations.findByPk(id, {
      include: [
        {
          model: DB.Suppliers,
          required: true,
        },
        {
          model: DB.ImportProducts,
          required: true,
        },
      ],
    });

    if (!foundRecord) throw new HttpException(409, this.tableName + " doesn't exist");

    return foundRecord;
  }
}

export default PriceQuotationService;
