import {environment} from "../../../environments/environment";

export class Media {
  id: string;
  link: string;

  getLink():string {
    return `${environment.baseUrl}/${this.link}`;
  }
}
