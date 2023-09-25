import { NestFactory } from '@nestjs/core';
import { TaskModule } from './task.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(TaskModule);
  await app.listen(8080);
}
bootstrap();
