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
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ToolsComponent } from './components/tools/tools.component';



@NgModule({
  declarations: [CountriesViewComponent, ToolsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTooltipModule,
    DetailCountryDataModule
  ],
  exports: [CountriesViewComponent, ToolsComponent]
})
export class CountriesViewModule { }
