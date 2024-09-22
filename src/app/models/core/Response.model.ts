import {Pageable} from "./pageable.model";

export interface ResponseModel<T> {
  nonce?: number;
  status?: number;
  message?: string;
  error?:string;
  pageable:Pageable
  payload:[T]
}
