import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { Order } from './entities/order.entity';
import { Shipment } from 'src/ship/entities/ship.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product,Category,User,Order,Shipment])],
  controllers: [OrderController],
  providers: [OrderService],
  exports:[TypeOrmModule.forFeature([Order,User])]
})
export class OrderModule {}
