import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {DISTRICT, SEPARATOR} from "../../../Utils/constants/ApiConstants";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseModel} from "../../../models/core/Response.model";
import {CommonService} from "../../../core/base-interfaces/service/CommonService";
import {DistrictDto} from "../../../models/utilities/district.model";

@Injectable({
  providedIn: 'root'
})
export class DistrictService implements CommonService<DistrictDto>{

  private DISTRICT_API_URL = `${environment.apiUrl}${SEPARATOR}${DISTRICT}`;
  constructor(
    private http: HttpClient
  ) {
  }

  getAll(params?: {
    [key: string]: any;
    page?: number;
    size?: number;
    sort?: string;
  }): Observable<ResponseModel<DistrictDto>> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }

    return this.http.get<ResponseModel<DistrictDto>>(this.DISTRICT_API_URL, { params: httpParams });
  }

  getById(id: string): Observable<ResponseModel<DistrictDto>> {
    return this.http.get<ResponseModel<DistrictDto>>(`${this.DISTRICT_API_URL}${SEPARATOR}${id}`);
  }

  save(model: DistrictDto): Observable<ResponseModel<DistrictDto>> {
    return this.http.post<ResponseModel<DistrictDto>>(this.DISTRICT_API_URL, model);
  }

  update(id: string, model: DistrictDto): Observable<ResponseModel<DistrictDto>> {
    return this.http.put<ResponseModel<DistrictDto>>(`${this.DISTRICT_API_URL}${SEPARATOR}${id}`, model);
  }

  deleteById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.DISTRICT_API_URL}${SEPARATOR}${id}`);
  }
}
