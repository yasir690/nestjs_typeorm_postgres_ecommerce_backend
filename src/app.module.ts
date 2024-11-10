import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { ShipModule } from './ship/ship.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { DatabaseService } from './db/databaseservice';
import { AuthMiddleware } from './middleware/auth.middleware';
import { Product } from './product/entities/product.entity';
import { Category } from './category/entities/category.entity';
import { CategoryController } from './category/category.controller';
import { ProductController } from './product/product.controller';
import { Order } from './order/entities/order.entity';
import { Shipment } from './ship/entities/ship.entity';
import { OrderController } from './order/order.controller';
import { ShipController } from './ship/ship.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get('NAME'),
          password: configService.get('PASSWORD'),
          database: configService.get('DBNAME'),
          entities: [User,Product,Category,Order,Shipment],

          synchronize: configService.get<boolean>('DB_SYNC'),
        };
      },
      inject: [ConfigService],
    }),  
    UsersModule, ProductModule, OrderModule, CategoryModule, ShipModule
  
  ],
  controllers: [AppController],
  providers: [AppService,DatabaseService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/users/getusers', '/users/getuser/:id', '/users/updateuser/:id','/users/deleteuser/:id',CategoryController,ProductController,OrderController,ShipController
      );  }
}
