import {Category} from "./category.model";

export class RechercheEventModel {
  longitude: number;
  latitude: number;
  dateStart: Date;
  dateEnd: Date;
  category: Category;
}
