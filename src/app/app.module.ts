import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { OverviewComponent } from './content/overview/overview.component';
import { SharedPrimeNGModule } from './shared-prime-ng.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './content/detail/detail.component';
import { NotFoundComponent } from './content/not-found/not-found.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { DataViewModule } from "primeng/dataview";
import { PositionComponent } from './content/position/position.component';
import { QueryInterceptor } from './service/query.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppComponent,
    OverviewComponent,
    DetailComponent,
    PositionComponent,
    NotFoundComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppRoutingModule,
    SharedPrimeNGModule,
    DataViewModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
