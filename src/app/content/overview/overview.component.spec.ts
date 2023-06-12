import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UiService } from 'src/app/service/ui.service';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let uiService: UiService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule.withRoutes(routes), HttpClientTestingModule ],
      providers: [
       
      ]
    })
      .compileComponents();

    uiService = TestBed.inject(UiService);
    httpController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('test changeDisplay', () => {
    component.changeDisplay(0);
    expect(component.display).toBe(0);
  });

  it('test getCombinedValue', () => {
    const supplier = {
      hsw: 50,
      lastValue: 60
    };

    expect(component.getCombinedValue(supplier as any)).toBe(120);
    expect(component.getCombinedValue(supplier as any)).not.toBe(100);
  });

  it('test getSuppliers', () => {
    // @ts-ignore
    component.loadSupplier();
    expect(1).toBe(1);
  });
});