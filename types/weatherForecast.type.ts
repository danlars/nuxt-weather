export type weatherForecast = {
    latitude: number;
    longitude: number;
    hourly_units: hourlyUnits;
    hourly: hourlyData;
}

export type hourlyUnits = {
    time?: string;
    temperature_2m?: string;
    rain?: string;
    cloud_cover?: string;
    showers?: string;
    snowfall?: string;
    snow_depth?: string;
}

export type hourlyData = {
    time?: string[];
    temperature_2m?: number[];
    rain?: number[];
    cloud_cover?: number[];
    showers?: number[];
    snowfall?: number[];
    snow_depth?: number[];
}