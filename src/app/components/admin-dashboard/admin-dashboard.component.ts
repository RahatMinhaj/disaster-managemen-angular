import {Component} from '@angular/core';
import {LocalStorageService} from "../../services/auth/local-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private router:Router) {
  }

  logout(){
    LocalStorageService.logOut();
    this.router.navigate(['/']);
  }
}
