import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail, IsString, Length} from "class-validator";

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

    @Column()
    @IsString()
    @Length(3,8, {message:"password는 3자리 이상 8자리 이하입니다."})
    password:string
}