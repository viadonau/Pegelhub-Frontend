import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/shared/Config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Supplier } from './model/supplier.model';
import { firstValueFrom } from 'rxjs';
import { Measurement } from './model/measurement.model';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private static MEASUREMENT_URL: string = AppConfig.BASE_URL.concat('/store/measurement');
  private static SUPPLIER_URL: string = AppConfig.BASE_URL.concat('/management/supplier');

  constructor(private http: HttpClient) { }

  //Measurements ----

  public getMeasurements(stationNumber: string, range: string): Promise<Measurement[] | undefined> {
    let params = new HttpParams();
    params = params.set('stationNumber', stationNumber);

    return this.http.get<any[]>(UiService.MEASUREMENT_URL.concat('/supplier/', range), {
      params
    }).toPromise();
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
            fields: {'pegel': String(Math.round(Math.random() * 150))}
          }
        )
      } */
      
      resolve(prognose);
  });
  }

  //Supplier ----
  public getSuppliers(): Promise<Supplier[] | undefined> {
    const params = new HttpParams();
    return firstValueFrom(this.http.get<any[] | undefined>(UiService.SUPPLIER_URL, { params }))
      .then(data => data?.map(dto => {
        return {
          id: dto.id,
          stationName: dto.stationName,
          rnw: dto.rnw,
          hsw: dto.hsw,
          lastValue: Math.floor(Math.random() * (dto.hsw - dto.rnw + 1) + dto.rnw),
          lastValueFrom: dto.timestamp || new Date(),
          stationWaterLatitude: dto.stationWaterLatitude,
          stationWaterLongitude: dto.stationWaterLongitude
        } as Supplier;
      }));
  }

  public getSupplier(id: string): Promise<Supplier | undefined> {
    const params = new HttpParams();
    //return firstValueFrom(this.http.get<Supplier[] | undefined>(UiService.SUPPLIER_URL, { params })).then(data => data?.filter(data => data.id == id)[0]);
    return firstValueFrom(this.http.get<Supplier | undefined>(UiService.SUPPLIER_URL.concat('/', id), { params }));
  }
  /* public getSuppliers(): Promise<any> {
    const fnGetRandomNumber = (factor: number) => {
      return Math.ceil(Math.random() * factor);
    }

    return new Promise((resolve) => {
      let idx = 0;

      setTimeout(() => {
        resolve(['Achleiten', 'Wilhering', 'Mauthausen', 'Grein', 'Kienstock', 'Dürnstein', 'Korneuburg', 'Schwedenbrücke', 'Wildungsmauer', 'Thebnerstraßl']
          .map(supplierName => {
            const values: number[] = [1 + Math.random() * 5, 2 + Math.random() * 5, Math.random() * 5];
            const obj: Supplier = {
              id: ++idx,
              stationNameShort: supplierName,
              lastValue: values.filter(item => item != Math.min(...values) && Math.max(...values))[0],
              lastValueFrom: new Date(2023, 3, fnGetRandomNumber(30), fnGetRandomNumber(24), fnGetRandomNumber(60)),
              rnw: Math.min(...values),
              hsw: Math.max(...values),
              indicatorValue: 0
            };

            const avg = (obj.rnw + obj.hsw) / 2;
            const perc = 1 - Math.min(avg, obj.lastValue as any) / Math.max(avg, obj.lastValue as any);
            const diff = perc * 100;
            obj.indicatorValue = Math.round(50 + diff);

            return obj;
          })
        );

        try {
          this.http.get('/supplier').toPromise();
        } catch { }
      }
        , 500);
    });
  } */
}
