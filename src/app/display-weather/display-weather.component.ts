import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';
import { NotFoundSearchComponent } from '../not-found-search/not-found-search.component';
import { CurrentWeather, ForecastDay, LOCATION } from '../../types';
import {
  atmosphereCodes,
  cloudCodes,
  drizzleCodes,
  hazeCodes,
  rainCodes,
  snowCodes,
  sunnyCodes,
  thunderstormCodes,
} from '../../constants/weatherCodes';
import { intervals } from '../../constants/chooseTime';
import { convertTo12Hour } from '../../lib';
import moment from 'moment';
@Component({
  selector: 'app-display-weather',
  standalone: true,
  imports: [MatIcon, NotFoundSearchComponent, NgIf, NgClass, NgFor,SlicePipe],
  templateUrl: './display-weather.component.html',
  styleUrl: './display-weather.component.scss',
})
export class DisplayWeatherComponent implements OnChanges {
  @Input() currentWeather: CurrentWeather | null = null;
  @Input() currentLocation: LOCATION | null = null;
  @Input() currentForecast: ForecastDay[] | null = null;
  bg_css_name = '';

  findMatchingBG(currentWeather: CurrentWeather) {
    snowCodes.includes(currentWeather?.condition.code as number)
      ? (this.bg_css_name = 'snow_bg')
      : this.bg_css_name;
    atmosphereCodes.includes(currentWeather?.condition.code as number)
      ? (this.bg_css_name = 'atmosphere_bg')
      : this.bg_css_name;
    drizzleCodes.includes(currentWeather?.condition.code as number)
      ? (this.bg_css_name = 'drizzle_bg')
      : this.bg_css_name;
    rainCodes.includes(currentWeather?.condition.code as number)
      ? (this.bg_css_name = 'rain_bg')
      : this.bg_css_name;
    hazeCodes.includes(currentWeather?.condition.code as number)
      ? (this.bg_css_name = 'haze_bg')
      : this.bg_css_name;
    sunnyCodes.includes(currentWeather?.condition.code as number)
      ? (this.bg_css_name = 'clear_bg')
      : this.bg_css_name;
    thunderstormCodes.includes(currentWeather?.condition.code as number)
      ? (this.bg_css_name = 'thunder_bg')
      : this.bg_css_name;
    cloudCodes.includes(currentWeather?.condition.code as number)
      ? (this.bg_css_name = 'cloud_bg')
      : this.bg_css_name;
    console.log(this.bg_css_name);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['currentWeather']) {
      this.findMatchingBG(changes?.['currentWeather'].currentValue);
    }
    if (changes?.['currentForecast']) {
      console.log(changes?.['currentForecast'].currentValue);
    }
  }
  mathCeilWrap(value: number) {
    return Math.ceil(value);
  }
  isAllowedTime(time: string) {
    return intervals.includes(time.split(' ')[1]);
  }
  convertTime(time: string) {
    return convertTo12Hour(time.split(' ')[1]);
  }
  formatDate(date: string) {
    return moment(date).format('dddd D MMMM YYYY');
  }
}
