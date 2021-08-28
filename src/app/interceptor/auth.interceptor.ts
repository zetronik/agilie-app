import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '../service/auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.url)
    if (this.authService.isAuth() && req.url.includes('places-dsn.algolia.net')) {
      const cloneRec = req.clone({
        setHeaders: {
          user: 'root',
          password: 'password'
        }
      })
      return next.handle(cloneRec)
    } else {
      return next.handle(req);
    }

  }
}
