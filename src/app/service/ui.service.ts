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
  private static CONTACT_URL: string = UiService.BASE_URL + "/contact";
  private static CONNECTOR_URL: string = UiService.BASE_URL + "/connector";

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

  //Contact ----

  public getContacts(): Promise<any[] | undefined> {
    const params = new HttpParams();

    return this.http.get<any[]>(UiService.CONTACT_URL, {
      params
    }).toPromise();
  }

  public createContact(data: any): Promise<any | undefined> {
    const params = new HttpParams();

    return this.http.post<any>(`${UiService.CONTACT_URL}`, data, {
      params
    }).toPromise();
  }

  //Connector ----

  public getConnector(): Promise<any[] | undefined> {
    const params = new HttpParams();

    return this.http.get<any[]>(UiService.CONNECTOR_URL, {
      params
    }).toPromise();
  }

  public createConnector(data: any): Promise<any | undefined> {
    const params = new HttpParams();

    return this.http.post<any>(`${UiService.CONNECTOR_URL}`, data, {
      params
    }).toPromise();
  }
}
