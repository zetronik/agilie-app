import { Component, OnInit } from '@angular/core';
import {ApiService} from '../service/api.service'
import {SearchResponse} from '../interface/search-response'
import {Router} from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public data: SearchResponse[] = []
  public select: SearchResponse | undefined
  public searchStorage: SearchResponse[] = []

  constructor(private searchService: ApiService, private router: Router) {
    if (localStorage.searchItems) {
      this.searchStorage = JSON.parse(localStorage.searchItems) as SearchResponse[]
    }
  }

  public getCity(event: Event) {
    this.select = undefined
    const target = event.target as HTMLInputElement
    this.searchService.search(target.value.trim()).subscribe(
      data => {
        this.data = data.filter(item => {
          return !this.searchStorage.some(s => s.objectID === item.objectID)
        })
        this.data.unshift(...this.searchStorage)
      }
    )
  }

  public selectItem(item: SearchResponse) {
    this.select = item
  }

  public submit() {
    if (this.select) {
      this.saveStorage(this.select)
      this.router.navigate(['info'], {queryParams: {id: this.select.objectID}})
    } else {
      alert('Choose Location')
    }
  }

  private saveStorage(item: SearchResponse) {
    const idx = this.searchStorage.findIndex(s => s.objectID === item.objectID)
    if (idx >= 0) {
      this.searchStorage.splice(idx, 1)
      this.searchStorage.push(item)
    } else {
      if (this.searchStorage.length === 3) {
        this.searchStorage.pop()
        this.searchStorage.unshift(item)
      } else {
        this.searchStorage.push(item)
      }
    }

    localStorage.searchItems = JSON.stringify(this.searchStorage)
  }

  ngOnInit(): void {}
}
