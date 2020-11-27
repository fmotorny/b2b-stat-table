import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import {CountriesViewModule} from '../shared/countries-view/countries-view.module';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    CountriesViewModule
  ]
})
export class MainModule { }
