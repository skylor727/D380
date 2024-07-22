import { Component } from '@angular/core';
import { CountryData } from './types/country-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  countryData: CountryData;
  regionClicked(countryData: CountryData) {
    this.countryData = countryData;
  }
}
