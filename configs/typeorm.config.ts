
import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import * as process from "process";
import {User} from "../src/Entity/auth.entity";
import {FindEntity} from "../src/Entity/find.entity";
import {Profile} from "../src/Entity/profile.entity";
dotenv.config()
export const typeOrmConfig : TypeOrmModuleOptions ={

    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "entities": ["dist/**/**.entity{.ts,.js}"],
    "synchronize": true

}