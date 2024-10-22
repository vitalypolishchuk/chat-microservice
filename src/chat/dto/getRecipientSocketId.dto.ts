import { IsString } from "class-validator";

export class getRecipientSocketIdDto {
    @IsString()
    to: string;
}