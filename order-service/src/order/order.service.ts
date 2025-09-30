import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export interface Order {
  id: number;
  items: { productId: number; qty: number; price?: number }[];
  total: number;
  status: 'created' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

@Injectable()
export class OrderService {
  private orders: Order[] = [];
  private idSeq = 1;

  constructor(@Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy) {}

  async create(dto: CreateOrderDto) {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('No items in order');
    }
    const productIds = dto.items.map((i) => i.productId);
    const products = await lastValueFrom(
      this.productClient.send({ cmd: 'get-products-by-ids' }, productIds),
    );

    if (!products || products.length !== new Set(productIds).size) {
      throw new BadRequestException('One or more products not found');
    }

    const itemsWithPrice = dto.items.map((it) => {
      const prod = products.find((p) => p.id === it.productId);
      return { productId: it.productId, qty: it.qty, price: prod.price };
    });

    const total = itemsWithPrice.reduce((s, it) => s + it.qty * it.price, 0);

    const order = {
      id: this.idSeq++,
      items: itemsWithPrice,
      total,
      status: 'created' as const,
      createdAt: new Date(),
    };

    this.orders.push(order);
    return order;
  }

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    return this.orders.find((o) => o.id === id);
  }
}
