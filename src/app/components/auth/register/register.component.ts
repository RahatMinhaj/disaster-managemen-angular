import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {catchError} from "rxjs";
import Swal from "sweetalert2";
import {User} from "../../../models/users/User.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userForm: FormGroup;

  constructor(
    private  userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  createUser() {
    if (this.userForm.valid) {
      const model:User = this.userForm.value;
      this.userService.save(model).pipe(
        catchError((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User Registration failed!',
          });
          throw error.message;
        })
      ).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'User Created',
            text: 'The User has been created successfully!',
          });
          this.userForm.reset();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Failed to create profile',
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
      });
    }
  }

}
