import { Component, OnInit } from '@angular/core';

interface Supplier {
  id: number;
  stationNameShort: string;
  lastValue?: number;
  lastValueFrom?: Date;
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  supplier: Supplier[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.supplier = [];
    let idx = 0;
    ['Achleiten', 'Wilhering', 'Mauthausen', 'Grein', 'Kienstock', 'Dürnstein', 'Korneuburg', 'Schwedenbrücke', 'Wildungsmauer', 'Thebnerstraßl'].forEach(stationName => {
      this.supplier.push({
        id: idx++,
        stationNameShort: stationName,
        lastValue: Math.random() * 5,
        lastValueFrom: new Date(2023, 3, this.getRandomNumber(30), this.getRandomNumber(24), this.getRandomNumber(60))
      });
    });
  }

  private getRandomNumber(factor: number): number {{
    return Math.ceil(Math.random() * factor);
  }}
}
