import { Product } from "src/product/entities/product.entity";
import { Shipment } from "src/ship/entities/ship.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Order {

@PrimaryGeneratedColumn()
id:number;

@Column()
customerName:string;

@Column()
totalAmount:number;

@OneToMany(()=>Shipment,(shipment)=>shipment.order,{ cascade: true })
shipments: Shipment[];

 // Many-to-many relationship with products
 @ManyToMany(() => Product)
 @JoinTable() // Creates a join table to handle the many-to-many relationship
 products: Product[];


  // Many-to-one relationship with User (who created the order)
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

}
