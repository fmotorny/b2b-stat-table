import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  insertCountry: Subject<any> = new Subject();
  constructor(private http: HttpClient) { }


  getCountries(): Observable<MatTableDataSource<any>> {
    const fullUrl = `${environment.apiUrl}/all`;
    return this.http.get<any>(fullUrl).pipe(map((response: any) => {
      return response;
    }));
  }
}
