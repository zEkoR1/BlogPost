import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";

export class FilterPostQueryDTO{
    @IsOptional()
    @IsString()
    username ?:string;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    tags ?: string ;


}