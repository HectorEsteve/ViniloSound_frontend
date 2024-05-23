import { CommonModule }                     from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterModule }             from '@angular/router';

import { Collection }     from '../../interfaces/collection-interface';
import { environments }   from '../../../../environments/environments';

import { MaxLengthStringPipe } from "../../pipe/max-length-string.pipe";

@Component({
    selector:     'app-collection-card',
    standalone:   true,
    templateUrl:  './collection-card.component.html',
    styleUrl:     './collection-card.component.css',
    imports: [
        CommonModule,
        RouterModule,
        MaxLengthStringPipe
    ]
})
export class CollectionCardComponent implements OnInit {
  ngOnInit(): void {
    environments.tempRoutCollection=this.router.url;
  }

  private router = inject( Router );

  @Input()
  public collections: Collection[] = [];
 }
