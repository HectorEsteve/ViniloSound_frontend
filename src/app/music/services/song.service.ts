import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Song } from '../interfaces/song.interface';
import { SongCacheStore} from '../interfaces/song-cache-store.interface';

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

  getSongs():Observable<Song[]> {
    return this.http.get<{ message: string, songs: Song[] }>(`${this.baseUrl}/songs`)
    .pipe(
      map((response: { message: string, songs: Song[] })  => response.songs),
      catchError(() => of ([])),
    );
  }

  getRandomSongs(limit: number): Observable<Song[]> {
    let params = new HttpParams().set('limit', limit.toString());
    return this.http.get<{ message: string, songs: Song[] }>(`${this.baseUrl}/songs/random`, { params })
      .pipe(
        map(response => response.songs),
        catchError(() => of([]))
      );
  }

  getSongById(id: number): Observable<Song> {
    return this.http.get<{ message: string, song: Song }>(`${this.baseUrl}/songs/${id}`)
      .pipe(
        map((response: { message: string, song: Song }) => response.song)
      );
  }

  searchSongsByName(term:string):Observable<Song[]>{
    return this.getSongs()
    .pipe(
      map((songs: Song[]) => {
        return songs.filter(song => song.name.toLowerCase().includes(term.toLowerCase()));
      }),
      tap( songs => this.cacheStoreSongs.byName = { term: term}),
      tap (() => this.saveToLocalStorage()),
    )
  }

  searchSongsByBand(term:string):Observable<Song[]>{
    return this.getSongs()
    .pipe(
      map((songs: Song[]) => {
        return songs.filter(song => song.band.name.toLowerCase().includes(term.toLowerCase()));
      }),
      tap( songs => this.cacheStoreSongs.byBand = { term: term}),
      tap (() => this.saveToLocalStorage()),
    )
  }

  searchSongsByGenre(term:string):Observable<Song[]>{
    return this.getSongs()
    .pipe(
      map((songs: Song[]) => {
        return songs.filter(song => song.genre.name.toLowerCase().includes(term.toLowerCase()));
      }),
      tap( songs => this.cacheStoreSongs.byGenre = { term: term}),
      tap (() => this.saveToLocalStorage()),
    )
  }


}
