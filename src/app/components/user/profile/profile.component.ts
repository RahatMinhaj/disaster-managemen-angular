import {Component} from '@angular/core';
import {BaseListComponentImpl} from "../../../core/base-interfaces/component/base-list/base-list.component";
import {Profile} from "../../../models/users/Profile.model";
import {ProfileService} from "../../../services/user/profile.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenderType} from "../../../enum/GenderType.enum";
import Swal from 'sweetalert2';
import {ProfileCreationByAdmin} from "../../../models/users/ProfileCreationByAdmin.model";
import {catchError} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent extends BaseListComponentImpl<Profile> {
  createProfileForm: FormGroup;
  genderTypes = GenderType;

  override displayedColumns: string[] = ['name', 'email', 'mobileNo', 'genderType', 'dateOfBirth', 'userType', 'status'];

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {
    super();

    this.createProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      genderType: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Submit form handler
  create() {
    if (this.createProfileForm.valid) {
      const model:ProfileCreationByAdmin = this.createProfileForm.value;

      this.profileService.createProfileByAdmin(model).pipe(
        catchError((error) => {
          // Handle error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
          throw error; // Rethrow the error for further handling if needed
        })
      ).subscribe({
        next: (response) => {
          // Success notification
          Swal.fire({
            icon: 'success',
            title: 'Profile Created',
            text: 'The profile has been created successfully!',
          });
          super.ngOnInit();
          this.createProfileForm.reset();
        },
        error: (error) => {
          // Handle error from the response if necessary
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

  getData(params: any) {
    return this.profileService.getAll(params);
  }
}
