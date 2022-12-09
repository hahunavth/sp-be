import { SupplierCreationAttributes } from '@/models/supplier.model';
import { IsString, IsEmail } from 'class-validator';

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
  public created_by: string;
  @IsString()
  public updated_by: string;
}
