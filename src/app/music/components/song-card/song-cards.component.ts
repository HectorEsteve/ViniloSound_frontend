import { CommonModule }                         from '@angular/common';
import { Component, Input,  OnInit,  inject }   from '@angular/core';
import { Router, RouterModule }                 from '@angular/router';

import { environments }   from '../../../../environments/environments';
import { Song }           from '../../interfaces/song.interface';

import { MaxLengthStringPipe } from "../../pipe/max-length-string.pipe";

@Component({
    selector:     'app-song-cards',
    standalone:   true,
    templateUrl:  './song-cards.component.html',
    styleUrl:     './song-cards.component.css',
    imports: [
        CommonModule,
        RouterModule,
        MaxLengthStringPipe
    ]
})

export class SongCardsComponent implements OnInit{
  ngOnInit(): void {
    environments.tempRoutSong=this.router.url;
  }

  private router = inject( Router );

  @Input()
  public songs: Song[] = [];
}

