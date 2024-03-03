import {User} from "../Entity/auth.entity";
import {PickType} from "@nestjs/mapped-types"

export class CreateUserDto extends PickType(User,['userid','email','password','email','username']){}