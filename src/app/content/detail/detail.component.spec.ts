import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  const apiData = {
    "1": {
      "2023-04-28T14:18:07.349Z": {
        "pegel": 3
      }
    },
    "2": {
      "2023-04-29T14:18:07.349Z": {
        "pegel": 4
      }
    }
  };
  const convertedData = [
    {
      id: "1",
      timestamp: "2023-04-28T14:18:07.349Z",
      fields: {
        "pegel": 3
      },
    },
    {
      id: "2",
      timestamp: "2023-04-29T14:18:07.349Z",
      fields: {
        "pegel": 4
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

  it('test getDataSet', () => {
    const testArgs = {
      title: 'Test',
      values: [1, 2, 3],
      fill: true,
      borderColor: 'rgb(0,0,0)',
      tension: 0.4
    };

    // @ts-ignore
    const datasetObj = component.getDataSet(testArgs.title, testArgs.values, testArgs.fill, testArgs.borderColor, testArgs.tension);

    expect(datasetObj.label).toBe(testArgs.title);
    expect(datasetObj.data).toBe(testArgs.values);
    expect(datasetObj.fill).toBe(testArgs.fill);
    expect(datasetObj.borderColor).toBe(testArgs.borderColor);
    expect(datasetObj.tension).toBe(testArgs.tension);
  });

  it('test getChartLabels', () => {
    const labels = ['28. Apr.', '29. Apr.'];
    // @ts-ignore
    expect(component.getChartLabels(convertedData)).toEqual(labels);
  });

  it('test setChartData', () => {
    // @ts-ignore
    component.setChartData(convertedData);

    expect((component.chartConfig.data as any).labels).toBeTruthy();
    expect((component.chartConfig.data as any).datasets).toBeTruthy();
  });

  it('test setChartOptions', () => {
    // @ts-ignore
    component.setChartOptions();

    expect(component.chartConfig.options).toBeTruthy();
  });
});
