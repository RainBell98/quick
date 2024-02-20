import { Injectable} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import {User} from "../Entity/auth.entity";
@Injectable()
export class UsersService{
    constructor(@InjectRepository(User) private repo:Repository<User>) {}

    async findUser(userid:string){
        const user = await this.repo.findOne({where: {userid}})
        if(!user){
            throw new Error('user not found')
        }
        return user
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
        const user = await this.repo.findOne({where:{userid}})
        if(!user){
            throw new Error('user not found')
        }
        return this.repo.remove(user)
    }


}