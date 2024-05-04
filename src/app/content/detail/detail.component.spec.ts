import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Supplier } from 'src/app/service/model/supplier.model';
import { Measurement } from 'src/app/service/model/measurement.model';

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
      "infos": {}
    },
    {
      id: "153ea12c-e1bd-11ed-b5ea-0242ac120012",
      timestamp: "2023-05-13T09:15:00",
      fields: {
        "pegel": 127.0
      },
      "infos": {}
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

  it('test prepareMeasurementsForChart', () => {
    const measurements: Measurement[] = [];
    measurements.push({
      measurement: '1',
      timestamp: '2023-01-01T00:00:00',
      fields: {
        'pegel': '120'
      },
      infos: {}
    });
    measurements.push({
      measurement: '2',
      timestamp: '2023-01-02T00:00:00',
      fields: {
        'pegel': '150'
      },
      infos: {}
    });

    const expectedData = [
      [1672531200000, 120],
      [1672617600000, 150]
    ];

    // @ts-ignore
    expect(component.prepareMeasurementsForChart(measurements)).toEqual(expectedData);
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
      stationWaterLatitude: 0,
      stationWaterLongitude: 0,
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

  it('test setDetailData valid data', () => {
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
      stationWaterLatitude: 0,
      stationWaterLongitude: 0,
      mainUsage: '',
      stationNumber: '0',
      lastValue: 0,
      lastValueFrom: new Date(2023, 0, 1, 0, 0, 0)
    };

    const positionData = {
      supplierId: supplier.id,
      title: supplier.stationName,
      latitude: supplier.stationWaterLatitude,
      longitude: supplier.stationWaterLongitude
    };

    component.setDetailData(supplier);
    expect(component.supplierDetail).toEqual(supplier);
    expect(component.position).toEqual(positionData);
  });
  it('test setDetailData invvalid data', () => {
    component.setDetailData(undefined);
    expect(component.supplierDetail).toBeUndefined();
    expect(component.position).toBeUndefined();
  });
});
