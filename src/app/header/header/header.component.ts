import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public menuItems: MenuItem[];

  constructor(
    private router: Router,
    public authService: AuthService
  ) {
    this.menuItems = [];
  }

  public onHeaderClick(){
    this.router.navigate(['/']);
  }

  public onLogout(): void {
    this.authService.loggedIn = false;
    this.authService.authData.next(null);
    this.router.navigate(['/', 'login']);
  }
}
