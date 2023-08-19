import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './app-config/app-config.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet'
// import { LoggingModule } from './logging/logging.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { getPort } = app.get(AppConfigService);
  // app.useLogger(app.get(LoggingModule));
  app.use(helmet());
  app.enableCors();
  app.useLogger(new Logger());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  await app.listen(getPort);
}
bootstrap();
