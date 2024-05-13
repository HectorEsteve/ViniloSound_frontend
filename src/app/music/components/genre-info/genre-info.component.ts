import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Genre } from '../../interfaces/song.interface';

@Component({
  selector:     'genre-info',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl:  './genre-info.component.html',
  styleUrl:     './genre-info.component.css',
})
export class GenreInfoComponent {
  @Input()
  public genre!: Genre;
}
