import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/utils/constant';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)

  @Post('/addorder')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)

  @Get('/getallorder')
  findAll() {
    return this.orderService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)

  @Get('/singleorder/:id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/deleteorder/:id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
