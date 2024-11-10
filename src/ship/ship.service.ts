import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shipment } from './entities/ship.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShipService {
  constructor(@InjectRepository(Shipment) private shipRepo:Repository<Shipment>){}

 async findAll():Promise<Shipment[]> {
    const ships=await this.shipRepo.find({relations:['order']});
    if(ships.length===0){
      throw new NotFoundException('shipments not found')
    }
    return ships;
  }

 async findOne(id: number) {
    const ship = await this.shipRepo.findOne({
      where: { id },
      relations: ['order'],
    });

    return ship;
  }

 async update(id: number, updateShipDto: UpdateShipDto) {
    const ship=await this.shipRepo.findOne({where:{id:id}})
    if(!ship){
      throw new NotFoundException('ship not found')
    }
    ship.status=updateShipDto.status;
    ship.trackingNumber=updateShipDto.trackingNumber;
    this.shipRepo.save(ship);
    return ship;
  }

 async remove(id: number) {
   this.shipRepo.delete(id);
    return 'ship delete successfully'
  }
}
