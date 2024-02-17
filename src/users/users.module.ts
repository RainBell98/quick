import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../Entity/auth.entity";
import {AuthService} from "./auth.service";
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({})],
  controllers: [UsersController],
  providers: [UsersService,AuthService]
})
export class UsersModule {}
