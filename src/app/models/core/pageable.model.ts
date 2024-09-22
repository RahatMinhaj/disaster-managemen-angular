export interface Pageable {
  pageNumber?:number;
  pageSize?:number;
  totalPages?:number;
  totalElements?:number;
  first?:boolean;
  last?:boolean
}
