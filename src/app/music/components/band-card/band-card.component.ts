import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Band } from '../../interfaces/band.interface';
import { Router, RouterModule } from '@angular/router';
import { environments } from '../../../../environments/environments';
import { MaxLengthStringPipe } from "../../pipe/max-length-string.pipe";


@Component({
    selector: 'app-band-card',
    standalone: true,
    templateUrl: './band-card.component.html',
    styleUrl: './band-card.component.css',
    imports: [
        CommonModule,
        RouterModule,
        MaxLengthStringPipe
    ]
})
export class BandCardComponent implements OnInit {
  ngOnInit(): void {
    environments.tempRoutBand=this.router.url;
  }

  private router = inject( Router );

  @Input()
  public bands: Band[] = [];

 }
