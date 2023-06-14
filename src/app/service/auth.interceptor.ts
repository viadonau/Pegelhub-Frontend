import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.authData.pipe(take(1), exhaustMap(authData => {
            const apiKey = authData?.apiKey || 'O5p1A2NCmTgEX6snXO9mGJKaPp3pNaKhj6RAUK5glP1mOjh1Vm2M0OwPjooMc5fT';

            const modifiedReq = apiKey == null ? req.clone() : req.clone({
                params: req.params.set('apiKey', apiKey)
            });

            return next.handle(modifiedReq);
        }));
    }
}