import { IsOptional, IsString } from 'class-validator';
export class EditDTO {
    @IsOptional()
    @IsString()
    username ?:string;
    @IsOptional()
    @IsString()
    password ?:string;
}