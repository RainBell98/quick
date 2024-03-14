import {Column, Entity,OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail, IsString, Length} from "class-validator";
import {lengthValidationMessage} from "../validation-message/length-validation.message";
import {Exclude, Expose, Transform} from "class-transformer";
import {POST_PUBLIC_IMAGE_PATH} from "../common/const/path.const";
import {join} from "path";
import {Profile} from "./profile.entity";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString({message: 'userid는 string이여야 합니다.'})
    userid:string

    @Column()
    @IsString()
    username:string

    @Column()
    @IsEmail()
    email: string

    @Column({
        nullable: true
    })
    @Transform(({value})=> value && `/${join(POST_PUBLIC_IMAGE_PATH,value)}`)
    profile?: string

    @Column()
    @IsString()
    @Expose()
    @Length(3,8,
        {message: lengthValidationMessage}
    )
    password:string

    @OneToMany((type)=> Profile, (profile)=> profile.post)
    profiles: Profile[]
}