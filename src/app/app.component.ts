import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { NotFoundSearchComponent } from './not-found-search/not-found-search.component';
import { DisplayWeatherComponent } from './display-weather/display-weather.component';
import { SearchService } from './services/search.service';
import { catchError, debounceTime, EMPTY, switchMap } from 'rxjs';
import { CurrentWeather, ForecastDay, LOCATION } from '../types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SearchComponent,
    DisplayWeatherComponent,
    NotFoundSearchComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'vantage-assignment';
  loading = false;
  error = false;
  loadingWeatherData = false;
  SearchResult: LOCATION[] = [];
  CurrentWeather: CurrentWeather | null = null;
  CurrentLocation: LOCATION | null = null;
  CurrentForecast: ForecastDay[] | null = null;
  constructor(private searchSevice: SearchService) {}
  handleSearchLocation(search: string) {
    this.loading = true;
    this.error = false;
    this.searchSevice
      .queryLocation(search)
      .pipe(
        switchMap(() => this.searchSevice.queryLocation(search)),
        catchError((err) => {
          if (!err.ok) {
            this.error = true;
          }
          this.loading = false;
          return EMPTY;
        })
      )
      .subscribe((result: any) => {
        console.log(result);
        this.loading = false;
        this.error = false;
        if (result?.length == 0) this.error = true;
        this.SearchResult = result;
      });
  }
  handleSelectedLocation(location: LOCATION) {
    this.loadingWeatherData = true;
    this.searchSevice
      .queryCurrentWeather(location.id)
      .subscribe((result: { current: CurrentWeather; location: LOCATION }) => {
        this.CurrentWeather = result.current;
        this.CurrentLocation = result.location;
        this.loadingWeatherData = false;
      });
    this.searchSevice.queryForecastWeather(location.id).subscribe(
      (result: {
        forecast: {
          forecastday: ForecastDay[];
        };
      }) => {
        this.CurrentForecast = result.forecast.forecastday;
      }
    );
  }
}
