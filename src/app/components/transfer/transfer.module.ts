import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferComponent } from './transfer.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { TransferRoutingModule } from './transfer-routing.module';

@NgModule({
  declarations: [TransferComponent],
  imports: [

CommonModule,
    TransferRoutingModule,
    FormsModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TransferModule { }

