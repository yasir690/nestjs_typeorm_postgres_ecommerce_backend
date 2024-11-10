// user.entity.ts
import { Category } from 'src/category/entities/category.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Role } from 'src/utils/constant';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ type: 'enum', enum: Role, default: Role.User }) // Default role is 'user'
  role: Role;

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];


  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  
}
