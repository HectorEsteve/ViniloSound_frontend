import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Vinyl } from '../../interfaces/vinyl.interface';
import { environments } from '../../../../environments/environments';
import { MaxLengthStringPipe } from '../../pipe/max-length-string.pipe';

@Component({
  selector:     'app-vinyl-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaxLengthStringPipe
  ],
  templateUrl:  './vinyl-card.component.html',
  styleUrl:     './vinyl-card.component.css',
})
export class VinylCardComponent implements OnInit {
  ngOnInit(): void {
    environments.tempRoutVinyl=this.router.url;
  }

  private router = inject( Router );

  @Input()
  public vinyls: Vinyl[] = [];


 }
