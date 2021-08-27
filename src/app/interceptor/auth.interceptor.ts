import { Injectable } from '@angular/core'
import {HttpRequest,HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http'
import { Observable } from 'rxjs'
import {AuthService} from '../service/auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuth()) {
      req = req.clone({
        setHeaders: {
          'user': 'root',
          'password': 'password',
          // 'Connection': 'keep-alive',
          // 'Cache-Control': 'no-cache',
          // 'Accept': 'application/json, text/plain, */*',
          // 'Sec-Fetch-Site': 'cross-site',
          // 'Sec-Fetch-Mode': 'cors',
          // 'Sec-Fetch-Dest': 'empty',
          // 'Accept-Encoding': 'gzip, deflate, br',
          // 'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6,la;q=0.5',
        }
      })
      return next.handle(req)
    } else {
      return next.handle(req)
    }
  }
}
