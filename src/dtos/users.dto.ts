import { IsString, IsEmail } from 'class-validator';

/**
 * @deprecated
 */
export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
