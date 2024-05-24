import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Supplier } from './model/supplier.model';
import { firstValueFrom } from 'rxjs';
import { Measurement } from './model/measurement.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private static MEASUREMENT_URL: string = environment.BASE_URL.concat('measurement');
  private static SUPPLIER_LAST_VALUE_URL: string = environment.BASE_URL.concat('measurement/last');
  private static SUPPLIER_URL: string = environment.BASE_URL.concat('supplier');

  constructor(private http: HttpClient) { }

  // Measurements ----
  public getMeasurements(stationNumber: string, range: string): Promise<Measurement[] | undefined> {
    let params = new HttpParams();
    params = params.set('stationNumber', stationNumber);

    return firstValueFrom(this.http.get<any[]>(UiService.MEASUREMENT_URL.concat('/supplier/', range), {
      params: params
    }));
  }

  public getPrognose(stationNumber: string): Promise<Measurement[] | undefined> {
    let params = new HttpParams();
    params = params.set('stationNumber', stationNumber);

    return new Promise((resolve) => {
      const prognose: Measurement[] = [];

      /* const date = new Date();
      date.setMilliseconds(0);
      date.setSeconds(0);
      date.setMinutes(0);
      date.setHours(date.getHours() + 1);

      date.setDate(14);
      date.setMonth(4);

      for(let i = 0; i < 48; i++){
        date.setMinutes(date.getMinutes() + 30);
        prognose.push(
          {
            id: String(Math.round(Math.random() * 100000000)),
            timestamp: date.toISOString(),
            fields: {'value': String(Math.round(Math.random() * 150))}
          }
        )
      } */

      resolve(prognose);
  });
  }

  // Suppliers ----
  public getSuppliers(): Promise<Supplier[] | undefined> {
    return firstValueFrom(this.http.get<any[] | undefined>(UiService.SUPPLIER_URL))
      .then(data => data?.map(dto => {
        let lastValue: any = null;

        if (dto.measurement?.fields?.value) {
          lastValue = parseFloat(dto.measurement?.fields?.value);
        }

        if (dto.measurement?.infos?.height) {
          lastValue += parseFloat(dto.measurement?.infos?.height) / 100;
        }

        lastValue = Math.round(lastValue);

        return {
          id: dto.id,
          stationName: dto.stationName,
          rnw: dto.rnw,
          hsw: dto.hsw,
          lastValue: lastValue,
          lastValueFrom: dto.measurement?.timestamp,
          stationWaterLatitude: dto.stationWaterLatitude,
          stationWaterLongitude: dto.stationWaterLongitude
        } as Supplier;
      }));
  }

  public getSupplier(id: string): Promise<Supplier | undefined> {
    return firstValueFrom(this.http.get<Supplier | undefined>(UiService.SUPPLIER_URL.concat('/', id)));
  }

  public getLastMeasurementOfSupplier(): Promise<Measurement | undefined> {
    return firstValueFrom(this.http.get<Measurement | undefined>(UiService.SUPPLIER_LAST_VALUE_URL));
  }
}
