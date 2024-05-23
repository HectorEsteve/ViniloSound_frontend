import { CommonModule }                     from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterModule }             from '@angular/router';

import { environments }   from '../../../../environments/environments';
import { Format }         from '../../interfaces/format.interface';


@Component({
  selector:     'app-format-card',
  standalone:   true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl:  './format-card.component.html',
  styleUrl:     './format-card.component.css',
})

export class FormatCardComponent implements OnInit {
  ngOnInit(): void {
    environments.tempRoutFormat=this.router.url;
  }

  private router = inject( Router );

  @Input()
  public formats: Format[] = [];

}
