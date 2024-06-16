import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
declare const module: any
import * as cookieParser from 'cookie-parser';
import { json } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  // add a customized cors config to improve security
  app.use(json({ limit: '10mb' }))
  app.enableCors({ allowedHeaders: '*', origin: '*', methods: 'POST,GET,PUT,DELETE', credentials: true })
  await app.listen(3333);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
