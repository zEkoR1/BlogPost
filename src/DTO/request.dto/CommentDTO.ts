import { IsString } from "class-validator";

export class CommentDTO{

    @IsString()
    title: string;
    
    @IsString() 
    comment : string;
}   