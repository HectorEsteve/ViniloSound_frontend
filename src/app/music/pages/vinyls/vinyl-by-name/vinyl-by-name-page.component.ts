import { Component, OnInit, inject } from '@angular/core';
import { VinylService } from '../../../services/vinyl.service';
import { Vinyl } from '../../../interfaces/vinyl.interface';

@Component({
  selector:     'app-vinyl-by-name-page',
  templateUrl:  './vinyl-by-name-page.component.html',
  styleUrl:     './vinyl-by-name-page.component.css',

})
export class VinylByNamePageComponent implements OnInit {
  ngOnInit(): void {
    this.vinyls = this.vinylService.cacheStoreVinyl.byName.vinyls;
    this.initialValue = this.vinylService.cacheStoreVinyl.byName.term;
  }

  private vinylService = inject( VinylService );

  public vinyls: Vinyl[] = [];
  public initialValue='';
  public isLoading:boolean = false;



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
