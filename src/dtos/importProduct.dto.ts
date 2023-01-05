import { ImportProductCreationAttributes } from '@/models/importProduct.model';
import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

/**
 * NOTE: IsOptional Cần đặt dưới các validate decorator khác!!!!
 */
class CreateImportProductDto implements ImportProductCreationAttributes {
  @IsNumber()
  @IsOptional()
  public price_quotation_id: number;
  @IsNumber()
  @IsOptional()
  public supplier_id: number;
  @IsNumber()
  public product_id: number;
  @IsNumber()
  public subproduct_id: number;
  @IsNumber()
  public quantity: number;

  @IsNumber()
  original_cost: number; // tổng tiền chưa tính thuế = quantity * price_quotation.unit_price
  @IsNumber()
  @IsOptional()
  other_cost: number; // tiền khác (ko tính thuế)
  @IsNumber()
  @IsOptional()
  tax: number; // tiền thuế (Mặc định tính 10% original_cost)

  @IsString()
  payment_status: string; // trạng thái thanh toán: PAID, UNPAID,NO_PAYMENT_REQUIRE
  @IsDate()
  @IsOptional()
  payment_term: Date; // thời hạn thanh toán
  @IsDate()
  @IsOptional()
  payment_date: Date; // ngày thanh toán trong thực tế

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
