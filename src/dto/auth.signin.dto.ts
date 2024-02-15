import {IsString} from "class-validator";

export class AuthSigninDto{
    @IsString()
    userid: string

    @IsString()
    password: string
}