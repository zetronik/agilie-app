import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs'
import {Registration} from '../interface/registration'
import {delay, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public auth: boolean = true

  constructor() { }

  public registration(data: Registration): Observable<boolean> {
    return of(data).pipe(
      delay(2000),
      map(data => this.auth = data.email === 'mail@mail.com' && data.password === '123456' && data.conditions)
    )
  }

  public isAuth(): boolean {
    return this.auth
  }
}
