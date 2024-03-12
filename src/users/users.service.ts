import { Injectable} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import {User} from "../Entity/auth.entity";
import {CreateUserDto} from "../dto/create-user.dto";
@Injectable()
export class UsersService{
    constructor(@InjectRepository(User) private repo:Repository<User>) {}

    async isEmail(email:string):Promise<User[]>{
        const isEmail = await this.repo.find({where:{email}})
        return isEmail
    }

    async isUserId(userid:string):Promise<User[]>{
        const isUserId = await this.repo.find({where:{userid}})
        return isUserId
    }

    async findUser(userid:string){
        const user = await this.repo.findOne({where: {userid}})
        if(!user){
            throw new Error('user not found')
        }
        return user
    }

    async create(userid: string, username: string, email: string, password: string,profile:string){
        const user = this.repo.create({
            userid,
            username,
            email,
            password,
            profile
        })
        return this.repo.save(user)
    }

    async update(userid: string,attrs: Partial<User>){
        const user = await this.findUser(userid)
        if(!user){
            throw new Error('user not found')
        }
        Object.assign(user,attrs)
        return this.repo.save(user)
    }

    async remove(userid: string){
        const user = await this.findUser(userid)
        if(!user){
            throw new Error('user not found')
        }
        return this.repo.remove(user)
    }


}