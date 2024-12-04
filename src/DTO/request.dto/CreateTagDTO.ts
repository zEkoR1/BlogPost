import { IsString, IsArray, ArrayNotEmpty, IsNotEmpty } from 'class-validator';
export class CreateTagDTO {
  @IsString()
  title: string;
  @IsArray()
  @IsNotEmpty()
  @IsString({each: true})
  tags: string[];
}
