import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppValidationPipe } from './presentation/common/validation.pipe';
import { ApiResponseInterceptor } from './presentation/common/api-response.interceptor';
import { HttpExceptionFilter } from './presentation/common/http-exception.filter';
import { AllExceptionsFilter } from './presentation/common/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(AppValidationPipe);
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
