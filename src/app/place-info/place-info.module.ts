import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceInfoRoutingModule } from './place-info-routing.module';
import { PlaceInfoComponent } from './place-info.component';
import { SpinnerComponent } from '../ui/spinner/spinner.component'
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {AuthInterceptor} from '../interceptor/auth.interceptor'


@NgModule({
  declarations: [
    PlaceInfoComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    PlaceInfoRoutingModule
  ],
  providers: []
})
export class PlaceInfoModule { }
