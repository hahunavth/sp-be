import { SupplierCreationAttributes } from '@/models/supplier.model';
import { IsString, IsEmail, IsOptional } from 'class-validator';

/**
 * NOTE: IsOptional Cần đặt dưới các validate decorator khác!!!!
 */
export class CreateSupplierDto implements SupplierCreationAttributes {
  @IsString()
  public name: string;
  @IsString()
  public phone: string;
  @IsEmail()
  public email: string;
  @IsString()
  public address: string;
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
