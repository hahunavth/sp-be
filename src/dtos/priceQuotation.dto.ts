import { PriceQuotationCreationAttributes } from '@/models/priceQuotation.model';

class CreatePriceQuotationDto implements PriceQuotationCreationAttributes {
  public supplier_id: number;
  public product_id: number;
  public subproduct_id: number;
  public unit_price: number;
  public created_by: string;
  public updated_by: string;
}

export default CreatePriceQuotationDto;
