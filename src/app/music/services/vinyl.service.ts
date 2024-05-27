
import { HttpClient, HttpParams }               from '@angular/common/http';
import { Injectable, inject }                   from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environments }     from '../../../environments/environments';
import { VinylCacheStore }  from '../interfaces/vinyl-cache-store.interface';
import { Vinyl }            from '../interfaces/vinyl.interface';
import { dataVinyl } from '../../auth/interfaces/dataVinyl.interface';

@Injectable({
  providedIn: 'root'
})
export class VinylService {

  private http = inject( HttpClient );

  private baseUrl= environments.baseUrl;

  public cacheStoreVinyl: VinylCacheStore = {
    byName:   {term: ''},
    byBand:   {term: ''},
    byGenre:   {term: ''},
  }

  constructor() {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void{
    localStorage.setItem('cacheStoreVinyl',JSON.stringify(this.cacheStoreVinyl));
  }

  private loadFromLocalStorage(): void{
    if(!localStorage.getItem('cacheStoreVinyl')) return;
    this.cacheStoreVinyl = JSON.parse(localStorage.getItem('cacheStoreVinyl')!);
  }

  public resetFromLocalStorageByName(): void {
    this.cacheStoreVinyl = JSON.parse(localStorage.getItem('cacheStoreVinyl')!);
      this.cacheStoreVinyl.byName.term = '';
      localStorage.setItem('cacheStoreVinyl', JSON.stringify(this.cacheStoreVinyl));
  };

  public resetFromLocalStorageByBand(): void {
    this.cacheStoreVinyl = JSON.parse(localStorage.getItem('cacheStoreVinyl')!);
      this.cacheStoreVinyl.byBand.term = '';
      localStorage.setItem('cacheStoreVinyl', JSON.stringify(this.cacheStoreVinyl));
  };

  public resetFromLocalStorageByGenre(): void {
    this.cacheStoreVinyl = JSON.parse(localStorage.getItem('cacheStoreVinyl')!);
      this.cacheStoreVinyl.byGenre.term = '';
      localStorage.setItem('cacheStoreVinyl', JSON.stringify(this.cacheStoreVinyl));
  };

  public getVinyls():Observable<Vinyl[]> {
    return this.http.get<{ message: string, vinyls: Vinyl[] }>(`${this.baseUrl}/vinyls`)
    .pipe(
      map((response: { message: string, vinyls: Vinyl[] })  => response.vinyls),
      catchError(() => of ([])),
    );
  }

  public getRandomVinyls(limit: number): Observable<Vinyl[]> {
    let params = new HttpParams().set('limit', limit.toString());
    return this.http.get<{ message: string, vinyls: Vinyl[] }>(`${this.baseUrl}/vinyls/random`, { params })
      .pipe(
        map(response => response.vinyls),
        catchError(() => of([]))
      );
  }

  public getVinylById(id: number): Observable<Vinyl> {
    return this.http.get<{ message: string, vinyl: Vinyl }>(`${this.baseUrl}/vinyls/${id}`)
      .pipe(
        map((response: { message: string, vinyl: Vinyl }) => response.vinyl)
      );
  }

  public searchVinylsByName(term:string):Observable<Vinyl[]>{
    return this.getVinyls()
    .pipe(
      map((vinyls: Vinyl[]) => {
        return vinyls.filter(vinyl => vinyl.name.toLowerCase().includes(term.toLowerCase()));
      }),
      tap( vinyls => this.cacheStoreVinyl.byName = { term: term}),
      tap (() => this.saveToLocalStorage()),
    )
  }

  public searchVinylsByBand(term: string): Observable<Vinyl[]> {
    return this.getVinyls().pipe(
      map((vinyls: Vinyl[]) => {
        return vinyls.filter(vinyl =>
          vinyl.bands.some(band =>
            band.name.toLowerCase().includes(term.toLowerCase())
          )
        );
      }),
      tap(vinyls => {
        this.cacheStoreVinyl.byBand = { term: term};
        this.saveToLocalStorage();
      })
    );
  }

  public searchVinylsByGenre(term: string): Observable<Vinyl[]> {
    return this.getVinyls().pipe(
      map((vinyls: Vinyl[]) => {
        return vinyls.filter(vinyl =>
          vinyl.songs.some(song =>
            song.genre.name.toLowerCase().includes(term.toLowerCase())
          )
        );
      }),
      tap(vinyls => {
        this.cacheStoreVinyl.byGenre = { term: term};
        this.saveToLocalStorage();
      })
    );
  }

  public createVinyl(vinyl: dataVinyl): Observable<Vinyl> {
    return this.http.post<{ message: string, vinyl: Vinyl }>(`${this.baseUrl}/vinyls`, vinyl)
      .pipe(
        map(response => response.vinyl),
        catchError(error => {
          console.error('Error adding vinyl:', error);
          return of({} as Vinyl);
        })
      );
  }

  public updateVinyl(id: number, vinyl: dataVinyl): Observable<Vinyl> {
    return this.http.put<{ message: string, vinyl: Vinyl }>(`${this.baseUrl}/vinyls/${id}`, vinyl)
      .pipe(
        map(response => response.vinyl),
        catchError(error => {
          console.error('Error updating vinyl:', error);
          return of({} as Vinyl);
        })
      );
  }

  public deleteVinyl(id: number): Observable<Vinyl> {
    return this.http.delete<{ message: string, vinyl: Vinyl }>(`${this.baseUrl}/vinyls/${id}`)
      .pipe(
        map(response => response.vinyl),
        catchError(error => {
          console.error('Error deleting vinyl:', error);
          return of({} as Vinyl);
        })
      );
  }
}
