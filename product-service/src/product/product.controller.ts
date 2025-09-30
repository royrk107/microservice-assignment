import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly svc: ProductService) {}

  @Get()
  getAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.svc.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.svc.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.svc.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(Number(id));
  }
}
