import { CommonModule }             from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule }             from '@angular/router';

import { environments }             from '../../../../environments/environments';
import { Format }                   from '../../interfaces/format.interface';

@Component({
  selector:     'format-info',
  standalone:   true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl:  './format-info.component.html',
  styleUrl:     './format-info.component.css',
})

export class FormatInfoComponent implements OnInit{
  ngOnInit(): void {
    this.tempRout = environments.tempRoutFormat;
  }

  public tempRout:string='';

  @Input()
  public format!: Format;
}
