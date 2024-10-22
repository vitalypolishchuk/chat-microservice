import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { getChatHistoryDto } from "../dto/getChatHistory.dto";

export function GetChatHistorySwagger() {
    return applyDecorators(
      ApiOperation({ summary: 'Get chat history' }),
      ApiBody({ type: getChatHistoryDto }),
      ApiResponse({ status: 200, description: 'Chat history retrieved successfully' }),
      ApiResponse({ status: 404, description: 'Chat history not found' }),
    );
  }