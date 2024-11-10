import { Module } from '@nestjs/common';
import { ShipService } from './ship.service';
import { ShipController } from './ship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './entities/ship.entity';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Shipment,Order,User,Product])],
  controllers: [ShipController],
  providers: [ShipService],
  exports:[TypeOrmModule.forFeature([Shipment,Order])]
})
export class ShipModule {}
