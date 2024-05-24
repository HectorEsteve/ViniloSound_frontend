import { CommonModule }             from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule }             from '@angular/router';

import { Band}                from '../../interfaces/band.interface';
import { environments }       from '../../../../environments/environments';
import { Genre }              from '../../interfaces/genre.interface';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { Song }               from '../../interfaces/song.interface';
import { SongCardsComponent } from "../song-card/song-cards.component";

import { StringToArrayPipe }  from "../../pipe/string-to-array.pipe";

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

    for (const song of this.band.songs){
      this.songs.push(song);
      const existingGenre = this.genres.find(existingGenre => existingGenre.id === song.genre.id);
      if (!existingGenre) {
        this.genres.push(song.genre)
      }
    }
  }

  public tempRout:string='';

  @Input()
  public band!: Band;

  public genres: Genre[] = [];
  public songs: Song[] = [];

 }
