import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Format } from '../interfaces/format.interface';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  private http = inject( HttpClient );

  private baseUrl= environments.baseUrl;

  getFormats():Observable<Format[]> {
    return this.http.get<{ message: string, formats: Format[] }>(`${this.baseUrl}/formats`)
    .pipe(
      map((response: { message: string, formats: Format[] })  => response.formats),
      catchError(() => of ([])),
    );
  }

  getFormatById(id: number): Observable<Format> {
    return this.http.get<{ message: string, format: Format }>(`${this.baseUrl}/formats/${id}`)
      .pipe(
        map((response: { message: string, format: Format }) => response.format)
      );
  }

}
