import {environment} from "../../../environments/environment";

export class Media {
  id: string;
  link: string;

  public getLink():string {
    return `${environment.baseUrl}/${this.link}`;
  }
}
