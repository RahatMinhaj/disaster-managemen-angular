import {Component, Inject, OnInit} from '@angular/core';
import {Crisis} from "../../../models/disaster/Crisis.model";
import {CrisisService} from "../../../services/crisis/crisis.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProfileService} from "../../../services/user/profile.service";
import {Profile} from "../../../models/users/Profile.model";
import {VolunteerAssignment} from "../../../models/users/VolunteerAsignment.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrl: './crisis-detail.component.css'
})
export class CrisisDetailComponent implements OnInit {
  selectedProfileIds: string[] = [];

  public crisis?: Crisis;
  public profiles?:Profile[];
  volunteerAssignmentObj?: VolunteerAssignment;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { crisisId: string }, // Injecting the data
    private crisisService: CrisisService,
    private profileService: ProfileService
    ) {
  }

  ngOnInit(): void {
    console.log("on init print ", this.data.crisisId)
    this.getCrisis(this.data.crisisId)
    this.getVolunteers();
  }

  getCrisis(crisisId: string): void {
    this.crisisService.getById(crisisId).subscribe({
      next: response => {
        if (response.payload) {
          // Cast the payload to Crisis type
          console.log(response.payload)
          this.crisis = response.payload as Crisis; // Type assertion
        } else {
          console.error('No crisis data found');
        }
      },
      error: error => {
        console.error('Error fetching data:', error);
      }
    });
  }

  getVolunteers(): void {
    this.profileService.getAllForDropdownListForVolunteer().subscribe({
      next: response => {
        if (response.payload) {
          // Cast the payload to Crisis type
          this.profiles = response.payload; // Type assertion
        } else {
          console.error('No Profiles data found');
        }
      },
      error: error => {
        console.error('Error fetching data:', error);
      }
    });
  }


  onClose(): void {
    // Logic to close the dialog, if needed
  }

  volunteerAssignment(crisisId: string | undefined): void {
    // Show confirmation before proceeding
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to assign the selected volunteers?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, assign them!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with the API call
        this.volunteerAssignmentObj = {
          volunteerIds: this.selectedProfileIds
        };

        this.crisisService.volunteerAssignment(crisisId, this.volunteerAssignmentObj).subscribe({
          next: response => {
            if (response.payload) {
              this.profiles = response.payload;

              // Show success message
              Swal.fire(
                'Assigned!',
                'Volunteers have been successfully assigned.',
                'success'
              );
            } else {
              console.error('No Profiles data found');

              // Show an alert if no profiles are found
              Swal.fire(
                'Error!',
                'No profiles data found.',
                'error'
              );
            }
          },
          error: error => {
            console.error('Error fetching data:', error);

            // Show error alert
            Swal.fire(
              'Error!',
              'An error occurred while assigning volunteers.',
              'error'
            );
          }
        });
      }
    });
  }



}
