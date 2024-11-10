import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShipService } from './ship.service';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/utils/constant';

@Controller('shipment')
export class ShipController {
  constructor(private readonly shipService: ShipService) {}



  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/getallshipment')
  findAll() {
    return this.shipService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/singleshipment/:id')
  findOne(@Param('id') id: string) {
    return this.shipService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)

  @Patch('/updateshipment/:id')
  update(@Param('id') id: string, @Body() updateShipDto: UpdateShipDto) {
    return this.shipService.update(+id, updateShipDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/deleteshipment/:id')
  remove(@Param('id') id: string) {
    return this.shipService.remove(+id);
  }
}
