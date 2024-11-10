import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Shipment } from 'src/ship/entities/ship.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo:Repository<Order>,
    @InjectRepository(User) private userRepo:Repository<User>,
    @InjectRepository(Category) private cateRepo:Repository<Category>,
    @InjectRepository(Shipment) private shipRepo:Repository<Shipment>


  ){}
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Fetch the user based on userId from createOrderDto
    const user = await this.userRepo.findOne({ where: { id: createOrderDto.userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Fetch the category based on categoryId from createOrderDto
    const category = await this.cateRepo.findOne({ where: { id: createOrderDto.categoryId } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
  
   
    const order=new Order();

    order.customerName=createOrderDto.customerName;
    order.totalAmount=createOrderDto.totalAmount;
    order.user=user;

    // Save the order
  await this.orderRepo.save(order);
    // Create a new Shipment and assign the order to it
    const ship = new Shipment();
    ship.status = 'pending';  // Default status
    ship.trackingNumber = order.id.toString();  // You can generate a real tracking number here if needed
    ship.order = order;  // Set the entire Order object
  
    // Save the shipment to the database
    await this.shipRepo.save(ship);
  
    // Return the created order
    return order;
  }
  

  findAll():Promise<Order[]> {
    const orders=this.orderRepo.find({relations:['shipments']});
    return orders;
  }

 async findOne(id: number):Promise<Order> {
  const order = await this.orderRepo.findOne({
    where: { id },
    relations: ['shipments'],
  });
    return order;
  }

  async remove(id: number) {
    // Find the order with its related shipments
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['shipments'], // Make sure shipments are loaded
    });
  
    if (!order) {
      throw new NotFoundException('Order not found');
    }
  
    // Delete related shipments first
    if (order.shipments && order.shipments.length > 0) {
      await this.shipRepo.remove(order.shipments); // Remove related shipments
    }
  
    // Now delete the order itself
    await this.orderRepo.remove(order);
  
    return `Order deleted successfully`;
  }
  
}
