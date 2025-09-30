import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
  console.log('Product REST listening on http://localhost:3001');

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 4001 },
  });

  await app.startAllMicroservices();
  console.log('Product microservice TCP listening on 127.0.0.1:4001');
}
bootstrap();
