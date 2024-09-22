import {Component} from '@angular/core';
import {BaseListComponentImpl} from "../../../core/base-interfaces/component/base-list/base-list.component";
import {ProductCategory} from "../../../models/utilities/ProductCategory.model";
import {ProductCategoryService} from "../../../services/utilities/product-category.service";

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css'
})
export class ProductCategoryComponent extends BaseListComponentImpl<ProductCategory> {

  override displayedColumns: string[] = ['name', 'description'];

  constructor(private productCategoryService: ProductCategoryService) {
    super();
  }

  getData(params: any) {
    return this.productCategoryService.getAll(params);
  }

}
