import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Format } from '../../interfaces/format.interface';
import { environments } from '../../../../environments/environments';
import { RouterModule } from '@angular/router';

@Component({
  selector:     'format-info',
  standalone: true,
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
