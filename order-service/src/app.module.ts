import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 4001 },
      },
    ]),
    OrderModule,
  ],
})
export class AppModule {}
