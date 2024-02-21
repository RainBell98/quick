import {PipeTransform,Injectable,ArgumentMetadata,BadRequestException} from "@nestjs/common";
import {CreateUserDto} from "../../dto/create-user.dto";

@Injectable()
export class PasswordPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata): any {
        console.log(metadata)

        if(value.toString().length>8){
            throw new BadRequestException('비밀번호는 8자이하로 입력해주세요.')
        }
        return value.toString()
    }

}