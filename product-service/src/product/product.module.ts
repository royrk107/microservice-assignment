import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductMicroController } from './product.micro';

@Module({
  controllers: [ProductController, ProductMicroController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
