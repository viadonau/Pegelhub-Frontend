import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authService = inject(AuthService);
    private router = inject(Router);

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiKey: string | null = localStorage.getItem('api_key');

        if (apiKey) {
          req = req.clone({
            setParams: {
              apiKey: apiKey
            }
          });
        }

        return next.handle(req).pipe(
          catchError((error: HttpResponse<unknown>) => {
            if (error.status === 401) {
              this.authService.logout();
              void this.router.navigate(['/login']);
            }

            return throwError(() => error);
          })
        );
    }
}
