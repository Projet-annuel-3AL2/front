import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {latLng, Map, MapOptions, tileLayer} from "leaflet";
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewChecked {
  @Input()
  longitude: number;
  @Input()
  latitude: number;
  @Input()
  zoomControl: boolean = true;
  @Input()
  dragging: boolean = true;
  map: Map;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    this.map.invalidateSize();
    this.map.panTo(latLng(this.latitude, this.longitude));
  }

  getOptions(): MapOptions {
    return {
      zoomControl: this.zoomControl,
      dragging: this.dragging,
      center: latLng(this.latitude, this.longitude),
      zoom: 12,
      layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18})]
    }
  }

  onMapReady(map: Map): void {
    this.map = map;
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    L.marker([this.latitude, this.longitude], {icon: myIcon}).addTo(this.map);
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }
}
