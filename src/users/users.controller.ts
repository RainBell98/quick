import {Body, Headers, Controller, Delete, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "../dto/create-user.dto";
import {UsersService} from "./users.service";
import {AuthSigninDto} from "../dto/auth.signin.dto";
import {UpdateUserDto} from "../dto/update-user.dto";
import {AuthService} from "./auth.service";
import {BasicTokenGuard} from "../guard/basic-token.guard";
import {AccessTokenGuard, RefreshTokenGuard} from "../guard/bearer-token.guard";

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
    signup(@Body() body: CreateUserDto){
        return this.authService.signup(body.userid,body.username,body.email,body.password)
    }

    @Post('/signin')
    @UseGuards(BasicTokenGuard)
    signin(@Headers('authorization') rawToken: string){
        const token = this.authService.extractTokenFromHeader(rawToken,false)
        console.log(token)
        const credentials = this.authService.decodeBasicToken(token)
        return this.authService.signin(credentials)
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
