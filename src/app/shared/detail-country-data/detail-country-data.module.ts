import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailCountryDataComponent } from './components/detail-country-data/detail-country-data.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [DetailCountryDataComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class DetailCountryDataModule { }
