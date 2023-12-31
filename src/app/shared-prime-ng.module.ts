import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    MenubarModule,
    ProgressBarModule,
    InputTextModule,
    FieldsetModule,
    DataViewModule,
    SelectButtonModule,
    PaginatorModule,
    ToastModule,
  ],
  exports: [
    TableModule,
    CardModule,
    MenubarModule,
    ProgressBarModule,
    InputTextModule,
    FieldsetModule,
    SelectButtonModule,
    PaginatorModule, 
    ToastModule,
  ]
})
export class SharedPrimeNGModule { }