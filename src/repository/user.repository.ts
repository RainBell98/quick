import {DataSource, Repository} from "typeorm";
import {User} from "../Entity/auth.entity";
import {AuthCredentialDto} from "../dto/auth.credential.dto";
import * as bcrypt from "bcryptjs";
@Repository(User)
export class UserRepository extends Repository<User>{
    constructor(private readonly dataSource:DataSource) {
        super(User,dataSource.createEntityManager());
    }
    async createUser(authCredentialDto:AuthCredentialDto){
        const {userid, username,password} = authCredentialDto
        const salt = await bcrypt.genSalt()
        let hashPassWord = await bcrypt.hash(password,salt)
        const user = this.create({
            userid, username,
            password:hashPassWord
        })
        await this.save(user)
    }
}