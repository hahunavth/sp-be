import CRUDService from './base/crud.service';
import DB from '@/databases';
import { PriceQuotation } from '@/interfaces/priceQuotation.interface';
import CreatePriceQuotationDto from '@/dtos/priceQuotation.dto';

class PriceQuotationService extends CRUDService<PriceQuotation, CreatePriceQuotationDto, CreatePriceQuotationDto> {
  constructor() {
    super('Price quotation', DB.PriceQuotations);
  }
}

export default PriceQuotationService;
