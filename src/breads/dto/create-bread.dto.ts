import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateBreadDto {

    @IsString()
    @MinLength(1)
    flavor: string;

    @IsNumber()
    @IsPositive()
    price: number;
}
