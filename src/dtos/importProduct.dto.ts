import { ImportProductCreationAttributes } from '@/models/importProduct.model';
import { IsString, IsNumber, IsOptional } from 'class-validator';

class CreateImportProductDto implements ImportProductCreationAttributes {
  @IsNumber()
  @IsOptional()
  public price_quotation_id: number;
  @IsNumber()
  public supplier_id: number;
  @IsNumber()
  public product_id: number;
  @IsNumber()
  public subproduct_id: number;
  @IsNumber()
  public quantity: number;
  @IsNumber()
  public total_cost: number;
  @IsString()
  public status: string;
  @IsString()
  @IsOptional()
  public note: string;

  @IsString()
  @IsOptional()
  public created_by: string;
  @IsString()
  @IsOptional()
  public updated_by: string;
}

export default CreateImportProductDto;
