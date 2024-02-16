import {Body, Controller, Delete, Param, Patch, Post} from '@nestjs/common';
import {CreateUserDto} from "../dto/create-user.dto";
import {UsersService} from "./users.service";
import {AuthSigninDto} from "../dto/auth.signin.dto";
import {UpdateUserDto} from "../dto/update-user.dto";

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

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body:UpdateUserDto){
        return this.usersService.update(parseInt(id),body)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id:string){
        return this.usersService.remove(parseInt(id))
    }
}
