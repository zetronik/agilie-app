import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceInfoRoutingModule } from './place-info-routing.module';
import { PlaceInfoComponent } from './place-info.component';


@NgModule({
  declarations: [
    PlaceInfoComponent
  ],
  imports: [
    CommonModule,
    PlaceInfoRoutingModule
  ]
})
export class PlaceInfoModule { }
