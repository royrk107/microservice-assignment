import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller()
export class ProductMicroController {
  constructor(private readonly svc: ProductService) {}

  @MessagePattern({ cmd: 'get-products-by-ids' })
  getProductsByIds(ids: number[]) {
    return this.svc.findManyByIds(ids);
  }
}
