import {Injectable} from '@angular/core';
import {CommonService} from "../../core/base-interfaces/service/CommonService";
import {environment} from "../../environments/environment";
import {DONATION, SEPARATOR} from "../../Utils/constants/ApiConstants";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseModel} from "../../models/core/Response.model";
import {Donation} from "../../models/donation/donation.model";

@Injectable({
  providedIn: 'root'
})
export class DonationService implements CommonService<Donation> {

  private DONATION_API_URL = `${environment.apiUrl}${SEPARATOR}${DONATION}`;

  constructor(private http: HttpClient) {
  }

  getAll(params?: {
    [key: string]: any; page?: number; size?: number; sort?: string;
  }): Observable<ResponseModel<Donation>> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }

    return this.http.get<ResponseModel<Donation>>(this.DONATION_API_URL, {params: httpParams});
  }

  getById(id: string): Observable<ResponseModel<Donation>> {
    return this.http.get<ResponseModel<Donation>>(`${this.DONATION_API_URL}${SEPARATOR}${id}`);
  }

  save(model: Donation): Observable<ResponseModel<Donation>> {
    return this.http.post<ResponseModel<Donation>>(this.DONATION_API_URL, model);
  }

  update(id: string, model: Donation): Observable<ResponseModel<Donation>> {
    return this.http.put<ResponseModel<Donation>>(`${this.DONATION_API_URL}${SEPARATOR}${id}`, model);
  }

  deleteById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.DONATION_API_URL}${SEPARATOR}${id}`);
  }
}
