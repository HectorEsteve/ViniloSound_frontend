import { CommonModule } from '@angular/common';
import { Component, Input,  OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Song } from '../../interfaces/song.interface';
import { MinuteFormatPipe } from '../../pipe/minute-format.pipe';
import { environments } from '../../../../environments/environments';
import { Band } from '../../interfaces/band.interface';
import { BandService } from '../../services/band.service';
import { BandCardComponent } from '../band-card/band-card.component';
import { Genre } from '../../interfaces/genre.interface';
import { GenreService } from '../../services/genre.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';

@Component({
  selector:     'song-info',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MinuteFormatPipe,
    BandCardComponent,
    GenreCardComponent
  ],
  templateUrl:  './song-info.component.html',
  styleUrl:     './song-info.component.css',
})
export class SongInfoComponent implements OnInit{

  ngOnInit(): void {
    this.tempRout = environments.tempRoutSong;

    this.bands.push(this.song.band)




    this.genreService.getGenreById(this.song.genre.id).
    subscribe(
      (genre: Genre) => {
          this.genres.push(genre);
      }
    );
  }

  public tempRout:string='';

  private bandService = inject( BandService );
  private genreService = inject( GenreService );

  @Input()
  public song!: Song;

  public genres: Genre[] = [];
  public bands: Band[] = [];

}
