import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CountriesService} from '../../../services/countries.service';
import {MatDialog} from '@angular/material/dialog';
import {DetailCountryDataComponent} from '../../../detail-country-data/components/detail-country-data/detail-country-data.component';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-countries-view',
  templateUrl: './countries-view.component.html',
  styleUrls: ['./countries-view.component.scss']
})
export class CountriesViewComponent implements OnInit, OnChanges, OnDestroy {

  @Input() isFavoriteList: boolean;
  @Input() countryObj: any;
  isMaxInView = false;
  // displayedColumns: string[] = ['flag', 'name', 'alpha2Code', 'alpha3Code', 'altSpellings', 'area', 'borders', 'callingCodes', 'capital', 'cioc', 'currencies', 'demonym', 'gini' ];

  displayedColumns: string[] = ['flag', 'name', 'alpha2Code', 'alpha3Code', 'altSpellings', 'area', 'borders', 'callingCodes', 'capital', 'cioc', 'currencies', 'demonym', 'gini', 'languages', 'latlng', 'nativeName', 'numericCode', 'population', 'region', 'subregion', 'timezones', 'topLevelDomain', 'translations', 'buttons'];

  tableClass = 'table-view';
  dataSource: MatTableDataSource<any>;

  columns: FormControl = new FormControl();
  cloneColumnList = [];

  subscription: Subscription;




  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  @Input() set data(value: any) {
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }




  constructor(private countriesService: CountriesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isMaxInView = this.displayedColumns.length === 14 || this.displayedColumns.length > 14;
    this.cloneColumnList = Object.assign([], this.displayedColumns);

    this.subscription = this.columns.valueChanges.subscribe(value => {
      const cloneList = Object.assign([], this.cloneColumnList);
      this.displayedColumns = cloneList.filter( ( el ) => {
        return value.indexOf( el ) < 0;
      });
      this.isMaxInView = this.displayedColumns.length === 14 || this.displayedColumns.length > 14;
    });


  }


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

  addClassToTable(viewValue: string): void {
    this.tableClass = viewValue;
  }

  callAdditionalInfo(country: any): void {
    const dialogRef = this.dialog.open(DetailCountryDataComponent, {data: country});
  }



  addCountryToList(country: any): void {
    this.countriesService.insertCountry.next(country);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
