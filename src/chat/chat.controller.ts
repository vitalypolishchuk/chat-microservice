import { Controller } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { EventPattern } from "@nestjs/microservices";
import { HandleConnectionDto } from "./dto/handleConnection.dto";
import { SaveMessageDto } from "./dto/saveMessage.dto";
import { getRecipientSocketIdDto } from "./dto/getRecipientSocketId.dto";
import { getChatHistoryDto } from "./dto/getChatHistory.dto";
import { HandleConnectionSwagger } from "./swagger/handle-connection-swagger.decorator";
import { SaveMessageSwagger } from "./swagger/save-message-swagger.decorator";
import { GetRecipientSocketIdSwagger } from "./swagger/get-recepient-socket-id.decorator";
import { GetChatHistorySwagger } from "./swagger/get-chat-history-swagger.decorator";

@Controller()
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @HandleConnectionSwagger()
    @EventPattern('handleConnection')
    async handleConnection(data: HandleConnectionDto) {
        return this.chatService.handleConnection(data)
    }

    @SaveMessageSwagger()
    @EventPattern('saveMessage')
    async saveMessage(data: SaveMessageDto) {
        return this.chatService.saveMessage(data)
    }

    @GetRecipientSocketIdSwagger()
    @EventPattern('getRecipientSocketId')
    getRecipientSocketId(data: getRecipientSocketIdDto){
        return this.chatService.getRecipientSocketId(data)
    }

    @GetChatHistorySwagger()
    @EventPattern('getChatHistory')
    getChatHistory(data: getChatHistoryDto){
        return this.chatService.getChatHistory(data);
    }
}