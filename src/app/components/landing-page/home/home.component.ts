import {Component, OnInit, ViewChild} from '@angular/core';
import {EChartsOption} from 'echarts';
import {Crisis} from '../../../models/disaster/Crisis.model';
import {CrisisCreationComponent} from '../../crisis/crisis-creation/crisis-creation.component';
import {MatDialog} from '@angular/material/dialog';
import {CrisisService} from '../../../services/crisis/crisis.service';
import {Router} from '@angular/router';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {CreateDonationComponent} from "../../donations/create-donation/create-donation.component";
import {LocalStorageService} from "../../../services/auth/local-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource: Crisis[] = [];
  pageable: any;
  filters: { [key: string]: string } = {};
  sortColumn: string = 'createdAt'; // Default sort column
  sortDirection: string = 'asc'; // Default sort direction
  displayedColumns: string[] = ['name', 'title', 'requiredHelp', 'severity', 'description', 'entryTime'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title = 'Disaster Management';
  public chartOptions: EChartsOption = {};

  constructor(
    private dialog: MatDialog,
    private crisisService: CrisisService,
    private locationStorage:LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCrisisData(); // Fetch data on initialization
    this.initializeChartOptions(); // Initialize chart options
  }

  pageChange(event: any): void {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.getCrisisData();
  }

  sortData(sort: Sort): void {
    this.sortColumn = sort.active;
    this.sortDirection = sort.direction || 'asc'; // Default to 'asc' if no direction
    this.getCrisisData();
  }

  getCrisisData(): void {
    const params = {
      pageNo: this.paginator ? this.paginator.pageIndex + 1 : 1,
      pageSize: this.paginator ? this.paginator.pageSize : 5,
      sort: `${this.sortColumn},${this.sortDirection}`
    };

    this.crisisService.getAll(params).subscribe({
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

  initializeChartOptions(): void {
    this.chartOptions = {
      title: {
        text: 'Donations & Expenses',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['Day 1', 'Day 2', 'Day 3', 'Day 4']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Donations',
          type: 'bar',
          data: [5000, 10000, 15000, 8000],
          itemStyle: {
            color: 'rgba(75, 192, 192, 0.6)'
          }
        },
        {
          name: 'Expenses',
          type: 'bar',
          data: [2000, 4000, 6000, 2000],
          itemStyle: {
            color: 'rgba(255, 99, 132, 0.6)'
          }
        }
      ],
      legend: {
        data: ['Donations', 'Expenses'],
        top: 'bottom'
      },
      responsive: true
    };
  }



  openDialog(): void {

    LocalStorageService
    const dialogRef = this.dialog.open(CrisisCreationComponent, {
      width: '500px', // Set to a reasonable width
      maxHeight: '90vh', // Set max height to make it scrollable
      panelClass: 'custom-dialog' // Optional: use a custom class for further styling
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      // Handle the result if needed
    });
  }

  openDialogForDonation(): void {
    const dialogRef = this.dialog.open(CreateDonationComponent, {
      width: '500px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  isLoggedIn() {
    return this.locationStorage.isLoggedIn();
  }
}
