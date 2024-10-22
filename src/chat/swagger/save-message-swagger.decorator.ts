import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SaveMessageDto } from "../dto/saveMessage.dto";

export function SaveMessageSwagger() {
    return applyDecorators(
      ApiOperation({ summary: 'Save a message' }),
      ApiBody({ type: SaveMessageDto }),
      ApiResponse({ status: 200, description: 'Message saved successfully' }),
      ApiResponse({ status: 404, description: 'Recipient not found' }),
      ApiResponse({ status: 500, description: 'Internal server error' }),
    );
  }