import { IsNotEmpty, IsString } from 'class-validator';
export class CreatePropertyDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  value: string | number | Record<string, unknown>;
}
