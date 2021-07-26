import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {latLng, LeafletMouseEvent, Map, MapOptions, tileLayer} from "leaflet";
import * as L from "leaflet";

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit, AfterViewChecked {

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
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }

  onClickMap($event: LeafletMouseEvent) {
    console.log($event.latlng)
  }
}
