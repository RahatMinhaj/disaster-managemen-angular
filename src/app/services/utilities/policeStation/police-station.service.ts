import {Injectable} from '@angular/core';
import {CommonService} from "../../../core/base-interfaces/service/CommonService";
import {environment} from "../../../environments/environment";
import {POLICE_STATION, SEPARATOR} from "../../../Utils/constants/ApiConstants";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseModel} from "../../../models/core/Response.model";
import {PoliceStationDto} from "../../../models/utilities/policeStation.model";

@Injectable({
  providedIn: 'root'
})
export class PoliceStationService implements CommonService<PoliceStationDto> {
  private POLICE_STATION_API_URL = `${environment.apiUrl}${SEPARATOR}${POLICE_STATION}`;
  constructor(
    private http: HttpClient
  ) {
  }

  getAll(params?: {
    [key: string]: any;
    page?: number;
    size?: number;
    sort?: string;
  }): Observable<ResponseModel<PoliceStationDto>> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }

    return this.http.get<ResponseModel<PoliceStationDto>>(this.POLICE_STATION_API_URL, { params: httpParams });
  }

  getById(id: string): Observable<ResponseModel<PoliceStationDto>> {
    return this.http.get<ResponseModel<PoliceStationDto>>(`${this.POLICE_STATION_API_URL}${SEPARATOR}${id}`);
  }

  save(model: PoliceStationDto): Observable<ResponseModel<PoliceStationDto>> {
    return this.http.post<ResponseModel<PoliceStationDto>>(this.POLICE_STATION_API_URL, model);
  }

  update(id: string, model: PoliceStationDto): Observable<ResponseModel<PoliceStationDto>> {
    return this.http.put<ResponseModel<PoliceStationDto>>(`${this.POLICE_STATION_API_URL}${SEPARATOR}${id}`, model);
  }

  deleteById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.POLICE_STATION_API_URL}${SEPARATOR}${id}`);
  }
}
