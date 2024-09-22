import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Crisis} from '../../../models/disaster/Crisis.model';
import {CrisisService} from "../../../services/crisis/crisis.service";
import {catchError} from "rxjs";
import Swal from "sweetalert2";
import {GenderType} from "../../../enum/GenderType.enum";
import {Severity} from "../../../enum/Severity.enum";

@Component({
  selector: 'app-crisis-creation',
  templateUrl: './crisis-creation.component.html',
  styleUrls: ['./crisis-creation.component.css']
})
export class CrisisCreationComponent{
  crisisForm: FormGroup;
  severity = Severity;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CrisisCreationComponent>,
    private crisService:CrisisService
  ) {
    this.crisisForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      requiredHelp: [false],
      severity: [''],
      location: [''],
      address: [''],
      status: [''],
      profileDtos: [[]]
    });
  }

  create() {
    if (this.crisisForm.valid) {
      const model:Crisis = this.crisisForm.value;

      this.crisService.save(model).pipe(
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
            text: 'Your crisis has been listed successfully!',
          });
          window.location.reload();
        },
        error: (error) => {
          // Handle error from the response if necessary
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Failed to create crisis',
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

  protected readonly genderTypes = GenderType;
}
