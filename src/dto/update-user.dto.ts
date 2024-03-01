import {IsOptional, IsString} from "class-validator";
import {CreateUserDto} from "./create-user.dto";
import {PartialType, PickType} from "@nestjs/mapped-types";
import {User} from "../Entity/auth.entity";

export class UpdateUserDto extends PartialType(User){
    @IsOptional()
    username?: string
}