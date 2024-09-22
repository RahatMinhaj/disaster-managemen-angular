import {Injectable} from '@angular/core';
import {DivisionDto} from "../../../models/utilities/division.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {DIVISION, SEPARATOR} from "../../../Utils/constants/ApiConstants";
import {CommonService} from "../../../core/base-interfaces/service/CommonService";
import {Observable} from "rxjs";
import {ResponseModel} from "../../../models/core/Response.model";

@Injectable({
  providedIn: 'root'
})
export class DivisionService implements CommonService<DivisionDto> {
  private DIVISION_API_URL = `${environment.apiUrl}${SEPARATOR}${DIVISION}`;
  constructor(
    private http: HttpClient
  ) {
  }

  getAll(params?: {
    [key: string]: any;
    page?: number;
    size?: number;
    sort?: string;
  }): Observable<ResponseModel<DivisionDto>> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }

    return this.http.get<ResponseModel<DivisionDto>>(this.DIVISION_API_URL, { params: httpParams });
  }

  getById(id: string): Observable<ResponseModel<DivisionDto>> {
    return this.http.get<ResponseModel<DivisionDto>>(`${this.DIVISION_API_URL}${SEPARATOR}${id}`);
  }

  save(model: DivisionDto): Observable<ResponseModel<DivisionDto>> {
    return this.http.post<ResponseModel<DivisionDto>>(this.DIVISION_API_URL, model);
  }

  update(id: string, model: DivisionDto): Observable<ResponseModel<DivisionDto>> {
    return this.http.put<ResponseModel<DivisionDto>>(`${this.DIVISION_API_URL}${SEPARATOR}${id}`, model);
  }

  deleteById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.DIVISION_API_URL}${SEPARATOR}${id}`);
  }
}
