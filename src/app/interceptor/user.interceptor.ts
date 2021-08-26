import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('places-dsn.algolia.net')) {
      const paramReq = request.clone({
        headers: request.headers.set('user', 'root')
      });
      return next.handle(paramReq);
    } else {
      return next.handle(request);
    }
  }
}
