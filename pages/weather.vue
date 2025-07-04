<template>
  <BaseContent>
    <h1>Weather</h1>
    <table>
      <thead>
      <tr>
        <th>Dato</th>
        <th>Temp. (C)</th>
        <th>Regn</th>
        <th>Byger</th>
        <th>Skydække</th>
        <th>Snefald</th>
        <th>Sne dybde</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="vejr in vejrListe" :key="vejr.time">
        <td>{{vejr.time}}</td>
        <td>{{vejr.temperature}}</td>
        <td>{{vejr.rain}}</td>
        <td>{{vejr.showers}}</td>
        <td>{{vejr.cloudCover}}</td>
        <td>{{vejr.snowfall}}</td>
        <td>{{vejr.snowDepth}}</td>
      </tr>
      </tbody>
    </table>
  </BaseContent>
</template>
<script setup lang="ts">
import type {weatherForecast} from "~/types/weatherForecast.type";

class TimebaseretVejrdata {
  public readonly cloudCover?: string;
  public readonly rain?: string;
  public readonly showers?: string;
  public readonly snowDepth?: string;
  public readonly snowfall?: string;
  public readonly temperature?: string;
  public readonly time?: string;

  constructor(cloudCover?: string, rain?: string, showers?: string, snowDepth?: string, snowfall?: string, temperature?: string, time?: string,) {
    this.cloudCover = cloudCover;
    this.rain = rain;
    this.showers = showers;
    this.snowDepth = snowDepth;
    this.snowfall = snowfall;
    this.temperature = temperature;
    this.time = formatDate(time!);
  }
}

const breddegrad = 57.048;
const langdegrad = 9.9187;
const prognose = await useFetch<weatherForecast>(`https://api.open-meteo.com/v1/forecast?latitude=${breddegrad}&longitude=${langdegrad}&hourly[]=temperature_2m&hourly[]=rain&hourly[]=cloud_cover&hourly[]=showers&hourly[]=snowfall&hourly[]=snow_depth`);
const prognoseData = prognose.data.value;
const vejrListe: TimebaseretVejrdata[] = [];
if (prognoseData?.hourly?.time != null) {
  const hourly = prognoseData.hourly;
  const units = prognoseData.hourly_units;
  for (let i = 0; i < hourly.time!.length; i++)
  {
    vejrListe.push(new TimebaseretVejrdata(
        `${hourly.cloud_cover![i]!} ${units.cloud_cover}`,
        `${hourly.rain![i]!} ${units.rain}`,
        `${hourly.showers![i]!} ${units.showers}`,
        `${hourly.snow_depth![i]!} ${units.snow_depth}`,
        `${hourly.snowfall![i]!} ${units.snowfall}`,
        `${hourly.temperature_2m![i]!} ${units.temperature_2m}`,
        hourly.time![i]!,
    ));
  }
}
</script>