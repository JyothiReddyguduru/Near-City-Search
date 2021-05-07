import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_KEY } from './app.constants';

@Injectable()
export class AppService {
  private baseURL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
  private headers = { 'x-rapidapi-key': API_KEY };

  constructor(private httpClient: HttpClient) {}

  getCountries() {
    const uri = '/countries';
    return this.httpClient.get(this.baseURL + uri, {
      headers: this.headers
    });
  }

  getStatesByCountry(countryCode: string) {
    const uri = `/countries/${countryCode}/regions`;
    return this.httpClient.get(this.baseURL + uri, {
      headers: this.headers
    });
  }

  getCitiesByState(countryCode: string, stateIsoCode: string) {
    const uri = `/countries/${countryCode}/regions/${stateIsoCode}/cities`;
    return this.httpClient.get(this.baseURL + uri, {
      headers: this.headers
    });
  }

  getCitiesNearCity(cityId: string) {
    const radius = 100; // needed as param query
    const uri = `/cities/${cityId}/nearbyCities?radius=`+ radius;
    return this.httpClient.get(this.baseURL + uri, {
      headers: this.headers
    });  }
}
