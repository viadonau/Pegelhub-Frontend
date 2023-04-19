import { Injectable } from '@angular/core';
import { AppConfig } from '../shared/Config';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private static BASE_URL: string = AppConfig.BASE_URL + "/store";

  constructor(private http:  HttpClient) { }
}
