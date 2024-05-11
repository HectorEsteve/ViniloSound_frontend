import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Song } from '../../interfaces/song.interface';

@Component({
  selector: 'app-song-cards',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './song-cards.component.html',
  styleUrl: './song-cards.component.css',
})
export class SongCardsComponent {

  @Input()
  public songs: Song[] = [];

 }
