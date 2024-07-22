import { Component, Input } from '@angular/core';
import { CountryData } from '../../types/country-data';

@Component({
  selector: 'app-country-data',
  templateUrl: './country-data.component.html',
  styleUrl: './country-data.component.css',
})
export class CountryDataComponent {
  @Input() countryData: CountryData;
}
