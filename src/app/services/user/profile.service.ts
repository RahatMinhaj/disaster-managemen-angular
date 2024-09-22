import {Injectable} from '@angular/core';
import {CommonService} from "../../core/base-interfaces/service/CommonService";
import {Profile} from "../../models/users/Profile.model";
import {Observable} from "rxjs";
import {ResponseModel} from "../../models/core/Response.model";
import {environment} from "../../environments/environment";
import {PROFILE, PROFILE_CREATE_BY_ADMIN, SEPARATOR} from "../../Utils/constants/ApiConstants";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProfileCreationByAdmin} from "../../models/users/ProfileCreationByAdmin.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements CommonService<Profile>{

private PROFILE_API_URL = `${environment.apiUrl}${SEPARATOR}${PROFILE}`;
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
  }): Observable<ResponseModel<Profile>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }
    return this.http.get<ResponseModel<Profile>>(this.PROFILE_API_URL, { params: httpParams });
  }

  getAllForDropdownListForVolunteer(params?: {
  }): Observable<ResponseModel<Profile>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('userType', 'VOLUNTEER');
    httpParams = httpParams.append('status', 'APPROVED');

    return this.http.get<ResponseModel<Profile>>(this.PROFILE_API_URL, { params: httpParams });
  }


  getById(id: string): Observable<ResponseModel<Profile>> {
    return this.http.get<ResponseModel<Profile>>(`${this.PROFILE_API_URL}${SEPARATOR}${id}`);
  }

  save(model: Profile): Observable<ResponseModel<Profile>> {
    return this.http.post<ResponseModel<Profile>>(`${this.PROFILE_API_URL}`, model);
  }
  createProfileByAdmin(model: ProfileCreationByAdmin): Observable<ResponseModel<Profile>> {
    return this.http.post<ResponseModel<Profile>>(`${this.PROFILE_API_URL}${SEPARATOR}${PROFILE_CREATE_BY_ADMIN}`, model);
  }


  update(id: string, model: Profile): Observable<ResponseModel<Profile>> {
    return this.http.put<ResponseModel<Profile>>(`${this.PROFILE_API_URL}${SEPARATOR}${id}`, model);

  }
}
