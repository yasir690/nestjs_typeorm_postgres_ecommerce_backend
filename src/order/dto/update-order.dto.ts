import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {

    @IsOptional()
    @IsNumber()
    userId:number;

    @IsOptional()
    @IsString()
    customerName:string;

    @IsOptional()
    @IsNumber()
    totalAmount:number;

    @IsOptional()
    @IsNumber()

    categoryId:number;



}
