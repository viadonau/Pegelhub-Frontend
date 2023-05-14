import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Supplier } from 'src/app/service/model/supplier.model';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from 'src/app/app-routing.module';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let testData: Supplier[] = [
    {
      id: '1',
      stationName: 'Test I',
      lastValue: 1.8,
      lastValueFrom: new Date(),
      rnw: 1.0,
      hsw: 4.8,
      indicatorValue: 2.0,
      hsw100: 0,
      mw: 0,
      rnw100: 0,
      stationBaseReferenceLevel: 0,
      stationWaterKilometer: 0,
      stationWaterSide: '',
      mainUsage: '',
      stationNumber: '0'
    }, {
      id: '2',
      stationName: 'Test II',
      lastValue: 1.9,
      lastValueFrom: new Date(),
      rnw: 1.1,
      hsw: 5.8,
      indicatorValue: 2.1,
      hsw100: 0,
      mw: 0,
      rnw100: 0,
      stationBaseReferenceLevel: 0,
      stationWaterKilometer: 0,
      stationWaterSide: '',
      mainUsage: '',
      stationNumber: '1'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule.withRoutes(routes) ],
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

  it('test navigation', () => {
    const router: Router = TestBed.get(Router);
    component.navigateToDetail('1');
    
    const urlSegments = router.getCurrentNavigation()?.extractedUrl.root.children['primary'].segments.map(s=>s.path)
    expect(urlSegments?.toString()).toContain('detail,1')
  });
});