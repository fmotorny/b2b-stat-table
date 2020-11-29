import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit, OnDestroy {
  displayedColumns: Array<string>;
  @Output() filterEvent: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() columnFilter: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
  @Output() changeViewEvent: EventEmitter<string> = new EventEmitter<string>();
  columns: FormControl = new FormControl();

  @Input() tableClass: string;
  @Input() isMaxInView: boolean;
  @Input() baseWidth: number;

  @Input() set columnsData(value: Array<string>) {
    this.displayedColumns = value;
  }

  subscription: Subscription;
  cloneColumnList = [];

  constructor() { }

  ngOnInit(): void {
    this.cloneColumnList = Object.assign([], this.displayedColumns);
    this.subscription = this.columns.valueChanges.subscribe((value: Array<string>) => {
      const cloneList = Object.assign([], this.cloneColumnList);
      this.displayedColumns = cloneList.filter( ( el: string ) => {
        return value.indexOf( el ) < 0;
      });

      this.columnFilter.emit(this.displayedColumns);
      this.isMaxInView = this.displayedColumns.length === 14 || this.displayedColumns.length > 14;
      this.baseWidth = this.displayedColumns.length * 10;
    });
  }



  applyFilter(event: Event): void {
   // const filterValue = (event.target as HTMLInputElement).value;
    this.filterEvent.emit(event);
  }

  addClassToTable(viewValue: string): void {
    this.changeViewEvent.emit(viewValue);
  }

  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  ngOnDestroy(): void {

  }

}
