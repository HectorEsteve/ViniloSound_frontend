import { ActivatedRoute, Router }     from '@angular/router';
import { Component, OnInit, inject }  from '@angular/core';
import { switchMap }                  from 'rxjs';

import { Band }         from '../../../interfaces/band.interface';
import { BandService }  from '../../../services/band.service';

@Component({
  selector:     'app-band-page',
  templateUrl:  './band-page.component.html',
  styleUrl:     './band-page.component.css',

})
export class BandPageComponent implements OnInit {

  public band?:Band;
  public isLoadin:boolean = false;

  private activatedRoute  = inject( ActivatedRoute );
  private bandService     = inject( BandService );
  private router          = inject( Router );

  ngOnInit(): void {
    this.isLoadin = true;
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.bandService.getBandById(id))
    )
    .subscribe((band) =>{
      if(!band){
        return this.router.navigateByUrl('')
      }
      this.isLoadin = false;
      return this.band = band;
    });
  }
}
