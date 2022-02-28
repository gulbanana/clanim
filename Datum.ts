export type Datum = { 
    date: string; 
    local: number; 
    overseas: number;
    average?: number;
};

export const localMetadata = {
    xAccessor: (d: Datum) => d.date,
    yAccessor: (d: Datum) => d.local,
};

export const overseasMetadata = {
    xAccessor: (d: Datum) => d.date,
    yAccessor: (d: Datum) => d.overseas,
};

export const averageMetadata = {
    xAccessor: (d: Datum) => d.date,
    yAccessor: (d: Datum) => d.average,
};
