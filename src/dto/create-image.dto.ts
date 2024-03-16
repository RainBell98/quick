import { PickType } from "@nestjs/mapped-types";
import { Profile } from "../Entity/profile.entity";

export class CreateImageDto extends PickType(Profile,[
  'path',
  'post',
  'order',
  'type'
]){}