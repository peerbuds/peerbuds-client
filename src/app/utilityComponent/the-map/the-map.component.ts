import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { marker } from "./marker";

@Component({
  selector: 'app-the-map',
  templateUrl: './the-map.component.html',
  styleUrls: ['./the-map.component.scss']
})
export class TheMapComponent implements OnInit {

  @Output()
  getMarker: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
  lat: string;
  lng: string;

  public m: any;

  zoomLevel = 2;

  panning = true;

  ngOnInit() {
    this.m = {};
  }

  autoCompleteCallback1(selectedData: any) {
    console.log(selectedData);
    this.lat = selectedData.geometry.location.lat;
    this.lng = selectedData.geometry.location.lng;
    this.zoomLevel = 18;
    this.m['lat'] = selectedData.geometry.location.lat;
    this.m['lng'] = selectedData.geometry.location.lng;

  }
  // google maps zoom level
  zoom: number = 8;


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event) {
    console.log($event.coords.lat + " " + $event.coords.lng);
    this.m['lat'] = $event.coords.lat;
    this.m['lng'] = $event.coords.lng;
    this.getMarker.emit(this.m);
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
