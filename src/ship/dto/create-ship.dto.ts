import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateShipDto {

    @IsNotEmpty()
    @IsString()
    trackingNumber:string;

    @IsNotEmpty()
    @IsString()
    status:string;

    @IsNotEmpty()
    @IsNumber()
    orderId: number;
}
