import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDto} from "../dto/create-user.dto";
import {UsersService} from "./users.service";
import {AuthSigninDto} from "../dto/auth.signin.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService) {
    }
    @Post('/signup')
    signup(@Body() body: CreateUserDto){
        return this.usersService.signup(body.userid,body.username,body.email,body.password)
    }

    @Post('/signin')
    signin(@Body() body:AuthSigninDto){
        return this.usersService.signin(body.userid,body.password)
    }
}
