import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  description: string;
}