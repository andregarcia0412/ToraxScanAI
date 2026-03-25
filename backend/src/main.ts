import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('ToraxScan API')
    .setVersion('1.0')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory);

  console.log(`✅ Server running at http://localhost:${port}`);
  console.log(`📒 Docs at http://localhost:${port}/docs`);

  app.enableCors();
  await app.listen(port);
}
bootstrap();
