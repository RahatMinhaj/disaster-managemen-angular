import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {Observable} from 'rxjs';

export interface BaseListComponent<T> {
  displayedColumns: string[];
  dataSource: T[];
  pageable: any; // To store the pageable object
  filters: { [key: string]: string }; // To store dynamic filters
  sortColumn: string; // Default sort column
  sortDirection: string; // Default sort direction

  getData(params: any): Observable<any>;
}

@Component({
  template: '' // Base component does not have its own template
})
export abstract class BaseListComponentImpl<T> implements BaseListComponent<T> {
  displayedColumns: string[] = [];
  dataSource: T[] = [];
  pageable: any;
  filters: { [key: string]: string } = {};
  sortColumn: string = 'createdAt'; // Default sort column
  sortDirection: string = 'asc'; // Default sort direction

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  abstract getData(params: any): Observable<any>;

  ngOnInit(): void {
    this.getDataFromService();
  }

  getDataFromService(): void {
    const params = {
      pageNo: this.paginator ? this.paginator.pageIndex + 1 : 1,
      pageSize: this.paginator ? this.paginator.pageSize : 10,
      sort: `${this.sortColumn},${this.sortDirection}`,
      ...this.filters
    };

    this.getData(params).subscribe({
      next: response => {
        this.dataSource = response.payload;
        this.pageable = response.pageable;
        this.paginator.length = this.pageable.totalElements;
      },
      error: error => {
        console.error('Error fetching data:', error);
      }
    });
  }

  pageChange(event: any): void {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.getDataFromService();
  }

  applyDynamicFilter(filterKey: string, event: any): void {
    const input = event.target as HTMLInputElement;
    this.filters[filterKey] = input.value;
    this.paginator.pageIndex = 0;
    this.getDataFromService();
  }

  sortData(sort: Sort): void {
    this.sortColumn = sort.active;
    this.sortDirection = sort.direction === '' ? 'asc' : sort.direction;
    this.getDataFromService();
  }
}
