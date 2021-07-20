import { Pipe, PipeTransform } from '@angular/core';
import {environment} from "../../../environments/environment";

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: string, x:number = 50, y : number = 50, returnOther: boolean = true, ...args: unknown[]): string {
    if(value) {
      return environment.apiBaseUrl + '/' + value;
    } else if (returnOther) {
      return `https://picsum.photos/${x}/${y}`;
    }
    return undefined;
  }

}
