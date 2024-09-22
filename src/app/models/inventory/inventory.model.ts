import {StockType} from "../../enum/StockType.enum";
import {ProductCategory} from "../utilities/ProductCategory.model";
import {Profile} from "../users/Profile.model";
import {QuantityType} from "../../enum/QuantityType.enum";

export interface Inventory{
  time?: Date;
  quantity?: number;
  quantityType?:QuantityType;
  moneyExpense?: number;
  stockType?: StockType;
  productCategory?: ProductCategory;
  profileId?:string;
  profile?: Profile;
}
