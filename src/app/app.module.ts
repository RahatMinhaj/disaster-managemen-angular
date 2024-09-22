import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DivisionListComponent} from "./components/utilities/division/division-list/division-list.component";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
// angular materials
import {MatAnchor, MatButton, MatIconButton} from '@angular/material/button';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatInput} from '@angular/material/input';

import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import {NgxEchartsModule} from 'ngx-echarts';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';

import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatSort} from "@angular/material/sort";
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {CrisisListComponent} from './components/crisis/crisis-list/crisis-list.component';
import {MeComponent} from './components/user/me/me.component';
import {UserListComponent} from './components/user/user-list/user-list.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {ProductCategoryComponent} from './components/utilities/product-category/product-category.component';
import {DistrictListComponent} from "./components/utilities/district-list/district-list.component";
import {PoliceStationListComponent} from "./components/utilities/police-station-list/police-station-list.component";
import {DonationComponent} from './components/donations/donation/donation.component';
import {CrisisDetailComponent} from "./components/crisis/crisis-detail/crisis-detail.component";
import {InventoryComponent} from './components/inventory/inventory.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {jwtInterceptor} from "./services/auth/interceptor/jwt.interceptor";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {HomeComponent} from './components/landing-page/home/home.component';
import {CrisisCreationComponent} from './components/crisis/crisis-creation/crisis-creation.component';
import {CreateDonationComponent} from './components/donations/create-donation/create-donation.component';


@NgModule({
  declarations: [AppComponent, DivisionListComponent, DistrictListComponent, PoliceStationListComponent, AdminDashboardComponent, CrisisListComponent, MeComponent, UserListComponent, ProfileComponent, ProductCategoryComponent, DonationComponent, InventoryComponent, CrisisDetailComponent, LoginComponent, RegisterComponent, HomeComponent, CrisisCreationComponent, CreateDonationComponent

  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, MatFormField, MatTable, MatPaginator, MatColumnDef, MatHeaderCell, MatCell, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatHeaderRow, MatRow, MatRowDef, MatSort, MatInput, MatProgressSpinnerModule, MatExpansionPanel, MatIcon, MatListItem, MatNavList, MatSidenav, MatSidenavContainer, MatIconButton, MatExpansionModule, MatSidenavContent, MatToolbar, MatNoDataRow, ReactiveFormsModule, MatDialogContent, MatDialogTitle, MatButton, MatDialogActions, MatDialogClose, MatSelect, MatOption, MatFormFieldModule, MatSelectModule, MatMenu, MatMenuItem, MatMenuTrigger, MatToolbarRow, MatAnchor, NgxEchartsModule.forRoot({
    echarts: () => import('echarts')  // Register echarts as a global dependency
  }),],
  providers: [provideAnimationsAsync(), provideHttpClient(withInterceptors([jwtInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {
}
