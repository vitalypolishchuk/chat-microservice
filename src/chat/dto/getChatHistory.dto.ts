import { IsString } from "class-validator";

export class getChatHistoryDto {
    @IsString()
    userId: string;
}