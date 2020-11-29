import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {CountryInterface} from '../types/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  insertCountry: Subject<CountryInterface> = new Subject();
  removeCountry: Subject<CountryInterface> = new Subject();
  constructor(private http: HttpClient) { }


  getCountries(): Observable<CountryInterface[]> {
    const fullUrl = `${environment.apiUrl}/all`;
    return this.http.get<CountryInterface[]>(fullUrl).pipe(map((response: CountryInterface[]) => {
      return response;
    }));
  }
}
