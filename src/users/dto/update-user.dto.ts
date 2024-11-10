import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

@IsNotEmpty()
@IsString()    
name:string;

@IsNotEmpty()
@IsString()
@IsEmail()    
email:string;


@IsNotEmpty()
@IsString()
password:string;

@IsNumber()
age:number;

}
