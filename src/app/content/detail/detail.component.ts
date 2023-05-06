import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from "highcharts/highstock";
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

  Highcharts: typeof Highcharts = Highcharts;

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
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe();
  }

  private loadDetailData(): void {
    this.uiService.getSupplier(this.supplierId).then(data => {
      this.supplierDetail = data;
      this.loadMeasurementData('5d');
    });
  }

  private loadMeasurementData(range: string = "1d"): void {
    this.uiService.getMeasurements(range).then(data => {
      this.measurements = this.convertMeasurementResponse(data);
      this.initChart(this.measurements);
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

  private initChart(pData: Measurement[]): void {
    // @ts-ignore
    Highcharts.chart('container', {
      navigator: {
        enabled: true
      },
      chart: {
        zoomType: 'x',
        height: 'auto'
      },
      title: {
        text: 'Messdaten',
        align: 'left'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: [
        {
          title: {
            text: "Pegel"
          },
          plotLines: this.getChartPlotlines(this.supplierDetail)
        }
      ],
      legend: {
        enabled: true
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              // @ts-ignore
              [0, Highcharts.getOptions().colors[0]],
              // @ts-ignore
              [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          }
        }
      },
      series: [
        {
          threshold: 0,
          fillColor: 'transparent',
          type: 'spline',
          name: 'Pegel',
          data: pData.map(entry => {
            return [new Date(entry.timestamp).getTime(), (entry.fields as any).pegel];
          }).sort((a, b) => a[0] - b[0])
        }
      ]
    });
  }

  private getChartPlotlines(detail?: Supplier): any[] {
    if(detail == null){
      return [];
    }
    
    return [
      {
        label: {
          text: 'RNW - '.concat(String(detail.rnw))
        },
        color: 'red',
        value: detail.rnw
      },
      {
        label: {
          text: 'MW - '.concat(String(detail.mw))
        },
        color: 'blue',
        value: detail.mw
      },
      {
        label: {
          text: 'HSW - '.concat(String(detail.hsw))
        },
        color: 'red',
        value: detail.hsw
      }
    ]
  }

  /* private getDataSet(title: string, values: number[], fill: string | boolean, borderColor: string, tension: number): any {
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
  } */
}
