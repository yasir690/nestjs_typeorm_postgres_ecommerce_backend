import { PartialType } from '@nestjs/mapped-types';
import { CreateShipDto } from './create-ship.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateShipDto extends PartialType(CreateShipDto) {

    @IsString()
    @IsOptional()
    trackingNumber:string;

    @IsString()
    @IsOptional()
    status?: string;

    @IsNumber()
    @IsOptional()
    orderId: number;

}
