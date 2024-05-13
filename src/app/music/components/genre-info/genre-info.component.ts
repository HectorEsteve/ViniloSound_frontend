import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Genre } from '../../interfaces/song.interface';
import { environments } from '../../../../environments/environments';
import { RouterModule } from '@angular/router';

@Component({
  selector:     'genre-info',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl:  './genre-info.component.html',
  styleUrl:     './genre-info.component.css',
})
export class GenreInfoComponent implements OnInit{

  ngOnInit(): void {
    this.tempRout = environments.tempRoutGenre;
  }

  public tempRout:string='';

  @Input()
  public genre!: Genre;
}
