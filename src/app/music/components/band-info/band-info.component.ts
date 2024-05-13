import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Band, Genre } from '../../interfaces/band.interface';
import { Song } from '../../interfaces/song.interface';
import { StringToArrayPipe } from "../../pipe/string-to-array.pipe";
import { SongCardsComponent } from "../song-card/song-cards.component";

@Component({
    selector: 'band-info',
    standalone: true,
    templateUrl: './band-info.component.html',
    styleUrl: './band-info.component.css',
    imports: [
        CommonModule,
        RouterModule,
        StringToArrayPipe,
        SongCardsComponent
    ]
})
export class BandInfoComponent implements OnInit{
  ngOnInit(): void {
    this.bandUrl = this.router.url;
  }

  private bandUrl: string='';

  private router = inject( Router );


  @Input()
  public band!: Band;

  public genres: Genre[] = [];
  public songs: Song[] = [];

  public GenresFromBand(band: Band): Genre[] {
    band.songs.forEach(song => {
      const songGenre: Genre = song.genre;
      const existingGenre = this.genres.find(genre => genre.id === songGenre.id);
      if (!existingGenre) {
        this.genres.push(songGenre);
      }
    });
    return this.genres;
  }

  public SongsFromBand(band: Band): Song[] {
    this.songs = [];

    band.songs.forEach(songFromBand => {
      const song: Song = {
        id: songFromBand.id,
        name: songFromBand.name,
        duration: songFromBand.duration,
        lyrics: songFromBand.lyrics,
        video_url: songFromBand.video_url,
        audio_url: songFromBand.audio_url,
        created_at: songFromBand.created_at,
        updated_at: songFromBand.updated_at,
        genre: songFromBand.genre,
        band: band,
      };
      this.songs.push(song);

    });return this.songs;
  }


}
