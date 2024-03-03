import {Controller, Get, Post, UseGuards} from "@nestjs/common";
import { FindService } from './find.service';
import {BasicTokenGuard} from "../guard/basic-token.guard";

@Controller('find')
export class FindController {
  constructor(private readonly findService: FindService) {}
  @Post('/plan')
  // @UseGuards(BasicTokenGuard)
  getPlan() {
    return this.findService.getPlan();
  }
}
