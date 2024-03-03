import { Module } from '@nestjs/common';
import {FindService} from "./find.service";
import {FindController} from "./find.controller";
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from "../users/auth.service";
import {User} from "../Entity/auth.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UsersModule} from "../users/users.module";

@Module({

  imports: [],
  controllers: [FindController],
  providers: [FindService],
})
export class FindModule {}
