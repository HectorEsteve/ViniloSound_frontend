import { Component, OnInit, inject } from '@angular/core';
import { VinylService } from '../../../services/vinyl.service';
import { Vinyl } from '../../../interfaces/vinyl.interface';
import { GenreService } from '../../../services/genre.service';

@Component({
  selector: 'app-vinyl-by-genre-page',
  templateUrl: './vinyl-by-genre-page.component.html',
  styleUrl: './vinyl-by-genre-page.component.css',

})
export class VinylByGenrePageComponent implements OnInit {

  ngOnInit(): void {
    this.loadGenres();
    this.vinyls = this.vinylService.cacheStoreVinyl.byGenre.vinyls;
    this.initialValue = this.vinylService.cacheStoreVinyl.byGenre.term;
  }

  private vinylService = inject( VinylService );
  private genreService = inject( GenreService );

  public genres: string[] = [];
  public vinyls: Vinyl[] = [];
  public initialValue='';
  public isLoading:boolean = false;

  loadGenres(): void {
    this.isLoading = true;
    this.genreService.getGenres()
    .subscribe(
      genres => {

        this.genres = genres.map(genre => genre.name);
        this.isLoading = false;
      });
  }

  public clearCache(): void {
    this.vinyls=[];
    this.initialValue='';
    this.vinylService.resetFromLocalStorageByBand();
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
