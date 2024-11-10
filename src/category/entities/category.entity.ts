// category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';  // Assuming you have a User entity
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @ManyToOne(() => User, (user) => user.categories,{ nullable: false })  // Establishing Many-to-One relation
  @JoinColumn({ name: 'userid' })  // JoinColumn to indicate foreign key relationship
  user: User;

  @Column()
  userid: number;  // Foreign key column to store the userId who created the category
}
