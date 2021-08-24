import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceInfoRoutingModule } from './place-info-routing.module';
import { PlaceInfoComponent } from './place-info.component';
import { SpinnerComponent } from '../ui/spinner/spinner.component'


@NgModule({
  declarations: [
    PlaceInfoComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    PlaceInfoRoutingModule
  ]
})
export class PlaceInfoModule { }
