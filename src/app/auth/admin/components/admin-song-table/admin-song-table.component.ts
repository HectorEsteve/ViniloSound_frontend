import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Song } from '../../../../music/interfaces/song.interface';
import { SongService } from '../../../../music/services/song.service';
import { Genre } from '../../../../music/interfaces/genre.interface';
import { Band } from '../../../../music/interfaces/band.interface';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { FormsModule } from '@angular/forms';
import { BandService } from '../../../../music/services/band.service';
import { GenreService } from '../../../../music/services/genre.service';
import { dataSong } from '../../../interfaces/dataSong.intrface';

export interface EditableSong extends dataSong {
  id: number;
  editing?: boolean;
  showMoreInfo?: boolean;
  band?: Band;
  genre?: Genre;
}

@Component({
  selector: 'app-admin-song-table',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmDialogComponent,
    FormsModule,
  ],
  templateUrl: './admin-song-table.component.html',
  styleUrls: ['./admin-song-table.component.css'],
})
export class AdminSongTableComponent implements OnChanges, OnInit {
  @Input() songs: Song[] = [];
  public bands: Band[] = [];
  public genres: Genre[] = [];
  public filteredSongs: EditableSong[] = [];
  public isLoading: boolean = false;
  public showAddSongForm: boolean = false;
  public newSong: EditableSong = {
    id: 0,
    name: '',
    duration: 0,
    lyrics: '',
    video_url: null,
    audio_url: null,
    band_id: 0,
    genre_id: 0,
  };
  public showConfirmDialog: boolean = false;
  public confirmMessage: string = '';
  private songIdToDelete: number | null = null;

  public originalSongData: { [key: number]: EditableSong } = {};

  constructor(
    private songService: SongService,
    private bandService: BandService,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    this.loadSongs();
    this.loadBands();
    this.loadGenres();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['songs'] && changes['songs'].currentValue) {
      this.filteredSongs = this.songs.map(song => ({
        ...song,
        editing: false,
        showMoreInfo: false,
        band_id: song.band.id,
        genre_id: song.genre.id
      }));
    }
  }

  public confirmDelete(songId: number): void {
    this.songIdToDelete = songId;
    this.confirmMessage = '¿Está seguro de que desea eliminar esta canción?';
    this.showConfirmDialog = true;
  }

  public handleConfirm(confirm: boolean): void {
    if (confirm && this.songIdToDelete !== null) {
      this.deleteSong(this.songIdToDelete);
    }
    this.showConfirmDialog = false;
    this.songIdToDelete = null;
  }

  public deleteSong(songId: number): void {
    this.songService.deleteSong(songId).subscribe(
      response => {
        this.filteredSongs = this.filteredSongs.filter(song => song.id !== songId);
      },
      error => {
        console.error('Error deleting song:', error);
      }
    );
  }

  public addSong(): void {
    if (this.newSong.name.trim()) {
      this.songService.createSong(this.newSong).subscribe(
        (createdSong) => {
          const bandId = createdSong.band ? createdSong.band.id : null;
          const genreId = createdSong.genre ? createdSong.genre.id : null;

          this.filteredSongs.push({
            ...createdSong,
            editing: false,
            showMoreInfo: false,
            band_id: bandId ?? 0,
            genre_id: genreId ?? 0
          });
          this.resetNewSong();
          this.showAddSongForm = false;
          this.loadSongs();
          this.loadBands();
          this.loadGenres();
        },
        (error) => {
          console.error('Error creating song:', error);
        }
      );
    }
  }

  public toggleAddSongForm(): void {
    this.showAddSongForm = !this.showAddSongForm;
  }

  public editSong(song: EditableSong): void {
    this.originalSongData[song.id] = { ...song };
    song.editing = true;
    song.showMoreInfo = true;
  }

  public cancelEdit(song: EditableSong): void {
    Object.assign(song, this.originalSongData[song.id]);
    song.editing = false;
    delete this.originalSongData[song.id];
  }

  public updateSong(song: EditableSong): void {
    if (song.name.trim()) {
      const updatedSong: EditableSong = {
        id: song.id,
        name: song.name,
        duration: song.duration,
        lyrics: song.lyrics,
        video_url: song.video_url,
        audio_url: song.audio_url,
        band_id: song.band_id,
        genre_id: song.genre_id,
      };

      this.songService.updateSong(song.id, updatedSong).subscribe(
        (responseSong) => {
          Object.assign(song, responseSong);
          song.editing = false;
          song.showMoreInfo = false;
          delete this.originalSongData[song.id];
        },
        (error) => {
          console.error('Error updating song:', error);
        }
      );
    }
  }

  private resetNewSong(): void {
    this.newSong = {
      id: 0,
      name: '',
      duration: 0,
      lyrics: '',
      video_url: null,
      audio_url: null,
      band_id: 0,
      genre_id: null,
    };
  }

  public toggleMoreInfo(song: EditableSong): void {
    song.showMoreInfo = !song.showMoreInfo;
  }

  public loadSongs(): void {
    this.songService.getSongs().subscribe((songs) => {
      this.filteredSongs = songs.map(song => ({
        ...song,
        editing: false,
        showMoreInfo: false,
        band_id: song.band.id,
        genre_id: song.genre.id
      }));
    });
  }
  public loadBands(): void {
    this.bandService.getBands().subscribe((bands) => {
      this.bands = bands;
    });
  }

  public loadGenres(): void {
    this.genreService.getGenres().subscribe((genres) => {
      this.genres = genres;
    });
  }
}
