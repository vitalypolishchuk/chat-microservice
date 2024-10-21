import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // Adjust this path as necessary
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ResponseInterceptor } from './interceptors/response.interseptor';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up the microservice with RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'chat_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  // Log when the microservice is started
  console.log('Microservice is running...', 'Bootstrap')
  
  app.enableCors({
    origin: '*', // Change this to your front-end domain in production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.use(cookieParser()); // Add this line to enable cookie parsing

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Automatically remove non-validated properties
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are found
    transform: true, // Automatically transform payloads to DTO instances
  }));

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth() // Optional: If you want to add JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Swagger UI available at /api/docs

    // Start the microservice
    await app.startAllMicroservices();
    console.log('Microservice is running...');
  
    // Then, start the HTTP server
    await app.listen(3334);
    console.log('HTTP server is running on port 3334');
  
}

bootstrap();
