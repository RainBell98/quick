import { Module } from '@nestjs/common';
import { FindModule } from "./find/find.module";
import {UsersModule} from "./users/users.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "../configs/typeorm.config";

@Module({
  imports: [UsersModule,TypeOrmModule.forRoot(typeOrmConfig),FindModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
