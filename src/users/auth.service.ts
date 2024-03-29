import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../Entity/auth.entity";
import {Repository} from "typeorm";
import {randomBytes, scrypt as _scrypt} from "crypto";
import {promisify} from "util";
import {JwtService} from "@nestjs/jwt";
import * as dotenv from 'dotenv';
import * as process from "process";
import {UsersService} from "./users.service";
import {CreateUserDto} from "../dto/create-user.dto";

dotenv.config();
const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User) private repo:Repository<User>,
        private readonly jwtService: JwtService,
        private readonly usersService:UsersService
    ) {}
    signToken(user: Pick<User,'userid'|'id'>, isRefreshToken: boolean){
        const payload = {
            userid: user.userid,
            sub: user.id,
            type: isRefreshToken ? 'refresh': 'access',
        }
        return this.jwtService.sign(payload,{
            secret: process.env.JWT_SECRET_KEY,
            expiresIn: isRefreshToken ? 3600: 300,
        })
    }

    loginUser(user: Pick<User,'userid'|'id'>){
        return{
            accessToken: this.signToken(user,false),
            refreshToken: this.signToken(user,true)
        }
    }

    extractTokenFromHeader(header:string,isBearer: boolean){
        const splitToken = header.split(' ')

        const prefix = isBearer ? 'Bearer': 'Basic'

        if(splitToken.length !== 2 || splitToken[0]!==prefix){
            throw new UnauthorizedException('잘못된 토큰')
        }

        const token = splitToken[1]
        return token
    }
    decodeBasicToken(base64String: string){
        const decoded = Buffer.from(base64String,'base64').toString('utf8')
        const split = decoded.split(':')

        if(split.length !== 2){
            throw new UnauthorizedException('잘못된 유형의 토큰')
        }

        const userid = split[0];
        const password = split[1];
        return {userid, password}
    }

    verifyToken(token:string){
        return this.jwtService.verify(token,{
            secret:process.env.JWT_SECRET_KEY,
        })
    }

    rotateToken(token:string, isRefreshToken:boolean){
        const decoded = this.jwtService.verify(token,{
            secret:process.env.JWT_SECRET_KEY,
        })

        if(decoded.type !== 'refresh'){
            throw new UnauthorizedException('토큰 재발급은 Refresh 토큰으로만 가능합니다')
        }

        return this.signToken({
            ...decoded,
        }, isRefreshToken)
    }

    async signup(userInfo:CreateUserDto){
        const isEmail = await this.usersService.isEmail(userInfo.email)
        const isUser = await this.usersService.isUserId(userInfo.userid)
        if (isEmail.length) {
            throw new BadRequestException('email in use')
        }
        if(isUser.length){
            throw new BadRequestException('userid in use')
        }

        const salt = randomBytes(8).toString('hex')
        const hash = (await scrypt(userInfo.password,salt,32)) as Buffer;
        const result = salt + '.' + hash.toString('hex')

        const user = await this.usersService.create(
            userInfo.userid,
            userInfo.username,
            userInfo.email,
            result,
            // userInfo.image
        )
        return this.loginUser(user)
    }

    async signin(user: Pick<User,'userid'|'password'>){
        const searchUser = await this.repo.findOne({where:{userid: user.userid}})
        if(!searchUser){
            throw new NotFoundException('user not found')
        }

        const [salt, storedhash] = searchUser.password.split('.')
        const hash = await (scrypt(user.password,salt,32)) as Buffer
        if( storedhash !== hash.toString('hex')){
            throw new BadRequestException(' bad password')
        }
        return this.loginUser(searchUser);
    }

    // async logout(){
    //     return{
    //         accessToken: null,
    //         refreshToken: null
    //     }
    // }
}