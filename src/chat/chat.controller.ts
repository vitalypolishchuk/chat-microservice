import { Controller } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { EventPattern } from "@nestjs/microservices";

@Controller()
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @EventPattern('handleConnection')
    async handleConnection(data: { clientId: string; token: string }) {
        return this.chatService.handleConnection(data)
    }

    @EventPattern('saveMessage')
    async saveMessage(data: { senderId: string, payload: { to: string; message: string } }) {
        return this.chatService.saveMessage(data)
    }

    @EventPattern('getRecipientSocketId')
    getRecipientSocketId(data: { to: string }){
        return this.chatService.getRecipientSocketId(data)
    }
}