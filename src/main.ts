import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { graphqlUploadExpress } from "graphql-upload";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose', 'debug'],
    cors: true
  });

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true,
      // transformOptions:{excludeExtraneousValues:true}
    }),
  );

  const configService = app.get<ConfigService>(ConfigService);
  const listenPort = configService.get<number>('PORT', 3000);
  app.use(graphqlUploadExpress({maxFileSize:1000000, maxFiles: 5}))
  await app.listen(listenPort);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
