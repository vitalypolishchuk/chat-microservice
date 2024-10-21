import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ChatService } from "./chat.service";
import * as dotenv from 'dotenv';
import { ChatController } from "./chat.controller";
dotenv.config();

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET, // Use a secure secret
            signOptions: { expiresIn: '1h' }, // Optional: Set token expiration
        }),
    ],
    controllers: [ChatController],
    providers: [ChatService]
})

export class ChatModule {}
