import { Component, OnInit, inject } from '@angular/core';
import { BandService } from '../../../../music/services/band.service';
import { Band } from '../../../../music/interfaces/band.interface';

@Component({
  selector: 'app-admin-band-page',
  templateUrl: './admin-band-page.component.html',
  styleUrl: './admin-band-page.component.css',

})
export class AdminBandPageComponent implements OnInit {
  ngOnInit(): void {
    this.isLoading = true;
    this.bandService.searchBandsByName('')
      .subscribe(bands => {
        this.bands = bands;
        this.isLoading = false;
      });
  }

  private bandService = inject( BandService );

  public isLoading: boolean = false;
  public bands: Band[] = [];
  public initialValue='';

  public clear(): void {
    this.bands=[];
    this.initialValue='';
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
