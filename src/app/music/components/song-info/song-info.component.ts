import { CommonModule }               from '@angular/common';
import { Component, Input,  OnInit }  from '@angular/core';
import { RouterModule }               from '@angular/router';

import { Band }                 from '../../interfaces/band.interface';
import { BandCardComponent }    from '../band-card/band-card.component';
import { environments }         from '../../../../environments/environments';
import { Genre }                from '../../interfaces/genre.interface';
import { GenreCardComponent }   from '../genre-card/genre-card.component';
import { Song }                 from '../../interfaces/song.interface';

import { MinuteFormatPipe } from '../../pipe/minute-format.pipe';

@Component({
  selector:     'song-info',
  standalone:   true,
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
    this.genres.push(this.song.genre)
  }

  public tempRout:string='';

  @Input()
  public song!: Song;

  public genres: Genre[]=[];
  public bands: Band[]=[];

}
