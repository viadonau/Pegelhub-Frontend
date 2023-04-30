import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { de } from 'date-fns/locale';
import { Subscription } from 'rxjs';
import { Measurement } from 'src/app/service/model/measurement.model';
import { Supplier } from 'src/app/service/model/supplier.model';
import { UiService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  private activatedRouteSubscription!: Subscription;
  private supplierId!: string;

  public supplierDetail!: Supplier | undefined;
  public measurements!: Measurement[];

  public chartConfig = {
    data: {},
    options: {}
  }

  constructor(
    private uiService: UiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(param => {
      this.supplierId = param['id'];
      this.loadDetailData();
    });

    this.setChartOptions();
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe();
  }

  private loadDetailData(): void {
    this.uiService.getSupplier(this.supplierId).then(data => {
      this.supplierDetail = data;
      this.loadMeasurementData('3d');
    });

    /* this.detailData = {
      pegelstelle: 'Schwedenbrücke',
      art: 'Schreibpegel und/oder Datensammler',
      ufer: 'Rechts',
      stromkilometer: 6.28,
      pnp: 152.68,
      rnw: 288,
      mw: 338,
      hsw: 402,
      hw: 573
    }; */
  }

  private loadMeasurementData(range: string = "1d"): void {
    this.uiService.getMeasurements(range).then(data => {
      this.measurements = this.convertMeasurementResponse(data);
      this.setChartData(this.measurements);
    });
  }

  public convertMeasurementResponse(data: any): Measurement[] {
    const measurements: Measurement[] = [];

    Object.entries(data).forEach(entry => {
      const id = entry[0];

      Object.entries(entry[1] as Map<any, any>).forEach(values => {
        const timestamp = values[0];
        const fields = values[1];

        measurements.push({
          id: id,
          timestamp: timestamp,
          fields: fields
        });
      })
    });

    return measurements;
  }

  private setChartData(data: Measurement[]): void {
    const documentStyle = getComputedStyle(document.documentElement);

    this.chartConfig.data = {
      labels: this.getChartLabels(data),
      datasets: [
        this.getDataSet('HSW', new Array(data.length).fill(this.supplierDetail?.hsw), '+1', documentStyle.getPropertyValue('--red-700'), 0.4),
        this.getDataSet('RNW', new Array(data.length).fill(this.supplierDetail?.rnw), false, documentStyle.getPropertyValue('--red-700'), 0.4),
        this.getDataSet('MW', new Array(data.length).fill(this.supplierDetail?.mw), false, documentStyle.getPropertyValue('--green-500'), 0.4),
        this.getDataSet('Pegel', data.map(obj => Number(obj.fields['pegel'])), false, documentStyle.getPropertyValue('--blue-500'), 0.4)
      ]
    };
  }

  private getDataSet(title: string, values: number[], fill: string | boolean, borderColor: string, tension: number): any {
    return {
      label: title,
      data: values,
      fill: fill,
      borderColor: borderColor,
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
      tension: tension
    };
  }

  private getChartLabels(data: Measurement[]): string[] {
    return data.map(obj => new Date(obj.timestamp).toLocaleDateString('de', { day: '2-digit', month: 'short' }))
  }

  private setChartOptions(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartConfig.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
}
