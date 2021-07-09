import {Category} from "./category.model";

export class Search_eventModel {
  longitude: number;
  latitude: number;
  startDate: Date;
  endDate: Date;
  category: Category;
  range: number;
}
