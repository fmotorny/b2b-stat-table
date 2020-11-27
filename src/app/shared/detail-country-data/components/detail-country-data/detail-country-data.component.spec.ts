import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCountryDataComponent } from './detail-country-data.component';

describe('DetailCountryDataComponent', () => {
  let component: DetailCountryDataComponent;
  let fixture: ComponentFixture<DetailCountryDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCountryDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCountryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
