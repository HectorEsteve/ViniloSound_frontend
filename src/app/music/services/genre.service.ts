import { Injectable, inject }               from '@angular/core';
import { HttpClient }                       from '@angular/common/http';
import { Observable, catchError, map, of }  from 'rxjs';

import { environments } from '../../../environments/environments';
import { Genre }        from '../interfaces/genre.interface';


@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private http = inject( HttpClient );

  private baseUrl= environments.baseUrl;

  public getGenres():Observable<Genre[]> {
    return this.http.get<{ message: string, genres: Genre[] }>(`${this.baseUrl}/genres`)
    .pipe(
      map((response: { message: string, genres: Genre[] })  => response.genres),
      catchError(() => of ([])),
    );
  }

  public  getGenreById(id: number): Observable<Genre> {
    return this.http.get<{ message: string, genre: Genre }>(`${this.baseUrl}/genres/${id}`)
      .pipe(
        map((response: { message: string, genre: Genre }) => response.genre)
      );
  }
}
