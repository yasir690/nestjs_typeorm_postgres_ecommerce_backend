import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {  IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    @IsOptional() 
    name:string;
 
    @IsString()
    @IsOptional() 
    description: string;
 
    @IsNumber()
    @IsOptional() 
    price: number;
 
 
    @IsNumber()
    @IsOptional() 
    categoryId: number;
 
    @IsNumber()
    @IsOptional() 
    userId: number;
}
