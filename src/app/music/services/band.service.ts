import { HttpClient, HttpParams }               from '@angular/common/http';
import { Injectable, inject }                   from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Band }           from '../interfaces/band.interface';
import { BandCacheStore } from '../interfaces/band-cache-store.interface';
import { environments }   from '../../../environments/environments';
import { DataBand } from '../../auth/interfaces/dataBand.interface';

@Injectable({
  providedIn: 'root'
})
export class BandService {

  private http = inject( HttpClient );

  private baseUrl= environments.baseUrl;

  public cacheStoreBand: BandCacheStore = {
    byName:   {term: ''},
    byGenre:   {term: ''},
  }

  constructor() {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void{
    localStorage.setItem('cacheStoreBands',JSON.stringify(this.cacheStoreBand));
  }

  private loadFromLocalStorage(): void{
    if(!localStorage.getItem('cacheStoreBands')) return;
    this.cacheStoreBand = JSON.parse(localStorage.getItem('cacheStoreBands')!);
  }

  public resetFromLocalStorageByName(): void {
    this.cacheStoreBand = JSON.parse(localStorage.getItem('cacheStoreBands')!);
      this.cacheStoreBand.byName.term = '';
      localStorage.setItem('cacheStoreBands', JSON.stringify(this.cacheStoreBand));
  };

  public resetFromLocalStorageByGenre(): void {
    this.cacheStoreBand = JSON.parse(localStorage.getItem('cacheStoreBands')!);
      this.cacheStoreBand.byGenre.term = '';
      localStorage.setItem('cacheStoreBands', JSON.stringify(this.cacheStoreBand));
  };

  public getBands():Observable<Band[]> {
    return this.http.get<{ message: string, bands: Band[] }>(`${this.baseUrl}/bands`)
    .pipe(
      map((response: { message: string, bands: Band[] })  => response.bands),
      catchError(() => of ([])),
    );
  }

  public getRandomBands(limit: number): Observable<Band[]> {
    let params = new HttpParams().set('limit', limit.toString());
    return this.http.get<{ message: string, bands: Band[] }>(`${this.baseUrl}/bands/random`, { params })
      .pipe(
        map(response => response.bands),
        catchError(() => of([]))
      );
  }

  public getBandById(id: number): Observable<Band> {
    return this.http.get<{ message: string, band: Band }>(`${this.baseUrl}/bands/${id}`)
      .pipe(
        map((response: { message: string, band: Band }) => response.band)
      );
  }

  public searchBandsByName(term:string):Observable<Band[]>{
    return this.getBands()
    .pipe(
      map((bands: Band[]) => {
        return bands.filter(bands => bands.name.toLowerCase().includes(term.toLowerCase()));
      }),
      tap( bands => this.cacheStoreBand.byName = { term: term}),
      tap (() => this.saveToLocalStorage()),
    )
  }

  public searchBandsByGenre(term: string): Observable<Band[]> {
    return this.getBands().pipe(
      map((bands: Band[]) => {
        return bands.filter(band => {
          return band.songs!.some(song => song.genre.name.toLowerCase().includes(term.toLowerCase()));
        });
      }),
      tap(bands => {
        this.cacheStoreBand.byGenre = { term: term };
        this.saveToLocalStorage();
      })
    );
  }

  public createBand(band: Band): Observable<Band> {
    return this.http.post<{ message: string, band: Band }>(`${this.baseUrl}/bands`, band)
      .pipe(
        map(response => response.band),
        catchError(error => {
          console.error('Error adding band:', error);
          return of({} as Band);
        })
      );
  }

  public updateBand(id: number, band: DataBand): Observable<Band> {
    console.log('Datos a enviar para la actualización:', band);
    return this.http.put<{ message: string, band: Band }>(`${this.baseUrl}/bands/${id}`, band)
      .pipe(
        map(response => response.band),
        catchError(error => {
          console.error('Error updating band:', error);
          return of({} as Band);
        })
      );
  }

  public deleteBand(id: number): Observable<void> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/bands/${id}`)
      .pipe(
        map(() => {}),
        catchError(error => {
          console.error('Error deleting band:', error);
          return of();
        })
      );
  }
}
