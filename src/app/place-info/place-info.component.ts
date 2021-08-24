import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {SearchService} from '../service/search.service'
import {SearchResponse} from '../interface/search-response'

@Component({
  selector: 'app-place-info',
  templateUrl: './place-info.component.html',
  styleUrls: ['./place-info.component.scss']
})
export class PlaceInfoComponent implements OnInit {

  public data: SearchResponse | undefined
  public loading: boolean = false

  private id: string = ''

  constructor(private searchService: SearchService, private route: ActivatedRoute) {
    route.queryParams.subscribe(params => this.id = params.id)
  }

  public submit() {
    this.loading = true
    this.searchService.getObjectId(this.id).subscribe(data => {
      this.data = data
      this.loading = false
    })
  }

  ngOnInit(): void {
  }

}
