import {Component} from '@angular/core';
import {DivisionDto} from "../../../../models/utilities/division.model";
import {DivisionService} from "../../../../services/utilities/division/division.service";
import {BaseListComponentImpl} from "../../../../core/base-interfaces/component/base-list/base-list.component";

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.css']
})
export class DivisionListComponent extends BaseListComponentImpl<DivisionDto> {

  override displayedColumns: string[] = ['name', 'geoCode', 'latitude', 'longitude'];
  constructor(private divisionService: DivisionService) {
    super();
  }

  getData(params: any) {
    return this.divisionService.getAll(params);
  }
}











/*
import {Component, ViewChild} from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from '@angular/material/sort';
import { Division } from "../../../../models/utilities/division.model";
import { DivisionService } from "../../../../services/utilities/division/division.service";
import { BaseListComponent } from "../../../../core/base-interfaces/component/base-list/base-list.component";

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.css']
})
export class DivisionListComponent {

  displayedColumns: string[] = ['name', 'geoCode', 'latitude', 'longitude'];
  dataSource: Division[] = [];
  pageable: any; // To store the pageable object
  filters: { [key: string]: string } = {}; // To store dynamic filters
  sortColumn: string = 'createdAt'; // Default sort column
  sortDirection: string = 'asc'; // Default sort direction
  isLoading: boolean = true; // Loader state

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private divisionService: DivisionService) {
  }

  ngOnInit(): void {
    this.getDivisions();
  }


  getDivisions(): void {
    const params = {
      pageNo: this.paginator ? this.paginator.pageIndex + 1 : 1, // Backend expects 1-based index
      pageSize: this.paginator ? this.paginator.pageSize : 10,
      sort: `${this.sortColumn},${this.sortDirection}`,
      ...this.filters
    };

    this.divisionService.getAll(params).subscribe(
      response => {
        this.dataSource = response.payload;
        this.pageable = response.pageable;

        // No need to manually update the paginator's pageIndex and pageSize here
        this.paginator.length = this.pageable.totalElements;
        // The paginator will handle pageIndex and pageSize changes internally
        this.isLoading = false; // Hide loader after fetching data
      },
      error => {
        console.error('Error fetching divisions:', error);
        this.isLoading = false; // Hide loader after fetching data
      }
    );
  }


  pageChange(event: any): void {
    this.paginator.pageIndex = event.pageIndex; // Update the current page index
    this.paginator.pageSize = event.pageSize;   // Update the current page size
    this.getDivisions();                        // Fetch new data with updated pagination
  }

  applyDynamicFilter(filterKey: string, event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    this.filters[filterKey] = input.value;  // Update the filters object
    this.paginator.pageIndex = 0;           // Reset to the first page on filter change
    this.getDivisions();                    // Fetch data with updated filters
  }

  sortData(sort: Sort): void {
    this.sortColumn = sort.active;
    this.sortDirection = sort.direction === '' ? 'asc' : sort.direction;
    this.getDivisions();
  }
}
*/
