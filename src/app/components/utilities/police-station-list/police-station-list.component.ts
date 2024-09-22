import {Component} from '@angular/core';
import {BaseListComponentImpl} from "../../../core/base-interfaces/component/base-list/base-list.component";
import {PoliceStationDto} from "../../../models/utilities/policeStation.model";
import {PoliceStationService} from "../../../services/utilities/policeStation/police-station.service";

@Component({
  selector: 'app-police-station-list',
  templateUrl: './police-station-list.component.html',
  styleUrls: ['./police-station-list.component.css']
})
export class PoliceStationListComponent extends BaseListComponentImpl<PoliceStationDto> {

  override displayedColumns: string[] = ['name', 'geoCode', 'latitude', 'longitude'];
  constructor(private policeStationService: PoliceStationService) {
    super();
  }

  getData(params: any) {
    return this.policeStationService.getAll(params);
  }
}


