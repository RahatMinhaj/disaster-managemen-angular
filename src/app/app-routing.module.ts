import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DivisionListComponent} from "./components/utilities/division/division-list/division-list.component";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {CrisisListComponent} from "./components/crisis/crisis-list/crisis-list.component";
import {UserListComponent} from "./components/user/user-list/user-list.component";
import {ProfileComponent} from "./components/user/profile/profile.component";
import {ProductCategoryComponent} from "./components/utilities/product-category/product-category.component";
import {DistrictListComponent} from "./components/utilities/district-list/district-list.component";
import {PoliceStationListComponent} from "./components/utilities/police-station-list/police-station-list.component";
import {DonationComponent} from "./components/donations/donation/donation.component";
import {InventoryComponent} from "./components/inventory/inventory.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {HomeComponent} from "./components/landing-page/home/home.component";
import {routerGuard} from "./services/auth/router.guard";
import {loginGuard} from "./services/auth/login.guard";

const routes: Routes = [{
  path: '', pathMatch: 'full', redirectTo: "home"
},

  {path: 'home', component: HomeComponent}, {path: 'division', component: DivisionListComponent}, {
    path: 'login',
    component: LoginComponent, canActivate:[loginGuard]
  }, {path: 'register', component: RegisterComponent, canActivate:[loginGuard]}, {
    path: 'admin', component: AdminDashboardComponent, canActivate: [routerGuard], children: [{
      path: 'crisis-list', component: CrisisListComponent
    }, {
      path: 'user-list', component: UserListComponent
    }, {
      path: 'profile-list', component: ProfileComponent
    }, {
      path: 'product-categories', component: ProductCategoryComponent
    }, {
      path: 'divisions', component: DivisionListComponent
    }, {
      path: 'districts', component: DistrictListComponent
    }, {
      path: 'police-stations', component: PoliceStationListComponent
    }, {
      path: 'donations', component: DonationComponent
    }, {
      path: 'inventories', component: InventoryComponent
    },]
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
