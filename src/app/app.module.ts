import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { OverviewComponent } from './content/overview/overview.component';
import { SharedPrimeNGModule } from './shared-prime-ng.module';
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './content/detail/detail.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppComponent,
    OverviewComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppRoutingModule,
    SharedPrimeNGModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
