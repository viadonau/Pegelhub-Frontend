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
  supplier: Supplier[] = [];
  public displayMode: ("table" | "tile" | "mini" | "map") = 'table';
  

  constructor(
    private uiService: UiService,
    private router: Router,
    private route: ActivatedRoute,
    private queryService: QueryService
  ) { }

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
}
