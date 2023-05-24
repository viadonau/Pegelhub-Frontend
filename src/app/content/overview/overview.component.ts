import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/service/model/supplier.model';
import { UiService } from 'src/app/service/ui.service';





@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
 

})
export class OverviewComponent implements OnInit {
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

  ngOnInit(): void {
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
