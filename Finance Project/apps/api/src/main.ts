import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  const port = process.env.PORT ?? '3100';
  await app.listen(port);
  console.log(`API listening on http://localhost:${port}`);
}

bootstrap().catch((error) => {
  console.error('Failed to bootstrap API', error);
});
