import {IsString} from "class-validator";

export class PlanDto{
    @IsString()
    startX : string

    @IsString()
    startY : string

    @IsString()
    endX : string

    @IsString()
    endY: string
}