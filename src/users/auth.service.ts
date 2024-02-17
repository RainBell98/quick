import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../Entity/auth.entity";
import {Repository} from "typeorm";
import {randomBytes, scrypt as _scrypt} from "crypto";
import {promisify} from "util";
import {JwtService} from "@nestjs/jwt";
import * as dotenv from 'dotenv';
import * as process from "process";

dotenv.config();
const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User) private repo:Repository<User>,
        private readonly jwtService: JwtService
    ) {}
    signToken(user: Pick<User,'userid'|'id'>, isRefreshToken: boolean){
        const payload = {
            userid: user.userid,
            sub: user.id,
            type: isRefreshToken ? 'refresh': 'accesss',
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

    async signup(userid:string, username: string,email:string, password:string){
        const isEmail:User[] = await this.repo.find({where:{email}})
        const isUser:User[] = await this.repo.find({where:{userid}})
        if (isEmail.length) {
            throw new BadRequestException('email in use')
        }
        if(isUser.length){
            throw new BadRequestException('userid in use')
        }

        const salt = randomBytes(8).toString('hex')
        const hash = (await scrypt(password,salt,32)) as Buffer;
        const result = salt + '.' + hash.toString('hex')

        const user = this.repo.create({userid,username,email,password:result})
        await this.repo.save(user)
        return this.loginUser(user)
    }

    async signin(userid: string, password: string){
        const searchUser = await this.repo.findOne({where:{userid}})
        if(!searchUser){
            throw new NotFoundException('user not found')
        }

        const [salt, storedhash] = searchUser.password.split('.')
        const hash = await (scrypt(password,salt,32)) as Buffer
        if( storedhash !== hash.toString('hex')){
            throw new BadRequestException(' bad password')
        }
        return this.loginUser(searchUser);
    }
}