import { IsIn, IsNumber, IsPositive, IsString, IsUUID } from "class-validator";
import { Bread } from "src/breads/entities/bread.entity";
import { UUID } from "typeorm/driver/mongodb/bson.typings";


export class CreateOrderItemDto {

    // @IsUUID()
    @IsString()
    product_id: string;
    
    @IsNumber()
    @IsPositive()
    quantity:number;
}