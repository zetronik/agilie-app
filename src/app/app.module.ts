import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './service/auth.service';
import { SearchService } from './service/search.service';
import { UserInterceptor } from './interceptor/user.interceptor';
import {PasswordInterceptor} from './interceptor/password.interceptor'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    SearchService,
    { provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: PasswordInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
