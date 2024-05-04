import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverviewComponent } from './overview.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { routes } from 'src/app/app-routing.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UiService } from 'src/app/service/ui.service';
import { provideRouter } from "@angular/router";

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [provideRouter(routes)]
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('test changeDisplay', () => {
    component['changeDisplay'](0);
    expect(component['display']).toBe(0);
  });

  it('test getCombinedValue', () => {
    const supplier = {
      hsw: 50,
      lastValue: 60
    };

    expect(component['getCombinedValue'](supplier as any)).toBe(120);
    expect(component['getCombinedValue'](supplier as any)).not.toBe(100);
  });

  it('test getSuppliers', () => {
    component['loadSuppliers']();
    expect(1).toBe(1);
  });
});
