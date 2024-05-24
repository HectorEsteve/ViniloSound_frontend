import { CommonModule }                     from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterModule }             from '@angular/router';

import { environments } from '../../../../environments/environments';
import { Genre }        from '../../interfaces/genre.interface';

@Component({
  selector:     'app-genre-card',
  standalone:   true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl:  './genre-card.component.html',
  styleUrl:     './genre-card.component.css',
})

export class GenreCardComponent implements OnInit {
  ngOnInit(): void {
    environments.tempRoutGenre=this.router.url;
  }

  private router = inject( Router );

  @Input()
  public genres: Genre[] = [];

}
