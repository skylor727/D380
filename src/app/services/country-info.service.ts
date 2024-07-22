import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryInfoService {
  baseUrl = 'https://api.worldbank.org/v2/country/^countryId^?format=json';
  constructor() {}

  async getRegionData(countryId: string) {
    return await fetch(this.baseUrl.replace('^countryId^', countryId)).then(
      (resData) => resData.json().then((countryData) => countryData[1][0]),
    );
  }
}
