export interface Supplier {
    id: string;
    stationNameShort: string;
    lastValue?: number;
    lastValueFrom?: Date;
    rnw: number;
    hsw: number;
    indicatorValue: number;

    rnw100: number;
    hsw100: number;
    mw: number;
    stationBaseReferenceLevel: number;
    stationWaterKilometer: number;
    stationWaterside: string;
    stationWaterType: string;
}
