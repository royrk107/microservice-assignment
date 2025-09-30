import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly svc: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.svc.create(dto);
  }

  @Get()
  getAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.svc.findOne(Number(id));
  }
}
