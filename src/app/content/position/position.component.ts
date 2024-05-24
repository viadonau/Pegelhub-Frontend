import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as leaflet from 'leaflet';
import { LeafletPosition } from 'src/app/service/model/leafletPosition.model';

@Component({
    selector: 'app-position',
    templateUrl: './position.component.html',
    styleUrls: ['./position.component.scss'],
    standalone: true
})
export class PositionComponent implements AfterViewInit, OnChanges {
  @Input() suppliers: LeafletPosition[] = [];
  @Input() allowNaviation = false;

  private static readonly startPositionLongitude: number = 14.9492;
  private static readonly startPositionLatitude: number = 48.1916;

  private map!: any;

  ngAfterViewInit(): void {
    this.setUpLeafletMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setUpLeafletMap();
  }

  private setUpLeafletMap(){
    if (!this.map) {
      this.map = leaflet.map("positionMap",{
        center: [ PositionComponent.startPositionLatitude, PositionComponent.startPositionLongitude],
        zoom: 8
      });

      const tiles = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

      this.suppliers.forEach(supplier=>{
        if (supplier) {
          const marker = leaflet.marker([supplier.latitude, supplier.longitude],{
            title: supplier.title
          });

          marker.bindPopup(`<b>${supplier.title}</b>`).openPopup();
          marker.addTo(this.map)
        }
      });

      tiles.addTo(this.map);
    }
  }

}
