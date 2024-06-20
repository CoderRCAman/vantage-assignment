import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}
  queryLocation(search: string): Observable<any> {
    return this.http.get(
      `https://api.weatherapi.com/v1/search.json?key=${environment.WEATHER_API_KEY}&q=${search}&days=3&aqi=no&alerts=no`
    );
  }
  queryCurrentWeather(id: number): Observable<any> {
    return this.http.get(
      `https://api.weatherapi.com/v1/current.json?key=${environment.WEATHER_API_KEY}&q=id:${id}&days=3&aqi=no&alerts=no`
    );
  }
  queryForecastWeather(id: number): Observable<any> {
    return this.http.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${environment.WEATHER_API_KEY}&q=id:${id}&days=4&alerts=no`
    );
  }
}
