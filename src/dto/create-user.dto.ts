import {User} from "../Entity/auth.entity";
import {PickType} from "@nestjs/mapped-types"
import {IsOptional, IsString} from "class-validator";

export class CreateUserDto extends PickType(User,['userid','email','password','email','username']){

    @IsString({
        each: true
    })
    @IsOptional()
    image?: string[]
}