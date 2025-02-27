import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Server } from '../models/server';
import { GeoLocation } from '../models/geo-location';

@Injectable({
  providedIn: 'root'
})
export class ServerListService {

  constructor(private http: HttpClient) { }

  public getServerList(): Observable<Server[]> {
    return this.http.get<Server[]>(`${environment.urlProtocol}://${environment.url}/list`)
      .pipe(
        map((data: any) => data.servers),
      );
  }

  public getInformationForIp(ip: string): Observable<GeoLocation> {
    const cached = localStorage.getItem(`ip-cache:${ip}`);

    if (cached) {
      return of(JSON.parse(cached));
    }

    return this.http.get<GeoLocation>(`http://ip-api.com/json/${ip}?fields=continent,countryCode,country`).pipe(
      tap((response) => localStorage.setItem(`ip-cache:${ip}`, JSON.stringify(response))),
    );
  }


}
