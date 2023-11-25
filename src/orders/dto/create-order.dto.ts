import { IsArray, IsDate, IsIn, IsOptional, IsString } from "class-validator";
import { OrderItem } from "src/order-item/entities/order-item.entity";

export class CreateOrderDto {

    @IsString()
    client: string;

    // @IsDate()

    @IsString()
    @IsOptional()
    request_date: string;

    // @IsDate()
    @IsString()
    @IsOptional()
    delivery_date: string;

    @IsArray()
    @IsOptional()
    orderItem?: OrderItem[];
}
