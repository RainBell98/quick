import {IsOptional, IsString} from "class-validator";
import {CreateUserDto} from "./create-user.dto";
import {PickType} from "@nestjs/mapped-types";
import {User} from "../Entity/auth.entity";

export class UpdateUserDto extends PickType(User, ['username']){
    @IsOptional()
    username: string
}