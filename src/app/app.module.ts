import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/register/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user-service.service';

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { DisplayBoxComponent } from './components/display-box/display-box.component';
import { StoreModule } from '@ngrx/store';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const movieUrl = new InjectionToken<string>('');
export const discoverPath = new InjectionToken<string>('');
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    MainComponent,
    DisplayBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: UserService, useClass: UserService },
    {
      provide: movieUrl,
      useValue: 'api.themoviedb.org',
    },
    {
      provide: discoverPath,
      useValue: '/3/discover/movie',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
