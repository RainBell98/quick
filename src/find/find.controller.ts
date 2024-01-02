import { Controller, Get, Post } from "@nestjs/common";
import { FindService } from './find.service';

@Controller('find')
export class FindController {
  constructor(private readonly findService: FindService) {}
  @Post('plan')
  getPlan() {
    return this.findService.getPlan();
  }
}
