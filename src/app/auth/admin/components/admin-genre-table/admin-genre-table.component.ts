import { CommonModule }                                               from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormsModule }                                                from '@angular/forms';

import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Genre }                  from '../../../../music/interfaces/genre.interface';
import { GenreService }           from '../../../../music/services/genre.service';

@Component({
  selector: 'app-admin-genre-table',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmDialogComponent,
    FormsModule,
  ],

  templateUrl: './admin-genre-table.component.html',
  styleUrl: './admin-genre-table.component.css',
})

export class AdminGenreTableComponent implements OnChanges, OnInit {
  @Input()
    genres: Genre[] = [];

  public filteredGenres: Genre[] = [];
  public isLoading: boolean = false;
  public showAddGenreForm: boolean = false;
  public newGenre: Genre = { id: 0, name: '', history: '', description: '' };
  public showConfirmDialog: boolean = false;
  public confirmMessage: string = '';
  private genreIdToDelete: number | null = null;

  private genreService = inject(GenreService);

  ngOnInit(): void {
    this.filteredGenres = this.genres;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['genres'] && changes['genres'].currentValue) {
      this.filteredGenres = this.genres;
    }
  }

  public confirmDelete(genreId: number): void {
    this.genreIdToDelete = genreId;
    this.confirmMessage = '¿Está seguro de que desea eliminar este género?';
    this.showConfirmDialog = true;
  }

  public handleConfirm(confirm: boolean): void {
    if (confirm && this.genreIdToDelete !== null) {
      this.deleteGenre(this.genreIdToDelete);
    }
    this.showConfirmDialog = false;
    this.genreIdToDelete = null;
  }

  public deleteGenre(genreId: number): void {
    this.genreService.deleteGenre(genreId).subscribe(
      response => {
        this.filteredGenres = this.filteredGenres.filter(genre => genre.id !== genreId);
      }
    );
  }

  public addGenre(): void {
    if (this.newGenre.name.trim()) {
      this.genreService.createGenre({
        name: this.newGenre.name,
        history: this.newGenre.history,
        description: this.newGenre.description
      } as Genre).subscribe(
        (createdGenre) => {
          this.filteredGenres.push(createdGenre);
          this.newGenre = { id: 0, name: '', history: '', description: '' };
          this.showAddGenreForm = false;
        },
        (error) => {
          console.error('Error creating genre:', error);
        }
      );
    }
  }

  public toggleAddGenreForm(): void {
    this.showAddGenreForm = !this.showAddGenreForm;
  }

  public editGenre(genre: Genre): void {
    genre.editing = true;
  }

  public cancelEdit(genre: Genre): void {
    genre.editing = false;
    this.loadGenres();
  }

  updateGenre(genre: Genre): void {
    if (genre.name.trim()) {
      this.genreService.updateGenre(genre.id, genre).subscribe(
        (updatedGenre) => {
          Object.assign(genre, updatedGenre);
          genre.editing = false;
        },
        (error) => {
          console.error('Error updating genre:', error);
        }
      );
    }
  }

  public toggleMoreInfo(genre: Genre): void {
    genre.showMoreInfo = !genre.showMoreInfo;
  }

  public loadGenres(): void {
    this.genreService.getGenres().subscribe((genres) => {
      this.filteredGenres = genres;
      this.filteredGenres.forEach(genre => genre.editing = false);
    });
  }
}
