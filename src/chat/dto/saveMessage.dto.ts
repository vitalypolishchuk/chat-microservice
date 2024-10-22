import { IsString } from 'class-validator';

// Define a separate DTO for the payload
export class PayloadDto {
  @IsString()
  to: string;

  @IsString()
  message: string;
}

// Use the payload DTO in the main DTO
export class SaveMessageDto {
  @IsString()
  senderId: string;

  payload: PayloadDto;
}