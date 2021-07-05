import {Category} from "./category.model";

export class RechercheEventModel {
  longitude: number;
  latitude: number;
  startDate: Date;
  endDate: Date;
  category: Category;
  range: number;
}
