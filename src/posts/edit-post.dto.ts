import { IsOptional, IsString, IsArray,ArrayNotEmpty } from "class-validator";

export class EditPostDTO{

    @IsOptional()
    @IsString()
    title ?: string;

    @IsOptional()
    @IsString()
    content ?: string;
    
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    tags?: string[];

}