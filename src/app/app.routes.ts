import {Routes} from "@angular/router";
import {canActivate} from "./service/auth.guard";
import {QueryInterceptor} from "./service/query.interceptor";
import {OverviewComponent} from "./content/overview/overview.component";
import {DetailComponent} from "./content/detail/detail.component";
import {LoginComponent} from "./content/login/login.component";
import {NotFoundComponent} from "./content/not-found/not-found.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    canActivate: [canActivate, QueryInterceptor],
    path: 'overview',
    component: OverviewComponent
  },
  {
    canActivate: [canActivate],
    path: 'detail/:id',
    component: DetailComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'notfound',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'notfound'
  }
];
