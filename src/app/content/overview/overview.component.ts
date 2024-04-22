import {Component, DestroyRef, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeafletPosition } from 'src/app/service/model/leafletPosition.model';
import { Supplier } from 'src/app/service/model/supplier.model';
import { QueryService } from 'src/app/service/query.service';
import { UiService } from 'src/app/service/ui.service';
import { PaginatorState } from "primeng/paginator";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  supplier: Supplier[] = [];
  public displayMode: ("table" | "tile" | "mini" | "map") = 'table';
  gfg: any[];
  gfg2: any[];
  gfg3: any[];

  public display: number = 1;
  first: number = 0;
  rows: number = 10;
  public positions!: LeafletPosition[];
  public miniMode: boolean = false;

  onPageChange(event: PaginatorState) {
      this.first = event.first ?? 0;
      this.rows = event.rows ?? 0;
  }

  constructor(
    private uiService: UiService,
    private router: Router,
    private route: ActivatedRoute,
    private queryService: QueryService,
    private destroyRef: DestroyRef
  ) {

    this.gfg = [
      {
        label:"TABLE",
        value: "1",
        icon: "pi pi-table"
      },
     ];

    this.gfg2 = [
      {
        label:"GRID",
        value: "2",
        icon: "pi pi-th-large"
      },
     ];

     this.gfg3 = [
      {
        label:"MAP",
        value: "3",
        icon: "pi pi-map"
      },
     ];
   }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        this.displayMode = this.queryService.getMode();
        this.miniMode = false;

        switch(this.displayMode){
          case "map":
            this.display = 3;
            break;
          case 'table':
            this.display = 1;
            break;
          case 'tile':
            this.display = 2;
            break;
          case 'mini':
            this.miniMode = true;
            break;
        }
      }
    );
    this.loadSupplier();
  }

  navigateToDetail(id: string): void {
    this.router.navigate(['/', 'detail', id]);
  }

  private loadSupplier(): void {
    this.uiService.getSuppliers().then((data: any) => {
      this.supplier = data.slice(0, 12);
      if (data) {
        this.positions = data.map((supplier: any) => {
          return {
            supplierId: supplier.id,
            title: supplier.stationName,
            latitude: supplier.stationWaterLatitude,
            longitude: supplier.stationWaterLongitude
          }
        });
      }
    });
  }

  getCombinedValue(entry: Supplier): number {
    return entry.lastValue ? (100 / entry.hsw * entry.lastValue) : 0;
  }

  changeDisplay(displayOption: number): void {
    this.display = displayOption;
  }
}
