import { Injectable } from '@angular/core';
import { AppConfig } from '../shared/Config';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private static BASE_URL: string = AppConfig.BASE_URL + "/store";
  private static MEASUREMENT_URL: string = UiService.BASE_URL + "/measurement";
  private static TELEMETRY_URL: string = UiService.BASE_URL + "/telemetry";

  constructor(private http:  HttpClient) { }

  //Measurements ----

  public getMeasurements(): Promise<any[] | undefined> {
    const params = new HttpParams();

    return this.http.get<any[]>(UiService.MEASUREMENT_URL, {
      params
    }).toPromise();
  }

  public createMeasurement(data: any): Promise<any | undefined> {
    const params = new HttpParams();

    return this.http.post<any>(`${UiService.MEASUREMENT_URL}`, data, {
      params
    }).toPromise();
  }

  //Telemetry ----

  public getTelemetries(): Promise<any[] | undefined> {
    const params = new HttpParams();

    return this.http.get<any[]>(UiService.TELEMETRY_URL, {
      params
    }).toPromise();
  }

  public createTelemetry(data: any): Promise<any | undefined> {
    const params = new HttpParams();

    return this.http.post<any>(`${UiService.TELEMETRY_URL}`, data, {
      params
    }).toPromise();
  }
}
