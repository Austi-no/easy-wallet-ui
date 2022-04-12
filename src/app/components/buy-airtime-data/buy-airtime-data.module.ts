import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyAirtimeDataComponent } from './buy-airtime-data.component';
import { BuyAirtimeDataRoutingModule } from './buy-airtime-data-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BuyAirtimeDataComponent],
  imports: [


    CommonModule,
    BuyAirtimeDataRoutingModule,
    FormsModule
  ]
})
export class BuyAirtimeDataModule { }
