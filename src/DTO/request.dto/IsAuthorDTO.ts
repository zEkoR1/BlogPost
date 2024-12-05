import { IsNotEmpty,IsString } from "class-validator";

export class isAuthorDTO{

    @IsString()
    @IsNotEmpty()
    userID:string
    
    @IsString()
    @IsNotEmpty()
    authorID:string
}