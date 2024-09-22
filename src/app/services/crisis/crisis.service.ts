import {Injectable} from '@angular/core';
import {CommonService} from "../../core/base-interfaces/service/CommonService";
import {DivisionDto} from "../../models/utilities/division.model";
import {Crisis} from "../../models/disaster/Crisis.model";
import {environment} from "../../environments/environment";
import {CRISIS, SEPARATOR, VOLUNTEER_ASSIGNMENT} from "../../Utils/constants/ApiConstants";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseModel} from "../../models/core/Response.model";
import {VolunteerAssignment} from "../../models/users/VolunteerAsignment.model";
import {Profile} from "../../models/users/Profile.model";

@Injectable({
  providedIn: 'root'
})
export class CrisisService implements CommonService<Crisis> {
  private CRISIS_API_URL = `${environment.apiUrl}${SEPARATOR}${CRISIS}`;

  constructor(
    private http: HttpClient
  ) {
  }

  deleteById(id: string): Observable<void> {
    // @ts-ignore
    return undefined;
  }

  getAll(params?: {
    [p: string]: any;
    page?: number;
    size?: number;
    sort?: string
  }): Observable<ResponseModel<Crisis>> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }

    return this.http.get<ResponseModel<DivisionDto>>(this.CRISIS_API_URL, { params: httpParams });
  }

  getById(id: string): Observable<ResponseModel<Crisis>> {
    return this.http.get<ResponseModel<DivisionDto>>(`${this.CRISIS_API_URL}${SEPARATOR}${id}`);
  }

  save(model: Crisis): Observable<ResponseModel<Crisis>> {
    return this.http.post<ResponseModel<DivisionDto>>(this.CRISIS_API_URL, model);
  }

  volunteerAssignment(crisisId: string | undefined, assignment: VolunteerAssignment): Observable<ResponseModel<Profile>> {
    return this.http.put<ResponseModel<Profile>>(`${this.CRISIS_API_URL}${SEPARATOR}${VOLUNTEER_ASSIGNMENT}${SEPARATOR}${crisisId}`, assignment);
  }

  update(id: string, model: Crisis): Observable<ResponseModel<Crisis>> {
    // @ts-ignore
    return undefined;
  }

}

