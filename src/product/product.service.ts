import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
  @InjectRepository(Product) private productRepo:Repository<Product>,
  @InjectRepository(User) private userRepo:Repository<User>,
  @InjectRepository(Category) private categoryRepo:Repository<Category>


){}
 async create(createProductDto: CreateProductDto) {

  const { name, price,description,categoryId,userId } = createProductDto;

    const user=await this.userRepo.findOne({where:{id:userId}});

    if(!user){
      throw new NotFoundException('User Not Found')
    }

    const category=await this.categoryRepo.findOne({where:{id:categoryId}});

    if(!category){
      throw new NotFoundException('Category Not Found')
    }
    

    // Create and save the product
    const product = new Product();
    product.name = name;
    product.description=description;
    product.price = price;
    product.categoryId = categoryId; // Associate the existing category
    product.userid=userId;
    return await this.productRepo.save(product);

  }

  async findAll():Promise<Product[]> {
    const products=await this.productRepo.find({relations:['category','user']});
    if(products.length===0){
      throw new NotFoundException('Products not found')
    }
    return products;
  }

  async findOne(id: number) {

    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category', 'user'], // Add the relations you want to load
    });
    
    if(!product){
     throw new NotFoundException('product not found')
    }

    return product;
  }

 async update(id: number, updateProductDto: UpdateProductDto) {
  const product=await this.productRepo.findOne({where:{id:id}});

    if(!product){
     throw new NotFoundException('product not found')
    }

    product.name=updateProductDto.name;
    product.description=updateProductDto.description;
    product.price=updateProductDto.price;
    product.categoryId=updateProductDto.categoryId;
    product.userid=updateProductDto.userId;

    await this.productRepo.save(product);

    return product;

  }

 async remove(id: number) {
  const product=await this.productRepo.findOne({where:{id:id}});

    if(!product){
     throw new NotFoundException('product not found')
    }
    await this.productRepo.remove(product);

    return 'product delete successfully';
  }


}
