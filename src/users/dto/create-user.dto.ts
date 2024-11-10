import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Role } from "src/utils/constant";

export class CreateUserDto {

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

@IsOptional()  // This ensures 'role' is optional
@IsEnum(Role)
role?: Role;
}
