import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from "highcharts/highstock";
import { Subscription } from 'rxjs';
import { LeafletPosition } from 'src/app/service/model/leafletPosition.model';
import { Measurement } from 'src/app/service/model/measurement.model';
import { Supplier } from 'src/app/service/model/supplier.model';
import { UiService } from 'src/app/service/ui.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PositionComponent } from '../position/position.component';
import { NgIf, DecimalPipe } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    standalone: true,
    imports: [CardModule, FieldsetModule, NgIf, PositionComponent, DecimalPipe]
})
export class DetailComponent implements OnInit, OnDestroy {
  private activatedRouteSubscription!: Subscription;
  private supplierId!: string;

  public supplierDetail!: Supplier | undefined;
  public measurements!: Measurement[];
  public prognose!: Measurement[];
  public position!: LeafletPosition;

  Highcharts: typeof Highcharts = Highcharts;

  constructor(
    private uiService: UiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(param => {
      this.supplierId = param['id'];
      this.loadDetailData();
    });
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe();
  }

  private loadDetailData(): void {
    this.uiService.getSupplier(this.supplierId).then(data => {
      this.setDetailData(data);
      this.loadMeasurementData(String(this.supplierDetail?.stationNumber), '30d');
    }).catch(() => {
      this.router.navigate(['/notfound']);
    });
  }

  public setDetailData(data: Supplier | undefined): void {
    this.supplierDetail = data;
    if (data) {
      this.position = {
        supplierId: data.id,
        title: data.stationName,
        latitude: data.stationWaterLatitude,
        longitude: data.stationWaterLongitude
      };
    }
  }

  private loadMeasurementData(stationNumber: string, range: string = "1d"): void {
    const aPromises = [];

    aPromises.push(this.uiService.getMeasurements(stationNumber, range));
    aPromises.push(this.uiService.getPrognose(stationNumber));

    Promise.all(aPromises).then(values => {
      this.measurements = this.convertMeasurementResponse(values[0]);
      this.prognose = this.convertMeasurementResponse(values[1]);

      this.initChart(this.measurements, this.prognose);
    });
  }

  public stationWaterSideFormatter(stationWaterSide: string | undefined): string | undefined {
    if (stationWaterSide == 'R') {
      return "rechts";
    } else if (stationWaterSide == 'L') {
      return "links";
    } else {
      return stationWaterSide;
    }
  }

  public convertMeasurementResponse(data: any): Measurement[] {
    const measurements: Measurement[] = [];

    data.forEach((entry: any) => {
      measurements.push({
        measurement: entry.measurement,
        timestamp: entry.timestamp,
        fields: entry.fields,
        infos: entry.infos
      });
    });

    return measurements;
  }

  private initChart(pData: Measurement[], prognose: Measurement[] = []): void {
    const data = this.prepareMeasurementsForChart(pData)

    const ys  = data.map(p => p[1]).filter(n => Number.isFinite(n));
    const dataMin = Math.min(...ys);
    const dataMax = Math.max(...ys);
    const pad = Math.max(2, (dataMax - dataMin) * 0.1);

    // @ts-ignore
    Highcharts.chart('container', {
      title: {
        text: 'Messdaten',
        align: 'left',
        style: {
          color: "#ffff"
        }
      },
      chart: {
        zoomType: 'x',
        height: 'auto',
      },

      xAxis: {
        type: 'datetime',
        tickColor: "#ffff",
        labels: {
          style: {
            color: "#ffff"
          }
        },
        dateTimeLabelFormats: {
          day: '%d. %b',
        },
        title: {
          text: "Zeitpunkt",
          style: {
            color: "#ffff"
          }
        }
      },
      yAxis: [{
        title: {
          text: 'Pegel',
          style: {
            color: '#ffff'
          }
        },
        min: dataMin - pad,
        startOnTick: true,
        endOnTick: true,
        labels: { style: { color: '#ffff' } },
      }],
      rangeSelector: {
        enabled: true,
        allButtonsEnabled: true,
        selected: 0,
        labelStyle: {
          color: '#fffff'
        },

        buttonTheme: {
          fill: '#1f2937',
          stroke: '#374151',
          style: { color: '#fff' },
          states: {
            hover: { fill: '#334155' },
            select: { fill: '#151111' }
          }
        },
        buttons: [
          {
            type: 'hour',
            count: 12,
            text: '12h',
            title: 'View 12 hours',
          },
          {
            type: 'day',
            count: 1,
            text: '1d',
            title: 'View 1 day'
          },
          {
            type: 'day',
            count: 7,
            text: '7d',
            title: 'View 7 days'
          },
          {
            type: 'month',
            count: 1,
            text: '1M',
            title: 'View 1 month'
          },
          {
            type: 'all',
            text: 'All',
            title: 'View all'
          }
        ]

      },

      legend: {
        enabled: true,
        itemStyle: {
          color: 'white'
        }
      },
      tooltip: {
        style: { color: '#fff' }
      },
      series: [
        {
          threshold: 0,
          fillColor: 'lightblue',
          colorAxis: 'lightblue',
          name: 'Pegel',
          data: data,
        },
      ]
    });
  }


  private prepareMeasurementsForChart(arr: Measurement[]): number[][] {
    return arr
      .map(entry => {
        const ts = new Date(entry.timestamp);
        const y  = Number((entry.fields as any).value);
        return [ts.getTime(), Number.isFinite(y) ? y : 0];
      })
      .sort((a, b) => a[0] - b[0]);
  }

  private getChartPlotlines(detail?: Supplier): any[] {
    if (detail == null) {
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
}
