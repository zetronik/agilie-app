import { Component, OnInit } from '@angular/core';
import {SearchService} from '../service/search.service'
import {SearchResponse} from '../interface/search-response'
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public data: SearchResponse[] = []
  public select: SearchResponse | undefined
  public searchStorage: SearchResponse[] = []
  public mapOptions: google.maps.MapOptions = {
    center: { lat: 48.4593, lng: 35.03865 },
    zoom : 10
  }

  constructor(private searchService: SearchService, private router: Router) {
    if (localStorage.searchItems) {
      this.searchStorage = JSON.parse(localStorage.searchItems) as SearchResponse[]
    }
  }

  public getCity(event: Event) {
    this.select = undefined
    const target = event.target as HTMLInputElement
    this.searchService.search(target.value.trim()).subscribe(
      data => this.data = [...this.searchStorage, ...data]
    )
  }

  public selectItem(item: SearchResponse) {
    this.select = item
    this.mapOptions.center = {...item._geoloc}
    this.saveStorage(item)
  }

  public submit() {
    if (this.select) {
      this.router.navigate(['info'], {queryParams: {id: this.select.objectID}})
    }
  }

  private saveStorage(item: SearchResponse) {
    if (this.searchStorage.length === 3) {
      this.searchStorage.pop()
      this.searchStorage.unshift(item)
    } else {
      this.searchStorage.push(item)
    }
    localStorage.searchItems = JSON.stringify(this.searchStorage)
  }

  ngOnInit(): void {}
}
