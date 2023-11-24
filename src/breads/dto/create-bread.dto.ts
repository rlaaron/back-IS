import { IsString, MinLength } from "class-validator";

export class CreateBreadDto {

    @IsString()
    @MinLength(1)
    flavor: string;
}
