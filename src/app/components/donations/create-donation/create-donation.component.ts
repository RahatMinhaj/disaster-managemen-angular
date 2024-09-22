import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DonationService} from "../../../services/donation/donation.service";
import {Donation} from "../../../models/donation/donation.model";
import {catchError} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.component.html',
  styleUrl: './create-donation.component.css'
})
export class CreateDonationComponent {
  donationForm: FormGroup;

  constructor(
    private donationService: DonationService,
    private fb: FormBuilder) {

    this.donationForm = this.fb.group({
      name: ['' ],
      phone: [''],
      donationAmount: [''],
      transactionId: [''],
    });
  }

  create() {
    if (this.donationForm.valid) {
      const model:Donation = this.donationForm.value;
      this.donationService.save(model).pipe(
        catchError((error) => {
          // Handle error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
          throw error;
        })
      ).subscribe({
        next: (response) => {
          // Success notification
          Swal.fire({
            icon: 'success',
            title: 'Donation Successful!',
            text: 'Thanks for donate!',
          });
        },
        error: (error) => {
          // Handle error from the response if necessary
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Failed to Donate',
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
