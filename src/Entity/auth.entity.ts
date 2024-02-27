import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail, IsString} from "class-validator";

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
    password:string
}