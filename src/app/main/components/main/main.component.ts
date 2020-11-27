import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CountriesService} from '../../../shared/services/countries.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, OnDestroy {

  dataSource: any;
  favoriteList: any = [];
  countryObj: any = null;

  subscription: Subscription;



  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe(((data: any) => {
      this.dataSource = data;
    }));


    this.subscription = this.countriesService.insertCountry.subscribe((country: any) => {
      this.favoriteList.push(country);
      this.countryObj = country;
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
    this.countryObj = {};
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
