import {
    Body,
    Headers,
    Controller,
    Delete,
    Param,
    Patch,
    Post,
    UseGuards,
    ParseIntPipe,
    Request,
    ClassSerializerInterceptor, UseInterceptors, UploadedFile
} from '@nestjs/common';
import {CreateUserDto} from "../dto/create-user.dto";
import {UsersService} from "./users.service";
import {UpdateUserDto} from "../dto/update-user.dto";
import {AuthService} from "./auth.service";
import {BasicTokenGuard} from "../guard/basic-token.guard";
import {AccessTokenGuard, RefreshTokenGuard} from "../guard/bearer-token.guard";
import { UserDecorator} from "./decorator/user.decorator";
import { User} from "../Entity/auth.entity"
import {PasswordPipe} from "./pipe/password.pipe";
import {FileInterceptor} from "@nestjs/platform-express";


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
    @UseInterceptors(ClassSerializerInterceptor)
    signup(@Body() userInfo: CreateUserDto){
        return this.authService.signup(userInfo)
    }

    @Post('profile')
    @UseGuards(AccessTokenGuard)
    @UseInterceptors(FileInterceptor('image'))
    profile(@UploadedFile() file?:Express.Multer.File){
        return{
            filename:file.filename
        }
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

    @Delete('/delete')
    @UseGuards(AccessTokenGuard)
    deleteUser(@UserDecorator() user:User){
        const userid = user.userid
        return this.usersService.remove(userid)
    }

    // A Model, B Model
    // Post API -> A모델을 저장하고, B모델을 저장한다.
    // await repository.save(a)
    // await repository.save(b)

    // 만약에 a를 저장하다가 실패하면 b를 저장하면 안될경우
    // all or nothing

    // transaction
    // start -> 시작
    // commit -> 저장
    // rollback -> 원상복구


}
