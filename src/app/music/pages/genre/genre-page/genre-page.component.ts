import { Component, OnInit, inject } from '@angular/core';
import { Genre } from '../../../interfaces/song.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreService } from '../../../services/genre.service';
import { switchMap } from 'rxjs';

@Component({
  selector:     'app-genre-page',
  templateUrl:  './genre-page.component.html',
  styleUrl:     './genre-page.component.css',

})
export class GenrePageComponent implements OnInit {

  public genre?:Genre;
  public isLoadin:boolean = false;

  private activatedRoute = inject( ActivatedRoute );
  private genreService = inject( GenreService );
  private router = inject( Router );


  ngOnInit(): void {
    this.isLoadin = true;
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.genreService.getGenreById(id))
    )
    .subscribe((genre) =>{
      if(!genre){
        return this.router.navigateByUrl('')
      }
      this.isLoadin = false;
      return this.genre = genre;
    });
  }

 }
