import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product,Category,User])],

  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule.forFeature([Product])],  // Export to other modules

})
export class ProductModule {}
 