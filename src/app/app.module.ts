import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { OverviewComponent } from './content/overview/overview.component';
import { SharedPrimeNGModule } from './shared-prime-ng.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './content/detail/detail.component';
import { NotFoundComponent } from './content/not-found/not-found.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { DataViewModule } from "primeng/dataview";
import { PositionComponent } from './content/position/position.component';
import { AuthInterceptor } from './service/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppComponent,
    OverviewComponent,
    DetailComponent,
    PositionComponent,
    NotFoundComponent,
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppRoutingModule,
    SharedPrimeNGModule,
    DataViewModule,
    FormsModule,
    ReactiveFormsModule,
    RippleModule,
    ButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      deps: [AuthService],
      useFactory: checkExistingApiKey,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

function checkExistingApiKey(authService: AuthService) {
  return () => authService.initialize();
}
