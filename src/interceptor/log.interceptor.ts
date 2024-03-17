import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { observable, Observable, tap } from "rxjs";

@Injectable()
export class LogInterceptor implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    /**
     * 요청이 들어올 때 REQ 요청이 들어온 타임 스탬프를 찍는다.
     * {REQ} {요청 path} {요청시간}
     *
     * 요청이 끝날 때 {응답이 나갈 때} 다시 타임 스탬프를 찍는다.
     * {RES} {요청 path} {응답 시간} {얼마나 걸렸는지 ms}
     *
     */
    const req = context.switchToHttp().getRequest()
    const path = req.originalUrl

    const now = new Date()
    console.log(`{REQ} ${path} ${now.toLocaleString('kr')}`)

    return next.handle().pipe(
      tap(
        (observable)=> console.log(observable)
      )
    )
  }
}