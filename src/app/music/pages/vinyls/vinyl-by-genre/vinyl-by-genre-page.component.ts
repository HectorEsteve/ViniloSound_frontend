import { Component, OnInit, inject } from '@angular/core';

import { GenreService } from '../../../services/genre.service';
import { Vinyl }        from '../../../interfaces/vinyl.interface';
import { VinylService } from '../../../services/vinyl.service';

@Component({
  selector:     'app-vinyl-by-genre-page',
  templateUrl:  './vinyl-by-genre-page.component.html',
  styleUrl:     './vinyl-by-genre-page.component.css',
})

export class VinylByGenrePageComponent implements OnInit {
  ngOnInit(): void {
    this.loadGenres();
    this.isLoading = true;
    this.initialValue = this.vinylService.cacheStoreVinyl.byGenre.term;

    if(this.initialValue ===''){
      this.vinylService.getRandomVinyls(20)
      .subscribe(vinyls => {
        this.vinyls = vinyls;
        this.isLoading = false;
      });
    }else{
    this.vinylService.searchVinylsByGenre(this.initialValue)
      .subscribe(vinyls => {
        this.vinyls = vinyls;
        this.isLoading = false;
      });
    }
  }

  private vinylService = inject( VinylService );
  private genreService = inject( GenreService );

  public genres: string[]   = [];
  public vinyls: Vinyl[]    = [];
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
    this.vinyls=[];
    this.initialValue='';
    this.vinylService.resetFromLocalStorageByGenre();
  }

  public searchByGenre(term:string):void{
    this.isLoading = true;
    this.initialValue = term;
    this.vinylService.searchVinylsByGenre(term)
      .subscribe(vinyls => {
        this.vinyls = vinyls;
        this.isLoading = false;
      });
  }
}
