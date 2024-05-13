import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Band, Genre } from '../../interfaces/band.interface';
import { Router, RouterModule } from '@angular/router';
import { environments } from '../../../../environments/environments';


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
export class BandCardComponent implements OnInit {
  ngOnInit(): void {
    environments.tempRoutBand=this.router.url;
  }

  private router = inject( Router );

  @Input()
  public bands: Band[] = [];

 }
