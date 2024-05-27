import { Component, OnInit, inject } from '@angular/core';
import { Genre } from '../../../../music/interfaces/genre.interface';
import { GenreService } from '../../../../music/services/genre.service';

@Component({
  selector: 'app-admin-genre-page',
  templateUrl: './admin-genre-page.component.html',
  styleUrl: './admin-genre-page.component.css',

})
export class AdminGenrePageComponent implements OnInit {
  ngOnInit(): void {
    this.isLoading = true;
    this.genreService.searchGenreByName('')
      .subscribe(genres => {
        this.genres = genres;
        this.isLoading = false;
      });
  }

  private genreService = inject( GenreService );

  public isLoading: boolean = false;
  public genres: Genre[] = [];
  public initialValue='';

  public clear(): void {
    this.genres=[];
    this.initialValue='';
  }

  public searchByName(term:string):void{
    this.isLoading = true;
    this.initialValue = term;

    this.genreService.searchGenreByName(term)
      .subscribe(genres => {
        this.genres = genres;
        this.isLoading = false;
      });
  }
}
