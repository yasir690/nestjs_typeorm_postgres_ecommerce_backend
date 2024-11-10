import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/utils/constant';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.Register(createUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.Login(loginUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/getusers')
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('getuser/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch('updateuser/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('deleteuser/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
