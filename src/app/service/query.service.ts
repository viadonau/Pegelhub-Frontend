import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private mode: ("table" | "tile" | "mini" | "map");

  constructor() { 
    this.mode = "table";
  }

  public getMode(): ("table" | "tile" | "mini" | "map") {
    return this.mode;
  }

  public setMode(mode: ("table" | "tile" | "mini" | "map")){
    this.mode = mode;
  }
}
