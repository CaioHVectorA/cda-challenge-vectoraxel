import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { json } from 'express';
declare const module: any
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  // add a customized cors config to improve security
  app.use(json({ limit: '10mb' }))
  const config = new DocumentBuilder()
  .setTitle('NestJS CDA Emblemas API')
  .setDescription('API para o desafio de projeto CDA.Emblemas')
  .setVersion('1.0')
  .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({ allowedHeaders: '*', origin: '*', methods: 'POST,GET,PUT,DELETE', credentials: true })
  await app.listen(3333);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
