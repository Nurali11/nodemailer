import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPort, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    price: number;
}
