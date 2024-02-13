import {BaseEntity, Entity} from "typeorm";
import {Column, PrimaryColumn} from "typeorm/browser";

@Entity()
export class User extends BaseEntity{
    @PrimaryColumn()
    id: number;

    @Column()
    userid:string

    @Column()
    username:string

    @Column()
    password:string
}