import {  Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router }     from '@angular/router';
import { switchMap }                  from 'rxjs';

import { Song }         from '../../../interfaces/song.interface';
import { SongService }  from '../../../services/song.service';

@Component({
  selector:     'app-song-page',
  templateUrl:  './song-page.component.html',
  styleUrl:     './song-page.component.css',
})

export class SongPageComponent implements OnInit {
  public song?:Song;
  public isLoadin:boolean = false;


  private activatedRoute  = inject( ActivatedRoute );
  private songService     = inject( SongService );
  private router          = inject( Router );

  ngOnInit(): void {
    this.isLoadin = true;
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.songService.getSongById(id))
    )
    .subscribe((song) =>{
      if(!song){
        return this.router.navigateByUrl('')
      }
      this.isLoadin = false;
      return this.song = song;
    });
  }
}
