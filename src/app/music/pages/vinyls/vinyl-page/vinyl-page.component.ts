import { ActivatedRoute, Router }     from '@angular/router';
import { Component, OnInit, inject }  from '@angular/core';
import { switchMap }                  from 'rxjs';

import { Vinyl }        from '../../../interfaces/vinyl.interface';
import { VinylService } from '../../../services/vinyl.service';

@Component({
  selector:     'app-vinyl-page',
  templateUrl:  './vinyl-page.component.html',
  styleUrl:     './vinyl-page.component.css',

})
export class VinylPageComponent implements OnInit {
  public vinyl?:Vinyl;
  public isLoadin:boolean     = false;
  public myCollection:boolean = false;


  private activatedRoute =  inject( ActivatedRoute );
  private vinylService =    inject( VinylService );
  private router =          inject( Router );

  ngOnInit(): void {
    this.isLoadin = true;
    this.activatedRoute.queryParams.subscribe(params => {
      this.myCollection = params['myCollection'] === 'true';
    });
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.vinylService.getVinylById(id))
    )
    .subscribe((vinyl) =>{
      if(!vinyl){
        return this.router.navigateByUrl('')
      }
      this.isLoadin = false;
      return this.vinyl = vinyl;
    });
  }
}

