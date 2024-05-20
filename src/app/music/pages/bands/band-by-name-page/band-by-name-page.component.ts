import { Component, OnInit, inject } from '@angular/core';
import { BandService } from '../../../services/band.service';
import { Band } from '../../../interfaces/band.interface';


@Component({
  selector:    'app-band-by-name-page',
  templateUrl: './band-by-name-page.component.html',
  styleUrl:    './band-by-name-page.component.css',

})
export class BandByNamePageComponent implements OnInit {
  ngOnInit(): void {
    this.isLoading = true;
    this.initialValue = this.bandService.cacheStoreBand.byName.term;

    if(this.initialValue ===''){
      this.bandService.getRandomBands(20)
      .subscribe(bands => {
        this.bands = bands;
        this.isLoading = false;
      });
    }else{
      this.bandService.searchBandsByName(this.initialValue)
      .subscribe(bands => {
        this.bands = bands;
        this.isLoading = false;
      });
    }
  }

  private bandService = inject( BandService );

  public bands: Band[] = [];
  public initialValue='';
  public isLoading:boolean = false;

  public clearCache(): void {
    this.bands=[];
    this.initialValue='';
    this.bandService.resetFromLocalStorageByName();
  }

  public searchByName(term:string):void{
    this.isLoading = true;
    this.initialValue = term;

    this.bandService.searchBandsByName(term)
      .subscribe(bands => {
        this.bands = bands;
        this.isLoading = false;
      });
  }
 }
