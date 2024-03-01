import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail, IsString, Length} from "class-validator";
import {lengthValidationMessage} from "../validation-message/length-validation.message";

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
    @Length(3,8, {message: lengthValidationMessage})
    password:string
}