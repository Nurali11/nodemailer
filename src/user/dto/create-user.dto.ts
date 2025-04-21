import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsIn(['ADMIN', 'USER', 'SUPER-ADMIN'])
    role: string;

    @ApiProperty()
    @IsString()
    email: string;
}
