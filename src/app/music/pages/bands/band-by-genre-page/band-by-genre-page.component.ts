import { Component, OnInit, inject } from '@angular/core';

import { Band }         from '../../../interfaces/band.interface';
import { BandService }  from '../../../services/band.service';
import { GenreService } from '../../../services/genre.service';

@Component({
  selector:     'app-band-by-genre-page',
  templateUrl:  './band-by-genre-page.component.html',
  styleUrl:     './band-by-genre-page.component.css',
})

export class BandByGenrePageComponent implements OnInit{
  ngOnInit(): void {
    this.loadGenres();
    this.isLoading = true;    this.initialValue = this.bandService.cacheStoreBand.byGenre.term;

    if(this.initialValue ===''){
      this.bandService.getRandomBands(20)
      .subscribe(bands => {
        this.bands = bands;
        this.isLoading = false;
      });
    }else{
    this.bandService.searchBandsByGenre(this.initialValue)
      .subscribe(bands => {
        this.bands = bands;
        this.isLoading = false;
      });
    }
  }

  private bandService   = inject( BandService );
  private genreService  = inject( GenreService );

  public genres: string[]   = [];
  public bands: Band[]      = [];
  public isLoading:boolean  = false;
  public initialValue='';

  loadGenres(): void {
    this.genreService.getGenres()
    .subscribe(
      genres => {
        this.genres = genres.map(genre => genre.name);
      });
  }

  public clearCache(): void {
    this.bands=[];
    this.initialValue='';
    this.bandService.resetFromLocalStorageByName();
  }

  public searchByGenre(term:string):void{
    this.isLoading = true;
    this.initialValue = term;

    this.bandService.searchBandsByGenre(term)
      .subscribe(bands => {
        this.bands = bands;
        this.isLoading = false;
      });
  }


}
