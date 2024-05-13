import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from '../../../environments/environments';
import { BandCacheStore } from '../interfaces/band-cache-store.interface';

import { Observable, catchError, map, of, tap } from 'rxjs';
import { Band } from '../interfaces/band.interface';

@Injectable({
  providedIn: 'root'
})
export class BandService {

  private http = inject( HttpClient );

  private baseUrl= environments.baseUrl;

  public cacheStoreBand: BandCacheStore = {
    byName:   {term: '', bands:[]},
    byGenre:   {term: '', bands:[]},
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
      this.cacheStoreBand.byName.bands = [];
      this.cacheStoreBand.byName.term = '';
      localStorage.setItem('cacheStoreBands', JSON.stringify(this.cacheStoreBand));
  };

  public resetFromLocalStorageByGenre(): void {
    this.cacheStoreBand = JSON.parse(localStorage.getItem('cacheStoreBands')!);
      this.cacheStoreBand.byGenre.bands = [];
      this.cacheStoreBand.byGenre.term = '';
      localStorage.setItem('cacheStoreBands', JSON.stringify(this.cacheStoreBand));
  };

  getBands():Observable<Band[]> {
    return this.http.get<{ message: string, bands: Band[] }>(`${this.baseUrl}/bands`)
    .pipe(
      map((response: { message: string, bands: Band[] })  => response.bands),
      catchError(() => of ([])),
    );
  }

  getBandById(id: number): Observable<Band> {
    return this.http.get<{ message: string, band: Band }>(`${this.baseUrl}/bands/${id}`)
      .pipe(
        map((response: { message: string, band: Band }) => response.band)
      );
  }

  searchBandsByName(term:string):Observable<Band[]>{
    return this.getBands()
    .pipe(
      map((bands: Band[]) => {
        return bands.filter(bands => bands.name.toLowerCase().includes(term.toLowerCase()));
      }),
      tap( bands => this.cacheStoreBand.byName = { term: term, bands: bands}),
      tap (() => this.saveToLocalStorage()),
    )
  }

  searchBandsByGenre(term: string): Observable<Band[]> {
    return this.getBands().pipe(
      map((bands: Band[]) => {
        return bands.filter(band => {
          return band.songs.some(song => song.genre.name.toLowerCase().includes(term.toLowerCase()));
        });
      }),
      tap(bands => {
        this.cacheStoreBand.byGenre = { term: term, bands: bands };
        this.saveToLocalStorage();
      })
    );
  }


}
