import { Component, OnInit, inject } from '@angular/core';

import { Vinyl }         from '../../../interfaces/vinyl.interface';
import { VinylService }  from '../../../services/vinyl.service';

@Component({
  selector:     'app-vinyl-by-name-page',
  templateUrl:  './vinyl-by-name-page.component.html',
  styleUrl:     './vinyl-by-name-page.component.css',

})
export class VinylByNamePageComponent implements OnInit {
  ngOnInit(): void {
    this.isLoading = true;
    this.initialValue = this.vinylService.cacheStoreVinyl.byName.term;

    if(this.initialValue ===''){
      this.vinylService.getRandomVinyls(20)
      .subscribe(vinyls => {
        this.vinyls = vinyls;
        this.isLoading = false;
      });
    }else{
    this.vinylService.searchVinylsByName(this.initialValue)
    .subscribe(vinyls => {
      this.vinyls = vinyls;
      this.isLoading = false;
    });
  }
  }

  private vinylService = inject( VinylService );

  public vinyls: Vinyl[]    = [];
  public initialValue='';
  public isLoading:boolean  = false;

  public clearCache(): void {
    this.vinyls=[];
    this.initialValue='';
    this.vinylService.resetFromLocalStorageByName();
  }

  public searchByName(term:string):void{
    this.isLoading = true;
    this.initialValue = term;

    this.vinylService.searchVinylsByName(term)
      .subscribe(vinyls => {
        this.vinyls = vinyls;
        this.isLoading = false;
      });
  }
}
