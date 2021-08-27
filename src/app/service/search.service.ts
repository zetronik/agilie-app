import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs'
import {debounceTime, filter, map, mergeMap, delay} from 'rxjs/operators'
import {SearchResponse} from '../interface/search-response'
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  public search(data: string = ''): Observable<SearchResponse[]> {
    return of(data).pipe(
      debounceTime(1000),
      filter(data => data.length >= 2),
      mergeMap(data =>
        this.http.post(
          'https://places-dsn.algolia.net/1/places/query',
          JSON.stringify({ query: data }),
          {
            headers: {
              ['Accept']:
                'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              ['Accept-Encoding']: 'gzip, deflate, br',
              ['Accept-Language']:
                'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6,la;q=0.5,de;q=0.4',
              ['Sec-Fetch-Site']: 'cross-site',
              ['Sec-Fetch-Mode']: 'cors',
              ['Sec-Fetch-Dest']: 'empty',
              ['Host']: 'places-dsn.algolia.net',
              ['Connection']: 'keep-alive'
            }
          }
        )
      ),
      map(data => <SearchResponse[]>data.hits)
    );
  }

  public getObjectId(id: string): Observable<SearchResponse> {
    return this.http
      .get('https://places-dsn.algolia.net/1/places/' + id, {
        headers: {
          ['Accept']:
            'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          ['Accept-Encoding']: 'gzip, deflate, br',
          ['Accept-Language']:
            'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6,la;q=0.5,de;q=0.4',
          ['Sec-Fetch-Site']: 'cross-site',
          ['Sec-Fetch-Mode']: 'cors',
          ['Sec-Fetch-Dest']: 'empty',
          ['Host']: 'places-dsn.algolia.net',
          ['Connection']: 'keep-alive'
        }
      })
      .pipe(
        map(data => <SearchResponse>data),
        delay(300)
      );
  }
}
