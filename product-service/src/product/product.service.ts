import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  variants?: Record<string, any>;
  createdAt: Date;
}

@Injectable()
export class ProductService {
  private products: Product[] = [];
  private idSeq = 1;

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const p = this.products.find((x) => x.id === id);
    if (!p) throw new NotFoundException(`Product ${id} not found`);
    return p;
  }

  create(dto: CreateProductDto): Product {
    const p: Product = {
      id: this.idSeq++,
      name: dto.name,
      description: dto.description || '',
      price: dto.price,
      stock: dto.stock ?? 0,
      variants: dto.variants || {},
      createdAt: new Date(),
    };
    this.products.push(p);
    return p;
  }

  update(id: number, dto: UpdateProductDto): Product {
    const idx = this.products.findIndex((x) => x.id === id);
    if (idx === -1) throw new NotFoundException(`Product ${id} not found`);
    const updated = { ...this.products[idx], ...dto };
    this.products[idx] = updated;
    return updated;
  }

  remove(id: number): void {
    const idx = this.products.findIndex((x) => x.id === id);
    if (idx === -1) throw new NotFoundException(`Product ${id} not found`);
    this.products.splice(idx, 1);
  }

  findManyByIds(ids: number[]) {
    return this.products.filter((p) => ids.includes(p.id));
  }
}
