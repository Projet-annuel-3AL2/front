import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Address} from "../../shared/models/address.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) {
  }

  searchAddresses(address: string): Observable<Address[]> {
    return this.http.get<Address[]>(`https://nominatim.openstreetmap.org/search?q=${address}&addressdetails=1&format=json`)
      .pipe(map(addresses => addresses.map((address: any) => {
        const addr: Address = {
          house_number: address.address.house_number,
          country: address.address.country,
          postcode: address.address.postcode,
          town: address.address.town,
          road: address.address.road,
          latitude: parseFloat(address.lat),
          longitude: parseFloat(address.lon)
        }
        return addr;
      })));
  }

  getAddressFromLatLng(lat: number, long): Observable<Address> {
    return this.http.get<Address>(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&addressdetails=1&format=json`)
      .pipe(map((address: any) => {
        if (address.error) return;
        const addr: Address = {
          house_number: address.address.house_number,
          country: address.address.country,
          postcode: address.address.postcode,
          town: address.address.town,
          road: address.address.road,
          latitude: parseFloat(address.lat),
          longitude: parseFloat(address.lon)
        }
        return addr;
      }));
  }

  getAddressInfos(address: string): Observable<Address> {
    return this.http.get<Address>(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`)
      .pipe(map((address: any) => {
        const addr: Address = {
          house_number: undefined,
          country: undefined,
          postcode: undefined,
          town: undefined,
          road: undefined,
          latitude: parseFloat(address[0].lat),
          longitude: parseFloat(address[0].lon)
        }
        return addr;
      }));
  }
}
