import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { getRecipientSocketIdDto } from "../dto/getRecipientSocketId.dto";

export function GetRecipientSocketIdSwagger() {
    return applyDecorators(
      ApiOperation({ summary: 'Get recipient socket ID' }),
      ApiBody({ type: getRecipientSocketIdDto }),
      ApiResponse({ status: 200, description: 'Recipient socket ID retrieved successfully' }),
      ApiResponse({ status: 404, description: 'Recipient not found' }),
    );
  }