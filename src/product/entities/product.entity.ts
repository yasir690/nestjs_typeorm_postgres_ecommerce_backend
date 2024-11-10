// product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';  // Assuming you have a User entity
import { Category } from 'src/category/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')  // Ensuring price is stored as a decimal type
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  categoryId: number;  // Foreign key column

  @ManyToOne(() => User, (user) => user.products,{ nullable: false })  // Establishing Many-to-One relation
  @JoinColumn({ name: 'userid' })  // JoinColumn to indicate foreign key relationship
  user: User;

  @Column()
  userid: number;  // Foreign key column to store the userId who created the product
}
