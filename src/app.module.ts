import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { DatabaseModule } from "./database/database.module";
import { CacheModule } from "@nestjs/cache-manager";
import { ChatModule } from "./chat/chat.module";
import { ResponseHeaderMiddleware } from "./middleware/response-header.middleware";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Makes the configuration available throughout your app
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        console.log(`Connecting to Mongo DB: ${uri}`);
        return { uri };
      },
    }),
    CacheModule.register({
      ttl: 5,
      max: 100,
      isGlobal: true,
    }),
    DatabaseModule,
    ChatModule,
  ],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ResponseHeaderMiddleware) // Apply the middleware globally
      .forRoutes('*'); // Applies to all routes, you can specify specific routes here if needed
  }
}

