import { Injectable } from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs'
import {debounceTime, filter, map, delay, distinctUntilChanged, switchMap, catchError} from 'rxjs/operators'
import {SearchResponse} from '../interface/search-response'
import {HttpClient} from '@angular/common/http'
import { environment } from '../../environments/environment'

const apiUrl = environment.url

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public search(data: string = ''): Observable<SearchResponse[]> {
    return of(data).pipe(
      debounceTime(2000),
      filter(data => data.length >= 2),
      distinctUntilChanged(),
      switchMap(data => this.http.post<{hits: SearchResponse[]}>(apiUrl + 'query',
        JSON.stringify({query: data}))
        .pipe(
        catchError(() => EMPTY)
      )),
      map(data => data.hits)
    )
  }

  public getObjectId(id: string): Observable<SearchResponse> {
      return this.http.get(apiUrl + id).pipe(
      map(data => <SearchResponse>data),
      delay(300)
    )
  }
}
