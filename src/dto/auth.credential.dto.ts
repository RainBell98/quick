import {IsString} from "class-validator";

export class AuthCredentialDto{
    @IsString()
    userid:string;

    @IsString()
    username:string;

    @IsString()
    password:string;

}