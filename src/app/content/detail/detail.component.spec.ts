import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Supplier } from 'src/app/service/model/supplier.model';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  const apiData = [{
    "measurement": "153ea12c-e1bd-11ed-b5ea-0242ac120012",
    "timestamp": "2023-05-13T09:45:00",
    "fields": {
      "pegel": 100.0
    },
    "infos": {}
  },
  {
    "measurement": "153ea12c-e1bd-11ed-b5ea-0242ac120012",
    "timestamp": "2023-05-13T09:15:00",
    "fields": {
      "pegel": 127.0
    },
    "infos": {}
  },];
  const convertedData = [
    {
      id: "153ea12c-e1bd-11ed-b5ea-0242ac120012",
      timestamp: "2023-05-13T09:45:00",
      fields: {
        "pegel": 100.0
      },
    },
    {
      id: "153ea12c-e1bd-11ed-b5ea-0242ac120012",
      timestamp: "2023-05-13T09:15:00",
      fields: {
        "pegel": 127.0
      }
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailComponent],
      imports: [RouterTestingModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [RouterTestingModule, HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test convertMeasurementResponse', () => {
    const data = apiData;
    const expectedData = convertedData;

    expect(component.convertMeasurementResponse(data)).toEqual(expectedData as any);
  });

  it('test stationWaterSideFormatter', () => {
    expect(component.stationWaterSideFormatter('L')).toEqual('links');
    expect(component.stationWaterSideFormatter('R')).toEqual('rechts');
    expect(component.stationWaterSideFormatter('A')).toEqual('A');
    expect(component.stationWaterSideFormatter(undefined)).toEqual(undefined);
  });

  it('test getChartPlotlines', () => {
    const testArgs = {
      title: 'Test',
      values: [1, 2, 3],
      fill: true,
      borderColor: 'rgb(0,0,0)',
      tension: 0.4
    };

    const supplier: Supplier = {
      id: '',
      hsw: 100,
      hsw100: 100,
      mw: 80,
      rnw100: 60,
      rnw: 68,
      indicatorValue: 0,
      stationBaseReferenceLevel: 0,
      stationName: '',
      stationWaterKilometer: 0,
      stationWaterSide: '',
      mainUsage: '',
      stationNumber: '0',
      lastValue: 0,
      lastValueFrom: new Date(2023, 0, 1, 0, 0, 0)
    };

    //@ts-ignore
    expect(component.getChartPlotlines(null)).toEqual([]);

    //@ts-ignore
    const plotlines = component.getChartPlotlines(supplier);

    const expectedPlotlines: any[] = [
      {
        label: {
          text: 'RNW - '.concat(String(supplier.rnw))
        },
        color: 'red',
        value: supplier.rnw
      },
      {
        label: {
          text: 'MW - '.concat(String(supplier.mw))
        },
        color: 'blue',
        value: supplier.mw
      },
      {
        label: {
          text: 'HSW - '.concat(String(supplier.hsw))
        },
        color: 'red',
        value: supplier.hsw
      },
    ];

    expect(plotlines).toEqual(expectedPlotlines);
  });
});
