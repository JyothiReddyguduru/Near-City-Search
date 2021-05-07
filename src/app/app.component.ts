import { Component, OnInit } from '@angular/core';
import { findParentClassDeclaration } from '@angular/core/schematics/utils/typescript/class_declaration';
import { AppService } from './app.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Near City Search';
  countries: any = [];
  cities: any = [];
  nearestCities: any = [];
  country = null;
  states = null;
  city = null;
  state = null;
  showStates = false;
  showCountries = false;
  showCities = false;
  showNearestCities = false;
  showEmptyMessage = false;
  showErrorMessage = false;
  message = '';
  constructor(private locationService: AppService) {}

  getCountries() {
    console.log('fetching countries');
    this.locationService.getCountries().subscribe(
      response => {
        this.countries = response['data'];
        this.country = this.countries[0];
        if (this.countries.length > 0) {
          this.showCountries = true;
          this.city = this.cities[0];
        } else {
          this.showCountries = false;
          this.showCities = false;
          this.showNearestCities = false;
          this.showEmptyMessage = true;
          this.message = 'No countries found !';
        }
      },
      error => {
        this.handleError();
      }
    );
  }

  onCountryChange(event) {
    this.showErrorMessage = false;
    console.log('country changed');
    this.getStatesByCountry(this.country);
  }

  onStateChange(event) {
    this.showErrorMessage = false;
    console.log('state changed');
    this.getCitiesByState(this.country, this.state);
  }

  getCitiesByState(country, state) {
    console.log('fetching cities by state code');
    var countryCode = country['code'];
    var isoCode = state['isoCode'];

    this.locationService.getCitiesByState(countryCode, isoCode).subscribe(
      response => {
        this.cities = response['data'];
        if (this.cities.length > 0) {
          this.showCities = true;
          this.city = this.cities[0];
        } else {
          this.showCities = false;
          this.showNearestCities = false;
          this.showEmptyMessage = true;
          this.message = 'No cities are listed under ' + country['name'];
        }
      },
      error => {
        this.handleError();
      }
    );
  }

  getStatesByCountry(country) {
    var countryCode = country['code'];
    console.log('fetching states by country code');
    this.locationService.getStatesByCountry(countryCode).subscribe(
      response => {
        this.states = response['data'];
        if (this.states.length > 0) {
          this.showStates = true;
          this.state = this.states[0];
        } else {
          this.showStates = false;
          this.showCities = false;
          this.showNearestCities = false;
          this.showEmptyMessage = true;
          this.message = 'No states are listed under ' + country['name'];
        }
      },
      error => {
        this.handleError();
      }
    );
  }

  onCityChange(event) {
    this.showErrorMessage = false;
    this.getNearestCities(this.city);
  }

  getNearestCities(city) {
    var cityId = city['id'];
    console.log('fetching nearest cities by city id');
    this.locationService.getCitiesNearCity(cityId).subscribe(
      response => {
        this.nearestCities = response['data'];
        if (this.nearestCities.length > 0) {
          this.showNearestCities = true;
        } else {
          this.showEmptyMessage = false;
          this.showNearestCities = false;
          this.message = 'No cities are listed near' + city['name'];
        }
      },
      error => {
        this.handleError();
      }
    );
  }

  ngOnInit() {
    this.showErrorMessage = false;
    this.getCountries();
  }

  handleError() {
    this.showEmptyMessage = false;
    this.showErrorMessage = true;
    this.message = 'Unable to fetch data at the moment!';
    console.error('Error occurred while triyng to fetch states from api');
  }
}
