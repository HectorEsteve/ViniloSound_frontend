import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Collection } from '../../interfaces/collection-interface';
import { environments } from '../../../../environments/environments';

@Component({
  selector:     'app-collection-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl:  './collection-card.component.html',
  styleUrl:     './collection-card.component.css',
})
export class CollectionCardComponent implements OnInit {
  ngOnInit(): void {
    environments.tempRoutCollection=this.router.url;
  }

  private router = inject( Router );

  @Input()
  public collections: Collection[] = [];

 }
