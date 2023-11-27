import { IsIn, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";
import { Bread } from "src/breads/entities/bread.entity";
import { Order } from "src/orders/entities/order.entity";
import { UUID } from "typeorm/driver/mongodb/bson.typings";


export class CreateOrderItemDto {

    // @IsUUID()
    @IsString()
    product_id: string;

    // @IsIn([Bread])
    @IsOptional()
    bread?: Bread;
    
    @IsNumber()
    @IsPositive()
    quantity:number;

    
    order: Order;


}