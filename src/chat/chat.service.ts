import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { JwtPayload } from 'src/common/types';
import { Message, MessageModel } from 'src/models/message.model';
import { UserSocketModel } from 'src/models/user-socket.model';
import { HandleConnectionDto } from './dto/handleConnection.dto';
import { SaveMessageDto } from './dto/saveMessage.dto';
import { getRecipientSocketIdDto } from './dto/getRecipientSocketId.dto';
import { getChatHistoryDto } from './dto/getChatHistory.dto';

@Injectable()
export class ChatService {
  constructor(
      private readonly jwtService: JwtService,
      @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ){}

  async handleConnection(data: HandleConnectionDto) {
    if (!data.token) {
        throw new UnauthorizedException('Token missing');
    }

    // Verify the token and cast it to JwtPayload
    const decoded = this.jwtService.verify(data.token) as JwtPayload;

    // Write user data to cache manager (e.g., Redis or in-memory)
    await this.cacheManager.set(decoded.id, data.clientId);

    // Write user socket info to the database
    await UserSocketModel.findOneAndUpdate(
        { userId: decoded.id },
        { socketId: data.clientId },
        { upsert: true } // Insert new if not found
    );

      console.log(`User connected: ${decoded.id}, Socket ID: ${data.clientId}`);

      return { status: "successful" }
  }
  
  async saveMessage(data: SaveMessageDto) {
    const newMessage = new MessageModel({
        sender: data.senderId,
        recipient: data.payload.to,
        message: data.payload.message,
        timestamp: new Date(),
    });

    await newMessage.save();
  }

  async getRecipientSocketId(data: getRecipientSocketIdDto) {
    // Get recipient socket ID from cache
    let recipientSocketId = await this.cacheManager.get<string>(data.to);

    // If not in cache, fetch from the database
    if (!recipientSocketId) {
        const recipient = await UserSocketModel.findOne({ userId: data.to });
        if (recipient && recipient.socketId) {
            recipientSocketId = recipient.socketId;
        } else {
            throw new Error(`Recipient ${data.to} not found`);
        }
    }
    return recipientSocketId;
  }

  async getChatHistory(data: getChatHistoryDto): Promise<Message[]> {
    // Fetch chat history for the given userId
    return MessageModel.find({ 
        $or: [
            { sender: data.userId },
            { recipient: data.userId }
        ]
    }).sort({ timestamp: 1 }).exec(); // Sort by timestamp
  }
}
