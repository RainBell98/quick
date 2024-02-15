import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userid:string

    @Column()
    username:string

    @Column()
    email: string

    @Column()
    password:string
}