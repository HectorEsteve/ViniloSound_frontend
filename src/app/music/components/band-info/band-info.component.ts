import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Band} from '../../interfaces/band.interface';
import { Song } from '../../interfaces/song.interface';
import { StringToArrayPipe } from "../../pipe/string-to-array.pipe";
import { SongCardsComponent } from "../song-card/song-cards.component";
import { GenreService } from '../../services/genre.service';
import { SongService } from '../../services/song.service';
import { Genre } from '../../interfaces/genre.interface';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { environments } from '../../../../environments/environments';

@Component({
    selector:     'band-info',
    standalone:   true,
    templateUrl:  './band-info.component.html',
    styleUrl:     './band-info.component.css',
    imports: [
        CommonModule,
        RouterModule,
        StringToArrayPipe,
        SongCardsComponent,
        GenreCardComponent
    ]
})
export class BandInfoComponent implements OnInit{

 ngOnInit(): void {
  this.tempRout = environments.tempRoutBand;

  this.genreService.getGenres().
  subscribe(
    (allGenres: Genre[]) => {
      for (const song of this.band.songs) {
        for (const genre of allGenres) {
          if (song.genre.id === genre.id) {
            const existingGenre = this.genres.find(existingGenre => existingGenre.id === genre.id);
            if (!existingGenre) {
              this.genres.push(genre);
            }
            break;
          }
        }
      }
    });

  this.songService.searchSongsByBand(this.band.name).
    subscribe(
      (songs: Song[]) => {
        for (const song of songs) {
          this.songs.push(song);
        }
      }
    );

  }
  public tempRout:string='';

  private songService = inject( SongService );
  private genreService = inject( GenreService );

  @Input()
  public band!: Band;

  public genres: Genre[] = [];
  public songs: Song[] = [];

 }
