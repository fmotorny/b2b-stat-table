import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-detail-country-data',
  templateUrl: './detail-country-data.component.html',
  styleUrls: ['./detail-country-data.component.scss']
})
export class DetailCountryDataComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public country) { }

  ngOnInit(): void {}

}
