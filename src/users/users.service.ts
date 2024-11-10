import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'; // Import bcryptjs
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken'; // Import bcryptjs
import { Role } from 'src/utils/constant';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo:Repository<User>){}
 async Register(createUserDto: CreateUserDto) {

    const {name,email,password,age}=createUserDto;
    const existUser=await this.userRepo.findOne({where:{
      email
    }});

    if(existUser){
      throw new ConflictException('User Already exist')
    }

    const hashPassword=await bcrypt.hash(password,10);

    const user=new User()
    user.name=createUserDto.name;
    user.email=createUserDto.email;
    user.age=createUserDto.age;
    user.password=hashPassword;

    user.role = createUserDto.role || Role.User;  // If no role is provided, set default to 'user'

    await this.userRepo.save(user);
    return user;
  }

  async Login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    
    // Retrieve the user by email
    const existUser = await this.userRepo.findOne({ where: { email } });
  
    // Check if the user exists
    if (!existUser) {
      throw new NotFoundException('User Not Found');
    }
  
    // Log user object and password to debug
    console.log('User found:', existUser);
    console.log('User password:', existUser.password);
  
    // Check if password is not found in the user object
    if (!existUser.password) {
      throw new BadRequestException('Password not found in the user data');
    }
  
    // Compare the provided password with the stored hashed password
    const comparePassword = await bcrypt.compare(password, existUser.password);
  
    // Check if the password matches
    if (!comparePassword) {
      throw new BadRequestException('Password not correct');
    }
  
    // Generate JWT token
    const token = jwt.sign(
      { id: existUser.id, email: existUser.email },
      process.env.SECRET_KEY,
      { expiresIn: '30m' }
    );
  
    return { token };
  }
  
      // Method to find a user by ID
async findById(id: number): Promise<User | null> {
  // Use findOne() to find a user by primary key (id)
  return this.userRepo.findOne({ where: { id: id } });
}

  async findAll():Promise<User[]> {

    

    const user=await this.userRepo.find();
    if(user.length===0){
     throw new NotFoundException('Users Not Found')
    }
    return user;
  }

 async findOne(id: number) {


   const user=await this.userRepo.findOne({where:{
      id
    }});

    if(!user){
      throw new NotFoundException('User not found')

    }
    return user;
  }

 async update(id: number, updateUserDto: UpdateUserDto) {

  const user=await this.userRepo.findOne({where:{id}});

  if(!user){
    throw new NotFoundException('user not found')
  }
    user.name=updateUserDto.name;
    user.email=updateUserDto.email;
    user.age=updateUserDto.age;
    await this.userRepo.save(user);
    return user; 
  }

 async remove(id: number) {

  const user=await this.userRepo.findOne({where:{id}});

  if(!user){
    throw new NotFoundException('user not found')
  }

  await this.userRepo.delete(id);
    return `user delete successfully`;
  }
}
