import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import {  IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {

    @IsOptional()
    @IsString()   
    name:string;

    @IsOptional()
    @IsNumber()
    userid:number;
}
