import { Component, OnInit, inject } from '@angular/core';
import { SongService } from '../../../services/song.service';
import { Song } from '../../../interfaces/song.interface';


@Component({
  selector:     'app-song-by-name-page',
  templateUrl:  './song-by-name-page.component.html',
  styleUrl:     './song-by-name-page.component.css',

})
export class SongByNamePageComponent implements OnInit {
  ngOnInit(): void {
    this.songs = this.songService.cacheStoreSongs.byName.songs;
    this.initialValue = this.songService.cacheStoreSongs.byName.term;
  }

  private songService = inject( SongService );

  public songs: Song[] = [];
  public initialValue='';
  public isLoading:boolean = false;



  public clearCache(): void {
    this.songs=[];
    this.initialValue='';
    this.songService.resetFromLocalStorageByName();
  }

  public searchByName(term:string):void{
    this.isLoading = true;
    this.initialValue = term;

    this.songService.searchSongsByName(term)
      .subscribe(songs => {
        this.songs = songs;
        this.isLoading = false;
      });
  }
}
