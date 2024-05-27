import { HttpClient }                       from '@angular/common/http';
import { Injectable, inject }               from '@angular/core';
import { Observable, catchError, map, of }  from 'rxjs';

import { environments } from '../../../environments/environments';
import { Format }       from '../interfaces/format.interface';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  private http = inject( HttpClient );

  private baseUrl= environments.baseUrl;

  public getFormats(): Observable<Format[]> {
    return this.http.get<{ message: string, formats: Format[] }>(`${this.baseUrl}/formats`)
      .pipe(
        map((response: { message: string, formats: Format[] }) => response.formats),
        catchError(() => of([])),
      );
  }

  public getFormatById(id: number): Observable<Format> {
    return this.http.get<{ message: string, format: Format }>(`${this.baseUrl}/formats/${id}`)
      .pipe(
        map((response: { message: string, format: Format }) => response.format)
      );
  }

  public createFormat(format: Format): Observable<Format> {
    return this.http.post<{ message: string, format: Format }>(`${this.baseUrl}/formats`, format)
      .pipe(
        map((response: { message: string, format: Format }) => response.format)
      );
  }

  public updateFormat(id: number, format: Format): Observable<Format> {
    return this.http.put<{ message: string, format: Format }>(`${this.baseUrl}/formats/${id}`, format)
      .pipe(
        map((response: { message: string, format: Format }) => response.format)
      );
  }

  public deleteFormat(id: number): Observable<Format> {
    return this.http.delete<{ message: string, format: Format }>(`${this.baseUrl}/formats/${id}`)
      .pipe(
        map((response: { message: string, format: Format }) => response.format)
      );
  }
}
