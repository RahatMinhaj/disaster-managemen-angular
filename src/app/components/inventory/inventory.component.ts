import {Component} from '@angular/core';
import {BaseListComponentImpl} from "../../core/base-interfaces/component/base-list/base-list.component";
import {catchError, Observable} from "rxjs";
import {Inventory} from "../../models/inventory/inventory.model";
import {InventoryService} from "../../services/inventory/inventory.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {LocalStorageService} from "../../services/auth/local-storage.service";

@Component({
  selector: 'app-inventory', templateUrl: './inventory.component.html', styleUrl: './inventory.component.css'
})
export class InventoryComponent extends BaseListComponentImpl<Inventory> {
  inventoryForm: FormGroup;


  override displayedColumns: string[] = [
    'profile','productCategory', 'stockType', 'quantityType', 'quantity', 'moneyExpense'];

  quantity?: number;
  moneyExpense?: number;



  constructor(private inventoryService: InventoryService,  private formBuilder: FormBuilder, localStorage:LocalStorageService ) {
    super();
    this.inventoryForm = this.formBuilder.group({
      quantity: [''],
      moneyExpense: [''],
      profileId: [localStorage.getProfileId()]
    });
  }


  // Submit form handler
  create() {
      const model:Inventory = this.inventoryForm.value;
      this.inventoryService.save(model).pipe(
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
  }


  getData(params: any): Observable<any> {
    return this.inventoryService.getAll(params);
  }
}
