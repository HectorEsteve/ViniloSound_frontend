import { Component, OnInit, inject } from '@angular/core';
import { VinylService } from '../../../services/vinyl.service';
import { Vinyl } from '../../../interfaces/vinyl.interface';

@Component({
  selector:     'app-vinyl-by-band-page',
  templateUrl:  './vinyl-by-band-page.component.html',
  styleUrl:     './vinyl-by-band-page.component.css',
})
export class VinylByBandPageComponent implements OnInit {

  ngOnInit(): void {
    this.vinyls = this.vinylService.cacheStoreVinyl.byBand.vinyls;
    this.initialValue = this.vinylService.cacheStoreVinyl.byBand.term;
  }

  private vinylService = inject( VinylService );

  public vinyls: Vinyl[] = [];
  public initialValue='';
  public isLoading:boolean = false;


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
