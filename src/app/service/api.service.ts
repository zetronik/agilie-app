import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs'
import {debounceTime, filter, map, mergeMap, delay} from 'rxjs/operators'
import {SearchResponse} from '../interface/search-response'
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public search(data: string = ''): Observable<SearchResponse[]> {
    return of(data).pipe(
      debounceTime(1000),
      filter(data => data.length >= 2),
      mergeMap(data => this.http.post('https://places-dsn.algolia.net/1/places/query', JSON.stringify({query: data}))),
    // @ts-ignore
      map(data => <SearchResponse[]>data.hits)
    )
  }

  public getObjectId(id: string): Observable<SearchResponse> {
      return this.http.get('https://places-dsn.algolia.net/1/places/' + id).pipe(
      map(data => <SearchResponse>data),
      delay(300)
    )
  }
}
