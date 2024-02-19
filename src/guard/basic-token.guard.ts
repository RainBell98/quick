import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {AuthService} from "../users/auth.service";

@Injectable()
export class BasicTokenGuard implements CanActivate{
    constructor(private readonly authService:AuthService) {
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const rawToken = req.headers['authorization']

        if(!rawToken){
            throw new UnauthorizedException('토큰이 없습니다')
        }

        const token = this.authService.extractTokenFromHeader(rawToken, false)

        const {userid, password} = this.authService.decodeBasicToken(token)

        const user = this.authService.signin({userid, password})
        return true
    }
}