import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JsendInterceptor } from './interceptors/jsend.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FE_DOMAIN,
    credentials: true,
  });
  app.useGlobalInterceptors(new JsendInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // dùng class-transformer để convert plain object sang class
      whitelist: true, // bỏ các field không có trong DTO
    }),
  );
  await app.listen(process.env.API_PORT ?? 8000, '0.0.0.0');
}
bootstrap();
