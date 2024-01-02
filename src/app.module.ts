import { Module } from '@nestjs/common';
import { FindModule } from "./find/find.module";

@Module({
  imports: [FindModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
