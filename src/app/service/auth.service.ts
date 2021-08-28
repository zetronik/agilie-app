import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs'
import {Registration} from '../interface/registration'
import {delay, map, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: boolean = false

  constructor() {
    const auth = sessionStorage.isAuth
    if (auth) {
      this.auth = auth
    }
  }

  public registration(data: Registration): Observable<boolean> {
    return of(data).pipe(
      delay(2000),
      map(data => this.auth = data.email === 'mail@mail.com' && data.password === '123456' && data.conditions),
      tap(() => {
        sessionStorage.isAuth = this.auth
      })
    )
  }

  public isAuth(): boolean {
    return this.auth
  }
}
