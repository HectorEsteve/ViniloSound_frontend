import { Component, OnInit, inject } from '@angular/core';

import { Song }         from '../../../interfaces/song.interface';
import { SongService }  from '../../../services/song.service';


@Component({
  selector:     'app-song-by-name-page',
  templateUrl:  './song-by-name-page.component.html',
  styleUrl:     './song-by-name-page.component.css',

})
export class SongByNamePageComponent implements OnInit {
  ngOnInit(): void {
    this.initialValue = this.songService.cacheStoreSongs.byName.term;
    this.isLoading = true;

    if(this.initialValue ===''){
      this.songService.getRandomSongs(20)
      .subscribe(songs => {
        this.songs = songs;
        this.isLoading = false;
      });
    }else{
    this.songService.searchSongsByName(this.initialValue)
      .subscribe(songs => {
        this.songs = songs;
        this.isLoading = false;
      });
    }
  }

  private songService = inject( SongService );

  public songs: Song[]     = [];
  public isLoading:boolean = false;
  public initialValue='';



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
