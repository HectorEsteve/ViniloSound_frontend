import {  Component, OnInit, inject } from '@angular/core';

import { Song }         from '../../../interfaces/song.interface';
import { SongService }  from '../../../services/song.service';

@Component({
  selector:     'app-song-by-band-page',
  templateUrl:  './song-by-band-page.component.html',
  styleUrl:     './song-by-band-page.component.css',
})

export class SongByBandPageComponent implements OnInit {
  ngOnInit(): void {
    this.isLoading = true;
    this.initialValue = this.songService.cacheStoreSongs.byBand.term;

    if(this.initialValue ===''){
      this.songService.getRandomSongs(20)
      .subscribe(songs => {
        this.songs = songs;
        this.isLoading = false;
      });
    }else{
    this.songService.searchSongsByBand(this.initialValue)
      .subscribe(songs => {
        this.songs = songs;
        this.isLoading = false;
      });
    }
  }

  private songService = inject( SongService );

  public songs: Song[]      = [];
  public isLoading:boolean  = false;
  public initialValue='';

  public clearCache(): void {
    this.songs=[];
    this.initialValue='';
    this.songService.resetFromLocalStorageByBand();
  }

  public searchByBand(term:string):void{
    this.isLoading = true;
    this.initialValue = term;

    this.songService.searchSongsByBand(term)
      .subscribe(songs => {
        this.songs = songs;
        this.isLoading = false;
      });
  }
}

