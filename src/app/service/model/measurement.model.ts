export interface Measurement {
    measurement: string;
    timestamp: string;
    fields: {[key: string]: string};
    infos: {[key: string]: string};
}
