export interface Supplier {
    id: string;
    stationName: string;
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
    stationWaterSide: string;
    mainUsage: string;
    stationNumber: string;
}
