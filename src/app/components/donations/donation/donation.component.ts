import {Component} from '@angular/core';
import {BaseListComponentImpl} from "../../../core/base-interfaces/component/base-list/base-list.component";
import {Donation} from "../../../models/donation/donation.model";
import {DonationService} from "../../../services/donation/donation.service";

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent extends BaseListComponentImpl<Donation> {


  override displayedColumns: string[] = ['name', 'phone', 'donationAmount', 'transactionId'];
  constructor(
    private donationService:DonationService
  ) {

    super();

  }





  getData(params: any) {
    return this.donationService.getAll(params);
  }
}

