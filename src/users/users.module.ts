import {BadRequestException, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../Entity/auth.entity";
import {AuthService} from "./auth.service";
import { JwtModule } from '@nestjs/jwt'
import {MulterModule} from "@nestjs/platform-express";
import {extname} from 'path';
import * as multer from 'multer'

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({}),MulterModule.register({
      limits:{
        fileSize:100000
      },
      fileFilter: (req, file, callback)=>{
        const ext = extname(file.originalname)

        if( ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png'){
          return callback(
              new BadRequestException('jpg, jpeg, png 파일만 가능합니다.'),false)
        }

        return callback(null,true)
    },
      storage: multer.diskStorage({
        destination: function (req,res,callback)}
          callback(null,)
      })
    },)],
  controllers: [UsersController],
  providers: [UsersService,AuthService]
})
export class UsersModule {}
