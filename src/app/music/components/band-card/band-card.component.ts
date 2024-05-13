import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Band, Genre } from '../../interfaces/band.interface';
import { RouterModule } from '@angular/router';


@Component({
  selector:     'app-band-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl:  './band-card.component.html',
  styleUrl:     './band-card.component.css',
})
export class BandCardComponent {

  @Input()
  public bands: Band[] = [];

 }
