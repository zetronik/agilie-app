import { Injectable } from '@angular/core';
import {ajaxGet, ajaxPost} from 'rxjs/internal-compatibility'
import {Observable, of} from 'rxjs'
import {debounceTime, filter, map, mergeMap, delay} from 'rxjs/operators'
import {SearchResponse} from '../interface/search-response'

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  public search(data: string = ''): Observable<SearchResponse[]> {
    return of(data).pipe(
      debounceTime(1000),
      filter(data => data.length >= 2),
      mergeMap(data => ajaxPost('https://places-dsn.algolia.net/1/places/query', JSON.stringify({query: data}))),
      map(data => <SearchResponse[]>data.response.hits)
    )
  }

  public getObjectId(id: string): Observable<SearchResponse> {
    const startTime = Date.now()
    return ajaxGet('https://places-dsn.algolia.net/1/places/' + id).pipe(
      map(data => <SearchResponse>data.response),
      delay(300)
    )
  }
}
