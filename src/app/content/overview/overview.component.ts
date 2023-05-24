import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from 'src/app/service/model/supplier.model';
import { QueryService } from 'src/app/service/query.service';
import { UiService } from 'src/app/service/ui.service';





@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
 

})
export class OverviewComponent implements OnInit {
<<<<<<< HEAD
 supplier: Supplier[] = [];
  gfg: any[]
  gfg2: any[]
  p: number = 1;
  public display: number = 1;
  first: number = 0;
  rows: number = 10;

  onPageChange(event: { first: number; rows: number; }) {
      this.first = event.first;
      this.rows = event.rows;
  }

   
 

  constructor(
    private uiService: UiService,
    private router: Router
  ) {

    this.gfg = [
      {label:"GRID", value: "1", icon: "pi pi-th-large" },
     ];

     this.gfg2 = [
      {label:"TABLE", value: "2", icon: "pi pi-table" },
     ];

    

   }
=======
  supplier: Supplier[] = [];
  public displayMode: ("table" | "tile" | "mini" | "map") = 'table';
  

  constructor(
    private uiService: UiService,
    private router: Router,
    private route: ActivatedRoute,
    private queryService: QueryService
  ) { }
>>>>>>> d35a6bf34961b37a29a7c954d90bc774f444b74b

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.displayMode = this.queryService.getMode();       
      }
    );
    this.loadSupplier();
  }

  navigateToDetail(id: string): void {
    this.router.navigate(['/', 'detail', id]);
  }

  private loadSupplier(): void {
    this.uiService.getSuppliers().then((data: any) => this.supplier = data.slice(0, 12));
  }

  changeDisplay(displayOption: number): void {
    this.display = displayOption;
  }

 

}
