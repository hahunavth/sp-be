import CreatePriceQuotationDto from '@/dtos/priceQuotation.dto';
import { PriceQuotation } from '@/interfaces/priceQuotation.interface';
import PriceQuotationService from '@/services/priceQuotation.service';
import CRUDController from './base/crud.controller';

/**
 * PriceQuotation controller
 * using table: price_quotations
 */
class PriceQuotationController extends CRUDController<PriceQuotation, CreatePriceQuotationDto, CreatePriceQuotationDto, PriceQuotationService> {
  constructor() {
    super(new PriceQuotationService());
  }
}

export default PriceQuotationController;
