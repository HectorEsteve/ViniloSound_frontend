import { HttpClient, HttpParams }               from '@angular/common/http';
import { Injectable, inject }                   from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environments }   from '../../../environments/environments';
import { Song }           from '../interfaces/song.interface';
import { SongCacheStore}  from '../interfaces/song-cache-store.interface';
import { dataSong } from '../../auth/interfaces/dataSong.intrface';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private http = inject( HttpClient );

  private baseUrl= environments.baseUrl;

  public cacheStoreSongs: SongCacheStore = {
    byName:   {term: ''},
    byBand:   {term: ''},
    byGenre:   {term: ''},
  }

  constructor() {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void{
    localStorage.setItem('cacheStoreSongs',JSON.stringify(this.cacheStoreSongs));
  }

  private loadFromLocalStorage(): void{
    if(!localStorage.getItem('cacheStoreSongs')) return;
    this.cacheStoreSongs = JSON.parse(localStorage.getItem('cacheStoreSongs')!);
  }

  public resetFromLocalStorageByName(): void {
    this.cacheStoreSongs = JSON.parse(localStorage.getItem('cacheStoreSongs')!);
      this.cacheStoreSongs.byName.term = '';
      localStorage.setItem('cacheStoreSongs', JSON.stringify(this.cacheStoreSongs));
  };

  public resetFromLocalStorageByBand(): void {
    this.cacheStoreSongs = JSON.parse(localStorage.getItem('cacheStoreSongs')!);
      this.cacheStoreSongs.byBand.term = '';
      localStorage.setItem('cacheStoreSongs', JSON.stringify(this.cacheStoreSongs));
  };

  public resetFromLocalStorageByGenre(): void {
    this.cacheStoreSongs = JSON.parse(localStorage.getItem('cacheStoreSongs')!);
      this.cacheStoreSongs.byGenre.term = '';
      localStorage.setItem('cacheStoreSongs', JSON.stringify(this.cacheStoreSongs));
  };

  public getSongs():Observable<Song[]> {
    return this.http.get<{ message: string, songs: Song[] }>(`${this.baseUrl}/songs`)
    .pipe(
      map((response: { message: string, songs: Song[] })  => response.songs),
      catchError(() => of ([])),
    );
  }

  public getRandomSongs(limit: number): Observable<Song[]> {
    let params = new HttpParams().set('limit', limit.toString());
    return this.http.get<{ message: string, songs: Song[] }>(`${this.baseUrl}/songs/random`, { params })
      .pipe(
        map(response => response.songs),
        catchError(() => of([]))
      );
  }

  public getSongById(id: number): Observable<Song> {
    return this.http.get<{ message: string, song: Song }>(`${this.baseUrl}/songs/${id}`)
      .pipe(
        map((response: { message: string, song: Song }) => response.song)
      );
  }

  public searchSongsByName(term:string):Observable<Song[]>{
    return this.getSongs()
    .pipe(
      map((songs: Song[]) => {
        return songs.filter(song => song.name.toLowerCase().includes(term.toLowerCase()));
      }),
      tap( songs => this.cacheStoreSongs.byName = { term: term}),
      tap (() => this.saveToLocalStorage()),
    )
  }

  public searchSongsByBand(term:string):Observable<Song[]>{
    return this.getSongs()
    .pipe(
      map((songs: Song[]) => {
        return songs.filter(song => song.band.name.toLowerCase().includes(term.toLowerCase()));
      }),
      tap( songs => this.cacheStoreSongs.byBand = { term: term}),
      tap (() => this.saveToLocalStorage()),
    )
  }

  public searchSongsByGenre(term:string):Observable<Song[]>{
    return this.getSongs()
    .pipe(
      map((songs: Song[]) => {
        return songs.filter(song => song.genre.name.toLowerCase().includes(term.toLowerCase()));
      }),
      tap( songs => this.cacheStoreSongs.byGenre = { term: term}),
      tap (() => this.saveToLocalStorage()),
    )
  }

  public createSong(song: dataSong): Observable<Song> {
    return this.http.post<{ message: string, song: Song }>(`${this.baseUrl}/songs`, song)
      .pipe(
        map(response => response.song),
        catchError(error => {
          console.error('Error adding song:', error);
          return of({} as Song);
        })
      );
  }

  public updateSong(id: number, song: dataSong): Observable<Song> {
    return this.http.put<{ message: string, song: Song }>(`${this.baseUrl}/songs/${id}`, song)
      .pipe(
        map(response => response.song),
        catchError(error => {
          console.error('Error updating song:', error);
          return of({} as Song);
        })
      );
  }

  public deleteSong(id: number): Observable<void> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/songs/${id}`)
      .pipe(
        map(() => {}),
        catchError(error => {
          console.error('Error deleting song:', error);
          return of();
        })
      );
  }

  public getSongsByBandId(bandId: number): Observable<Song[]> {
    return this.getSongs().pipe(
      map((songs: Song[]) => {
        return songs.filter(song => song.band.id === bandId);
      })
    );
  }
}

