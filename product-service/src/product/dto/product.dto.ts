export class CreateProductDto {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  variants?: Record<string, any>;
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  variants?: Record<string, any>;
}
