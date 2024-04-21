// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { QueryService } from './query.service';
@Injectable({
  providedIn: 'root'
})
export class QueryInterceptor  {
  constructor(public queryService: QueryService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    switch (route.queryParams['displayType']) {
      case 'map':
        this.queryService.setMode(route.queryParams['displayType']);
        break;
      case 'tile':
        this.queryService.setMode(route.queryParams['displayType']);
        break;
      case 'mini':
        this.queryService.setMode(route.queryParams['displayType']);
        break;
      default:
        this.queryService.setMode("table")
    }
    return true;
  }
}