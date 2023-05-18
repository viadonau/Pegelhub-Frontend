import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as leaflet from 'leaflet';
import { LeafletPosition } from 'src/app/service/model/leafletPosition.model';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements AfterViewInit, OnChanges {
 
  @Input("")
  suppliers!: LeafletPosition[];

  private map!: any;

  ngAfterViewInit(): void {
    this.setUpLeafletMap();
  } 

  ngOnChanges(changes: SimpleChanges): void {
    this.setUpLeafletMap();
  }

  private setUpLeafletMap(){
    if(!this.map){
      this.map = leaflet.map("positionMap",{
        center: [ 48.1916, 14.9492],
        zoom: 8
      });

      const tiles = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

      tiles.addTo(this.map);
    }
  }
  
}
