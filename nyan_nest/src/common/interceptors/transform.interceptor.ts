import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { ApiResponse } from "../interface/http.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"

export class TransformIntercepter<T> implements NestInterceptor<T, ApiResponse<T>>{
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
        return next.handle().pipe(map(data => ({
            code: 0,
            msg: "操作成功",
            data,
        })))
    }
}