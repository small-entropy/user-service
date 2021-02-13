import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateRepositoryDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;
}