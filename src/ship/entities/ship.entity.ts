import { Order } from "src/order/entities/order.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shipment {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    trackingNumber: string;

    @Column()
    status:string;

    @ManyToOne(() => Order, (order) => order.shipments)
    order: Order;

}
