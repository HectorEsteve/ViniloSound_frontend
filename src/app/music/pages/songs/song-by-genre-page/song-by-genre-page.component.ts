import { Component, OnInit, inject } from '@angular/core';
import { SongService } from '../../../services/song.service';
import { GenreService } from '../../../services/genre.service';
import { Song } from '../../../interfaces/song.interface';

@Component({
  selector:     'app-song-by-genre-page',
  templateUrl:  './song-by-genre-page.component.html',
  styleUrl:     './song-by-genre-page.component.css',

})
export class SongByGenrePageComponent implements OnInit{
  ngOnInit(): void {
    this.isLoading = true;
    this.loadGenres();
    this.initialValue = this.songService.cacheStoreSongs.byGenre.term;

    if(this.initialValue ===''){
      this.songService.getRandomSongs(20)
      .subscribe(songs => {
        this.songs = songs;
        this.isLoading = false;
      });
    }else{
      this.songService.searchSongsByGenre(this.initialValue)
        .subscribe(songs => {
          this.songs = songs;
          this.isLoading = false;
        });
    }

  }

  private songService = inject( SongService );
  private genreService = inject( GenreService );

  public genres: string[] = [];
  public songs: Song[] = [];
  public initialValue='';
  public isLoading:boolean = false;

  loadGenres(): void {
    this.genreService.getGenres()
    .subscribe(
      genres => {
        this.genres = genres.map(genre => genre.name);
      });
  }

  public clearCache(): void {
    this.songs=[];
    this.initialValue='';
    this.songService.resetFromLocalStorageByGenre();
  }

  public searchByGenre(term:string):void{
    this.isLoading = true;
    this.initialValue = term;

    this.songService.searchSongsByGenre(term)
      .subscribe(songs => {
        this.songs = songs;
        this.isLoading = false;
      });
  }


}
