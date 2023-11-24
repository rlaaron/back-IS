import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateOrderDto {

    @IsString()
    client: string;

    // @IsDate()

    @IsDate()
    @IsOptional()
    request_date: Date;

    // @IsDate()
    @IsDate()
    @IsOptional()
    delivery_date: Date;
}
