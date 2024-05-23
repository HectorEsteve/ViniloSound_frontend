import { CommonModule }     from '@angular/common';
import { Component, Input } from '@angular/core';

import { AuthRoutingModule }  from '../../../auth-routing.module';
import { User }               from '../../../interfaces/user.interface';
import { Vinyl }              from '../../../../music/interfaces/vinyl.interface';
import { VinylCardComponent } from '../../../../music/components/vinyl-card/vinyl-card.component';

@Component({
  selector:     'app-info-collection',
  standalone:   true,
  imports: [
    CommonModule,
    VinylCardComponent,
    AuthRoutingModule,
  ],
  templateUrl:  './infoCollection.component.html',
  styleUrl:     './infoCollection.component.css',
})

export class InfoCollectionComponent {

  @Input()
  public user!: User;

  @Input()
  public vinyls!: Vinyl[];

}
