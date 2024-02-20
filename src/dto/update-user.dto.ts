import { IsString} from "class-validator";

export class UpdateUserDto{

    @IsString()
    userid: string

    @IsString()
    username: string

}