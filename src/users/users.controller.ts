import {Body, Headers, Controller, Delete, Param, Patch, Post, UseGuards, ParseIntPipe, Request} from '@nestjs/common';
import {CreateUserDto} from "../dto/create-user.dto";
import {UsersService} from "./users.service";
import {UpdateUserDto} from "../dto/update-user.dto";
import {AuthService} from "./auth.service";
import {BasicTokenGuard} from "../guard/basic-token.guard";
import {AccessTokenGuard, RefreshTokenGuard} from "../guard/bearer-token.guard";
import { UserDecorator} from "./decorator/user.decorator";
import { User} from "../Entity/auth.entity"
import {PasswordPipe} from "./pipe/password.pipe";


@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService, private authService:AuthService) {}

    @Post('/token/access')
    @UseGuards(AccessTokenGuard)
    createTokenAccess(@Headers('authorization') rawToken:string){
        const token = this.authService.extractTokenFromHeader(rawToken,true)

        const newToken = this.authService.rotateToken(token,false)

        return {accessToken: newToken}
    }

    @Post('/token/refresh')
    @UseGuards(RefreshTokenGuard)
    createTokenRefresh(@Headers('authorization') rawToken:string){
        const token = this.authService.extractTokenFromHeader(rawToken,true)

        const newToken = this.authService.rotateToken(token,true)

        return {refreshToken: newToken}
    }

    @Post('/signup')
    signup(@Body() userInfo: CreateUserDto){
        return this.authService.signup(userInfo)
    }

    @Post('/signin')
    @UseGuards(BasicTokenGuard)
    signin(@Headers('authorization') rawToken: string){
        const token = this.authService.extractTokenFromHeader(rawToken,false)
        const credentials = this.authService.decodeBasicToken(token)
        return this.authService.signin(credentials)
    }

    @Patch('/update')
    @UseGuards(AccessTokenGuard)
    updateUser(@UserDecorator() user: User , @Body() body:UpdateUserDto){
        const userid = user.userid
        return this.usersService.update(userid,body)
    }

    @Delete('/delete/:id')
    deleteUser(@Param('userid') userid:string){
        return this.usersService.remove(userid)
    }
}
