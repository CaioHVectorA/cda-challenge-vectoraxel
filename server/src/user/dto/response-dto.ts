import { ApiProperty } from "@nestjs/swagger";

export class ResponseDto {
    @ApiProperty()
    status: string;
    @ApiProperty()
    message: string;
    @ApiProperty()
    acess_token: string;
}