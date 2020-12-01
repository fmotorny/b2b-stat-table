import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CountriesService} from '../../../shared/services/countries.service';
import {Subscription} from 'rxjs';
import {CountryInterface} from '../../../shared/types/country.interface';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, OnDestroy {

  dataSource: CountryInterface[];
  favoriteList: CountryInterface[] = [];
  countryObj: CountryInterface = null;
  subscription: Subscription;
  isShowTab = true;


  @ViewChild('dialogTemplate') infoDialog: TemplateRef<MatDialog>;



  constructor(private countriesService: CountriesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe(((data: CountryInterface[]) => {
      this.dataSource = data;
    }));

    this.subscription = this.countriesService.insertCountry.subscribe((country: CountryInterface) => {
      this.isShowTab = true;
      const found = this.favoriteList.some(el => el.name === country.name);
      if (found) {
        const dialogRef = this.dialog.open(this.infoDialog);
        this.subscription = dialogRef.afterClosed().subscribe(result => {
          this.countriesService.isOverflown = true;
        });
        return;
      }

      this.favoriteList.push(country);

      this.countryObj = country;
      const favoriteList = JSON.stringify(this.favoriteList);
      localStorage.setItem('favorite-country-list', favoriteList);

      setTimeout(() => {
        this.countriesService.isOverflown = true;
      }, 300);
    });


    this.subscription = this.countriesService.removeCountry.subscribe((data) => {
      this.favoriteList = this.favoriteList.filter((country: CountryInterface) => {
        return country.name !== data.name;
      });
      if (this.favoriteList.length === 0) {
        this.favoriteList = [];
        this.countryObj = null;
        this.isShowTab = false;
      }
      localStorage.removeItem('favorite-country-list');
      const favoriteList = JSON.stringify(this.favoriteList);
      localStorage.setItem('favorite-country-list', favoriteList);
    });

    const token = !!localStorage.getItem('favorite-country-list');

    if (token) {
      const data = localStorage.getItem('favorite-country-list');
      this.favoriteList = JSON.parse(data);
    }
  }

  tabChanged(event: Event): void {
    this.countryObj = {} as CountryInterface;
    this.countriesService.isOverflown = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
