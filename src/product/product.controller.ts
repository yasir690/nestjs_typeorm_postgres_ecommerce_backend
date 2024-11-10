import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/utils/constant';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('/addproduct')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/getproducts')
  findAll() {
    return this.productService.findAll();
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/getproduct/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch('/updateproduct/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/deleteproduct/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
