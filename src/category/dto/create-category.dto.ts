import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()   
    name:string;

    @IsNotEmpty()
    @IsNumber()
    userid:number;
}
