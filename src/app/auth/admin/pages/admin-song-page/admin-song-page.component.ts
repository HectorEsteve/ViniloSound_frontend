import { Component, OnInit, inject } from '@angular/core';
import { SongService } from '../../../../music/services/song.service';
import { Song } from '../../../../music/interfaces/song.interface';

@Component({
  selector: 'app-admin-song-page',
  templateUrl: './admin-song-page.component.html',
  styleUrl: './admin-song-page.component.css',

})
export class AdminSongPageComponent implements OnInit {
  ngOnInit(): void {
    this.isLoading = true;
    this.songService.searchSongsByName('')
      .subscribe(songs => {
        this.songs = songs;
        this.isLoading = false;
      });
  }

  private songService = inject( SongService );

  public isLoading: boolean = false;
  public songs: Song[] = [];
  public initialValue='';

  public clear(): void {
    this.songs=[];
    this.initialValue='';
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
