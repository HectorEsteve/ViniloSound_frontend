import { Injectable, inject } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Genre } from '../interfaces/genre.interface';


@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private http = inject( HttpClient );

  private baseUrl= environments.baseUrl;

  getGenres():Observable<Genre[]> {
    return this.http.get<{ message: string, genres: Genre[] }>(`${this.baseUrl}/genres`)
    .pipe(
      map((response: { message: string, genres: Genre[] })  => response.genres),
      catchError(() => of ([])),
    );
  }

  getGenreById(id: number): Observable<Genre> {
    return this.http.get<{ message: string, genre: Genre }>(`${this.baseUrl}/genres/${id}`)
      .pipe(
        map((response: { message: string, genre: Genre }) => response.genre)
      );
  }

}
