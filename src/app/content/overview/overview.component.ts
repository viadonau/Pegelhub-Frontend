import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/service/model/supplier.model';
import { UiService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  supplier: Supplier[] = [];

  constructor(
    private uiService: UiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSupplier();
  }

  navigateToDetail(id: number): void {
    this.router.navigate(['/', 'detail', id]);
  }

  private loadSupplier(): void {
    this.uiService.getSuppliers().then((data: any) => this.supplier = data);
  }
}
