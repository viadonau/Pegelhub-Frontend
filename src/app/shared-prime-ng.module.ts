import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    MenubarModule,
    ProgressBarModule,
    InputTextModule,
    FieldsetModule
  ],
  exports: [
    TableModule,
    CardModule,
    MenubarModule,
    ProgressBarModule,
    InputTextModule,
    FieldsetModule
  ]
})
export class SharedPrimeNGModule { }