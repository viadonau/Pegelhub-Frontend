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
            const apiKey = authData?.apiKey;

            const modifiedReq = apiKey == null || apiKey == '' ? req.clone() : req.clone({
                params: req.params.set('apiKey', apiKey)
            });

            return next.handle(modifiedReq);
        }));
    }
}