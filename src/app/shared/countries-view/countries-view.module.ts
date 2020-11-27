import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CountriesViewComponent} from './components/counutries-view/countries-view.component';
import {MatDialogModule} from '@angular/material/dialog';
import {DetailCountryDataModule} from '../detail-country-data/detail-country-data.module';



@NgModule({
  declarations: [CountriesViewComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    DetailCountryDataModule
  ],
  exports: [CountriesViewComponent]
})
export class CountriesViewModule { }
