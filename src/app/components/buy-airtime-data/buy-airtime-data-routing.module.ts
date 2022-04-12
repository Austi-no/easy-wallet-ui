import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyAirtimeDataComponent } from './buy-airtime-data.component';


const routes: Routes = [
  {path:'', component:BuyAirtimeDataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class BuyAirtimeDataRoutingModule { }
