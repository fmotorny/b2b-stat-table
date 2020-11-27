import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CountriesService} from '../../../services/countries.service';
import {MatDialog} from '@angular/material/dialog';
import {DetailCountryDataComponent} from '../../../detail-country-data/components/detail-country-data/detail-country-data.component';

@Component({
  selector: 'app-countries-view',
  templateUrl: './countries-view.component.html',
  styleUrls: ['./countries-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountriesViewComponent implements OnInit, OnChanges {

  @Input() isFavoriteList: boolean;
  @Input() countryObj: any;
  displayedColumns: string[] = ['flag', 'name', 'alpha2Code', 'alpha3Code', 'altSpellings', 'area', 'currencies', 'buttons'];
  tableClass = 'table-view';
  dataSource: MatTableDataSource<any>;




  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  @Input() set data(value: any) {
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }




  constructor(private countriesService: CountriesService, public dialog: MatDialog) { }

  ngOnInit(): void {}


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.countryObj && changes.countryObj.currentValue) {
     // this.favoritesCountryList.push(changes.countryObj.currentValue);
      // this.dataSource.data = [...this.favoritesCountryList];
      this.dataSource.data.concat([changes.countryObj.currentValue]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }



  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addClassToTable(classStr: string): void {
    this.tableClass = classStr;
  }

  callAdditionalInfo(country: any): void {
    const dialogRef = this.dialog.open(DetailCountryDataComponent, {data: country});
  }



  addCountryToList(country: any): void {
    console.log('addCountryToList', country);
    this.countriesService.insertCountry.next(country);
  }

}
