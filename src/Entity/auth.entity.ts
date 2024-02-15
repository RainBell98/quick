import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class User{
    @PrimaryColumn()
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