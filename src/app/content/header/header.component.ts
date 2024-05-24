import { Component, inject, OnInit, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { MenubarModule } from 'primeng/menubar';
import { NgIf } from '@angular/common';
import { HeaderSettingsComponent } from "./settings/settings.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    MenubarModule,
    NgIf,
    HeaderSettingsComponent
  ],
  standalone: true
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  protected menuItems: MenuItem[] = [];
  protected loggedIn!: Signal<boolean>;

  ngOnInit() {
    this.loggedIn = this.authService.isUserLoggedIn();
  }

  public onHeaderClick(){
    void this.router.navigate(['/']);
  }
}
