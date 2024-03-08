import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import { FindService } from './find.service';
import {BasicTokenGuard} from "../guard/basic-token.guard";
import {PlanDto} from "../dto/plan.dto";

@Controller('find')
export class FindController {
  constructor(private readonly findService: FindService) {}
  @Post('/plan')
  // @UseGuards(BasicTokenGuard)
  getPlan(@Body() body: PlanDto) {
    return this.findService.getPlan(body);
  }

}
