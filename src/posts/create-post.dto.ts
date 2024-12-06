import { IsOptional, IsString, IsArray, ArrayNotEmpty } from "class-validator";

export class CreatePostDTO{

    @IsString()
    title: string;
    
    @IsString()
    content: string;
    
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    tags?: string[];
    }