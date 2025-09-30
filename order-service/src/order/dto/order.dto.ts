export class CreateOrderDto {
  items: { productId: number; qty: number }[];
}
