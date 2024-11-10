import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category,User])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [TypeOrmModule.forFeature([Category])],  // Export to other modules

})
export class CategoryModule {}
