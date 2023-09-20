import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 //validacion de los Pipes
  app.useGlobalPipes(
    new ValidationPipe({
         whitelist: true,
         forbidNonWhitelisted: true,
    })
    );
  await app.listen(3000);
  console.log('Listening Port 3000')
}
bootstrap();
