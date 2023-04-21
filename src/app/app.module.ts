import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { OverviewComponent } from './content/overview/overview.component';
import { SharedPrimeNGModule } from './shared-prime-ng.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
    AppComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    AppRoutingModule,
    SharedPrimeNGModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
