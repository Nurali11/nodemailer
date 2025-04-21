import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsPositive, IsString } from "class-validator"

export class CreateOrderDto {
    @ApiProperty()
    @IsString()
    productId: string

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    count: number
}
