export interface Measurement {
    id: string;
    timestamp: string;
    fields: {[key: string]: string};
    /* measurement: string;
    timestamp: string;
    fields: Map<string, number>;
    infos: Map<string, string>; */
}
