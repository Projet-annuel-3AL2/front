import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  searchAddresses(address: string): Observable<unknown[]>{
    return this.http.get<unknown[]>(`https://nominatim.openstreetmap.org/search?q=${address}&addressdetails=1&format=json`);
  }

  getAddressFromLatLng(lat:number,long): Observable<unknown>{
    return this.http.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&addressdetails=1&format=json`);
  }

  getAddressInfos(address: string): Observable<unknown>{
    return this.http.get<unknown>(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
  }
}
