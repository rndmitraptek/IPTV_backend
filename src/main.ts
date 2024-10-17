import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { CustomResponse } from './config/response.config';
import { CustomValidationPipe } from './config/validator';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/v1',{
    exclude:[{path:'health',method: RequestMethod.GET}]
  });
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document,{
    swaggerOptions : {
      persistAuthorization: true,
      docExpansion: 'none'
    }
  });
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalInterceptors(new CustomResponse());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  await app.listen(3000);
}
bootstrap();
