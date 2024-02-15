import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import {User} from "../Entity/auth.entity";
import {randomBytes, scrypt as _scrypt} from "crypto";
import {promisify} from "util";
const scrypt = promisify(_scrypt)
@Injectable()
export class UsersService{
    constructor(@InjectRepository(User) private repo:Repository<User>) {}

    async signup(userid:string, username: string,email:string, password:string){
        const isUser = this.repo.find({where:{email}})
        if (!isUser) {
            throw new BadRequestException('email in use')
        }

        const salt = randomBytes(8).toString('hex')
        const hash = (await scrypt(password,salt,32)) as Buffer;
        const result = salt + '.' + hash.toString('hex')

        const user = this.repo.create({userid,username,email,password:result})
        return this.repo.save(user)
    }

    async signin(userid:string, password: string){
        const user = await this.repo.findOne({where:{userid}})
        if(!user){
            throw new NotFoundException('user not found')
        }

        const [salt, storedhash] = user.password.split('.')
        const hash = await (scrypt(password,salt,32)) as Buffer
        if( storedhash !== hash.toString('hex')){
            throw new BadRequestException(' bad password')
        }
        return user;

    }


    async update(id: number,attrs: Partial<User>){
        const user = await this.repo.findOne({where:{id}})
        if(!user){
            throw new Error('user not found')
        }
        Object.assign(user,attrs)
        return this.repo.save(user)
    }

    async remove(id: number){
        const user = await this.repo.findOne({where:{id}})
        if(!user){
            throw new Error('user not found')
        }
        return this.repo.remove(user)
    }
}