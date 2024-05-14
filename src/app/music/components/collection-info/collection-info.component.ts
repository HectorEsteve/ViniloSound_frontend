import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Collection } from '../../interfaces/collection-interface';
import { RouterModule } from '@angular/router';
import { Vinyl } from '../../interfaces/vinyl.interface';
import { environments } from '../../../../environments/environments';
import { VinylCardComponent } from '../vinyl-card/vinyl-card.component';

@Component({
  selector:     'collection-info',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    VinylCardComponent
  ],
  templateUrl:  './collection-info.component.html',
  styleUrl:     './collection-info.component.css',
})
export class CollectionInfoComponent implements OnInit {
  ngOnInit(): void {
    this.tempRout = environments.tempRoutCollection;

    this.vinyls=this.collection.vinyls
  }

  public tempRout:string='';

  @Input()
  public collection!: Collection;

  public vinyls: Vinyl[] = [];
 }
