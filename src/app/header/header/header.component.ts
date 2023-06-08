import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public menuItems: MenuItem[];

  constructor(private router: Router) {
    this.menuItems = [];
  }

  public onHeaderClick(){
    this.router.navigate(['/']);
  }
}
