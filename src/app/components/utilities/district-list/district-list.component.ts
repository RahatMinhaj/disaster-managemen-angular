import {Component} from '@angular/core';
import {BaseListComponentImpl} from "../../../core/base-interfaces/component/base-list/base-list.component";
import {DistrictDto} from "../../../models/utilities/district.model";
import {Observable} from "rxjs";
import {DistrictService} from "../../../services/utilities/district/district.service";

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.css']
})
export class DistrictListComponent extends BaseListComponentImpl<DistrictDto>{


  override displayedColumns: string[] = ['name', 'geoCode', 'latitude', 'longitude'];
  constructor(private districtService: DistrictService) {
    super();
  }

  getData(params: any): Observable<any> {
    return this.districtService.getAll(params);
  }



}
