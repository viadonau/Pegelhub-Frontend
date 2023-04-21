export interface Supplier {
    id: number;
    stationNameShort: string;
    lastValue?: number;
    lastValueFrom?: Date;
    rnw: number;
    hsw: number;
    indicatorValue: number;
}
