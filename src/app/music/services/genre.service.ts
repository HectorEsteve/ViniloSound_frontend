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

  public createGenre(genre: Genre): Observable<Genre> {
    return this.http.post<{ message: string, genre: Genre }>(`${this.baseUrl}/genres`, genre)
      .pipe(
        map((response: { message: string, genre: Genre }) => response.genre)
      );
  }

  public updateGenre(id: number, genre: Genre): Observable<Genre> {
    return this.http.put<{ message: string, genre: Genre }>(`${this.baseUrl}/genres/${id}`, genre)
      .pipe(
        map((response: { message: string, genre: Genre }) => response.genre)
      );
  }

  public deleteGenre(id: number): Observable<Genre> {
    return this.http.delete<{ message: string, genre: Genre }>(`${this.baseUrl}/genres/${id}`)
      .pipe(
        map((response: { message: string, genre: Genre }) => response.genre)
      );
  }

  public searchGenreByName(term:string):Observable<Genre[]>{
    return this.getGenres()
    .pipe(
      map((genres: Genre[]) => {
        return genres.filter(genres => genres.name.toLowerCase().includes(term.toLowerCase()));
      })
    )
  }
}
