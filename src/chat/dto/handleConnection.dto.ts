import { IsString } from "class-validator";

export class HandleConnectionDto {
    @IsString()
    clientId: string;
  
    @IsString()
    token: string;
}