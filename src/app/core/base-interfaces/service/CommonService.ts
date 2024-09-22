import {Observable} from "rxjs";
import {ResponseModel} from "../../../models/core/Response.model";

export interface CommonService<T> {

  save(model: T): Observable<ResponseModel<T>>;

  getById(id: string): Observable<ResponseModel<T>>;

  getAll(params?: {
    [key: string]: any;
    page?: number;
    size?: number;
    sort?: string;
  }): Observable<ResponseModel<T>>;

  update(id: string, model: T): Observable<ResponseModel<T>>;

  deleteById(id: string): Observable<void>;
}
