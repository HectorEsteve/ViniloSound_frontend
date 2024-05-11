import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Song } from '../interfaces/song.interface';
import { SongCacheStore, Termsongs } from '../interfaces/song-cache-store.interface';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private http = inject( HttpClient );

  private baseUrl= environments.baseUrl;

  public cacheStoreSongs: SongCacheStore = {
    byName:   {term: '', songs:[]},
    byBand:   {term: '', songs:[]},
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
      this.cacheStoreSongs.byName.songs = [];
      this.cacheStoreSongs.byName.term = '';
      localStorage.setItem('cacheStoreSongs', JSON.stringify(this.cacheStoreSongs));
  };

  public resetFromLocalStorageByBand(): void {
    this.cacheStoreSongs = JSON.parse(localStorage.getItem('cacheStoreSongs')!);
      this.cacheStoreSongs.byBand.songs = [];
      this.cacheStoreSongs.byBand.term = '';
      localStorage.setItem('cacheStoreSongs', JSON.stringify(this.cacheStoreSongs));
  };

  getSongs():Observable<Song[]> {
    return this.http.get<{ message: string, songs: Song[] }>(`${this.baseUrl}/songs`)
    .pipe(
      map((response: { message: string, songs: Song[] })  => response.songs),
      catchError(() => of ([])),
    );
  }

  searchSongsByName(term:string):Observable<Song[]>{
    return this.getSongs()
    .pipe(
      map((songs: Song[]) => {
        return songs.filter(song => song.name.toLowerCase().includes(term.toLowerCase()));
      }),
      tap( songs => this.cacheStoreSongs.byName = { term: term, songs: songs}),
      tap (() => this.saveToLocalStorage()),
    )
  }

  searchSongsByBand(term:string):Observable<Song[]>{
    return this.getSongs()
    .pipe(
      map((songs: Song[]) => {
        return songs.filter(song => song.band.name.toLowerCase().includes(term.toLowerCase()));
      }),
      tap( songs => this.cacheStoreSongs.byBand = { term: term, songs: songs}),
      tap (() => this.saveToLocalStorage()),
    )
  }
}
