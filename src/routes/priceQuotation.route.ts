import PriceQuotationController from '@/controllers/priceQuotation.controller';
import CreatePriceQuotationDto from '@/dtos/priceQuotation.dto';
import CRUDRoute from './base/crud.routes';

class PriceQuotationRoute extends CRUDRoute {
  constructor() {
    super('/api/v1/price-quotation', new PriceQuotationController(), CreatePriceQuotationDto, CreatePriceQuotationDto);
  }
}

export default PriceQuotationRoute;
