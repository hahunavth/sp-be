import { ImportProductCreationAttributes } from '@/models/importProduct.model';

class CreateImportProductDto implements ImportProductCreationAttributes {
  public price_quotation_id: number;
  public supplier_id: number;
  public product_id: number;
  public subproduct_id: number;
  public quantity: number;
  public total_cost: number;
  public status: string;
  public created_by: string;
  public updated_by: string;
}

export default CreateImportProductDto;
