import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/utils/constant';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('/addcategory')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/getallcategory')
  findAll() {
    return this.categoryService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/getsinglecategory/:id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch('/updatecategory/:id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/deletecategory/:id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
