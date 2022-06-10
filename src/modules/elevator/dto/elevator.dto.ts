import { IsNumber, IsPositive } from "class-validator"

export class EleVatorDto {
    @IsNumber()
    @IsPositive()
    floor: number;
}