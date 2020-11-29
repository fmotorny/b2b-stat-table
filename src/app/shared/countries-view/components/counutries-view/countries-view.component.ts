import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CountriesService} from '../../../services/countries.service';
import {MatDialog} from '@angular/material/dialog';
import {DetailCountryDataComponent} from '../../../detail-country-data/components/detail-country-data/detail-country-data.component';
import {CountryInterface} from '../../../types/country.interface';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-countries-view',
  templateUrl: './countries-view.component.html',
  styleUrls: ['./countries-view.component.scss']
})
export class CountriesViewComponent implements OnInit, OnChanges, OnDestroy {

  @Input() isFavoriteList: boolean;
  @Input() countryObj: CountryInterface;
  isMaxInView = false;
  baseWidth: number;

  displayedColumns: string[] = ['flag', 'add', 'name', 'alpha2Code', 'alpha3Code', 'altSpellings', 'area', 'borders', 'callingCodes', 'capital', 'cioc', 'currencies', 'demonym', 'gini', 'languages', 'latlng', 'nativeName', 'numericCode', 'population', 'region', 'subregion', 'timezones', 'topLevelDomain', 'translations'];

  tableClass = 'table-view';
  dataSource: MatTableDataSource<CountryInterface>;
  isOverflown: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('select') select: MatSelect;


  @Input() set data(value: CountryInterface[]) {
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }




  constructor(private countriesService: CountriesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isOverflown = true;
    this.isMaxInView = this.displayedColumns.length === 14 || this.displayedColumns.length > 14;
    this.baseWidth = this.displayedColumns.length * 10;
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.countryObj && changes.countryObj.currentValue) {
      // this.dataSource.data = [...this.favoritesCountryList];
      this.dataSource.data.concat([changes.countryObj.currentValue]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }



  callAdditionalInfo(country: CountryInterface): void {
    this.dialog.open(DetailCountryDataComponent, {data: country});
  }

  addCountryToList(country: CountryInterface): void {
    this.isOverflown = false;
    this.countriesService.insertCountry.next(country);
  }

  removeCountryFromList(countryName: string): void {
    this.countriesService.removeCountry.next({name: countryName} as CountryInterface);
  }

  ngOnDestroy(): void {
   // this.subscription.unsubscribe();
  }


  initSearch(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addRemoveColumn(event: Array<string>): void {
    this.displayedColumns = event;
    this.isMaxInView = this.displayedColumns.length === 14 || this.displayedColumns.length > 14;
    this.baseWidth = this.displayedColumns.length * 10;
  }

  changeView(event: string): void {
    this.tableClass = event;
  }

}
