import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlaceInfoComponent} from './place-info.component'

const routes: Routes = [
  {path: '', component: PlaceInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaceInfoRoutingModule { }
