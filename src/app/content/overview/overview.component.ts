import { Component, OnInit } from '@angular/core';
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
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.loadSupplier();
  }

  private loadSupplier(): void {
    this.uiService.getSuppliers().then(data => this.supplier = data);
  }
}
