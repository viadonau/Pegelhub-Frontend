import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Supplier } from 'src/app/service/model/supplier.model';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let testData: Supplier[] = [
    {
      id: 1,
      stationNameShort: 'Test I',
      lastValue: 1.8,
      lastValueFrom: new Date(),
      rnw: 1.0,
      hsw: 4.8,
      indicatorValue: 2.0
    }, {
      id: 2,
      stationNameShort: 'Test II',
      lastValue: 1.9,
      lastValueFrom: new Date(),
      rnw: 1.1,
      hsw: 5.8,
      indicatorValue: 2.1
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        HttpClient, HttpHandler
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;

    component.supplier = testData;

    fixture.detectChanges();
  });

  it('should show data', (done) => {
    expect(component.supplier).toEqual(testData);

    fixture.whenStable().then(() => {
      const table = fixture.nativeElement.querySelectorAll('p-table')[0];
      expect(table).not.toBe(null);
      expect(table.value).toEqual(testData);

      fixture.detectChanges();
      done();
    });
  });
});