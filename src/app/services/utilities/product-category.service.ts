import {Injectable} from '@angular/core';
import {CommonService} from "../../core/base-interfaces/service/CommonService";
import {ProductCategory} from "../../models/utilities/ProductCategory.model";
import {Observable} from "rxjs";
import {ResponseModel} from "../../models/core/Response.model";
import {environment} from "../../environments/environment";
import {PRODUCT_CATEGORIES, SEPARATOR} from "../../Utils/constants/ApiConstants";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService implements CommonService<ProductCategory> {
  private PRODUCT_CATEGORY_API_URL = `${environment.apiUrl}${SEPARATOR}${PRODUCT_CATEGORIES}`;
  constructor(
    private http: HttpClient
  ) {
  }

  deleteById(id: string): Observable<void> {
    // @ts-ignore
    return undefined;
  }

  getAll(params?: {
    [key: string]: any;
    page?: number;
    size?: number;
    sort?: string
  }): Observable<ResponseModel<ProductCategory>> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }

    return this.http.get<ResponseModel<ProductCategory>>(this.PRODUCT_CATEGORY_API_URL, { params: httpParams });
  }

  getById(id: string): Observable<ResponseModel<ProductCategory>> {
    return this.http.get<ResponseModel<ProductCategory>>(`${this.PRODUCT_CATEGORY_API_URL}${SEPARATOR}${id}`);
  }

  save(model: ProductCategory): Observable<ResponseModel<ProductCategory>> {
    return this.http.post<ResponseModel<ProductCategory>>(this.PRODUCT_CATEGORY_API_URL, model);
  }

  update(id: string, model: ProductCategory): Observable<ResponseModel<ProductCategory>> {
    return this.http.put<ResponseModel<ProductCategory>>(`${this.PRODUCT_CATEGORY_API_URL}${SEPARATOR}${id}`, model);
  }
}
