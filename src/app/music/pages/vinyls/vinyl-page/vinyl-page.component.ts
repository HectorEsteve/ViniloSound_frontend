import { Component, OnInit, inject } from '@angular/core';
import { Vinyl } from '../../../interfaces/vinyl.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { VinylService } from '../../../services/vinyl.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-vinyl-page',
  templateUrl: './vinyl-page.component.html',
  styleUrl: './vinyl-page.component.css',

})
export class VinylPageComponent implements OnInit {
  public vinyl?:Vinyl;
  public isLoadin:boolean = false;


  private activatedRoute = inject( ActivatedRoute );
  private vinylService = inject( VinylService );
  private router = inject( Router );

  ngOnInit(): void {
    this.isLoadin = true;
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
