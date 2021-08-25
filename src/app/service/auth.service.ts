import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public auth: boolean = false

  constructor() { }

  public registration(data: any): Observable<any> {
    return of()
  }
}
