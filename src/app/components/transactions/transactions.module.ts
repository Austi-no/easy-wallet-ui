import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [TransactionsComponent],
  imports: [
  CommonModule,
    TransactionsRoutingModule,
    NgxPaginationModule
  ]
})
export class TransactionsModule { }
