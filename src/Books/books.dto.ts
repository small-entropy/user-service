import { IsNotEmpty } from 'class-validator';

export class BookDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  author: string;
  @IsNotEmpty()
  pageCount: number;
}
