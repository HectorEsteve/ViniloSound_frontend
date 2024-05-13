import { CommonModule } from '@angular/common';
import { Component, Input,  OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Song } from '../../interfaces/song.interface';
import { MinuteFormatPipe } from '../../pipe/minute-format.pipe';
import { environments } from '../../../../environments/environments';

@Component({
  selector:     'song-info',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MinuteFormatPipe
  ],
  templateUrl:  './song-info.component.html',
  styleUrl:     './song-info.component.css',
})
export class SongInfoComponent implements OnInit{

  ngOnInit(): void {
    this.tempRout = environments.tempRout;
  }

  public tempRout:string='';

  private router = inject( Router );

  @Input()
  public song!: Song;
}
