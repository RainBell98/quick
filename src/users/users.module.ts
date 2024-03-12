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
import {POST_IMAGE_PATH, TEMP_FOLDER_PATH} from "../common/const/path.const";
import {v4 as uuid} from 'uuid'

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
        destination: function (req, res, callback) {
          callback(null, TEMP_FOLDER_PATH)
        },
        filename: function (req,file,callback){
          callback(null,`${uuid()}${extname(file.originalname)}` )
        }
      })
    },)],
  controllers: [UsersController],
  providers: [UsersService,AuthService]
})
export class UsersModule {}
