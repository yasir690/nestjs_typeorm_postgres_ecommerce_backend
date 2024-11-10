import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private cateRepo:Repository<Category>,
    @InjectRepository(User) private userRepo:Repository<User>

){}
 async create(createCategoryDto: CreateCategoryDto):Promise<Category> {

    const user=await this.userRepo.findOne({where:{
      id:createCategoryDto.userid
    }});

    if(!user){
      throw new NotFoundException('user not found')
    }

    const category=this.cateRepo.create(createCategoryDto);
    return this.cateRepo.save(category)
  }

 async findAll():Promise<Category[]> {
    const categories=await this.cateRepo.find({relations:['products']});
    if(categories.length===0){
      throw new NotFoundException('categorios not found')
    }
    return categories;
  }

 async findOne(id: number) {
    const checkcategory=await this.cateRepo.findOne({where:{id:id}})
    if(!checkcategory){
      throw new NotFoundException('category not found')
    }
    return checkcategory;
  }

 async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const checkcategory=await this.cateRepo.findOne({where:{id:id}})
    if(!checkcategory){
      throw new NotFoundException('category not found')
    }
    
    checkcategory.name=updateCategoryDto.name;
    await this.cateRepo.save(checkcategory);
    return checkcategory;
  }

 async remove(id: number) {
    const checkcategory=await this.cateRepo.findOne({where:{id:id}})
    if(!checkcategory){
      throw new NotFoundException('category not found')
    }
  
    await this.cateRepo.delete(id);
    return `category delete successfully`;
  }
}
