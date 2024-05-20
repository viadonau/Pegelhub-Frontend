import { inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

export const canActivate: CanActivateFn = ():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const loggedIn = authService.isUserLoggedIn();

    if (loggedIn()) {
      return true;
    } else {
      return router.createUrlTree(['/login']);
    }
}
