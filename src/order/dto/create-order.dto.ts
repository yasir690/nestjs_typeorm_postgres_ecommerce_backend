import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    
    @IsNotEmpty()
    @IsNumber()
    userId:number;


    @IsNotEmpty()
    @IsString()
    customerName:string;

    @IsNotEmpty()
    @IsNumber()
    totalAmount:number;

    @IsNotEmpty()
    @IsNumber()
    categoryId:number;

  
}
