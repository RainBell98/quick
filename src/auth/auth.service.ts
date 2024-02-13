import {Injectable} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import {User} from "../Entity/auth.entity";
@Injectable()
export class AuthService{
    constructor(@InjectRepository(User) private repo:Repository<User> ) {}

    create(username:string, password:string){
        const user = this.repo.create({username,password})
        return this.repo.save(user)
    }
    findOne(id: number){
        if(!id){
            return null
        }
        return this.repo.findOneBy({ id })
    }
    find(username:string){
        return this.repo.find({where: { username }})
    }

    async update(id: number,attrs: Partial<User>){
        const user = await this.findOne(id)
        if(!user){
            throw new Error('user not found')
        }
        Object.assign(user,attrs)
        return this.repo.save(user)
    }

    async remove(id: number){
        const user = await this.findOne(id)
        if(!user){
            throw new Error('user not found')
        }
        return this.repo.remove(user)
    }
}