import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountryData } from '../../types/country-data';
import { CountryInfoService } from '../../services/country-info.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  @Output() newCountryDataEvent = new EventEmitter<CountryData>();
  countryData: CountryData = {
    id: '',
    name: '',
    capitalCity: '',
    region: '',
    incomeLevel: '',
    latitude: '',
    longitude: '',
  };

  constructor(private countryInfoService: CountryInfoService) {}
  ngOnInit(): void {
    const eventHandlers = {
      click: (regionClicked: MouseEvent) => {
        if (regionClicked.target instanceof Element)
          this.getRegionData(regionClicked.target);
      },
      mouseover: (regionHovered: MouseEvent) => {
        if (regionHovered.target instanceof Element)
          this.removeOrAddHoveredState(regionHovered.target);
      },
      mouseout: (regionHovered: MouseEvent) => {
        if (regionHovered.target instanceof Element)
          this.removeOrAddHoveredState(regionHovered.target);
      },
    };

    const pathElementsAsArray = Array.from(
      document.getElementsByTagName('path'),
    );
    pathElementsAsArray.forEach((pathElement) => {
      Object.keys(eventHandlers).forEach((eventType) => {
        pathElement.addEventListener(eventType, eventHandlers[eventType]);
      });
    });
  }

  async getRegionData(regionToGet: Element) {
    let countryId = regionToGet.id;
    let tData = await this.countryInfoService.getRegionData(countryId);
    this.mapResultToCountryData(tData);
  }

  mapResultToCountryData(fullRegionData: Object) {
    Object.keys(fullRegionData).forEach((key: string) => {
      if (Object.keys(this.countryData).includes(key)) {
        this.countryData[key] =
          fullRegionData[key] instanceof Object
            ? fullRegionData[key].value
            : fullRegionData[key];
      }
    });
    this.newCountryDataEvent.emit(this.countryData);
  }

  removeOrAddHoveredState(regionToStyle: Element) {
    regionToStyle.classList.contains('hovered')
      ? regionToStyle.classList.remove('hovered')
      : regionToStyle.classList.add('hovered');
  }
}
