import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Song } from '../../interfaces/song.interface';
import { Router, RouterModule } from '@angular/router';
import { environments } from '../../../../environments/environments';

@Component({
  selector: 'app-song-cards',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule

  ],
  templateUrl: './song-cards.component.html',
  styleUrl: './song-cards.component.css',
})
export class SongCardsComponent implements OnInit {
  ngOnInit(): void {
    environments.tempRout=this.router.url;
  }

  private router = inject( Router );

  @Input()
  public songs: Song[] = [];


 }

