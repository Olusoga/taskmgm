import { NestFactory } from '@nestjs/core';
import { TaskModule } from './task.module';

async function bootstrap() {
  const app = await NestFactory.create(TaskModule);
  await app.listen(8080);
}
bootstrap();
