import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Login} from "../../../models/Login.model";
import {LocalStorageService} from "../../../services/auth/local-storage.service";
import Swal from "sweetalert2";
import {Me} from "../../../models/users/Me.model";
import {SingleResponseModel} from "../../../models/core/SingleResponse.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userForm: FormGroup;

  constructor(private _router: Router, private userService: UserService, private formBuilder: FormBuilder, private localStorage:LocalStorageService) {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  doLogin() {
    if (this.userForm.valid) {
      const model:Login = this.userForm.value;
      this.userService.login(model).subscribe({
        next: (response) => {
          const token = response.payload;
          this.localStorage.saveToken(token?.token ?? '');
          this.userService.getMe().subscribe({
            next: (response: SingleResponseModel<Me>) => {
              console.log('User data:', response.payload);
              this.localStorage.saveMeData(response.payload)
              // Handle user data here
            },
            error: (err) => {
              console.error('Error fetching user data:', err);
              // Handle error
            }
          });
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have been logged in successfully!',
            timer: 2000,
            showConfirmButton: false,
          });
          setTimeout(() => {
            this._router.navigate(['/admin']);
          }, 2000);
        },
        error: (err) => {
          const errorMessage = err.error?.message || 'An error occurred during login';
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: errorMessage,
          });
          console.error('Login failed', err);
        }
      });
    }
  }
}
