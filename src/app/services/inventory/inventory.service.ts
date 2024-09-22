import {Injectable} from '@angular/core';
import {CommonService} from "../../core/base-interfaces/service/CommonService";
import {environment} from "../../environments/environment";
import {INVENTORY, SEPARATOR} from "../../Utils/constants/ApiConstants";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseModel} from "../../models/core/Response.model";
import {Inventory} from "../../models/inventory/inventory.model";

@Injectable({
  providedIn: 'root'
})
export class InventoryService implements CommonService<Inventory> {

  private INVENTORY_API_URL = `${environment.apiUrl}${SEPARATOR}${INVENTORY}`;

  constructor(private http: HttpClient) {
  }

  getAll(params?: {
    [key: string]: any; page?: number; size?: number; sort?: string;
  }): Observable<ResponseModel<Inventory>> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }

    return this.http.get<ResponseModel<Inventory>>(this.INVENTORY_API_URL, {params: httpParams});
  }

  getById(id: string): Observable<ResponseModel<Inventory>> {
    return this.http.get<ResponseModel<Inventory>>(`${this.INVENTORY_API_URL}${SEPARATOR}${id}`);
  }

  save(model: Inventory): Observable<ResponseModel<Inventory>> {
    return this.http.post<ResponseModel<Inventory>>(this.INVENTORY_API_URL, model);
  }

  update(id: string, model: Inventory): Observable<ResponseModel<Inventory>> {
    return this.http.put<ResponseModel<Inventory>>(`${this.INVENTORY_API_URL}${SEPARATOR}${id}`, model);
  }

  deleteById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.INVENTORY_API_URL}${SEPARATOR}${id}`);
  }
}
