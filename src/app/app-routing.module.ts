import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './content/overview/overview.component';
import { DetailComponent } from './content/detail/detail.component';
import { NotFoundComponent } from './content/not-found/not-found.component';
import { QueryInterceptor } from './service/query.interceptor';
import { LoginComponent } from './content/login/login.component';
import { isAuthenticated } from './service/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    canActivate: [isAuthenticated, QueryInterceptor],
    path: 'overview',
    component: OverviewComponent
  },
  {
    canActivate: [isAuthenticated],
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
