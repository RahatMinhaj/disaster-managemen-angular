import {Injectable} from '@angular/core';
import {CommonService} from "../../core/base-interfaces/service/CommonService";
import {User} from "../../models/users/User.model";
import {environment} from "../../environments/environment";
import {LOGIN, ME, REGISTRATION, SEPARATOR, USER} from "../../Utils/constants/ApiConstants";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseModel} from "../../models/core/Response.model";
import {Login} from "../../models/Login.model";
import {JwtToken} from "../../models/core/JwtToken.model";
import {SingleResponseModel} from "../../models/core/SingleResponse.model";
import {Me} from "../../models/users/Me.model";

@Injectable({
  providedIn: 'root'
})
export class UserService implements CommonService<User> {
  private USER_API_URL = `${environment.apiUrl}${SEPARATOR}${USER}`;
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
    sort?: string }

  ): Observable<ResponseModel<User>> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }
    return this.http.get<ResponseModel<User>>(this.USER_API_URL, { params: httpParams });
  }

  getById(id: string): Observable<ResponseModel<User>> {
    return this.http.get<ResponseModel<User>>(`${this.USER_API_URL}${SEPARATOR}${id}`);
  }

  save(model: User): Observable<ResponseModel<User>> {
    return this.http.post<ResponseModel<User>>(`${this.USER_API_URL}${SEPARATOR}${REGISTRATION}`, model);
  }

  login(model: Login): Observable<SingleResponseModel<JwtToken>> {
    return this.http.post<SingleResponseModel<JwtToken>>(
      `${this.USER_API_URL}${SEPARATOR}${LOGIN}`,
      model
    );
  }

  getMe(): Observable<SingleResponseModel<Me>> {
    return this.http.get<SingleResponseModel<Me>>(
      `${this.USER_API_URL}${SEPARATOR}${ME}`
    );
  }


  update(id: string, model: User): Observable<ResponseModel<User>> {
    return this.http.put<ResponseModel<User>>(`${this.USER_API_URL}${SEPARATOR}${id}`, model);
  }
}
