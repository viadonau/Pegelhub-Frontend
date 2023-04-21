import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    MenubarModule,
    ProgressBarModule
  ],
  exports: [
    TableModule,
    CardModule,
    MenubarModule,
    ProgressBarModule
  ]
})
export class SharedPrimeNGModule { }