import {Column} from "typeorm";

export class FindEntity{
    @Column()
    count:number

    @Column()
    distance: number
}