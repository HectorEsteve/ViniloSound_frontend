import { Component, OnInit, inject } from '@angular/core';

import { Vinyl }        from '../../../interfaces/vinyl.interface';
import { VinylService } from '../../../services/vinyl.service';

@Component({
  selector:     'app-vinyl-by-band-page',
  templateUrl:  './vinyl-by-band-page.component.html',
  styleUrl:     './vinyl-by-band-page.component.css',
})

export class VinylByBandPageComponent implements OnInit {
  ngOnInit(): void {
    this.isLoading = true;
    this.initialValue = this.vinylService.cacheStoreVinyl.byBand.term;

    if(this.initialValue ===''){
      this.vinylService.getRandomVinyls(20)
      .subscribe(vinyls => {
        this.vinyls = vinyls;
        this.isLoading = false;
      });
    }else{
    this.vinylService.searchVinylsByBand(this.initialValue)
      .subscribe(vinyls => {
        this.vinyls = vinyls;
        this.isLoading = false;
      });
    }
  }

  private vinylService = inject( VinylService );

  public vinyls: Vinyl[]    = [];
  public isLoading:boolean  = false;
  public initialValue='';


  public clearCache(): void {
    this.vinyls=[];
    this.initialValue='';
    this.vinylService.resetFromLocalStorageByBand();
  }

  public searchByBand(term:string):void{
    this.isLoading = true;
    this.initialValue = term;

    this.vinylService.searchVinylsByBand(term)
      .subscribe(vinyls => {
        this.vinyls = vinyls;
        this.isLoading = false;
      });
  }
}
