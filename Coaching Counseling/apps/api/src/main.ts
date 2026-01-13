import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as cors from 'cors';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(cors());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  );

  const port = process.env.PORT || 2000;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}`);
}

bootstrap().catch((error) => {
  console.error('Failed to bootstrap API', error);
  process.exit(1);
});
