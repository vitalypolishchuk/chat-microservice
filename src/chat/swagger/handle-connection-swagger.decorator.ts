import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { HandleConnectionDto } from '../dto/handleConnection.dto';

// Decorator for handleConnection
export function HandleConnectionSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Handle client connection' }),
    ApiBody({ type: HandleConnectionDto }),
    ApiResponse({ status: 200, description: 'Connection handled successfully' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}