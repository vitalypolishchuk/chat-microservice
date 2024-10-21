// database.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

@Module({})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.connectToDatabase();
  }

  private async connectToDatabase() {
    try {
      const MONGODB_URI = this.configService.get<string>('MONGODB_URI'); // Correctly access the configuration
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
}
